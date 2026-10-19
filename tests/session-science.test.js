import test from "node:test";
import assert from "node:assert/strict";
import { sessions } from "../assets/js/catalog.js";
import { protocols } from "../assets/js/protocols.js";
import { patterns } from "../assets/js/breath.js";
import { defaults } from "../assets/js/store.js";
import { setLanguage, esc } from "../assets/js/i18n.js";
import { prepare, ritualPrepare } from "../assets/js/views.js";
import { studies, sessionResearch, researchFor, signalFacts, signalHTML, researchHTML } from "../assets/js/session-science.js";

test("all audio protocols have bilingual selection reasons, research and a music comparison", () => {
  assert.deepEqual(Object.keys(sessionResearch).sort(), Object.keys(protocols).sort());
  for (const session of Object.values(sessions)) {
    const research = researchFor(session);
    assert.ok(research.studies.length);
    for (const lang of ["pl", "en"]) {
      assert.ok(research.choice[lang]?.trim());
      assert.ok(research.comparison[lang]?.trim());
      for (const id of research.studies) {
        assert.ok(studies[id].text[lang]?.trim(), `${session.id}: ${id}.${lang}`);
        assert.equal(new URL(studies[id].url).protocol, "https:");
        assert.ok(researchHTML(session, "4-6", lang).includes(esc(studies[id].url)));
      }
    }
  }
});

test("frequency explanations use audio differences and AM, not visual frequency or carrier pitch", () => {
  assert.deepEqual(signalFacts(sessions.hypnos).beats, [8, 1]);
  assert.deepEqual(signalFacts(sessions.deepFocus).beats, [14, 18, 14]);
  assert.deepEqual(signalFacts(sessions.gammaLift).beats, [18, 40, 12]);
  assert.deepEqual(signalFacts(sessions.gammaLift).modulation[1], { rate: 40, depth: 1 });
  assert.match(signalHTML(sessions.hypnos, "4-6", "pl"), /8 → 1 Hz/);
  assert.match(researchHTML(sessions.deepFocus, "4-6", "pl"), /210 Hz.*224 Hz.*Różnica 14 Hz/);
  assert.match(researchHTML(sessions.gammaLift, "4-6", "en"), /40 Hz \/ 100%/);
  assert.doesNotMatch(researchHTML(sessions.deepFocus, "4-6", "en"), /Additional amplitude pulses/);
  assert.match(signalHTML(sessions.presence, "4-6", "pl"), /<strong>10 Hz<\/strong>/);
});

test("breathing explanations use the selected cycle and relevant research, with no audio entrainment claim", () => {
  for (const [pattern, seconds, rate, study] of [
    ["4-6", [4, 6], 6, "slowBreath"],
    ["box", [4, 4, 4, 4], 3.75, "box"],
    ["4-7-8", [4, 7, 8], 60 / 19, "extendedExhale"],
  ]) {
    const facts = signalFacts(sessions.breath, pattern);
    assert.deepEqual(facts.phases, seconds);
    assert.equal(facts.cycles, rate);
    assert.deepEqual(researchFor(sessions.breath, pattern).studies, [study]);
    assert.doesNotMatch(researchHTML(sessions.breath, pattern, "en"), /Orozco|left ear receives/);
  }
});

test("session and ritual preparation expose the correct research in PL/EN without gating start", () => {
  const previousDocument = globalThis.document;
  globalThis.document = { documentElement: {} };
  try {
    for (const lang of ["pl", "en"]) {
      setLanguage(lang);
      for (const session of Object.values(sessions)) {
        const html = prepare(session.id, defaults, "calm", false, false);
        assert.ok(html.includes(signalHTML(session, defaults.breathPattern, lang)));
        assert.ok(html.includes(researchHTML(session, defaults.breathPattern, lang)));
        assert.ok(html.indexOf('class="start-dock"') < html.indexOf('id="setupResearch"'));
        assert.ok(!html.includes('id="setupResearch" open'));
      }
      for (const [ritual, session] of [["work", "deepFocus"], ["evening", "hypnos"]])
        assert.ok(ritualPrepare(ritual, defaults, false, false).includes(researchHTML(sessions[session], defaults.breathPattern, lang)));
      for (const pattern of Object.keys(patterns)) {
        const prefs = { ...defaults, breathPattern: pattern };
        assert.ok(ritualPrepare("reset", prefs, false, false).includes(researchHTML(sessions.breath, pattern, lang)));
      }
    }
  } finally {
    setLanguage("pl");
    if (previousDocument === undefined) delete globalThis.document;
    else globalThis.document = previousDocument;
  }
});
