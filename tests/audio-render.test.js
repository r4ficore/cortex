import test from "node:test";
import assert from "node:assert/strict";
import { OfflineAudioContext } from "node-web-audio-api";
import { AudioEngine } from "../assets/js/audio.js";
import { makeSession, sessions } from "../assets/js/catalog.js";
import { defaults } from "../assets/js/store.js";
const RATE = 48000;
async function render(session, offset = 0, prefs = {}, length = 7) {
  const a = new AudioEngine();
  a.ctx = new OfflineAudioContext(2, RATE * length, RATE);
  a.play(session, offset, { ...defaults, noiseType: "none", ...prefs });
  const buffer = await a.ctx.startRendering();
  return [0, 1].map((ch) => {
    const d = new Float32Array(buffer.length);
    buffer.copyFromChannel(d, ch);
    return d;
  });
}
function magnitude(d, hz, start = 4, seconds = 1) {
  let re = 0,
    im = 0;
  const n = RATE * seconds;
  for (let i = 0; i < n; i++) {
    const angle = (2 * Math.PI * hz * i) / RATE;
    re += d[Math.round(start * RATE) + i] * Math.cos(angle);
    im += d[Math.round(start * RATE) + i] * Math.sin(angle);
  }
  return (2 * Math.hypot(re, im)) / n;
}
test("rendered binaural channels contain their own carriers with negligible opposite-channel leakage", async () => {
  const [l, r] = await render(makeSession("prime"));
  assert.ok(magnitude(l, 220) > 0.03);
  assert.ok(magnitude(r, 228) > 0.03);
  assert.ok(magnitude(l, 228) / magnitude(l, 220) < 0.002);
  assert.ok(magnitude(r, 220) / magnitude(r, 228) < 0.002);
});
test("actual PCM contains intended AM sidebands: Clarity 16 Hz, Gamma Lift 40 Hz, Overdrive 40 Hz", async () => {
  for (const [id, offset, carrier, mod, ratio] of [
    ["clarity", 190, 220, 16, 0.5],
    ["gammaLift", 190, 260, 40, 0.5],
    ["overdrive", 70, 440, 40, 1 / 6],
  ]) {
    const [l] = await render(makeSession(id), offset);
    const centre = magnitude(l, carrier),
      upper = magnitude(l, carrier + mod),
      lower = magnitude(l, carrier - mod);
    assert.ok(
      Math.abs(upper / centre - ratio) < 0.015,
      `${id} upper ${upper / centre}`,
    );
    assert.ok(
      Math.abs(lower / centre - ratio) < 0.015,
      `${id} lower ${lower / centre}`,
    );
    assert.ok(
      magnitude(l, carrier + 2) / centre < 0.01,
      `${id} accidental 2 Hz modulation`,
    );
  }
});
test("all protocol phases remain below full scale at maximum supported levels", async () => {
  let maximum = 0;
  for (const s of Object.values(sessions).filter((s) => s.id !== "breath")) {
    const session = makeSession(s.id);
    for (const phase of session.phases) {
      const [l, r] = await render(
        session,
        phase.start,
        {
          masterVolume: 1.1,
          beatVolume: 1.2,
          noiseVolume: 1.2,
          noiseType: "white",
          intensity: "high",
        },
        3,
      );
      for (const d of [l, r])
        for (const sample of d) {
          assert.ok(Number.isFinite(sample));
          maximum = Math.max(maximum, Math.abs(sample));
        }
    }
  }
  assert.ok(maximum < 0.8, `peak ${maximum}`);
});
test("sub-second tail fades to silence without scheduling a gain rise after its end", async () => {
  const session = makeSession("prime");
  const [l] = await render(session, 299.8, {}, 1);
  assert.ok(l.slice(1000, 8000).some((x) => Math.abs(x) > 0.0001));
  assert.ok(l.slice(13000).every((x) => Math.abs(x) < 1e-8));
});
const exportMessages = [];
globalThis.self = { postMessage: (m) => exportMessages.push(m) };
await import("../assets/js/export-worker.js");
test("native WAV and live graph have matching carrier and modulation amplitudes", async () => {
  const original = makeSession("clarity").phases[1];
  const session = {
    duration: 20,
    phases: [{ ...original, start: 0, end: 20 }],
  };
  const prefs = {
    ...defaults,
    masterVolume: 0.7,
    beatVolume: 0.8,
    intensity: "medium",
    noiseType: "none",
  };
  const [live] = await render(session, 0, prefs, 20);
  exportMessages.length = 0;
  self.onmessage({
    data: {
      session,
      options: {
        entrainment: "binaural",
        carrier: "native",
        loop: "standard",
        noise: "none",
        prefs,
      },
    },
  });
  assert.equal(exportMessages.at(-1).done, true);
  const bytes = Buffer.concat(
    exportMessages.filter((m) => m.chunk).map((m) => Buffer.from(m.chunk)),
  );
  const wav = Float32Array.from(
    { length: 20 * RATE },
    (_, i) => bytes.readInt16LE(44 + i * 4) / 32768,
  );
  for (const hz of [204, 220, 236])
    assert.ok(
      Math.abs(magnitude(live, hz) - magnitude(wav, hz)) < 0.0001,
      `amplitude mismatch at ${hz} Hz`,
    );
  assert.ok(Math.abs(wav.at(-1)) < 0.0001);
});
test("WAV and live playback agree through real glides and the soundscape loop seam", async () => {
  const session = makeSession("overdrive", 40);
  const prefs = {
    ...defaults,
    masterVolume: 0.7,
    beatVolume: 0.8,
    intensity: "high",
    noiseType: "soundscape",
  };
  const [live] = await render(session, 0, prefs, 41);
  exportMessages.length = 0;
  self.onmessage({
    data: {
      session,
      options: {
        entrainment: "binaural",
        carrier: "native",
        loop: "standard",
        noise: "soundscape",
        prefs,
      },
    },
  });
  assert.equal(exportMessages.at(-1).done, true);
  const bytes = Buffer.concat(
    exportMessages.filter((m) => m.chunk).map((m) => Buffer.from(m.chunk)),
  );
  const wav = Float32Array.from(
    { length: 40 * RATE },
    (_, i) => bytes.readInt16LE(44 + i * 4) / 32768,
  );
  const energy = (d, t) => {
    let sum = 0;
    const start = Math.round(t * RATE);
    for (let i = start; i < start + RATE; i++) sum += d[i] ** 2;
    return Math.sqrt(sum / RATE);
  };
  for (const t of [4, 8, 9, 11, 15, 31, 32, 34, 37]) {
    const a = energy(live, t + 0.04),
      b = energy(wav, t);
    assert.ok(
      Math.abs(20 * Math.log10(a / b)) < 0.12,
      `${t}s: ${20 * Math.log10(a / b)} dB`,
    );
  }
});
