import test from "node:test";
import assert from "node:assert/strict";
import { OfflineAudioContext } from "node-web-audio-api";
import { breathAt, boxPosition, cycleDuration } from "../assets/js/breath.js";
import { breathSound } from "../assets/js/breath-sound.js";
import { AudioEngine } from "../assets/js/audio.js";
const rate = 48000;
const rms = (data, start, end) => {
  const a = Math.round(start * rate),
    b = Math.round(end * rate);
  let sum = 0;
  for (let i = a; i < b; i++) sum += data[i] ** 2;
  return Math.sqrt(sum / (b - a));
};
test("box follows four sides in breathing order, including both different holds", () => {
  assert.deepEqual(
    [0, 4, 8, 12, 16].map((t) => boxPosition(breathAt(t, "box"))),
    [
      [48, 252],
      [48, 48],
      [252, 48],
      [252, 252],
      [48, 252],
    ],
  );
  assert.deepEqual(
    [2, 6, 10, 14].map((t) => boxPosition(breathAt(t, "box"))),
    [
      [48, 150],
      [150, 48],
      [252, 150],
      [150, 252],
    ],
  );
  assert.equal(breathAt(6, "box").index, 1);
  assert.equal(breathAt(14, "box").index, 3);
  assert.equal(cycleDuration("box"), 16);
  assert.equal(cycleDuration("4-7-8"), 19);
});
test("air guide lasts throughout active phases, leaves holds silent, and fades at each boundary", () => {
  for (const pattern of ["4-6", "box", "4-7-8"]) {
    const data = breathSound(pattern, rate);
    assert.equal(data.length, cycleDuration(pattern) * rate);
    let peak = 0;
    for (const x of data) {
      assert.ok(Number.isFinite(x));
      peak = Math.max(peak, Math.abs(x));
    }
    assert.ok(peak > 0.1 && peak < 0.5, `${pattern} peak ${peak}`);
    assert.ok(rms(data, 0.5, 3.5) > 0.02);
    assert.ok(Math.abs(data[0]) < 1e-8 && Math.abs(data.at(-1)) < 1e-8);
    if (pattern === "box") {
      assert.equal(rms(data, 4, 8), 0);
      assert.equal(rms(data, 12, 16), 0);
      assert.ok(rms(data, 8.5, 11.5) > 0.02);
    } else if (pattern === "4-7-8") {
      assert.equal(rms(data, 4, 11), 0);
      assert.ok(rms(data, 11.5, 18.5) > 0.02);
    } else assert.ok(rms(data, 4.5, 9.5) > 0.02);
  }
});
async function render(pattern, duration, offset, length) {
  const a = new AudioEngine();
  a.ctx = new OfflineAudioContext(1, rate * length, rate);
  a.playBreath(pattern, duration, offset, { masterVolume: 0.7 });
  const buffer = await a.ctx.startRendering();
  const data = new Float32Array(buffer.length);
  buffer.copyFromChannel(data, 0);
  return data;
}
test("actual breath audio and square share phase boundaries without animation callbacks", async () => {
  const data = await render("box", 32, 0, 33);
  for (const shift of [0.04, 16.04]) {
    assert.ok(rms(data, shift + 0.5, shift + 3) > 0.01);
    assert.equal(rms(data, shift + 4.01, shift + 7.99), 0);
    assert.ok(rms(data, shift + 8.5, shift + 11) > 0.01);
    assert.equal(rms(data, shift + 12.01, shift + 15.99), 0);
  }
  assert.equal(rms(data, 32.1, 33), 0);
});
test("resuming inside a hold preserves remaining silence and the following exhale", async () => {
  const data = await render("box", 16, 6, 11);
  assert.equal(rms(data, 0.05, 2.03), 0);
  assert.ok(rms(data, 2.54, 5.04) > 0.01);
  assert.equal(rms(data, 6.05, 11), 0);
});
test("audio ends at a shortened session boundary, without leaving a loop running", async () => {
  const data = await render("4-6", 6, 2, 5);
  assert.ok(rms(data, 0.5, 1.5) > 0.01);
  assert.ok(rms(data, 2.5, 3.8) > 0.01);
  assert.equal(rms(data, 4.1, 5), 0);
});
