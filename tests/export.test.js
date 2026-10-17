import test from "node:test";
import assert from "node:assert/strict";
import { makeSession } from "../assets/js/catalog.js";
const messages = [];
globalThis.self = { postMessage: (message) => messages.push(message) };
await import("../assets/js/export-worker.js");
function render(entrainment, loop = "standard", noise = "none") {
  messages.length = 0;
  self.onmessage({
    data: {
      session: makeSession("prime", 0.1),
      options: { entrainment, loop, noise, carrier: "native" },
    },
  });
  assert.equal(messages.at(-1).done, true);
  return Buffer.concat(
    messages.filter((x) => x.chunk).map((x) => Buffer.from(x.chunk)),
  );
}
test("worker produces the expected frame count, non-silent stereo and a valid WAV header", () => {
  const b = render("binaural");
  assert.equal(b.length, 44 + 4800 * 4);
  assert.equal(b.toString("ascii", 0, 4), "RIFF");
  let different = false,
    nonzero = false;
  for (let i = 44; i < b.length; i += 4) {
    different ||= b.readInt16LE(i) !== b.readInt16LE(i + 2);
    nonzero ||= b.readInt16LE(i) !== 0;
  }
  assert.equal(different, true);
  assert.equal(nonzero, true);
  assert.equal(messages.at(-2).progress, 100);
});
test("mono, modulated and steady exports keep matching channels and valid samples", () => {
  for (const type of ["monaural", "isochronic"])
    for (const noise of ["brown", "pink", "white", "green", "drone", "none"]) {
      const b = render(type, "stable", noise);
      for (let i = 44; i < b.length; i += 4)
        assert.equal(b.readInt16LE(i), b.readInt16LE(i + 2));
    }
});
test("worker refuses infinite and oversized allocations", () => {
  for (const duration of [Infinity, 46 * 60, 0, -1]) {
    messages.length = 0;
    self.onmessage({ data: { session: { duration }, options: {} } });
    assert.deepEqual(messages, [{ error: true }]);
  }
});
