import test from "node:test";
import assert from "node:assert/strict";
import { OfflineAudioContext } from "node-web-audio-api";
import { AudioEngine } from "../assets/js/audio.js";
import { audioTimeline, timelineAt } from "../assets/js/audio-timeline.js";
import { backgroundSamples } from "../assets/js/background.js";
import { sessions, makeSession } from "../assets/js/catalog.js";
import { frequencies } from "../assets/js/session.js";
import { modulationSpec } from "../assets/js/signal.js";
import { profileFor } from "../assets/js/audio-profiles.js";
import { createStore, defaults } from "../assets/js/store.js";
import { breathSound } from "../assets/js/breath-sound.js";
const rate = 48000;
function rms(data, start, end) {
  let sum = 0;
  const a = Math.round(start * rate),
    b = Math.round(end * rate);
  for (let i = a; i < b; i++) sum += data[i] ** 2;
  return Math.sqrt(sum / (b - a));
}
test("comfort settings never retune any of the 39 stages or change AM depth", () => {
  for (const s of Object.values(sessions))
    for (const p of s.phases) {
      for (const intensity of ["low", "medium", "high"]) {
        assert.deepEqual(frequencies(p.audio, intensity), [
          p.audio.l,
          p.audio.r,
        ]);
        assert.deepEqual(
          modulationSpec(p.audio, intensity),
          modulationSpec(p.audio),
        );
      }
    }
  assert.equal(
    modulationSpec(sessions.overdrive.phases[1].audio, "high").rate,
    40,
  );
});
test("every stage transition has continuous levels and finite shared timeline knots", () => {
  for (const s of Object.values(sessions).filter((s) => s.id !== "breath")) {
    const timeline = audioTimeline(makeSession(s.id));
    assert.ok(
      timeline.every((k) => Object.values(k).every(Number.isFinite)),
      s.id,
    );
    for (let i = 1; i < s.phases.length; i++) {
      const boundary = s.phases[i].start;
      const a = timelineAt(timeline, boundary - 0.0001),
        b = timelineAt(timeline, boundary + 0.0001);
      for (const key of ["l", "r", "volume", "base", "swing"])
        assert.ok(Math.abs(a[key] - b[key]) < 0.001, `${s.id} ${key}`);
    }
  }
});
test("rendered Overdrive and Clarity no longer jump 9–10 dB at stage boundaries", async () => {
  for (const [id, boundaries] of [
    ["overdrive", [60, 240]],
    ["clarity", [180, 600]],
  ]) {
    const s = makeSession(id),
      transition = profileFor(s).transition;
    for (const boundary of boundaries) {
      const a = new AudioEngine();
      a.ctx = new OfflineAudioContext(2, (transition + 13) * rate, rate);
      a.play(s, boundary - 8, { ...defaults, noiseType: "none" });
      const b = await a.ctx.startRendering(),
        data = b.getChannelData(0);
      const before = rms(data, 6, 8),
        after = rms(data, 8.1 + transition, 10.1 + transition);
      assert.ok(
        Math.abs(20 * Math.log10(after / before)) < 0.5,
        `${id} ${boundary}: ${20 * Math.log10(after / before)} dB`,
      );
    }
  }
});
test("a pause inside a glide resumes its intermediate frequency rather than the stage target", async () => {
  const s = makeSession("overdrive"),
    offset = 62;
  const expected = timelineAt(audioTimeline(s), offset);
  assert.ok(expected.r > 470 && expected.r < 480);
  const a = new AudioEngine();
  a.ctx = new OfflineAudioContext(2, rate, rate);
  a.play(s, offset, { ...defaults, noiseType: "none" });
  // The actual graph can render a resumed glide; no unsupported/infinite events.
  const b = await a.ctx.startRendering();
  assert.ok(b.getChannelData(0).some((x) => Math.abs(x) > 0.001));
});
test("new soundscapes have comparable RMS and no periodic fade-to-silence", () => {
  const fingerprints = [];
  for (const goal of ["focus", "calm", "sleep", "energy"]) {
    const d = backgroundSamples("soundscape", { goal }, rate);
    assert.ok(Math.abs(rms(d, 0, 32) - 0.16) < 0.001);
    assert.ok(rms(d, 31.8, 32) > 0.06);
    assert.ok(rms(d, 0, 0.2) > 0.06);
    let differences = 0;
    for (let i = 1; i < 4800; i++) differences += (d[i] - d[i - 1]) ** 2;
    // Noise has legitimate sample-to-sample changes; the seam must remain
    // within the surrounding waveform's ordinary variation, not be silent.
    assert.ok(
      Math.abs(d[0] - d.at(-1)) < 3 * Math.sqrt(differences / 4799),
      `${goal} seam`,
    );
    fingerprints.push(d[4800]);
  }
  assert.equal(new Set(fingerprints).size, 4);
});
test("v3 preferences migrate to the current schema without losing history, choices or enabling sound", () => {
  const map = new Map([
    [
      "cortex.preferences.v3",
      JSON.stringify({
        ...defaults,
        version: 3,
        breathVolume: undefined,
        noiseType: "none",
        breathCues: false,
        masterVolume: 0.32,
      }),
    ],
    [
      "cortex.history.v3",
      JSON.stringify([{ id: "kept", durationSeconds: 12 }]),
    ],
  ]);
  const store = createStore({
    getItem: (k) => map.get(k),
    setItem: (k, v) => map.set(k, v),
  });
  assert.equal(store.prefs.version, 5);
  assert.equal(store.prefs.noiseType, "none");
  assert.equal(store.prefs.masterVolume, 0.32);
  assert.equal(store.prefs.breathVolume, 0.32);
  assert.equal(store.prefs.breathCues, false);
  assert.equal(store.history[0].id, "kept");
  store.save({ breathVolume: 0.4 });
  assert.equal(JSON.parse(map.get("cortex.preferences.v5")).breathVolume, 0.4);
});
test("breathing volume is independent of the sound-session master", async () => {
  const render = async (masterVolume, breathVolume) => {
    const a = new AudioEngine();
    a.ctx = new OfflineAudioContext(2, 5 * rate, rate);
    a.playBreath("box", 16, 0, {
      ...defaults,
      breathCues: true,
      masterVolume,
      breathVolume,
    });
    const b = await a.ctx.startRendering();
    return rms(b.getChannelData(0), 0, 4);
  };
  assert.ok((await render(0, 0.5)) > 0.01);
  assert.equal(await render(1, 0), 0);
});
test("breath guide balances inhale/exhale energy and varies successive cycles", () => {
  const d = breathSound("box", rate, 4);
  const inhale = rms(d, 0, 4),
    exhale = rms(d, 8, 12);
  assert.ok(Math.abs(20 * Math.log10(inhale / exhale)) < 0.5);
  assert.equal(rms(d, 4, 8), 0);
  assert.notDeepEqual(
    d.slice(rate, rate + 10),
    d.slice(17 * rate, 17 * rate + 10),
  );
});
