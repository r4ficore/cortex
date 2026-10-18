import { OfflineAudioContext } from "node-web-audio-api";
import { AudioEngine } from "../assets/js/audio.js";
import { makeSession, sessions } from "../assets/js/catalog.js";
import { defaults } from "../assets/js/store.js";
import { modulationSpec } from "../assets/js/signal.js";
import { writeFileSync } from "node:fs";
const rate = 48000;
const magnitude = (d, hz) => {
  let re = 0,
    im = 0;
  for (let i = 0; i < rate; i++) {
    const a = (2 * Math.PI * hz * i) / rate;
    re += d[rate * 5 + i] * Math.cos(a);
    im += d[rate * 5 + i] * Math.sin(a);
  }
  return (2 * Math.hypot(re, im)) / rate;
};
const rows = [];
for (const s of Object.values(sessions).filter((s) => s.id !== "breath")) {
  for (const [index, p] of s.phases.entries()) {
    const volume = Math.max(
      p.audio.vol ?? 0,
      p.audio.vol_s ?? 0,
      p.audio.vol_e ?? 0,
    );
    const session = {
      ...s,
      duration: 60,
      phases: [{ ...p, start: 0, end: 60, audio: { ...p.audio, vol: volume } }],
    };
    const a = new AudioEngine();
    a.ctx = new OfflineAudioContext(2, rate * 8, rate);
    a.play(session, 0, {
      ...defaults,
      masterVolume: 1.1,
      beatVolume: 1.2,
      noiseVolume: 1.2,
      noiseType: "white",
      intensity: "high",
    });
    const rendered = await a.ctx.startRendering();
    let peak = 0,
      energy = 0,
      count = 0;
    for (let ch = 0; ch < 2; ch++) {
      const d = new Float32Array(rendered.length);
      rendered.copyFromChannel(d, ch);
      for (const v of d) {
        peak = Math.max(peak, Math.abs(v));
        energy += v * v;
        count++;
      }
    }
    rows.push({
      session: s.id,
      stage: index + 1,
      l: p.audio.l,
      r: p.audio.r,
      modulation: modulationSpec(p.audio, "high"),
      intensity: "high",
      volume,
      peak,
      peakDbFS: 20 * Math.log10(peak),
      rms: Math.sqrt(energy / count),
    });
  }
}
const probes = [];
for (const [id, offset, carrier, mod] of [
  ["clarity", 190, 220, 16],
  ["gammaLift", 190, 260, 40],
  ["overdrive", 70, 440, 40],
]) {
  const a = new AudioEngine();
  a.ctx = new OfflineAudioContext(2, rate * 8, rate);
  a.play(makeSession(id), offset, { ...defaults, noiseType: "none" });
  const b = await a.ctx.startRendering(),
    d = new Float32Array(b.length);
  b.copyFromChannel(d, 0);
  const center = magnitude(d, carrier);
  probes.push({
    session: id,
    carrier,
    amHz: mod,
    carrierAmplitude: center,
    lowerRatio: magnitude(d, carrier - mod) / center,
    upperRatio: magnitude(d, carrier + mod) / center,
    unwanted2HzRatio: magnitude(d, carrier + 2) / center,
  });
}
const result = {
  engine:
    "node-web-audio-api OfflineAudioContext (not physical output or Safari)",
  audioVersion: 2,
  scope:
    "Each stage rendered at its maximum defined level for 8 seconds, maximum sliders, high intensity, normalized white background. Not a physical headphone measurement.",
  sampleRate: rate,
  phaseCount: rows.length,
  maxPeak: Math.max(...rows.map((r) => r.peak)),
  probes,
  phases: rows,
};
const destination = process.argv[2] || "audio-audit.json";
writeFileSync(destination, JSON.stringify(result, null, 2) + "\n");
console.log(
  JSON.stringify(
    {
      phaseCount: result.phaseCount,
      maxPeak: result.maxPeak,
      peakDbFS: 20 * Math.log10(result.maxPeak),
      probes,
    },
    null,
    2,
  ),
);
