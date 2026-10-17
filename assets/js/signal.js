import { frequencies, intensityProfiles } from "./session.js";
export const OUTPUT_HEADROOM = 0.85;
export const NOISE_GAIN = 0.04;
export const TRANSITION_SECONDS = 0.02;
// The legacy labels had no consistent DSP implementation. v2 defines them
// explicitly, with smooth AM rather than a square-wave click train.
export function modulationSpec(audio, intensity = "medium", force = false) {
  const [l, r] = frequencies(audio, intensity);
  const depth =
    force || ["iso", "hard"].includes(audio.mod)
      ? 1
      : audio.mod === "pulse"
        ? 0.5
        : 0;
  return { rate: depth ? Math.abs(r - l) : 0, depth, base: 1 - depth / 2 };
}
export function modulationSample(cycles, depth) {
  return 1 - depth / 2 + (depth / 2) * Math.sin(2 * Math.PI * (cycles % 1));
}
export function fadeTimes(duration) {
  return { in: Math.min(1, duration / 2), out: Math.min(3, duration / 2) };
}
export function fadeAt(t, duration) {
  const f = fadeTimes(duration);
  return Math.max(0, Math.min(1, t / f.in, (duration - t) / f.out));
}
export function noiseGenerator(type, random = Math.random) {
  let brown = 0,
    b0 = 0,
    b1 = 0,
    b2 = 0,
    lp = 0,
    hp = 0;
  return (t = 0) => {
    const w = random() * 2 - 1;
    let n = 0;
    if (type === "white") n = w;
    else if (type === "brown") {
      brown = (brown + 0.02 * w) / 1.02;
      n = brown * 3.5;
    } else if (type === "pink") {
      b0 = 0.99765 * b0 + w * 0.099046;
      b1 = 0.963 * b1 + w * 0.2965164;
      b2 = 0.57 * b2 + w * 1.0526913;
      n = (b0 + b1 + b2 + w * 0.1848) * 0.18;
    } else if (type === "green") {
      lp += 0.05 * (w - lp);
      hp += 0.01 * (lp - hp);
      n = (lp - hp) * 6;
    } else if (type === "drone")
      n =
        (Math.sin(t * 2 * Math.PI * 432) +
          Math.sin(t * 2 * Math.PI * 432.15) +
          0.4 * Math.sin(t * 2 * Math.PI * 216)) *
        0.15;
    return Math.max(-1, Math.min(1, n));
  };
}
export const gainForIntensity = (intensity) =>
  (intensityProfiles[intensity] || intensityProfiles.medium).gain;
