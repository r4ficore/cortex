// Engineering limits, not a therapeutic dose. See docs/light-audio-research.md.
export const LIGHT_LIMITS = Object.freeze({
  maxHz: 40,
  samplesPerCycle: 3,
  mean: 0.18,
  maxSwing: 0.06,
  maxDiameter: 148,
});
export const supportsStimulation = (session) =>
  ["focus", "energy"].includes(session?.goal);
export function visualFrequency(phase, elapsed = phase?.start || 0) {
  const v = phase?.visual || {};
  const start = v.f ?? v.f_s ?? 0;
  const p = Number.isFinite(phase?.end)
    ? Math.max(
        0,
        Math.min(1, (elapsed - phase.start) / (phase.end - phase.start)),
      )
    : 0;
  return Math.max(
    0,
    Math.min(LIGHT_LIMITS.maxHz, start + ((v.f_e ?? start) - start) * p),
  );
}
export const maxVisualFrequency = (session) =>
  Math.max(
    0,
    ...session.phases.flatMap((p) => [
      visualFrequency(p, p.start),
      visualFrequency(p, Number.isFinite(p.end) ? p.end : p.start),
    ]),
  );
export function visualCycles(session, elapsed) {
  let cycles = 0;
  for (const p of session.phases) {
    const dt = Math.max(0, Math.min(elapsed, p.end) - p.start);
    if (!dt) continue;
    // Integral of the linear frequency ramp; f(t)*t would double its slope.
    cycles +=
      (dt * (visualFrequency(p, p.start) + visualFrequency(p, p.start + dt))) /
      2;
  }
  return cycles;
}
export const linearToSRGB = (value) =>
  value <= 0.0031308 ? 12.92 * value : 1.055 * value ** (1 / 2.4) - 0.055;
export function lightSample(cycles, swing = 0.04, fade = 1) {
  const amplitude = Math.min(LIGHT_LIMITS.maxSwing, Math.max(0, swing)) / 2;
  const luminance =
    LIGHT_LIMITS.mean +
    amplitude *
      Math.min(1, Math.max(0, fade)) *
      Math.sin(2 * Math.PI * (cycles % 1));
  return { luminance, channel: Math.round(255 * linearToSRGB(luminance)) };
}
export function assessFrames(intervals, targetHz) {
  if (intervals.length < 90) return { ok: false, reason: "measuring", fps: 0 };
  const sorted = [...intervals].sort((a, b) => a - b);
  const median = sorted[Math.floor(sorted.length / 2)];
  const p95 = sorted[Math.floor(sorted.length * 0.95)];
  const fps = 1000 / median;
  const stable = p95 <= median * 1.2 && intervals.at(-1) <= median * 1.5;
  return {
    ok: stable && fps >= targetHz * LIGHT_LIMITS.samplesPerCycle * 0.98,
    reason: !stable
      ? "unstable"
      : fps < targetHz * LIGHT_LIMITS.samplesPerCycle * 0.98
        ? "slow"
        : "ready",
    fps,
  };
}
export class FrameMonitor {
  constructor() {
    this.reset();
  }
  reset() {
    this.last = null;
    this.intervals = [];
  }
  add(timestamp) {
    if (this.last !== null) {
      const dt = timestamp - this.last;
      if (dt > 0) this.intervals.push(dt);
      if (this.intervals.length > 180) this.intervals.shift();
    }
    this.last = timestamp;
  }
  assess(hz) {
    return assessFrames(this.intervals, hz);
  }
}
