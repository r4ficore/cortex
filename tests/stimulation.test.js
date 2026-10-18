import test from "node:test";
import assert from "node:assert/strict";
import {
  assessFrames,
  FrameMonitor,
  visualFrequency,
  visualCycles,
  lightSample,
  supportsStimulation,
  availableLightHz,
  cappedRampCycles,
} from "../assets/js/stimulation.js";
import { makeSession } from "../assets/js/catalog.js";
import { breathAt } from "../assets/js/breath.js";
import { updateOrb, fitBreathingForm } from "../assets/js/visual.js";
import { sessionId, requestPlayerFullscreen } from "../assets/js/platform.js";
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
  for (const swing of [0.04, 0.06, 0.08, 1]) {
    const values = Array.from({ length: 1000 }, (_, i) =>
      linear(lightSample(i / 1000, swing).channel / 255),
    );
    assert.ok(Math.max(...values) - Math.min(...values) < 0.085);
    assert.ok(Math.min(...values) > 0.015);
    assert.ok(Math.max(...values) < 0.11);
  }
  assert.equal(supportsStimulation(makeSession("hypnos")), false);
  assert.equal(supportsStimulation(makeSession("equilibrium")), false);
  assert.equal(supportsStimulation(makeSession("prime")), true);
});
test("explicit display adaptation uses 20 Hz at 60 fps and never labels it 40 Hz", () => {
  assert.equal(availableLightHz(60), 20);
  assert.equal(availableLightHz(59), 20);
  assert.equal(availableLightHz(30), 10);
  assert.equal(availableLightHz(120), 40);
  assert.equal(availableLightHz(144), 40);
  const s = makeSession("overdrive");
  const limit = availableLightHz(60);
  const original = visualFrequency(s.phases[1], 100);
  assert.equal(original, 40);
  assert.equal(Math.min(original, limit), 20);
  assert.equal(assessFrames(Array(180).fill(1000 / 60), Math.min(original, limit)).ok, true);
  assert.equal(assessFrames(Array(180).fill(1000 / 60), original).reason, "slow");
  assert.equal(visualCycles(s, 60, limit), 1200);
  assert.equal(visualCycles(s, 61, limit), 1220);
});
test("capped ramps integrate the plateau correctly in both directions", () => {
  assert.equal(cappedRampCycles(30, 10, 60, 20), 1050);
  assert.equal(cappedRampCycles(10, 30, 60, 20), 1050);
  assert.equal(cappedRampCycles(8, 14, 60, 20), 660);
  assert.equal(cappedRampCycles(20, 35, 60, 20), 1200);
});
test("inhale grows visibly, exhale contracts, and reduced motion stays static", () => {
  const props = {};
  const lung = { style: { setProperty: (k, v) => (props[k] = v) } };
  const e = {
    dataset: { goal: "breath" },
    style: { setProperty() {} },
    querySelector: () => lung,
  };
  const scale = () => Number(props.transform.match(/scale\(([^)]+)\)/)[1]);
  updateOrb(e, { breath: breathAt(0) });
  const small = scale();
  updateOrb(e, { breath: breathAt(4) });
  const large = scale();
  assert.ok(large / small > 2);
  assert.equal(e.dataset.phase, "exhale");
  updateOrb(e, { breath: breathAt(7) });
  assert.ok(scale() < large);
  const beforePause = props.transform;
  updateOrb(e, { breath: breathAt(7), paused: true });
  assert.equal(props.transform, beforePause);
  updateOrb(e, { breath: breathAt(1), reduced: true });
  const fixed = props.transform;
  updateOrb(e, { breath: breathAt(4), reduced: true });
  assert.equal(props.transform, fixed);
});
test("breathing fits the actual stage after mobile viewport and orientation changes", () => {
  const element = { classList: { contains: () => true }, style: {} };
  for (const [width, height] of [
    [346, 280],
    [500, 180],
    [276, 410],
    [800, 900],
  ]) {
    fitBreathingForm(
      { getBoundingClientRect: () => ({ width, height }) },
      element,
    );
    assert.equal(element.style.width, element.style.height);
    assert.ok(parseFloat(element.style.width) <= Math.min(width, height, 400));
  }
});
test("decorative movement is visible within seconds and pause does not reset its pose", () => {
  const props = {};
  const element = {
    dataset: { goal: "calm" },
    style: { setProperty: (k, v) => (props[k] = v) },
    querySelector: () => null,
  };
  updateOrb(element, { elapsed: 3 });
  const large = props.transform;
  updateOrb(element, { elapsed: 3, paused: true });
  assert.equal(props.transform, large);
  updateOrb(element, { elapsed: 9 });
  assert.notEqual(props.transform, large);
  updateOrb(element, { elapsed: 9, reduced: true });
  assert.equal(props.transform, "scale(1) rotate(0deg)");
});
test("missing or rejected fullscreen falls back without throwing; native support is retained", async () => {
  assert.equal(
    await requestPlayerFullscreen({}, { fullscreenEnabled: false }),
    false,
  );
  assert.equal(
    await requestPlayerFullscreen(
      {
        requestFullscreen: async () => {
          throw Error("Denied");
        },
      },
      { fullscreenEnabled: true },
    ),
    false,
  );
  let called = false;
  assert.equal(
    await requestPlayerFullscreen(
      {
        requestFullscreen: async () => {
          called = true;
        },
      },
      { fullscreenEnabled: true },
    ),
    true,
  );
  assert.equal(called, true);
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
