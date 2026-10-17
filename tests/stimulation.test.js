import test from "node:test";
import assert from "node:assert/strict";
import {
  assessFrames,
  FrameMonitor,
  visualFrequency,
  visualCycles,
  lightSample,
  supportsStimulation,
} from "../assets/js/stimulation.js";
import { makeSession } from "../assets/js/catalog.js";
import { breathAt } from "../assets/js/breath.js";
import { updateOrb } from "../assets/js/visual.js";
import { sessionId } from "../assets/js/platform.js";
test("legacy frequency ramps are integrated correctly, never replaced with a different frequency", () => {
  const s = makeSession("overdrive");
  assert.equal(visualFrequency(s.phases[0], 30), 27.5);
  assert.equal(visualCycles(s, 60), 1650);
  assert.equal(visualCycles(s, 61), 1690);
  assert.equal(visualFrequency(s.phases[1], 100), 40);
});
test("40 Hz is blocked at 60 fps, allowed at stable 120 fps, and blocked on dropped frames", () => {
  assert.equal(assessFrames(Array(180).fill(1000 / 60), 40).reason, "slow");
  assert.equal(assessFrames(Array(180).fill(1000 / 120), 40).ok, true);
  assert.equal(
    assessFrames([...Array(179).fill(1000 / 120), 33], 40).reason,
    "unstable",
  );
  assert.equal(
    assessFrames(Array(60).fill(1000 / 120), 40).reason,
    "measuring",
  );
  assert.equal(assessFrames(Array(180).fill(1000 / 30), 14).ok, false);
  const monitor = new FrameMonitor();
  for (let i = 0; i < 200; i++) monitor.add((i * 1000) / 60);
  assert.equal(monitor.assess(14).ok, true);
  monitor.reset();
  assert.equal(monitor.assess(14).reason, "measuring");
});
test("rendered 8-bit light stays below 0.1 relative-luminance swing, including invalid contrast requests", () => {
  const linear = (v) =>
    v <= 0.04045 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4;
  for (const swing of [0.04, 0.06, 1]) {
    const values = Array.from({ length: 1000 }, (_, i) =>
      linear(lightSample(i / 1000, swing).channel / 255),
    );
    assert.ok(Math.max(...values) - Math.min(...values) < 0.07);
    assert.ok(Math.min(...values) > 0.14);
  }
  assert.equal(supportsStimulation(makeSession("hypnos")), false);
  assert.equal(supportsStimulation(makeSession("equilibrium")), false);
  assert.equal(supportsStimulation(makeSession("prime")), true);
});
test("inhale grows visibly, exhale contracts, and reduced motion stays static", () => {
  const props = {};
  const e = {
    dataset: { goal: "breath" },
    style: { setProperty: (k, v) => (props[k] = v) },
  };
  updateOrb(e, { breath: breathAt(0) });
  const small = Number(props["--breath-scale"]);
  updateOrb(e, { breath: breathAt(4) });
  const large = Number(props["--breath-scale"]);
  assert.ok(large / small > 2);
  assert.equal(e.dataset.phase, "exhale");
  updateOrb(e, { breath: breathAt(7) });
  assert.ok(Number(props["--breath-scale"]) < large);
  updateOrb(e, { breath: breathAt(1), reduced: true });
  const fixed = props["--breath-scale"];
  updateOrb(e, { breath: breathAt(4), reduced: true });
  assert.equal(props["--breath-scale"], fixed);
});
test("LAN history IDs work without secure-context randomUUID", () => {
  const values = new Set(Array.from({ length: 1000 }, () => sessionId({})));
  assert.equal(values.size, 1000);
  assert.equal(
    typeof sessionId({
      getRandomValues: (a) => {
        a.fill(123);
        return a;
      },
    }),
    "string",
  );
});
