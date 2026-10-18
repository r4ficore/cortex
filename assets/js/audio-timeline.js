import { frequencies, phaseVolume } from "./session.js";
import { modulationSpec, gainForIntensity } from "./signal.js";
import { profileFor } from "./audio-profiles.js";

const fields = ["l", "r", "volume", "rate", "base", "swing"];
const interpolate = (a, b, x) =>
  Object.fromEntries(fields.map((k) => [k, a[k] + (b[k] - a[k]) * x]));
export function modulationGains(depth) {
  const base = 1 - depth / 2,
    swing = depth / 2;
  // Equal RMS for a stationary sinusoidal carrier, not equal perceived loudness.
  const norm = 1 / Math.hypot(base, swing / Math.SQRT2);
  return { base: base * norm, swing: swing * norm };
}
export function audioTimeline(session, intensity = "medium", options = {}) {
  const knots = [];
  const target = (phase, time) => {
    let [l, r] = frequencies(phase.audio);
    if (options.carrier && options.carrier !== "native") {
      const delta = r - l;
      l = Number(options.carrier);
      r = l + delta;
    }
    const mod = modulationSpec(
      phase.audio,
      intensity,
      options.entrainment === "isochronic",
    );
    return {
      l,
      r,
      volume: phaseVolume(phase, time) * gainForIntensity(intensity),
      rate: mod.rate,
      depth: mod.depth,
    };
  };
  const add = (time, p) =>
    knots.push({ time, ...p, ...modulationGains(p.depth) });
  for (const [i, phase] of session.phases.entries()) {
    const previous = session.phases[i - 1];
    if (!previous) add(phase.start, target(phase, phase.start));
    else {
      const seconds = Math.min(
        profileFor(session).transition,
        (phase.end - phase.start) / 4,
      );
      const from = target(previous, previous.end),
        to = target(phase, phase.start + seconds);
      // A raised-cosine transition, sampled at 20 Hz for Web Audio automation.
      // The same knots drive offline WAV rendering, including resume mid-glide.
      const count = Math.max(2, Math.ceil(seconds * 20));
      for (let j = 1; j <= count; j++) {
        const x = (1 - Math.cos((Math.PI * j) / count)) / 2;
        const p = Object.fromEntries(
          Object.keys(from).map((k) => [k, from[k] + (to[k] - from[k]) * x]),
        );
        add(phase.start + (seconds * j) / count, p);
      }
    }
    if (Number.isFinite(phase.end)) add(phase.end, target(phase, phase.end));
  }
  return knots;
}
export function timelineAt(knots, t) {
  if (t <= knots[0].time) return knots[0];
  let lo = 0,
    hi = knots.length - 1;
  while (lo < hi) {
    const mid = Math.ceil((lo + hi) / 2);
    if (knots[mid].time <= t) lo = mid;
    else hi = mid - 1;
  }
  const a = knots[lo],
    b = knots[lo + 1];
  return b ? interpolate(a, b, (t - a.time) / (b.time - a.time)) : a;
}
