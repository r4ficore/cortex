import { writeFileSync } from "node:fs";
import { OfflineAudioContext } from "node-web-audio-api";
import { AudioEngine } from "../assets/js/audio.js";
import { cycleDuration } from "../assets/js/breath.js";
const target = process.argv[2];
if (!target) throw Error("Provide the WAV output path");
const pattern = process.argv[3] || "box";
const rate = 48000,
  duration = cycleDuration(pattern) + 0.2;
const engine = new AudioEngine();
engine.ctx = new OfflineAudioContext(1, Math.ceil(rate * duration), rate);
engine.playBreath(pattern, cycleDuration(pattern), 0, { masterVolume: 0.8 });
const rendered = await engine.ctx.startRendering();
const data = new Float32Array(rendered.length);
rendered.copyFromChannel(data, 0);
const wav = Buffer.alloc(44 + data.length * 2);
wav.write("RIFF", 0);
wav.writeUInt32LE(wav.length - 8, 4);
wav.write("WAVEfmt ", 8);
wav.writeUInt32LE(16, 16);
wav.writeUInt16LE(1, 20);
wav.writeUInt16LE(1, 22);
wav.writeUInt32LE(rate, 24);
wav.writeUInt32LE(rate * 2, 28);
wav.writeUInt16LE(2, 32);
wav.writeUInt16LE(16, 34);
wav.write("data", 36);
wav.writeUInt32LE(data.length * 2, 40);
for (let i = 0; i < data.length; i++)
  wav.writeInt16LE(
    Math.round(Math.max(-1, Math.min(1, data[i])) * 32767),
    44 + i * 2,
  );
writeFileSync(target, wav);
console.log(
  `Rendered ${pattern}: ${duration}s, peak ${data.reduce((peak, value) => Math.max(peak, Math.abs(value)), 0).toFixed(3)}`,
);
