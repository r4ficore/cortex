import { noiseGenerator } from "./signal.js";
import { profileFor } from "./audio-profiles.js";

export const BACKGROUND_SECONDS = 32;
export function backgroundSamples(type, session, rate = 48000) {
  const frames = Math.round(BACKGROUND_SECONDS * rate),
    overlap = Math.round(2 * rate);
  if (type === "none") return new Float32Array(frames);
  const profile = profileFor(session),
    scene = type === "soundscape";
  let seed = 14983;
  const random = () => {
    seed = (Math.imul(seed, 1664525) + 1013904223) >>> 0;
    return seed / 4294967296;
  };
  const noise = noiseGenerator(scene ? profile.texture : type, random);
  const raw = Float32Array.from({ length: frames + overlap }, (_, i) =>
    noise(i / rate),
  );
  const out = new Float32Array(frames);
  for (let i = 0; i < frames; i++) {
    let n = raw[i + overlap];
    if (i >= frames - overlap) {
      const j = i - (frames - overlap),
        x = j / overlap;
      n =
        n * Math.cos((x * Math.PI) / 2) + raw[j] * Math.sin((x * Math.PI) / 2);
    }
    if (scene) {
      const t = i / rate;
      // Integer bins make the quiet harmonic bed periodic without a silent seam.
      // Chords are aesthetic choices, not additional entrainment frequencies.
      const f = profile.root;
      const tone =
        Math.sin(2 * Math.PI * f * t) +
        0.28 *
          Math.sin(((2 * Math.PI * Math.round(f * 1.5 * 32)) / 32) * t + 0.6) +
        0.12 * Math.sin(2 * Math.PI * f * 2 * t + 1.3);
      const motion =
        1 -
        profile.movement +
        profile.movement * Math.cos((2 * Math.PI * t) / 32);
      n = 0.18 * tone * motion + 0.16 * n;
    }
    out[i] = n;
  }
  let energy = 0,
    peak = 0;
  for (const n of out) {
    energy += n * n;
    peak = Math.max(peak, Math.abs(n));
  }
  // Similar background RMS across choices, with a bounded crest factor.
  const gain = Math.min(0.16 / Math.sqrt(energy / frames), 0.8 / peak);
  for (let i = 0; i < frames; i++) out[i] *= gain;
  return out;
}
