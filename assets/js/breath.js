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
        progress,
        level: step.from + (step.to - step.from) * eased,
        remaining: Math.ceil(step.seconds - t),
        key: `${cycle}:${i}`,
      };
    }
    t -= step.seconds;
  }
}
