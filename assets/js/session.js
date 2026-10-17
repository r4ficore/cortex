export class SessionController {
  constructor(now = () => performance.now() / 1000) {
    this.now = now;
    this.status = "idle";
    this.elapsed = 0;
    this.anchor = 0;
    this.duration = 0;
  }
  start(duration) {
    this.duration = duration;
    this.elapsed = 0;
    this.anchor = this.now();
    this.status = "running";
  }
  position() {
    return Math.min(
      this.duration,
      this.elapsed +
        (this.status === "running" ? Math.max(0, this.now() - this.anchor) : 0),
    );
  }
  pause() {
    if (this.status !== "running") return;
    this.elapsed = this.position();
    this.status = "paused";
  }
  resume() {
    if (this.status !== "paused") return;
    this.anchor = this.now();
    this.status = "running";
  }
  finish() {
    this.elapsed = this.position();
    this.status = "completed";
  }
  reset() {
    this.status = "idle";
    this.elapsed = 0;
  }
  get complete() {
    return Number.isFinite(this.duration) && this.position() >= this.duration;
  }
}
export function phaseAt(session, elapsed) {
  return (
    session.phases.find((p) => elapsed >= p.start && elapsed < p.end) ||
    session.phases.at(-1)
  );
}
export function phaseVolume(phase, elapsed) {
  const a = phase?.audio || {};
  if (a.vol !== undefined) return a.vol;
  const progress = Number.isFinite(phase?.end)
    ? Math.max(
        0,
        Math.min(1, (elapsed - phase.start) / (phase.end - phase.start)),
      )
    : 0;
  return a.vol_s !== undefined ? a.vol_s + (a.vol_e - a.vol_s) * progress : 0.2;
}
export const intensityProfiles = {
  low: { gain: 0.6, delta: 0.9 },
  medium: { gain: 1, delta: 1 },
  high: { gain: 1.3, delta: 1.1 },
};
export function frequencies(audio, intensity = "medium") {
  const { delta } = intensityProfiles[intensity] || intensityProfiles.medium;
  const mid = (audio.l + audio.r) / 2,
    diff = ((audio.r - audio.l) / 2) * delta;
  return [mid - diff, mid + diff];
}
