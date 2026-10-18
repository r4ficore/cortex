import { wavHeader, pcm } from "./wav.js";
import { phaseVolume } from "./session.js";
import { audioTimeline } from "./audio-timeline.js";
import { profileFor } from "./audio-profiles.js";
import { backgroundSamples } from "./background.js";
import { fadeAt, OUTPUT_HEADROOM, NOISE_GAIN } from "./signal.js";
import { defaults, migratePreferences } from "./store.js";
self.onmessage = ({ data: { session, options } }) => {
  try {
    const rate = 48000,
      total = Math.round(session.duration * rate),
      chunkFrames = rate * 4;
    if (!Number.isFinite(total) || total <= 0 || total > rate * 60 * 45)
      throw new Error("Invalid duration");
    const header = wavHeader(total, rate);
    self.postMessage({ chunk: header }, [header]);
    const prefs = migratePreferences({ ...defaults, ...options.prefs });
    const noise =
      options.noise === "none"
        ? null
        : backgroundSamples(options.noise || prefs.noiseType, session, rate);
    if (options.loop === "stable") {
      const stable = session.phases[1] || session.phases[0];
      session = {
        ...session,
        phases: [
          {
            ...stable,
            start: 0,
            end: session.duration,
            audio: { ...stable.audio, vol: phaseVolume(stable, stable.end) },
          },
        ],
      };
    }
    const timeline = audioTimeline(session, prefs.intensity, options);
    const profile = profileFor(session);
    let angleL = 0,
      angleR = 0,
      modAngle = 0,
      cursor = 0;
    const fields = ["l", "r", "volume", "rate", "base", "swing"],
      p = {};
    for (let base = 0; base < total; base += chunkFrames) {
      const count = Math.min(chunkFrames, total - base),
        buffer = new ArrayBuffer(count * 4),
        view = new DataView(buffer);
      for (let i = 0; i < count; i++) {
        const frame = base + i,
          t = frame / rate;
        while (timeline[cursor + 1]?.time <= t) cursor++;
        const a = timeline[cursor],
          b = timeline[cursor + 1] || a;
        const x = b === a ? 0 : (t - a.time) / (b.time - a.time);
        for (const key of fields) p[key] = a[key] + (b[key] - a[key]) * x;
        const mod = p.base + p.swing * Math.sin(modAngle);
        let l = Math.sin(angleL) * p.volume * mod * prefs.beatVolume,
          r = Math.sin(angleR) * p.volume * mod * prefs.beatVolume;
        if (options.entrainment === "isochronic")
          r = l; // One carrier with explicit sinusoidal AM.
        else if (options.entrainment === "monaural") l = r = (l + r) * 0.5;
        const n = noise
          ? noise[frame % noise.length] * prefs.noiseVolume * NOISE_GAIN
          : 0;
        const gain =
          prefs.masterVolume *
          OUTPUT_HEADROOM *
          fadeAt(t, session.duration, profile);
        view.setInt16(i * 4, pcm((l + n) * gain), true);
        view.setInt16(i * 4 + 2, pcm((r + n) * gain), true);
        angleL = (angleL + (2 * Math.PI * p.l) / rate) % (2 * Math.PI);
        angleR = (angleR + (2 * Math.PI * p.r) / rate) % (2 * Math.PI);
        modAngle = (modAngle + (2 * Math.PI * p.rate) / rate) % (2 * Math.PI);
      }
      self.postMessage(
        { chunk: buffer, progress: ((base + count) / total) * 100 },
        [buffer],
      );
    }
    self.postMessage({ done: true });
  } catch {
    self.postMessage({ error: true });
  }
};
