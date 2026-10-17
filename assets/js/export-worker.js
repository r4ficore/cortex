import { wavHeader, pcm } from "./wav.js";
import { phaseAt, phaseVolume, frequencies } from "./session.js";
import {
  modulationSpec,
  modulationSample,
  fadeAt,
  noiseGenerator,
  gainForIntensity,
  OUTPUT_HEADROOM,
  NOISE_GAIN,
  TRANSITION_SECONDS,
} from "./signal.js";
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
    const noise = noiseGenerator(options.noise);
    const stable = session.phases[1] || session.phases[0];
    let angleL = 0,
      angleR = 0,
      modAngle = 0;
    const phaseIndex = new Map(session.phases.map((p, i) => [p, i]));
    const params = (phase, t) => {
      let [l, r] = frequencies(phase.audio, prefs.intensity);
      if (options.carrier !== "native") {
        const diff = r - l;
        l = Number(options.carrier);
        r = l + diff;
      }
      const mod = modulationSpec(
        phase.audio,
        prefs.intensity,
        options.entrainment === "isochronic",
      );
      return {
        l,
        r,
        mod,
        volume: phaseVolume(phase, t) * gainForIntensity(prefs.intensity),
      };
    };
    for (let base = 0; base < total; base += chunkFrames) {
      const count = Math.min(chunkFrames, total - base),
        buffer = new ArrayBuffer(count * 4),
        view = new DataView(buffer);
      for (let i = 0; i < count; i++) {
        const t = (base + i) / rate,
          phase = options.loop === "stable" ? stable : phaseAt(session, t);
        const p = params(phase, options.loop === "stable" ? phase.end : t);
        const prev = session.phases[phaseIndex.get(phase) - 1];
        if (
          prev &&
          options.loop !== "stable" &&
          t - phase.start < TRANSITION_SECONDS
        ) {
          const q = params(prev, prev.end),
            x =
              (t - phase.start) /
              Math.min(TRANSITION_SECONDS, phase.end - phase.start);
          p.l = q.l + (p.l - q.l) * x;
          p.r = q.r + (p.r - q.r) * x;
          p.volume = q.volume + (p.volume - q.volume) * x;
          p.mod.depth = q.mod.depth + (p.mod.depth - q.mod.depth) * x;
        }
        const mod = modulationSample(modAngle / (2 * Math.PI), p.mod.depth);
        let l = Math.sin(angleL) * p.volume * mod * prefs.beatVolume,
          r = Math.sin(angleR) * p.volume * mod * prefs.beatVolume;
        // An explicit export transformation, not a claim of binaural equivalence.
        if (options.entrainment !== "binaural") {
          l = (l + r) * 0.5;
          r = l;
        }
        const n = noise(t) * prefs.noiseVolume * NOISE_GAIN;
        const gain =
          prefs.masterVolume * OUTPUT_HEADROOM * fadeAt(t, session.duration);
        view.setInt16(i * 4, pcm((l + n) * gain), true);
        view.setInt16(i * 4 + 2, pcm((r + n) * gain), true);
        angleL = (angleL + (2 * Math.PI * p.l) / rate) % (2 * Math.PI);
        angleR = (angleR + (2 * Math.PI * p.r) / rate) % (2 * Math.PI);
        modAngle =
          (modAngle + (2 * Math.PI * p.mod.rate) / rate) % (2 * Math.PI);
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
