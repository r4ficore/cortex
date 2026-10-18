// Engineering limits, not a therapeutic dose. See docs/light-audio-research.md.
export const LIGHT_LIMITS = Object.freeze({
  maxHz: 40,
  samplesPerCycle: 3,
  mean: 0.06,
  maxSwing: 0.08,
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
export function availableLightHz(fps) {
  return Math.max(
    0,
    Math.min(
      LIGHT_LIMITS.maxHz,
      Math.floor(fps / (LIGHT_LIMITS.samplesPerCycle * 0.98)),
    ),
  );
}
// Integral of a ramp clipped at the explicitly selected display ceiling.
export function cappedRampCycles(start, end, seconds, ceiling) {
  if (start <= ceiling && end <= ceiling) return (seconds * (start + end)) / 2;
  if (start >= ceiling && end >= ceiling) return seconds * ceiling;
  const crossing = (seconds * (ceiling - start)) / (end - start);
  return (
    (crossing * (Math.min(start, ceiling) + ceiling)) / 2 +
    ((seconds - crossing) * (ceiling + Math.min(end, ceiling))) / 2
  );
}
export function visualCycles(session, elapsed, ceiling = LIGHT_LIMITS.maxHz) {
  let cycles = 0;
  for (const p of session.phases) {
    const dt = Math.max(0, Math.min(elapsed, p.end) - p.start);
    if (!dt) continue;
    // Integral of the linear frequency ramp; f(t)*t would double its slope.
    cycles += cappedRampCycles(
      visualFrequency(p, p.start),
      visualFrequency(p, p.start + dt),
      dt,
      ceiling,
    );
  }
  return cycles;
}
export const linearToSRGB = (value) =>
  value <= 0.0031308 ? 12.92 * value : 1.055 * value ** (1 / 2.4) - 0.055;
export function lightSample(cycles, swing = 0.06, fade = 1) {
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
