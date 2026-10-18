import test from "node:test";
import assert from "node:assert/strict";
import { AudioEngine } from "../assets/js/audio.js";
import { makeSession, sessions } from "../assets/js/catalog.js";
import { defaults } from "../assets/js/store.js";

function context() {
  const nodes = [];
  const param = () => ({
    value: 0,
    events: [],
    setValueAtTime(value, time) {
      this.events.push(["set", value, time]);
    },
    linearRampToValueAtTime(value, time) {
      this.events.push(["ramp", value, time]);
    },
    setTargetAtTime(value, time) {
      this.events.push(["target", value, time]);
    },
    cancelScheduledValues(time) {
      this.events.push(["cancel", time]);
    },
  });
  const node = (kind) => {
    const n = {
      kind,
      gain: param(),
      frequency: param(),
      pan: param(),
      connections: [],
      starts: [],
      stops: [],
      connect(to) {
        this.connections.push(to);
      },
      disconnect() {
        this.disconnected = true;
      },
      start(t) {
        this.starts.push(t);
      },
      stop(t) {
        this.stops.push(t);
      },
    };
    nodes.push(n);
    return n;
  };
  return {
    nodes,
    currentTime: 10,
    sampleRate: 48000,
    state: "running",
    destination: {},
    createGain: () => node("gain"),
    createOscillator: () => node("oscillator"),
    createStereoPanner: () => node("pan"),
    createBufferSource: () => node("buffer"),
    createBuffer: (channels, length) => ({
      getChannelData: () => new Float32Array(length),
    }),
  };
}
test("every audio session schedules its complete timeline without animation callbacks", () => {
  for (const s of Object.values(sessions).filter((s) => s.id !== "breath")) {
    const audio = new AudioEngine();
    audio.ctx = context();
    const session = makeSession(s.id);
    audio.play(session, 0, { ...defaults, noiseType: "none" });
    const oscillators = audio.ctx.nodes.filter(
      (n) =>
        n.kind === "oscillator" && n.frequency.events.some((e) => e[1] >= 60),
    );
    assert.equal(
      oscillators[0].frequency.events.filter((e) => e[0] === "set").length,
      session.phases.length,
      s.id,
    );
    assert.equal(
      oscillators[0].frequency.events[0][1],
      session.phases[0].audio.l,
      s.id,
    );
    assert.equal(
      oscillators[1].frequency.events[0][1],
      session.phases[0].audio.r,
      s.id,
    );
    assert.equal(oscillators[0].stops.at(-1), 10.04 + session.duration, s.id);
    assert.equal(audio.graph.master.gain.value, defaults.masterVolume);
  }
});
test("resuming starts at the current phase and stops after only the remaining time", () => {
  const audio = new AudioEngine();
  audio.ctx = context();
  const session = makeSession("prime");
  audio.play(session, 150, { ...defaults, noiseType: "none" });
  const oscillators = audio.ctx.nodes.filter(
    (n) =>
      n.kind === "oscillator" && n.frequency.events.some((e) => e[1] >= 60),
  );
  assert.equal(
    oscillators[0].frequency.events[0][1],
    session.phases[1].audio.l,
  );
  assert.equal(oscillators[0].frequency.events[0][2], 10.04);
  assert.ok(Math.abs(oscillators[0].stops[0] - 160.04) < 1e-9);
  audio.stop();
  assert.equal(audio.graph, null);
  assert.equal(oscillators[0].stops.at(-1), 10.15);
});
test("infinite sleep schedules no infinite AudioParam events and system interruption pauses via callback", async () => {
  const audio = new AudioEngine();
  audio.ctx = context();
  const ctx = audio.ctx;
  globalThis.Tone = {
    start: async () => {},
    getContext: () => ({ rawContext: ctx }),
  };
  await audio.unlock();
  audio.play(makeSession("hypnos", Infinity), 900, {
    ...defaults,
    noiseType: "none",
  });
  const oscillators = ctx.nodes.filter(
    (n) =>
      n.kind === "oscillator" && n.frequency.events.some((e) => e[1] >= 60),
  );
  assert.equal(oscillators[0].stops.length, 0);
  assert.ok(
    ctx.nodes.every((n) =>
      [n.gain, n.frequency].every((p) =>
        p.events.every((e) => e.slice(1).every(Number.isFinite)),
      ),
    ),
  );
  let interrupted = 0;
  audio.onInterrupted = () => interrupted++;
  ctx.state = "suspended";
  ctx.onstatechange();
  assert.equal(interrupted, 1);
  audio.graph = null;
  ctx.onstatechange();
  assert.equal(interrupted, 2); // Prelude / breathing guide also use this clock.
  delete globalThis.Tone;
});
test("blocked audio startup reports an error before a graph is created", async () => {
  const audio = new AudioEngine();
  globalThis.Tone = {
    start: async () => {
      throw new Error("NotAllowedError");
    },
  };
  await assert.rejects(audio.unlock(), /NotAllowedError/);
  assert.equal(audio.graph, null);
  delete globalThis.Tone;
  await assert.rejects(audio.unlock(), /unavailable/);
});
