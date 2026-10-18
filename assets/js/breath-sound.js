import { patterns, cycleDuration } from "./breath.js";

// A procedural air sound, not a recording of a person. One bounded mono cycle
// is looped by Web Audio so phase timing never depends on animation callbacks.
export function breathSound(pattern = "4-6", rate = 48000, cycles = 1) {
  const steps = patterns[pattern] || patterns["4-6"];
  const samples = new Float32Array(
    Math.round(cycleDuration(pattern) * rate * cycles),
  );
  let cursor = 0,
    seed = 317,
    low = 0,
    high = 0,
    texture = 0;
  const random = () => {
    seed = (Math.imul(seed, 1664525) + 1013904223) >>> 0;
    return seed / 2147483648 - 1;
  };
  for (let cycle = 0; cycle < cycles; cycle++)
    for (const step of steps) {
      const length = Math.round(step.seconds * rate);
      low = high = texture = 0;
      for (let i = 0; i < length; i++) {
        if (step.phase === "hold") continue;
        const p = i / (length - 1),
          inhale = step.phase === "inhale";
        // Inhale opens softly and brightens; exhale is warmer and falls away.
        // Broad filtering avoids the pitched whistle of a resonant band-pass.
        const cutoff = inhale ? 800 + 1500 * p : 1300 - 650 * p;
        const lowAlpha = 1 - Math.exp((-2 * Math.PI * cutoff) / rate);
        const highAlpha =
          1 - Math.exp((-2 * Math.PI * (inhale ? 240 : 130)) / rate);
        const air = random();
        low += lowAlpha * (air - low);
        high += highAlpha * (low - high);
        texture +=
          (1 - Math.exp((-2 * Math.PI * 7) / rate)) * (random() - texture);
        const attack = inhale ? 0.68 : 0.22;
        const envelope =
          Math.pow(Math.sin((Math.PI * Math.min(p / attack, 1)) / 2), 1.3) *
          Math.pow(
            Math.cos((Math.PI * Math.max(0, (p - attack) / (1 - attack))) / 2),
            1.1,
          );
        samples[cursor + i] = (low - high) * envelope * (0.48 + texture * 0.5);
      }
      // Match phase RMS so an exhale remains audible without needing more volume.
      let energy = 0,
        peak = 0;
      for (let i = 0; i < length; i++) {
        const n = samples[cursor + i];
        energy += n * n;
        peak = Math.max(peak, Math.abs(n));
      }
      if (peak > 0) {
        const gain = Math.min(0.055 / Math.sqrt(energy / length), 0.32 / peak);
        for (let i = 0; i < length; i++) samples[cursor + i] *= gain;
      }
      cursor += length;
    }
  return samples;
}
