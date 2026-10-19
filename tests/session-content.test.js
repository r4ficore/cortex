import test from "node:test";
import assert from "node:assert/strict";
import { sessions, programs, filterSessions } from "../assets/js/catalog.js";
import { protocols } from "../assets/js/protocols.js";
import { breathingCopy } from "../assets/js/session-content.js";
import { patterns } from "../assets/js/breath.js";
import { defaults } from "../assets/js/store.js";
import { setLanguage, esc } from "../assets/js/i18n.js";
import { prepare, ritualPrepare, programView } from "../assets/js/views.js";

test("every protocol has bilingual purpose and guidance without overriding its signal", () => {
  assert.deepEqual(Object.keys(sessions).sort(), [...Object.keys(protocols), "breath"].sort());
  for (const [id, session] of Object.entries(sessions)) {
    for (const field of ["title", "description", "benefit", "how", "practice"])
      for (const lang of ["pl", "en"])
        assert.ok(session[field]?.[lang]?.trim(), `${id}.${field}.${lang}`);
    if (protocols[id]) {
      assert.deepEqual(session.phases, protocols[id].phases, id);
      assert.equal(session.duration, protocols[id].duration, id);
    }
  }
  assert.deepEqual(Object.keys(breathingCopy).sort(), Object.keys(patterns).sort());
});

test("selected breathing guidance follows the pattern in both standalone and ritual setup, in PL/EN", () => {
  const previousDocument = globalThis.document;
  globalThis.document = { documentElement: {} };
  try {
    for (const lang of ["pl", "en"]) {
      setLanguage(lang);
      for (const pattern of Object.keys(patterns)) {
        const prefs = { ...defaults, breathPattern: pattern };
        for (const html of [prepare("breath", prefs, "calm", false, false), ritualPrepare("reset", prefs, false, false)]) {
          assert.ok(html.includes(esc(breathingCopy[pattern].how[lang])));
          assert.ok(html.includes(esc(breathingCopy[pattern].practice[lang])));
          for (const other of Object.keys(patterns).filter((p) => p !== pattern))
            assert.ok(!html.includes(esc(breathingCopy[other].how[lang])));
          assert.ok(html.indexOf('class="start-dock"') < html.indexOf('id="setupAbout"'));
        }
      }
      for (const [ritual, session] of [["work", "deepFocus"], ["evening", "hypnos"]])
        assert.ok(ritualPrepare(ritual, defaults, false, false).includes(esc(sessions[session].how[lang])));
      for (const program of programs)
        assert.ok(programView(program.id, false).includes(program.description[lang]));
    }
  } finally {
    setLanguage("pl");
    if (previousDocument === undefined) delete globalThis.document;
    else globalThis.document = previousDocument;
  }
});

test("library finds sessions by a practical need while respecting path filters", () => {
  assert.ok(filterSessions("focus", "all", "notatnikiem", "pl").some((s) => s.id === "clarity"));
  assert.ok(filterSessions("focus", "all", "brainstorming", "en").some((s) => s.id === "genesis"));
  assert.equal(filterSessions("energy", "all", "brainstorming", "en").length, 0);
});
