import test from "node:test";
import assert from "node:assert/strict";
import { BreathDemo } from "../assets/js/breath-demo.js";
import {
  campaignURL,
  campaignPreferences,
  readCampaign,
  linkLanguage,
  shareCampaign,
} from "../assets/js/campaign.js";
import { defaults, createStore } from "../assets/js/store.js";
import { ritualPlan } from "../assets/js/rituals.js";
import { marketingHTML } from "../assets/js/marketing.js";

test("landing lifecycle pauses the actual demo UI on hidden tab, offscreen section and page exit", async () => {
  const elements = new Map();
  const documentEvents = new Map();
  const windowEvents = new Map();
  const frames = new Map();
  let frameId = 0,
    observer;
  for (const id of [
    "breath-demo",
    "demoToggle",
    "demoPhase",
    "demoSeconds",
    "demoStatus",
    "demoForm",
  ]) {
    elements.set(id, {
      textContent: "",
      dataset: {},
      style: { setProperty() {} },
      events: new Map(),
      addEventListener(type, callback) {
        this.events.set(type, callback);
      },
    });
  }
  const doc = {
    documentElement: { lang: "pl" },
    hidden: false,
    getElementById: (id) => elements.get(id),
    querySelectorAll: () => [],
    addEventListener: (type, callback) => documentEvents.set(type, callback),
  };
  const overrides = {
    document: doc,
    window: {
      addEventListener: (type, callback) => windowEvents.set(type, callback),
    },
    matchMedia: () => ({ matches: false, addEventListener() {} }),
    requestAnimationFrame: (callback) => {
      frames.set(++frameId, callback);
      return frameId;
    },
    cancelAnimationFrame: (id) => frames.delete(id),
    IntersectionObserver: class {
      constructor(callback) {
        observer = callback;
      }
      observe() {}
    },
  };
  overrides.window.IntersectionObserver = overrides.IntersectionObserver;
  const previous = new Map(
    Object.keys(overrides).map((key) => [
      key,
      Object.getOwnPropertyDescriptor(globalThis, key),
    ]),
  );
  try {
    for (const [key, value] of Object.entries(overrides))
      Object.defineProperty(globalThis, key, {
        configurable: true,
        writable: true,
        value,
      });
    await import("../assets/js/landing.js?lifecycle-test");
    const button = elements.get("demoToggle"),
      state = () => elements.get("breath-demo").dataset.state;
    assert.equal(state(), "idle");
    assert.equal(frames.size, 0);
    button.events.get("click")();
    assert.equal(state(), "playing");
    assert.equal(frames.size, 1);
    doc.hidden = true;
    documentEvents.get("visibilitychange")();
    assert.equal(state(), "paused");
    assert.equal(frames.size, 0);
    doc.hidden = false;
    documentEvents.get("visibilitychange")();
    assert.equal(state(), "paused");
    button.events.get("click")();
    observer([{ isIntersecting: false }]);
    assert.equal(state(), "paused");
    assert.equal(frames.size, 0);
    button.events.get("click")();
    windowEvents.get("pagehide")();
    assert.equal(state(), "paused");
    assert.equal(frames.size, 0);
  } finally {
    for (const [key, descriptor] of previous) {
      if (descriptor) Object.defineProperty(globalThis, key, descriptor);
      else delete globalThis[key];
    }
  }
});

test("demo follows two 4–6 cycles and finishes at exactly twenty seconds", () => {
  let now = 0;
  const demo = new BreathDemo(() => now);
  assert.equal(demo.snapshot().status, "idle");
  demo.play();
  for (const [time, phase, seconds] of [
    [0, "inhale", 4],
    [3.5, "inhale", 1],
    [4, "exhale", 6],
    [9.9, "exhale", 1],
    [10, "inhale", 4],
    [14, "exhale", 6],
  ]) {
    now = time;
    const view = demo.snapshot();
    assert.equal(view.phase, phase);
    assert.equal(view.phaseRemaining, seconds);
  }
  now = 20;
  assert.equal(demo.snapshot().status, "finished");
  now = 500;
  assert.equal(demo.snapshot().elapsed, 20);
  demo.play();
  assert.equal(demo.snapshot().elapsed, 0);
});
test("pause preserves phase and double start does not reset the clock", () => {
  let now = 0;
  const demo = new BreathDemo(() => now);
  demo.play();
  now = 2;
  demo.play();
  now = 3;
  demo.pause();
  now = 80;
  assert.equal(demo.snapshot().elapsed, 3);
  assert.equal(demo.snapshot().phaseRemaining, 1);
  demo.play();
  now = 82;
  assert.equal(demo.snapshot().phase, "exhale");
  assert.equal(demo.snapshot().elapsed, 5);
});
test("reduced motion keeps a static shape while phase and countdown advance", () => {
  let now = 0;
  const demo = new BreathDemo(() => now);
  demo.play();
  const scale = demo.snapshot(true).scale;
  now = 6;
  assert.equal(demo.snapshot(true).scale, scale);
  assert.equal(demo.snapshot(true).phase, "exhale");
  assert.equal(demo.snapshot(true).remaining, 14);
});
test("campaign presets override conflicting saved rhythms and durations without writing preferences", () => {
  const data = new Map();
  const storage = {
    getItem: (k) => data.get(k) || null,
    setItem: (k, v) => data.set(k, v),
    removeItem: (k) => data.delete(k),
  };
  const store = createStore(storage);
  store.save({
    ...defaults,
    masterVolume: 0.13,
    breathVolume: 0.21,
    breathPattern: "box",
    prelude: true,
    hypnosDuration: "infinity",
    ritualVisual: "advanced",
    ritualProfiles: {
      reset: { breathPattern: "4-7-8" },
      evening: { hypnosDuration: "90" },
    },
  });
  const before = JSON.stringify([...data]);
  for (const [id, ritual, seconds] of [
    ["break", "reset", 180],
    ["work", "work", 900],
    ["evening", "evening", 1800],
  ]) {
    const p = campaignPreferences(id, store.prefs),
      steps = ritualPlan(ritual, p);
    assert.equal(steps.at(-1).end, seconds);
    assert.equal(p.masterVolume, 0.13);
    assert.equal(p.breathVolume, 0.21);
    assert.equal(p.breathPattern, "4-6");
    assert.equal(p.prelude, false);
    assert.notEqual(p.ritualVisual, "advanced");
  }
  assert.equal(
    campaignPreferences("evening", store.prefs).ritualVisual,
    "black",
  );
  assert.equal(JSON.stringify([...data]), before);
});
test("campaign links preserve subpath, whitelist presets and languages, and contain no personal state", () => {
  for (const base of [
    "https://example.test/cortex/landing.html",
    "http://127.0.0.1:8781/",
  ]) {
    const url = campaignURL("break", "en", base);
    assert.equal(readCampaign(url).route, "ritual/reset");
    assert.equal(linkLanguage(url), "en");
    assert.deepEqual([...new URL(url).searchParams.keys()], ["start", "lang"]);
    assert.ok(new URL(url).pathname.endsWith("/index.html"));
  }
  for (const id of ["constructor", "__proto__", "nope"])
    assert.equal(readCampaign("https://example.test/?start=" + id), null);
  assert.equal(linkLanguage("https://example.test/?lang=evil"), null);
});
test("sharing uses only public preset URL, falls back to copy/manual, and respects cancellation", async () => {
  let sent, copied;
  const shared = await shareCampaign("work", "pl", {
    share: async (data) => {
      sent = data;
    },
  });
  assert.equal(shared.status, "shared");
  assert.deepEqual(Object.keys(sent), ["title", "url"]);
  assert.equal(
    (
      await shareCampaign("work", "pl", {
        share: async () => {
          throw Error("unsupported");
        },
        clipboard: {
          writeText: async (u) => {
            copied = u;
          },
        },
      })
    ).status,
    "copied",
  );
  assert.equal(copied, campaignURL("work"));
  assert.equal((await shareCampaign("work", "pl", {})).status, "manual");
  assert.equal(
    (
      await shareCampaign("work", "pl", {
        clipboard: {
          writeText: async () => {
            throw Error("denied");
          },
        },
      })
    ).status,
    "manual",
  );
  assert.equal(
    (
      await shareCampaign("work", "pl", {
        share: async () => {
          throw Object.assign(Error(), { name: "AbortError" });
        },
        clipboard: {
          writeText: () => assert.fail("Cancelled share must not copy"),
        },
      })
    ).status,
    "cancelled",
  );
});
test("both marketing pages ship readable HTML, correct locale metadata and all five paths without audio", () => {
  for (const lang of ["pl", "en"]) {
    const html = marketingHTML(lang);
    assert.ok(html.includes(`<html lang="${lang}">`));
    for (const goal of ["breath", "focus", "calm", "sleep", "energy"])
      assert.ok(html.includes(`data-goal="${goal}"`));
    assert.equal((html.match(/<details>/g) || []).length, 5);
    assert.ok(html.includes("og:image"));
    assert.ok(html.includes(`social/cortex-${lang}.jpg`));
    assert.ok(html.includes('hreflang="en"'));
    assert.ok(html.includes('hreflang="pl"'));
    assert.ok(html.includes("start=break"));
    assert.ok(html.includes("demoToggle"));
    assert.ok(html.includes("<noscript>"));
    assert.equal(html.includes("tone-14"), false);
    assert.equal(html.includes("bootstrap.js"), false);
  }
});
