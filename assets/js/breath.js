export const patterns = {
  "4-6": [
    { phase: "inhale", seconds: 4, from: 0, to: 1 },
    { phase: "exhale", seconds: 6, from: 1, to: 0 },
  ],
  box: [
    { phase: "inhale", seconds: 4, from: 0, to: 1 },
    { phase: "hold", seconds: 4, from: 1, to: 1 },
    { phase: "exhale", seconds: 4, from: 1, to: 0 },
    { phase: "hold", seconds: 4, from: 0, to: 0 },
  ],
  "4-7-8": [
    { phase: "inhale", seconds: 4, from: 0, to: 1 },
    { phase: "hold", seconds: 7, from: 1, to: 1 },
    { phase: "exhale", seconds: 8, from: 1, to: 0 },
  ],
};
export function breathAt(seconds, pattern = "4-6") {
  const sequence = patterns[pattern] || patterns["4-6"];
  const duration = sequence.reduce((sum, p) => sum + p.seconds, 0);
  const cycle = Math.floor(Math.max(0, seconds) / duration);
  let t = Math.max(0, seconds) % duration;
  for (let i = 0; i < sequence.length; i++) {
    const step = sequence[i];
    if (t < step.seconds) {
      const progress = t / step.seconds;
      const eased = (1 - Math.cos(progress * Math.PI)) / 2;
      return {
        ...step,
        index: i,
        progress,
        level: step.from + (step.to - step.from) * eased,
        remaining: Math.ceil(step.seconds - t),
        key: `${cycle}:${i}`,
      };
    }
    t -= step.seconds;
  }
}
export function cycleDuration(pattern = "4-6") {
  return (patterns[pattern] || patterns["4-6"]).reduce(
    (sum, p) => sum + p.seconds,
    0,
  );
}
// Inhale up, hold across the top, exhale down, rest across the bottom.
export function boxPosition({ index, progress }) {
  const p = Math.max(0, Math.min(1, progress));
  return [
    [48, 252 - 204 * p],
    [48 + 204 * p, 48],
    [252, 48 + 204 * p],
    [252 - 204 * p, 252],
  ][index % 4];
}

// Display the exact duration before starting, and finish on a cycle boundary.
export function practiceDuration(seconds, pattern = "4-6") {
  const cycle = cycleDuration(pattern);
  return Math.ceil(seconds / cycle) * cycle;
}
