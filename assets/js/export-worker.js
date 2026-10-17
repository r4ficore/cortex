import { wavHeader, pcm } from "./wav.js";
import { phaseAt, phaseVolume } from "./session.js";
self.onmessage = ({ data: { session, options } }) => {
  try {
    const rate = 48000,
      total = Math.round(session.duration * rate),
      chunkFrames = rate * 4;
    if (!Number.isFinite(total) || total <= 0 || total > rate * 60 * 45)
      throw new Error("Invalid duration");
    const header = wavHeader(total, rate);
    self.postMessage({ chunk: header }, [header]);
    let angleL = 0,
      angleR = 0,
      modAngle = 0,
      brown = 0,
      p0 = 0,
      p1 = 0,
      p2 = 0,
      lp = 0,
      hp = 0;
    const stable = session.phases[1] || session.phases[0];
    for (let base = 0; base < total; base += chunkFrames) {
      const count = Math.min(chunkFrames, total - base),
        buffer = new ArrayBuffer(count * 4),
        view = new DataView(buffer);
      for (let i = 0; i < count; i++) {
        const t = (base + i) / rate,
          phase = options.loop === "stable" ? stable : phaseAt(session, t),
          a = phase.audio;
        const delta = a.r - a.l,
          left = options.carrier === "native" ? a.l : Number(options.carrier),
          right = left + delta;
        angleL = (angleL + (2 * Math.PI * left) / rate) % (Math.PI * 2);
        angleR = (angleR + (2 * Math.PI * right) / rate) % (Math.PI * 2);
        modAngle =
          (modAngle + (2 * Math.PI * Math.abs(delta)) / rate) % (Math.PI * 2);
        let volume =
          options.loop === "stable"
            ? (a.vol ?? a.vol_e ?? 0.2)
            : phaseVolume(phase, t);
        const mod =
          options.entrainment === "isochronic"
            ? (1 + Math.sin(modAngle)) * 0.5
            : a.mod === "iso"
              ? (1 + Math.sin(2 * Math.PI * 2 * t)) * 0.5
              : 1;
        let l = Math.sin(angleL) * volume * mod,
          r = Math.sin(angleR) * volume * mod;
        if (options.entrainment !== "binaural") {
          l = (l + r) * 0.5;
          r = l;
        }
        const w = Math.random() * 2 - 1;
        let noise = 0;
        if (options.noise === "white") noise = w * 0.15;
        else if (options.noise === "brown") {
          brown = (brown + 0.02 * w) / 1.02;
          noise = brown * 3.5;
        } else if (options.noise === "pink") {
          p0 = 0.99765 * p0 + w * 0.099046;
          p1 = 0.963 * p1 + w * 0.2965164;
          p2 = 0.57 * p2 + w * 1.0526913;
          noise = (p0 + p1 + p2 + w * 0.1848) * 0.18;
        } else if (options.noise === "green") {
          lp += 0.05 * (w - lp);
          hp += 0.01 * (lp - hp);
          noise = (lp - hp) * 6;
        } else if (options.noise === "drone")
          noise =
            (Math.sin(t * 2 * Math.PI * 432) +
              Math.sin(t * 2 * Math.PI * 432.15) +
              0.4 * Math.sin(t * 2 * Math.PI * 216)) *
            0.15;
        const fade =
          options.loop === "stable"
            ? 1
            : Math.min(1, t / 2, (session.duration - t) / 5);
        const ng = options.noise === "drone" ? 0.35 : 0.09;
        view.setInt16(i * 4, pcm((l + noise * ng) * 0.85 * fade), true);
        view.setInt16(i * 4 + 2, pcm((r + noise * ng) * 0.85 * fade), true);
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
