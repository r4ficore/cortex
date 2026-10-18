import { fadeAt, fadeTimes } from "./signal.js";

// All times are relative to this playback's start. Resuming preserves the
// original session's fade-out and adds only a short, click-free entrance.
export function envelopePlan(duration, offset, profile) {
  const remaining = duration - offset;
  if (remaining <= 0) return [{ time: 0, value: 0 }];
  const fade = fadeTimes(duration, profile);
  const attack = offset > 0 ? Math.min(0.12, remaining / 2) : fade.in;
  const times = new Set([0, attack]);
  if (fade.in > offset) times.add(fade.in - offset);
  if (Number.isFinite(duration)) {
    if (duration - fade.out > offset) times.add(duration - fade.out - offset);
    times.add(remaining);
  }
  if (offset > 0) for (let t = 0.01; t < attack; t += 0.01) times.add(t);
  return [...times]
    .filter((t) => t >= 0 && t <= remaining)
    .sort((a, b) => a - b)
    .map((time) => ({
      time,
      value:
        fadeAt(offset + time, duration, profile) *
        (offset > 0 ? Math.min(1, time / attack) : 1),
    }));
}
export function envelopeAt(plan, time) {
  if (time <= 0) return 0;
  for (let i = 1; i < plan.length; i++) {
    const a = plan[i - 1],
      b = plan[i];
    if (time === b.time) return b.value;
    if (time < b.time)
      return (
        a.value + ((b.value - a.value) * (time - a.time)) / (b.time - a.time)
      );
  }
  return plan.at(-1)?.value ?? 0;
}
export function scheduleEnvelope(param, plan, start) {
  param.setValueAtTime(0, start);
  for (const p of plan.slice(1))
    param.linearRampToValueAtTime(p.value, start + p.time);
}
export function holdEnvelope(param, now, value) {
  if (typeof param.cancelAndHoldAtTime === "function")
    param.cancelAndHoldAtTime(now);
  else {
    param.cancelScheduledValues(now);
    // Replace a removed ramp endpoint, preserving the ramp up to this instant.
    param.linearRampToValueAtTime(value, now);
  }
  param.setValueAtTime(value, now);
}
