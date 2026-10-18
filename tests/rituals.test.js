import test from "node:test";
import assert from "node:assert/strict";
import { OfflineAudioContext } from "node-web-audio-api";
import {
  ritualPlan,
  ritualAt,
  ritualPreferences,
  ritualVisual,
} from "../assets/js/rituals.js";
import {
  defaults,
  createStore,
  migratePreferences,
} from "../assets/js/store.js";
import { cycleDuration } from "../assets/js/breath.js";
import { makeSession } from "../assets/js/catalog.js";
import { SessionController } from "../assets/js/session.js";
import { AudioEngine } from "../assets/js/audio.js";
import {
  snapshotFlow,
  restoreFlow,
  validSnapshot,
} from "../assets/js/recovery.js";
import { parseBackup } from "../assets/js/data-transfer.js";
const rate = 24000;
const rms = (data, a, b) =>
  Math.sqrt(
    data.slice(a * rate, b * rate).reduce((n, v) => n + v * v, 0) /
      ((b - a) * rate),
  );
const memory = () => {
  const m = new Map();
  return {
    getItem: (k) => m.get(k),
    setItem: (k, v) => m.set(k, v),
    removeItem: (k) => m.delete(k),
    get length() {
      return m.size;
    },
    key: (i) => [...m.keys()][i],
  };
};

test("rituals preserve original sound protocols and use only complete breath cycles", () => {
  for (const pattern of ["4-6", "box", "4-7-8"])
    for (const id of ["work", "reset", "evening"]) {
      const p = { ...defaults, prelude: true, breathPattern: pattern };
      const steps = ritualPlan(id, p);
      for (const s of steps) {
        if (s.kind === "breath")
          assert.equal(s.session.duration % cycleDuration(pattern), 0);
        else
          assert.deepEqual(
            s.session,
            makeSession(
              id === "work" ? "deepFocus" : "hypnos",
              id === "work" ? 900 : 1800,
            ),
          );
        assert.notEqual(
          ritualVisual(s, { ...p, ritualVisual: "advanced" }),
          "advanced",
        );
      }
      assert.equal(steps[0].start, 0);
      if (steps.length > 1) {
        assert.equal(steps[1].start, steps[0].end);
        assert.equal(ritualAt(steps, steps[0].end).index, 1);
      }
    }
  assert.equal(ritualPlan("work", defaults).length, 1);
  assert.equal(
    ritualPlan("evening", { ...defaults, hypnosDuration: "infinity" }).at(-1)
      .end,
    Infinity,
  );
});
test("saved profiles isolate work and evening mixes and strip advanced stimulation", () => {
  const s = createStore(memory());
  s.saveRitual("evening", {
    ...defaults,
    masterVolume: 0.13,
    ritualVisual: "black",
    breathCues: true,
  });
  s.saveRitual("work", {
    ...defaults,
    masterVolume: 0.62,
    visualMode: "advanced",
    ritualVisual: "advanced",
  });
  assert.equal(s.prefs.masterVolume, defaults.masterVolume);
  assert.equal(ritualPreferences("evening", s.prefs).masterVolume, 0.13);
  assert.equal(ritualPreferences("work", s.prefs).masterVolume, 0.62);
  assert.equal(s.prefs.ritualProfiles.work.ritualVisual, "calm");
  assert.equal(s.prefs.ritualProfiles.work.visualMode, undefined);
  assert.equal(
    migratePreferences(s.prefs).ritualProfiles.evening.breathCues,
    true,
  );
});
test("ritual recovery resumes the correct stage and keeps actual time after a skip", () => {
  let now = 0;
  const p = {
    ...defaults,
    prelude: true,
    breathCues: true,
    ritualVisual: "black",
  };
  const steps = ritualPlan("work", p);
  const clock = new SessionController(() => now);
  clock.start(steps.at(-1).end);
  now = 10;
  clock.pause();
  now = 30;
  assert.equal(clock.position(), 10);
  // Skip the remaining 50 seconds, then listen for another 20.
  clock.elapsed = 60;
  clock.resume();
  now = 50;
  const f = {
    ritual: { id: "work" },
    ritualPrefs: p,
    steps,
    skipped: 50,
    session: steps[1].session,
    stage: "session",
    clock,
    audioPrefs: p,
    pattern: "4-6",
    breathSound: true,
    recoveryId: "saved-ritual",
    logId: "log-ritual",
    startedAt: 1,
    visual: "night",
    stepIndex: 1,
  };
  const saved = snapshotFlow(f, "test");
  assert.ok(validSnapshot(saved));
  const restored = restoreFlow(JSON.parse(JSON.stringify(saved)), () => now);
  assert.equal(restored.clock.status, "paused");
  assert.equal(restored.session.id, "deepFocus");
  assert.equal(restored.clock.position() - restored.skipped, 30);
  assert.equal(restored.visual, "night");
  assert.equal(restored.clock.duration, 960);
  restored.clock.resume();
  now += 10;
  assert.equal(
    ritualAt(restored.steps, restored.clock.position()).position,
    30,
  );
});
test("history export/import preserves saved ritual, mix and optional usefulness", () => {
  const s = createStore(memory());
  s.saveRitual("reset", {
    ...defaults,
    breathBackground: "pink",
    breathVolume: 0.2,
  });
  s.add({
    id: "r1",
    sessionId: "breath",
    ritualId: "reset",
    ritualPrefs: s.prefs.ritualProfiles.reset,
    audioPrefs: { ...defaults, breathBackground: "pink", breathVolume: 0.2 },
    durationSeconds: 80,
    completed: false,
    skippedSeconds: 10,
  });
  s.feedback("r1", "helpful");
  const b = parseBackup(
    JSON.stringify({ version: 5, preferences: s.prefs, history: s.history }),
  );
  assert.equal(b.history[0].usefulness, "helpful");
  assert.equal(b.history[0].audioPrefs.breathBackground, "pink");
  assert.equal(b.history[0].ritualPrefs.breathVolume, 0.2);
  assert.equal(b.preferences.ritualProfiles.reset.breathVolume, 0.2);
  assert.equal(b.history[0].skippedSeconds, 10);
});
async function renderBreath(p) {
  const a = new AudioEngine();
  a.ctx = new OfflineAudioContext(2, rate * 12, rate);
  a.playBreath("box", 16, 0, { ...defaults, ...p });
  return (await a.ctx.startRendering()).getChannelData(0);
}
test("breath guide and background can be muted independently, including held phases", async () => {
  const silent = await renderBreath({
    breathCues: false,
    breathBackground: "none",
  });
  assert.equal(rms(silent, 0, 12), 0);
  const voice = await renderBreath({
    breathCues: true,
    breathBackground: "none",
  });
  assert.ok(rms(voice, 1, 3) > 0.01);
  assert.equal(rms(voice, 5, 7), 0);
  const ambient = await renderBreath({
    breathCues: true,
    breathVolume: 0,
    breathBackground: "pink",
    breathBackgroundVolume: 0.4,
    masterVolume: 0,
  });
  assert.ok(rms(ambient, 5, 7) > 0.005);
  const muted = await renderBreath({
    breathCues: true,
    breathVolume: 0,
    breathBackground: "pink",
    breathBackgroundVolume: 0,
  });
  assert.equal(rms(muted, 0, 12), 0);
});
test("Web Audio advances from breath into focus without timers, animation or app ticks", async () => {
  const a = new AudioEngine();
  a.ctx = new OfflineAudioContext(2, rate * 14, rate);
  const steps = ritualPlan("work", { ...defaults, prelude: true });
  // Last ten seconds of the real opening followed by the original focus session.
  a.playRitual(steps, 50, {
    ...defaults,
    breathCues: false,
    noiseType: "none",
  });
  assert.equal(a.sequence.length, 2);
  assert.equal(a.sequence[1].graph.startedAt - a.graph.startedAt, 10);
  const data = (await a.ctx.startRendering()).getChannelData(0);
  assert.equal(rms(data, 0, 10), 0);
  assert.ok(rms(data, 12, 14) > 0.001);
});
test("pausing cancels even future ritual sources and resume schedules only remaining stages", async () => {
  const a = new AudioEngine();
  a.ctx = new OfflineAudioContext(2, rate * 14, rate);
  const steps = ritualPlan("work", { ...defaults, prelude: true });
  a.playRitual(steps, 50, { ...defaults, breathCues: true, noiseType: "none" });
  a.stop();
  const stopped = (await a.ctx.startRendering()).getChannelData(0);
  assert.equal(rms(stopped, 1, 14), 0);
  const b = new AudioEngine();
  b.ctx = new OfflineAudioContext(2, rate * 2, rate);
  b.playRitual(steps, 65, { ...defaults, noiseType: "none" });
  assert.equal(b.sequence.length, 1);
  const resumed = (await b.ctx.startRendering()).getChannelData(0);
  assert.ok(rms(resumed, 1, 2) > 0.001);
});

test("visual-only reset does not require audio and saved defaults respect audio-only mode", async () => {
  const { ritualAudio } = await import("../assets/js/rituals.js");
  assert.equal(
    Boolean(ritualAudio(ritualPlan("reset", defaults), defaults)),
    false,
  );
  assert.equal(ritualAudio(ritualPlan("work", defaults), defaults), true);
  assert.equal(
    ritualAudio(ritualPlan("reset", defaults), {
      ...defaults,
      breathBackground: "pink",
    }),
    true,
  );
  const p = ritualPreferences("reset", { ...defaults, audioOnly: true });
  assert.equal(p.breathVisual, false);
  assert.equal(p.ritualVisual, "none");
});
test("night completion has no rating prompt; silent breathing exposes no inactive volume control", async () => {
  const views = await import("../assets/js/views.js");
  const result = {
    id: "night",
    night: true,
    ritualId: "evening",
    durationSeconds: 1800,
  };
  const html = views.completed(result);
  assert.ok(html.includes("Spokojnej nocy"));
  assert.ok(!html.includes("usefulness"));
  assert.ok(!html.includes('data-action="rate"'));
  const step = ritualPlan("reset", defaults)[0];
  const player = views.player(
    {
      session: step.session,
      clock: { duration: 180, position: () => 0, status: "running" },
      stage: "session",
      pattern: "box",
      visual: "calm",
    },
    defaults,
  );
  assert.ok(player.includes("box-trace"));
  assert.ok(!player.includes('id="playerVolume"'));
  for (const id of ["work", "reset", "evening"]) {
    const prep = views.ritualPrepare(
      id,
      ritualPreferences(id, defaults),
      false,
      false,
    );
    assert.ok(!/undefined|NaN/.test(prep));
    assert.ok(!prep.includes('option value="advanced"'));
  }
});
