import test from "node:test";
import assert from "node:assert/strict";
import { protocols, legacyProtocols, programs, legacyPrograms } from "../assets/js/protocols.js";
import { makeSession } from "../assets/js/catalog.js";
import { defaults } from "../assets/js/store.js";
import { restoreFlow, snapshotFlow } from "../assets/js/recovery.js";
import { SessionController } from "../assets/js/session.js";
import { reviewHTML } from "../assets/js/protocol-review.js";
import { researchHTML } from "../assets/js/session-science.js";
import { exportConfig, exportManifest } from "../assets/js/export-config.js";

test("v3 uses the published tone pairs without stacking AM and retains v2 definitions", () => {
  for (const [id, tones, duration] of [
    ["deepFocus", [255, 240], 900], ["clarity", [255, 240], 300],
    ["prime", [255, 240], 300], ["cortexForge", [255, 240], 1800],
    ["genesis", [335, 345], 600], ["overdrive", [320, 360], 300],
    ["gammaLift", [320, 360], 1980],
  ]) {
    const session = protocols[id];
    assert.equal(session.audioVersion, 3);
    assert.equal(session.duration, duration);
    for (const phase of session.phases) assert.deepEqual([phase.audio.l, phase.audio.r], tones);
    assert.equal(session.phases.at(-1).end, duration);
  }
  for (const session of Object.values(protocols))
    for (const phase of session.phases) assert.deepEqual(phase.audio.am, { rate: 0, depth: 0 });
  assert.equal(legacyProtocols.gammaLift.duration, 960);
  assert.equal(legacyProtocols.gammaLift.phases[1].audio.am.depth, 1);
});

test("Flow 90 retains ninety minutes with three work blocks and three real breaks", () => {
  const flow = programs.find(p => p.id === "flow90");
  assert.deepEqual(flow.steps.map(s => s.durationMinutes), [25, 5, 25, 5, 25, 5]);
  assert.equal(flow.steps.reduce((sum, s) => sum + s.durationMinutes, 0), 90);
  assert.ok(flow.steps.filter((s, i) => i % 2).every(s => s.sessionId === "equilibrium"));
  assert.equal(legacyPrograms[0].steps[2].durationMinutes, 55);
});

test("interrupted v2 audio and programmes resume v2, while new checkpoints resume v3", () => {
  const clock = new SessionController(() => 0);
  clock.start(960); clock.elapsed = 190; clock.status = "paused";
  const flow = { clock, session: makeSession("gammaLift", 960, 2), recoveryId: "saved", logId: "log", stage: "session", startedAt: Date.now(), audioPrefs: defaults, stepIndex: 0 };
  const old = snapshotFlow(flow, "tab");
  delete old.audioVersion; // Existing saved sessions have no revision field.
  let restored = restoreFlow(old, () => 10);
  assert.equal(restored.session.audioVersion, 2);
  assert.equal(restored.session.phases[1].audio.l, 260);
  assert.equal(restored.session.phases[1].audio.am.depth, 1);
  assert.equal(restored.clock.position(), 190);
  assert.equal(restored.clock.status, "paused");
  restored = restoreFlow({ ...old, programId: "flow90", stepIndex: 2 }, () => 10);
  assert.equal(restored.program.steps[2].durationMinutes, 55);
  const next = snapshotFlow({ ...flow, session: makeSession("gammaLift") }, "tab");
  restored = restoreFlow(next, () => 10);
  assert.equal(restored.session.audioVersion, 3);
  assert.equal(restored.session.phases[1].audio.l, 320);
  assert.equal(restored.session.phases[1].audio.am.depth, 0);
});

test("actual programme duration is shown beside study exposure without claiming dose equivalence", () => {
  const html = reviewHTML(makeSession("deepFocus", 1500), "en");
  assert.match(html, /This session: 25 min/);
  assert.match(html, /Study exposure: 5 min/);
  assert.match(researchHTML(makeSession("overdrive"), "4-6", "pl"), /Ekspozycja w badaniu: 33 min/);
  for (const id of Object.keys(protocols))
    for (const lang of ["pl", "en"]) assert.ok(reviewHTML(makeSession(id), lang).length > 100);
});

test("export metadata labels v3 and its actual rendered signal", () => {
  const manifest = exportManifest(exportConfig({ id: "gammaLift", minutes: 5 }, defaults));
  assert.equal(manifest.audioVersion, 3);
  assert.equal(manifest.durationSeconds, 300);
  assert.ok(manifest.audioTimeline.every(k => k.l === 320 && k.r === 360 && k.swing === 0));
});

test("programme preparation distinguishes its actual interval from the study exposure", async () => {
  const { prepare } = await import("../assets/js/views.js");
  const { setLanguage } = await import("../assets/js/i18n.js");
  const original = globalThis.document;
  globalThis.document = { documentElement: {} };
  try {
    setLanguage("en");
    const html = prepare("deepFocus", defaults, "calm", false, false, { program: programs.find(p => p.id === "flow90"), index: 0 });
    assert.match(html, /This session: 25 min/);
    assert.match(html, /Study exposure: 5 min/);
    assert.doesNotMatch(html, /quarter-hour|Fifteen minutes is a work interval/);
  } finally {
    setLanguage("pl");
    if (original === undefined) delete globalThis.document;
    else globalThis.document = original;
  }
});
