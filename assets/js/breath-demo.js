import { breathAt } from "./breath.js";
export class BreathDemo {
  constructor(now = () => performance.now() / 1000) {
    this.now = now;
    this.status = "idle";
    this.elapsed = 0;
    this.anchor = 0;
    this.duration = 20;
  }
  play() {
    if (this.status === "playing") return this.snapshot();
    if (this.status === "finished") this.elapsed = 0;
    this.anchor = this.now();
    this.status = "playing";
    return this.snapshot();
  }
  pause() {
    this.snapshot();
    if (this.status === "playing") {
      this.elapsed = this.position();
      this.status = "paused";
    }
    return this.snapshot();
  }
  position() {
    return Math.min(
      this.duration,
      this.elapsed +
        (this.status === "playing" ? Math.max(0, this.now() - this.anchor) : 0),
    );
  }
  snapshot(reduced = false) {
    const elapsed = this.position();
    if (elapsed >= this.duration) {
      this.elapsed = this.duration;
      this.status = "finished";
    }
    const phase = breathAt(elapsed === this.duration ? 0 : elapsed, "4-6");
    return {
      ...phase,
      status: this.status,
      elapsed,
      remaining: Math.ceil(this.duration - elapsed),
      phaseRemaining: phase.remaining,
      scale:
        reduced || ["idle", "finished"].includes(this.status)
          ? 0.82
          : 0.63 + phase.level * 0.37,
    };
  }
}
