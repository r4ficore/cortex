import test from "node:test";
import assert from "node:assert/strict";
import { OfflineAudioContext } from "node-web-audio-api";
import { AudioEngine } from "../assets/js/audio.js";
import { envelopePlan, envelopeAt } from "../assets/js/envelope.js";
import { defaults, createStore } from "../assets/js/store.js";
import { backgrounds } from "../assets/js/background-catalog.js";
import { makeSession, programs } from "../assets/js/catalog.js";
import { SessionController } from "../assets/js/session.js";
import {
  snapshotFlow,
  restoreFlow,
  validSnapshot,
  audioSettings,
} from "../assets/js/recovery.js";
import { parseBackup } from "../assets/js/data-transfer.js";
import {
  practiceDuration,
  cycleDuration,
  breathAt,
} from "../assets/js/breath.js";
import { FrameMonitor, lightRecovery } from "../assets/js/stimulation.js";
import {
  exportConfig,
  exportManifest,
  wavBytes,
  MAX_BUFFERED_WAV_BYTES,
} from "../assets/js/export-config.js";
import { ScreenAwake } from "../assets/js/wake-lock.js";
const storage = () => {
  const map = new Map();
  return {
    get length() {
      return map.size;
    },
    key: (i) => [...map.keys()][i],
    getItem: (k) => map.get(k) ?? null,
    setItem: (k, v) => map.set(k, v),
    removeItem: (k) => map.delete(k),
  };
};
const rms = (data, a, b, rate = 48000) => {
  const from = Math.round(a * rate),
    to = Math.round(b * rate);
  return Math.sqrt(
    data.slice(from, to).reduce((n, x) => n + x * x, 0) / (to - from),
  );
};
test("pausing the actual audio graph holds gain during entrance, plateau and exit, with and without native hold", async () => {
  for (const fallback of [false, true])
    for (const when of [1.37, 8.13, 17.13, 19.8]) {
      const audio = new AudioEngine();
      audio.ctx = new OfflineAudioContext(2, 48000 * 21, 48000);
      const original = makeSession("deepFocus", 20);
      const session = {
        ...original,
        phases: [
          {
            ...original.phases[0],
            start: 0,
            end: 20,
            audio: { l: 220, r: 234, vol: 0.2 },
          },
        ],
      };
      audio.play(session, 0, { ...defaults, noiseType: "none" });
      if (fallback) audio.graph.envelope.gain.cancelAndHoldAtTime = undefined;
      let at;
      const suspended = audio.ctx.suspend(when).then(async () => {
        at = audio.ctx.currentTime;
        audio.stop();
        await audio.ctx.resume();
      });
      // node-web-audio-api registers suspend on its native async executor.
      // Yield before starting a much-faster-than-real-time offline render.
      await new Promise((resolve) => setTimeout(resolve, 25));
      const rendered = await audio.ctx.startRendering();
      await suspended;
      const d = rendered.getChannelData(0),
        before = rms(d, at - 0.02, at),
        after = rms(d, at, at + 0.02);
      assert.ok(
        after / before > 0.25 && after / before < 1.04,
        `${when} / fallback ${fallback}: ${after / before}`,
      );
      // Normal carrier slew is ~3% per sample; a discontinuity is much larger.
      const i = Math.round(at * 48000),
        delta = Math.abs(d[i] - d[i - 1]);
      assert.ok(
        delta < before * 0.12,
        `boundary discontinuity ${delta / before}`,
      );
      assert.ok(
        d
          .slice(Math.round((at + 0.2) * 48000))
          .every((x) => Math.abs(x) < 1e-8),
      );
    }
});
test("resume preserves remaining fade-out instead of rebuilding a louder envelope", () => {
  const p = envelopePlan(20, 17, { fadeIn: 3, fadeOut: 8 });
  assert.equal(envelopeAt(p, 0), 0);
  assert.ok(Math.abs(envelopeAt(p, 0.12) - (20 - 17.12) / 8) < 1e-6);
  assert.ok(Math.abs(envelopeAt(p, 1) - 0.25) < 1e-6);
  assert.equal(envelopeAt(p, 3), 0);
  assert.equal(envelopeAt(envelopePlan(20, 20, {}), 1), 0);
});
test("every background survives save/reload", () => {
  const memory = storage();
  for (const b of backgrounds) {
    createStore(memory).save({ noiseType: b.id });
    assert.equal(createStore(memory).prefs.noiseType, b.id);
  }
});
function flow() {
  let now = 0;
  const clock = new SessionController(() => now);
  clock.start(300);
  now = 15;
  clock.pause();
  return {
    session: makeSession("prime"),
    clock,
    recoveryId: "visit-1",
    logId: "step-1",
    pattern: "box",
    stage: "session",
    startedAt: Date.now() - 15000,
    total: 0,
    stepIndex: 0,
    visual: "advanced",
    audioPrefs: audioSettings(defaults),
    breathSound: true,
  };
}
test("checkpoint restores position paused, preserves mix, and never resumes advanced light", () => {
  const memory = storage(),
    a = createStore(memory),
    f = flow();
  a.checkpoint(snapshotFlow(f, "tab-a"));
  const b = createStore(memory),
    saved = b.checkpoints()[0];
  const restored = restoreFlow(saved, () => 99999);
  assert.equal(restored.clock.position(), 15);
  assert.equal(restored.clock.status, "paused");
  assert.equal(restored.visual, "calm");
  assert.deepEqual(restored.audioPrefs, f.audioPrefs);
  b.add({ id: saved.logId, durationSeconds: 15 });
  b.add({ id: saved.logId, durationSeconds: 15 });
  assert.equal(b.history.length, 1);
  b.clearCheckpoint(saved.id);
  assert.equal(a.getCheckpoint(saved.id), null);
  assert.equal(a.checkpoints().length, 0);
});
test("checkpoints coexist across tabs; ownership change is visible and no-storage retains in memory", () => {
  const memory = storage(),
    a = createStore(memory),
    b = createStore(memory);
  const one = snapshotFlow(flow(), "tab-a"),
    two = { ...one, id: "visit-2", logId: "step-2", owner: "tab-b" };
  a.checkpoint(one);
  b.checkpoint(two);
  assert.equal(a.checkpoints().length, 2);
  b.checkpoint({ ...one, owner: "tab-b" });
  assert.equal(a.getCheckpoint(one.id).owner, "tab-b");
  const blocked = createStore();
  blocked.checkpoint(one);
  assert.equal(blocked.getCheckpoint(one.id).position, 15);
});
test("recovery handles infinite sleep, prelude and between-program steps; rejects invalid state", () => {
  const s = snapshotFlow(flow(), "a");
  assert.equal(
    restoreFlow(
      {
        ...s,
        sessionId: "hypnos",
        duration: "Infinity",
        clockDuration: "Infinity",
      },
      () => 0,
    ).clock.duration,
    Infinity,
  );
  assert.equal(
    restoreFlow({ ...s, stage: "prelude", clockDuration: 60 }, () => 0).stage,
    "prelude",
  );
  assert.equal(
    restoreFlow(
      { ...s, stage: "between", programId: programs[0].id, stepIndex: 0 },
      () => 0,
    ).program.id,
    programs[0].id,
  );
  for (const patch of [
    { position: NaN },
    { duration: -1 },
    { sessionId: "__proto__" },
    { programId: "missing" },
    { stage: "between" },
  ])
    assert.equal(Boolean(validSnapshot({ ...s, ...patch })), false);
});
test("backup import validates before mutation, merges IDs, and strips unknown settings", () => {
  const s = createStore(storage());
  s.add({ id: "old", sessionId: "prime", durationSeconds: 10, rating: 4 });
  const backup = parseBackup(
    JSON.stringify({
      version: 4,
      history: [
        { id: "old", sessionId: "prime", durationSeconds: 20 },
        { id: "new", sessionId: "breath", durationSeconds: 64 },
      ],
      preferences: { noiseType: "green", visualMode: "advanced" },
    }),
  );
  assert.equal(s.importHistory(backup.history), 1);
  assert.equal(s.history[0].durationSeconds, 10);
  assert.equal(s.importHistory(backup.history), 0);
  assert.equal(backup.preferences.visualMode, undefined);
  for (const raw of [
    {
      version: 4,
      history: [{ id: "bad", sessionId: "prime", durationSeconds: -1 }],
    },
    { version: 99, history: [] },
    {
      version: 4,
      history: [{ id: "x", sessionId: "__proto__", durationSeconds: 3 }],
    },
  ])
    assert.throws(() => parseBackup(JSON.stringify(raw)));
});
test("all breathing presets end on a full cycle and expose the actual duration in advance", () => {
  for (const p of ["4-6", "box", "4-7-8"])
    for (const seconds of [60, 180, 300]) {
      const duration = practiceDuration(seconds, p);
      assert.equal(duration % cycleDuration(p), 0);
      assert.ok(duration >= seconds && duration < seconds + cycleDuration(p));
      assert.equal(breathAt(duration - 0.001, p).to, 0);
    }
  assert.equal(practiceDuration(180, "box"), 192);
  assert.equal(practiceDuration(60, "4-7-8"), 76);
});
test("one dropped frame remeasures and recovers while hidden light requires explicit resume", () => {
  const monitor = new FrameMonitor(),
    f = {
      lightStarted: true,
      lightStopped: false,
      lightMode: "adaptive",
      lightLimit: 20,
    };
  for (let i = 0; i < 181; i++) monitor.add((i * 1000) / 60);
  monitor.add((180 * 1000) / 60 + 34);
  assert.equal(monitor.assess(20).reason, "unstable");
  assert.equal(lightRecovery(f, monitor.assess(20).reason), true);
  monitor.reset();
  assert.equal(f.lightStopped, false);
  assert.equal(f.lightLimit, null);
  assert.equal(lightRecovery(f, "measuring"), false);
  for (let i = 0; i < 100; i++) monitor.add((i * 1000) / 60);
  assert.equal(monitor.assess(20).reason, "ready");
  lightRecovery(f, "ready");
  assert.equal(f.lightRecovering, false);
  lightRecovery(f, "hidden");
  assert.equal(f.lightStopped, true);
  lightRecovery(f, "ready");
  assert.equal(f.lightStopped, true);
});
test("all Hypnos export lengths include main phase while live Hypnos introduction stays 15 minutes", () => {
  for (const minutes of [1, 5, 15, 30, 45]) {
    const c = exportConfig(
      { id: "hypnos", minutes, loop: "standard" },
      defaults,
    );
    assert.equal(c.session.phases.length, 2);
    assert.equal(c.session.phases[1].start, minutes * 30);
    assert.equal(c.session.phases[1].audio.l, 60);
    assert.equal(c.session.phases.at(-1).end, minutes * 60);
    const stable = exportConfig(
      { id: "hypnos", minutes, loop: "stable" },
      defaults,
    );
    assert.equal(stable.session.phases[0].audio.l, 60);
  }
  for (const duration of [1800, 2700, 5400, Infinity])
    assert.equal(makeSession("hypnos", duration).phases[1].start, 900);
});
test("export manifest describes effective waveform, selected levels and storage size", () => {
  const c = exportConfig(
    {
      id: "deepFocus",
      minutes: 5,
      noise: "green",
      carrier: "110",
      entrainment: "isochronic",
      sampleRate: 24000,
    },
    { ...defaults, intensity: "low", masterVolume: 0.3 },
  );
  const m = exportManifest(c);
  assert.equal(m.durationSeconds, 300);
  assert.equal(m.background, "green");
  assert.equal(m.format.sampleRate, 24000);
  assert.equal(m.levels.masterVolume, 0.3);
  assert.equal(m.audioTimeline[0].l, 110);
  assert.equal(m.entrainment, "isochronic");
  assert.ok(wavBytes(2700, 48000) > MAX_BUFFERED_WAV_BYTES);
  assert.ok(wavBytes(1800, 24000) < MAX_BUFFERED_WAV_BYTES);
});
test("screen wake lock releases on pause, rejects gracefully, and cancels a pending request", async () => {
  let released = 0,
    count = 0;
  const api = {
    request: async () => {
      count++;
      return {
        released: false,
        release: async () => {
          released++;
        },
        addEventListener() {},
      };
    },
  };
  const wake = new ScreenAwake(api);
  await wake.setWanted(true);
  assert.equal(wake.status, "active");
  await wake.setWanted(true);
  assert.equal(count, 1);
  await wake.setWanted(false);
  assert.equal(released, 1);
  const denied = new ScreenAwake({
    request: async () => {
      throw Error("denied");
    },
  });
  await denied.setWanted(true);
  assert.equal(denied.status, "unavailable");
  let resolve;
  const pending = new ScreenAwake({
    request: () => new Promise((r) => (resolve = r)),
  });
  const start = pending.setWanted(true);
  await pending.setWanted(false);
  resolve({ release: async () => released++ });
  await start;
  assert.equal(pending.status, "inactive");
  assert.equal(pending.lock, null);
  assert.equal(released, 2);
});

test("streaming WAV waits for each write acknowledgement and emits the selected sample rate", async () => {
  const messages = [];
  globalThis.self = { postMessage: (m) => messages.push(m) };
  await import("../assets/js/export-worker.js");
  const done = self.onmessage({
    data: {
      session: makeSession("prime", 0.1),
      options: { sampleRate: 24000, noise: "none", backpressure: true },
    },
  });
  assert.equal(messages.length, 1);
  const header = new DataView(messages[0].chunk);
  assert.equal(header.getUint32(24, true), 24000);
  assert.equal(header.getUint32(40, true), 2400 * 4);
  await new Promise((r) => setTimeout(r, 10));
  assert.equal(messages.length, 1);
  self.onmessage({ data: { ack: true } });
  await new Promise((r) => setTimeout(r, 10));
  assert.equal(messages.length, 2);
  assert.equal(messages[1].chunk.byteLength, 9600);
  self.onmessage({ data: { ack: true } });
  await done;
  assert.equal(messages.at(-1).done, true);
});


test("a slow wake-lock release cannot overwrite a newer successful acquisition", async () => {
  let releaseOld;
  let requests = 0;
  const wake = new ScreenAwake({request: async () => ({
    released: false,
    release: ++requests === 1 ? () => new Promise(r => { releaseOld = r; }) : async () => {},
    addEventListener() {},
  })});
  await wake.setWanted(true);
  const releasing = wake.setWanted(false);
  await wake.setWanted(true);
  releaseOld(); await releasing;
  assert.equal(wake.status, "active");
  assert.ok(wake.lock);
});
