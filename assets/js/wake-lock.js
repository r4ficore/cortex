export class ScreenAwake {
  constructor(api, changed = () => {}) {
    this.api = api;
    this.changed = changed;
    this.wanted = false;
    this.lock = null;
    this.generation = 0;
    this.status = "inactive";
  }
  report(status) {
    this.status = status;
    this.changed(status);
  }
  async setWanted(wanted, retry = false) {
    if (wanted === this.wanted && !retry) return;
    this.wanted = wanted;
    const generation = ++this.generation;
    if (!wanted) {
      const lock = this.lock;
      this.lock = null;
      if (lock) await lock.release().catch(() => {});
      this.report("inactive");
      return;
    }
    if (this.lock && !this.lock.released) return;
    if (!this.api?.request) {
      this.report("unavailable");
      return;
    }
    this.report("pending");
    try {
      const lock = await this.api.request("screen");
      if (generation !== this.generation || !this.wanted) {
        await lock.release();
        return;
      }
      this.lock = lock;
      this.report("active");
      lock.addEventListener("release", () => {
        if (this.lock !== lock) return;
        this.lock = null;
        this.report(this.wanted ? "released" : "inactive");
      });
    } catch {
      if (generation === this.generation) this.report("unavailable");
    }
  }
}
