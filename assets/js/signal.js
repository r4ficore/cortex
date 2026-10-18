import { intensityProfiles } from "./session.js";
export const OUTPUT_HEADROOM = 0.85;
export const NOISE_GAIN = 0.16;
// AM is explicitly defined per stage; comfort settings do not change its rate.
export function modulationSpec(audio, intensity = "medium", force = false) {
  const depth = force ? 1 : (audio.am?.depth ?? 0);
  return {
    rate: force ? Math.abs(audio.r - audio.l) : (audio.am?.rate ?? 0),
    depth,
    base: 1 - depth / 2,
  };
}
export function fadeTimes(duration, profile = {}) {
  return {
    in: Math.min(profile.fadeIn ?? 3, duration / 2),
    out: Math.min(profile.fadeOut ?? 8, duration / 2),
  };
}
export function fadeAt(t, duration, profile = {}) {
  const f = fadeTimes(duration, profile);
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
