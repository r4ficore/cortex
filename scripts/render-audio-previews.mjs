import { writeFileSync, mkdirSync } from "node:fs";
import { join } from "node:path";
import { OfflineAudioContext } from "node-web-audio-api";
import { AudioEngine } from "../assets/js/audio.js";
import { makeSession } from "../assets/js/catalog.js";
import { defaults } from "../assets/js/store.js";
import { wavHeader, pcm } from "../assets/js/wav.js";
const directory = process.argv[2];
if (!directory) throw Error("Provide an output directory");
mkdirSync(directory, { recursive: true });
const rate = 48000;
for (const [id, file] of [
  ["deepFocus", "skupienie"],
  ["equilibrium", "wyciszenie"],
  ["hypnos", "sen"],
  ["overdrive", "energia"],
  ["breath", "oddech"],
]) {
  const duration = id === "breath" ? 16 : 20;
  const audio = new AudioEngine();
  audio.ctx = new OfflineAudioContext(
    2,
    Math.ceil((duration + 0.2) * rate),
    rate,
  );
  const prefs = { ...defaults, noiseType: "soundscape" };
  if (id === "breath") audio.playBreath("box", duration, 0, prefs);
  else {
    const s = makeSession(id),
      p = s.phases[1] || s.phases[0];
    // A stationary excerpt with fades, never a sped-up therapeutic protocol.
    audio.play(
      { ...s, duration, phases: [{ ...p, start: 0, end: duration }] },
      0,
      prefs,
    );
  }
  const rendered = await audio.ctx.startRendering();
  const out = Buffer.alloc(44 + rendered.length * 4);
  Buffer.from(wavHeader(rendered.length, rate)).copy(out);
  for (let ch = 0; ch < 2; ch++) {
    const d = rendered.getChannelData(ch);
    for (let i = 0; i < d.length; i++)
      out.writeInt16LE(pcm(d[i]), 44 + i * 4 + ch * 2);
  }
  const target = join(directory, `cortex-audio-v2-${file}.wav`);
  writeFileSync(target, out);
  console.log(target);
}
