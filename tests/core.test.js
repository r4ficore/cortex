import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { protocols, programs as originals } from "../assets/js/protocols.js";
import {
  sessions,
  paths,
  programs,
  makeSession,
  filterSessions,
} from "../assets/js/catalog.js";
import { breathAt } from "../assets/js/breath.js";
import {
  SessionController,
  phaseAt,
  phaseVolume,
  frequencies,
} from "../assets/js/session.js";
import { createStore, migratePreferences } from "../assets/js/store.js";

import { wavHeader, pcm } from "../assets/js/wav.js";
const normalise = (o) =>
  JSON.parse(JSON.stringify(o, (_, x) => (x === Infinity ? "Infinity" : x)));
test("audio revision retains 14 IDs, timing, L/R frequencies, visuals and 5 programmes", () => {
  const baseline = JSON.parse(
    readFileSync(new URL("./protocols-baseline.json", import.meta.url)),
  );
  assert.deepEqual(
    Object.keys(protocols).sort(),
    Object.keys(baseline.sessions).sort(),
  );
  for (const [id, s] of Object.entries(protocols)) {
    const old = baseline.sessions[id];
    assert.equal(s.audioVersion, 2);
    assert.equal(normalise(s.duration), old.duration);
    assert.deepEqual(
      normalise(
        s.phases.map((p) => [p.start, p.end, p.audio.l, p.audio.r, p.visual]),
      ),
      old.phases.map((p) => [p.start, p.end, p.audio.l, p.audio.r, p.visual]),
    );
    for (const p of s.phases) {
      assert.ok(
        Number.isFinite(p.audio.vol_s) && Number.isFinite(p.audio.vol_e),
      );
      assert.ok(p.audio.am.depth >= 0 && p.audio.am.depth <= 1);
    }
  }
  assert.deepEqual(normalise(originals), baseline.programs);
  assert.equal(programs.length, 5);
});
test("five paths have a valid default and energy is separate from focus", () => {
  assert.equal(paths.length, 5);
  for (const p of paths) assert.equal(sessions[p.session].goal, p.id);
  assert.deepEqual(
    filterSessions("energy")
      .map((s) => s.id)
      .sort(),
    ["gammaLift", "overdrive", "prime"],
  );
  assert.ok(
    filterSessions("focus").every(
      (s) => !["prime", "overdrive", "gammaLift"].includes(s.id),
    ),
  );
  assert.equal(filterSessions("all", "short", "Prime")[0].id, "prime");
  assert.equal(filterSessions("all", "all", "nothing here").length, 0);
});
test("sleep duration and programme scaling do not mutate protocols", () => {
  const sleep = makeSession("hypnos", 1800);
  assert.equal(sleep.duration, 1800);
  assert.equal(sleep.phases[1].end, 1800);
  assert.equal(protocols.hypnos.duration, Infinity);
  assert.equal(makeSession("hypnos", Infinity).phases[1].end, Infinity);
  for (const p of programs)
    for (const step of p.steps) {
      const s = makeSession(step.sessionId, step.durationMinutes * 60);
      assert.equal(s.duration, step.durationMinutes * 60);
      assert.equal(s.phases.at(-1).end, s.duration);
      assert.equal(s.phases[0].start, 0);
    }
});
test("pause/resume excludes paused time, caps completion and supports infinity", () => {
  let now = 0;
  const c = new SessionController(() => now);
  c.start(60);
  now = 12.25;
  c.pause();
  now = 100;
  assert.equal(c.position(), 12.25);
  c.pause();
  assert.equal(c.position(), 12.25);
  c.resume();
  now = 105;
  assert.equal(c.position(), 17.25);
  now = 200;
  assert.equal(c.position(), 60);
  assert.equal(c.complete, true);
  c.finish();
  now = 250;
  assert.equal(c.position(), 60);
  c.start(Infinity);
  now = 300;
  assert.equal(c.position(), 50);
  assert.equal(c.complete, false);
});
test("4–6, box and 4–7–8 boundary phases and continuity", () => {
  assert.equal(breathAt(0).phase, "inhale");
  assert.equal(breathAt(4).phase, "exhale");
  assert.equal(breathAt(10).phase, "inhale");
  assert.equal(breathAt(4, "box").phase, "hold");
  assert.equal(breathAt(8, "box").phase, "exhale");
  assert.equal(breathAt(12, "box").level, 0);
  assert.equal(breathAt(11, "4-7-8").phase, "exhale");
  assert.equal(breathAt(19, "4-7-8").phase, "inhale");
  assert.ok(Math.abs(breathAt(3.999).level - breathAt(4).level) < 0.001);
  assert.equal(breathAt(-1).phase, "inhale");
  assert.equal(breathAt(0, "invalid").remaining, 4);
});
test("phase lookup, envelopes and frequency spread remain deterministic", () => {
  const s = makeSession("prime");
  assert.equal(phaseAt(s, 120), s.phases[1]);
  assert.equal(phaseVolume(s.phases[0], 60), 0.16);
  assert.deepEqual(frequencies({ l: 220, r: 234 }), [220, 234]);
  assert.deepEqual(frequencies({ l: 220, r: 234 }, "low"), [220, 234]);
});
test("legacy preferences and logs migrate without enabling advanced visuals", () => {
  const map = new Map([
    [
      "koraUserPreferences",
      JSON.stringify({
        goal: "energy",
        breathPattern: "auto",
        masterVolume: 0.85,
        preferredNoiseType: "pink",
        hypnosDuration: "infinity",
        visualMode: "advanced",
        intensityLevel: "high",
      }),
    ],
    ["kora-lang", "en"],
    [
      "koraSessionLogs",
      JSON.stringify([{ sessionId: "prime", durationSeconds: 12, endedAt: 1 }]),
    ],
  ]);
  const storage = {
      getItem: (k) => map.get(k),
      setItem: (k, v) => map.set(k, v),
    },
    s = createStore(storage);
  assert.equal(s.prefs.goal, "energy");
  assert.equal(s.prefs.lang, "en");
  assert.equal(s.prefs.masterVolume, 0.85);
  assert.equal(s.prefs.noiseType, "pink");
  assert.equal(s.prefs.hypnosDuration, "infinity");
  assert.equal(s.prefs.breathPattern, "4-6");
  assert.equal(s.prefs.visualMode, undefined);
  assert.equal(s.prefs.intensity, "high");
  s.save({ prelude: true });
  s.add({ id: "new", sessionId: "breath", durationSeconds: 60 });
  s.rate("new", 5);
  const reloaded = createStore(storage);
  assert.equal(reloaded.history.length, 2);
  assert.equal(reloaded.history[1].rating, 5);
  assert.equal(reloaded.prefs.prelude, true);
  assert.ok(map.has("koraSessionLogs"));
});
test("unavailable or corrupt storage keeps the app functional", () => {
  const broken = {
    getItem() {
      throw Error("blocked");
    },
    setItem() {
      throw Error("blocked");
    },
  };
  const s = createStore(broken);
  s.save({ masterVolume: 0.2 });
  s.add({ id: "1" });
  assert.equal(s.available, false);
  assert.equal(s.prefs.masterVolume, 0.2);
  assert.equal(s.history.length, 1);
  const p = migratePreferences({
    masterVolume: 900,
    noiseType: "bad",
    breathDuration: 999,
  });
  assert.equal(p.masterVolume, 1.1);
  assert.equal(p.noiseType, "soundscape");
  assert.equal(p.breathDuration, 180);
});
test("WAV header is stereo 16-bit PCM with a correct frame size", () => {
  const header = new DataView(wavHeader(48000));
  assert.equal(header.getUint32(40, true), 192000);
  assert.equal(header.getUint16(22, true), 2);
  assert.equal(header.getUint16(34, true), 16);
  assert.equal(pcm(2), 32767);
  assert.equal(pcm(-2), -32768);
});
test("separate tabs merge stored history and preference changes", () => {
  const map = new Map(),
    storage = { getItem: (k) => map.get(k), setItem: (k, v) => map.set(k, v) };
  const first = createStore(storage),
    second = createStore(storage);
  first.add({ id: "a", durationSeconds: 60 });
  second.add({ id: "b", durationSeconds: 120 });
  first.rate("a", 4);
  first.save({ goal: "energy" });
  second.save({ masterVolume: 0.2 });
  const final = createStore(storage);
  assert.equal(final.history.length, 2);
  assert.equal(final.history[0].rating, 4);
  assert.equal(final.prefs.goal, "energy");
  assert.equal(final.prefs.masterVolume, 0.2);
  assert.equal(createStore().available, false);
});
