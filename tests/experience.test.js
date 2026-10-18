import { snapshotFlow, restoreFlow } from "../assets/js/recovery.js";
import { SessionController } from "../assets/js/session.js";
import { makeSession } from "../assets/js/catalog.js";
import test from "node:test";
import assert from "node:assert/strict";
import {
  NavigationMemory,
  recommendations,
  canonicalRoute,
  repeatSetup,
  sessionProfile,
  sessionDuration,
  latestSession,
} from "../assets/js/experience.js";
import {
  createStore,
  defaults,
  migratePreferences,
} from "../assets/js/store.js";
import { parseBackup } from "../assets/js/data-transfer.js";
import { sessions, paths } from "../assets/js/catalog.js";
import { ritualFor } from "../assets/js/rituals.js";
import * as views from "../assets/js/views.js";

test("five needs resolve directly to a playable setup; legacy links still work", () => {
  for (const path of paths) {
    const [kind, id] = recommendations[path.id].split("/");
    assert.ok(kind === "ritual" ? ritualFor(id) : sessions[id]);
    assert.equal(canonicalRoute("path/" + path.id), recommendations[path.id]);
    assert.equal(
      kind === "ritual" ? ritualFor(id).goal : sessions[id].goal,
      path.id,
    );
  }
  assert.equal(canonicalRoute("history"), "mine");
  assert.equal(recommendations.energy, "prepare/prime");
});
test("library context, filters, scroll and disclosure survive detail/back/tab navigation", () => {
  const nav = new NavigationMemory();
  nav.enter("library", true);
  nav.leave({
    scroll: 734,
    filters: { goal: "energy", duration: "short", query: "Prime" },
    focusHref: "#prepare/prime",
  });
  nav.enter("prepare/prime", true);
  assert.equal(nav.context.tab, "library");
  assert.equal(nav.context.back, "library");
  nav.leave({ details: ["setupAdjust", "Obraz i ruch"], scroll: 300 });
  const list = nav.enter(nav.context.back);
  assert.equal(list.scroll, 734);
  assert.equal(list.filters.query, "Prime");
  assert.equal(list.focusHref, "#prepare/prime");
  nav.enter("prepare/prime");
  assert.deepEqual(nav.context.details, ["setupAdjust", "Obraz i ruch"]);
  nav.enter("mine", true);
  nav.enter("prepare/prime", true);
  assert.equal(nav.context.tab, "mine");
  assert.equal(nav.context.back, "mine");
});
test("saved session migration preserves v4 data without restoring advanced light", () => {
  const map = new Map([
    [
      "cortex.preferences.v4",
      JSON.stringify({
        ...defaults,
        version: 4,
        lang: "en",
        masterVolume: 0.22,
        ritualProfiles: { work: { ...defaults, noiseType: "brown" } },
      }),
    ],
    [
      "cortex.history.v3",
      JSON.stringify([{ id: "old", sessionId: "prime", durationSeconds: 5 }]),
    ],
  ]);
  const storage = {
    getItem: (k) => map.get(k),
    setItem: (k, v) => map.set(k, v),
  };
  const first = createStore(storage);
  assert.equal(first.prefs.lang, "en");
  assert.equal(first.prefs.ritualProfiles.work.noiseType, "brown");
  first.saveSession(
    "breath",
    sessionProfile(
      {
        ...first.prefs,
        breathPattern: "box",
        breathDuration: 60,
        breathCues: true,
      },
      "advanced",
    ),
  );
  first.saveSession(
    "hypnos",
    sessionProfile({ ...first.prefs, hypnosDuration: "infinity" }, "black"),
  );
  first.saveSession("__proto__", {});
  const second = createStore(storage);
  assert.equal(second.prefs.version, 5);
  assert.equal(second.history[0].id, "old");
  assert.equal(second.prefs.sessionProfiles.breath.visual, "calm");
  assert.equal(second.prefs.sessionProfiles.breath.breathCues, true);
  assert.equal(
    sessionDuration("breath", second.prefs.sessionProfiles.breath),
    64,
  );
  assert.equal(
    sessionDuration("hypnos", second.prefs.sessionProfiles.hypnos),
    Infinity,
  );
  assert.deepEqual(Object.keys(second.prefs.sessionProfiles), [
    "breath",
    "hypnos",
  ]);
  assert.equal(second.prefs.masterVolume, 0.22);
});
test("saved standard and ritual preferences merge across tabs", () => {
  const map = new Map(),
    storage = { getItem: (k) => map.get(k), setItem: (k, v) => map.set(k, v) };
  const a = createStore(storage),
    b = createStore(storage);
  a.saveSession(
    "prime",
    sessionProfile({ ...defaults, noiseType: "pink" }, "calm"),
  );
  b.saveSession(
    "breath",
    sessionProfile({ ...defaults, breathDuration: 60 }, "calm"),
  );
  a.saveRitual("evening", {
    ...defaults,
    hypnosDuration: "90",
    ritualVisual: "black",
  });
  assert.equal(
    createStore(storage).prefs.sessionProfiles.prime.noiseType,
    "pink",
  );
  assert.equal(
    createStore(storage).prefs.sessionProfiles.breath.breathDuration,
    60,
  );
  assert.equal(
    createStore(storage).prefs.ritualProfiles.evening.hypnosDuration,
    "90",
  );
});
test("repeat restores planned duration and mix, not the prematurely ended time", () => {
  const entry = {
    id: "done",
    sessionId: "breath",
    durationSeconds: 12,
    endedAt: 20,
    pattern: "box",
    visual: "advanced",
    sessionPrefs: sessionProfile(
      {
        ...defaults,
        breathDuration: 300,
        breathPattern: "box",
        breathCues: true,
        breathVolume: 0.31,
      },
      "advanced",
    ),
  };
  const setup = repeatSetup(entry, defaults);
  assert.equal(setup.duration, 304);
  assert.equal(setup.settings.breathVolume, 0.31);
  assert.equal(setup.visual, "calm");
  assert.equal(
    latestSession([entry, { ...entry, id: "older", endedAt: 10 }]).id,
    "done",
  );
  const ritual = repeatSetup(
    {
      ...entry,
      ritualId: "evening",
      ritualPrefs: { ...defaults, hypnosDuration: "45", ritualVisual: "black" },
    },
    defaults,
  );
  assert.equal(ritual.duration, 2700);
  assert.equal(ritual.settings.ritualVisual, "black");
  assert.equal(repeatSetup({ sessionId: "missing" }, defaults), null);
});
test("v5 backup round trips session profiles and replay settings with sanitization", () => {
  const profile = sessionProfile(
    { ...defaults, breathPattern: "box", breathDuration: 60 },
    "black",
  );
  const result = parseBackup(
    JSON.stringify({
      version: 5,
      preferences: { ...defaults, sessionProfiles: { breath: profile } },
      history: [
        {
          id: "a",
          sessionId: "breath",
          durationSeconds: 9,
          sessionPrefs: profile,
        },
      ],
    }),
  );
  assert.equal(result.preferences.sessionProfiles.breath.breathPattern, "box");
  assert.equal(result.history[0].sessionPrefs.breathDuration, 60);
  assert.equal(
    migratePreferences({
      sessionProfiles: { prime: { ...profile, visual: "advanced" } },
    }).sessionProfiles.prime.visual,
    "calm",
  );
});
test("all session and ritual setup views render with a start, adjustments and alternatives", () => {
  for (const id of Object.keys(sessions)) {
    const html = views.prepare(id, defaults, "calm", false, false);
    assert.ok(html.includes('data-action="start"'), id);
    assert.ok(html.includes('id="setupAdjust"'), id);
    assert.ok(
      html.indexOf('data-action="start"') < html.indexOf('id="setupAdjust"'),
      id,
    );
    assert.ok(!html.includes("undefined"), id);
  }
  for (const id of ["work", "reset", "evening"]) {
    const html = views.ritualPrepare(id, defaults, false, false);
    assert.ok(html.includes('data-action="playRitual"'), id);
    assert.ok(!html.includes("undefined"), id);
  }
  assert.ok(
    views
      .library({ goal: "all", duration: "all", query: "" })
      .includes("#ritual/work"),
  );
  assert.equal(
    (views.nav("home", true).match(/class="nav-item"/g) || []).length,
    3,
  );
  const home = views.home(defaults);
  assert.equal((home.match(/class="need-card"/g) || []).length, 5);
  assert.ok(!home.includes("Twój moment dnia"));
});

test("recovered session keeps its planned setup for later repeat", () => {
  const clock = new SessionController(() => 10);
  clock.start(64);
  const profile = sessionProfile(
    { ...defaults, breathDuration: 60, breathPattern: "box", breathCues: true },
    "calm",
  );
  const saved = snapshotFlow(
    {
      session: makeSession("breath", 64),
      clock,
      stage: "session",
      pattern: "box",
      sessionPrefs: profile,
      audioPrefs: defaults,
      recoveryId: "recovery",
      logId: "log",
      startedAt: 1,
      visual: "calm",
    },
    "owner",
  );
  const restored = restoreFlow(saved, () => 11);
  assert.equal(restored.sessionPrefs.breathDuration, 60);
  assert.equal(restored.sessionPrefs.breathPattern, "box");
  assert.equal(sessionDuration("breath", restored.sessionPrefs), 64);
});

test("new playback and completion start at the top instead of restoring a previous result", () => {
  const nav = new NavigationMemory("complete");
  nav.leave({ scroll: 350, details: ["old-result"] });
  nav.enter("home", true);
  nav.enter("session");
  nav.leave({ scroll: 120 });
  assert.equal(nav.enter("complete").scroll, 0);
  assert.deepEqual(nav.context.details, []);
  assert.equal(nav.enter("session").scroll, 0);
});
