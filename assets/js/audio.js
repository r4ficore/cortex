import {
  fadeTimes,
  OUTPUT_HEADROOM,
  NOISE_GAIN,
  gainForIntensity,
} from "./signal.js";
import { audioTimeline, timelineAt } from "./audio-timeline.js";
import { profileFor } from "./audio-profiles.js";
import { backgroundSamples } from "./background.js";
import { breathSound } from "./breath-sound.js";
export class AudioEngine {
  constructor() {
    this.ctx = null;
    this.graph = null;
    this.breathBuffers = new Map();
    this.backgroundBuffers = new Map();
    this.onInterrupted = () => {};
  }
  async unlock() {
    if (!globalThis.Tone) throw new Error("Audio engine unavailable");
    await Tone.start();
    this.ctx = Tone.getContext().rawContext;
    if (this.ctx.state !== "running") await this.ctx.resume();
    if (this.ctx.state !== "running") throw new Error("Audio unavailable");
    this.ctx.onstatechange = () => {
      if (this.ctx.state !== "running") this.onInterrupted();
    };
  }
  now() {
    return this.ctx?.currentTime ?? performance.now() / 1000;
  }
  async start(session, offset, prefs) {
    await this.unlock();
    this.play(session, offset, prefs);
  }
  play(session, offset, prefs) {
    this.stop();
    const c = this.ctx;
    // Build before taking the start timestamp: buffer generation must not put
    // scheduled audio in the past on mobile devices.
    const buffer =
      prefs.noiseType === "none"
        ? null
        : this.background(prefs.noiseType, session);
    const timeline = audioTimeline(session);
    const now = c.currentTime + 0.04;
    const nodes = [],
      sources = [];
    const node = (n) => (nodes.push(n), n);
    const master = node(c.createGain()),
      envelope = node(c.createGain()),
      balance = node(c.createGain()),
      volume = node(c.createGain()),
      pulse = node(c.createGain()),
      output = node(c.createGain()),
      lfo = node(c.createOscillator()),
      depth = node(c.createGain());
    output.gain.value = OUTPUT_HEADROOM;
    lfo.connect(depth);
    depth.connect(pulse.gain);
    master.gain.value = prefs.masterVolume;
    balance.gain.value = prefs.beatVolume * gainForIntensity(prefs.intensity);
    const remaining = session.duration - offset;
    const fade = fadeTimes(remaining, profileFor(session));
    envelope.gain.setValueAtTime(0, now);
    envelope.gain.linearRampToValueAtTime(1, now + fade.in);
    volume.connect(balance);
    balance.connect(pulse);
    pulse.connect(envelope);
    envelope.connect(master);
    master.connect(output);
    output.connect(c.destination);
    const l = node(c.createOscillator()),
      r = node(c.createOscillator()),
      pl = node(c.createStereoPanner()),
      pr = node(c.createStereoPanner());
    pl.pan.value = -1;
    pr.pan.value = 1;
    l.connect(pl);
    r.connect(pr);
    pl.connect(volume);
    pr.connect(volume);
    const params = {
      l: l.frequency,
      r: r.frequency,
      volume: volume.gain,
      rate: lfo.frequency,
      base: pulse.gain,
      swing: depth.gain,
    };
    const initial = timelineAt(timeline, offset);
    for (const [key, param] of Object.entries(params))
      param.setValueAtTime(initial[key], now);
    for (const knot of timeline) {
      if (knot.time <= offset) continue;
      for (const [key, param] of Object.entries(params))
        param.linearRampToValueAtTime(knot[key], now + knot.time - offset);
    }
    const noiseGain = node(c.createGain());
    noiseGain.gain.value = prefs.noiseVolume * NOISE_GAIN;
    noiseGain.connect(envelope);
    if (buffer) {
      const noise = node(c.createBufferSource());
      noise.buffer = buffer;
      noise.loop = true;
      noise.connect(noiseGain);
      noise.start(now, offset % buffer.duration);
      sources.push(noise);
    }
    for (const oscillator of [l, r, lfo]) {
      oscillator.start(now);
      sources.push(oscillator);
    }
    if (Number.isFinite(session.duration)) {
      const end = now + remaining;
      envelope.gain.setValueAtTime(1, Math.max(now + fade.in, end - fade.out));
      envelope.gain.linearRampToValueAtTime(0, end);
      sources.forEach((source) => source.stop(end));
    }
    this.graph = {
      nodes,
      sources,
      master,
      balance,
      noiseGain,
      envelope,
      startedAt: now,
      kind: "session",
    };
  }
  background(type, session) {
    const c = this.ctx,
      key = `${c.sampleRate}:${type}:${type === "soundscape" ? session.soundProfile || session.goal : ""}`;
    if (!this.backgroundBuffers.has(key)) {
      const data = backgroundSamples(type, session, c.sampleRate);
      const buffer = c.createBuffer(1, data.length, c.sampleRate);
      buffer.copyToChannel(data, 0);
      if (this.backgroundBuffers.size >= 4)
        this.backgroundBuffers.delete(
          this.backgroundBuffers.keys().next().value,
        );
      this.backgroundBuffers.set(key, buffer);
    }
    return this.backgroundBuffers.get(key);
  }
  playBreath(pattern, duration, offset, prefs) {
    this.stop();
    const c = this.ctx;
    const key = `${c.sampleRate}:${pattern}`;
    if (!this.breathBuffers.has(key)) {
      const data = breathSound(pattern, c.sampleRate, 4);
      const buffer = c.createBuffer(1, data.length, c.sampleRate);
      buffer.copyToChannel(data, 0);
      this.breathBuffers.set(key, buffer);
    }
    const now = c.currentTime + 0.04;
    const source = c.createBufferSource(),
      master = c.createGain(),
      envelope = c.createGain();
    source.buffer = this.breathBuffers.get(key);
    source.loop = true;
    master.gain.value = prefs.breathVolume ?? prefs.masterVolume;
    source.connect(envelope);
    envelope.connect(master);
    master.connect(c.destination);
    const remaining = Math.max(0, duration - offset);
    const fade = Math.min(0.08, remaining / 2);
    envelope.gain.setValueAtTime(0, now);
    envelope.gain.linearRampToValueAtTime(1, now + fade);
    envelope.gain.setValueAtTime(1, now + remaining - fade);
    envelope.gain.linearRampToValueAtTime(0, now + remaining);
    source.start(now, offset % source.buffer.duration);
    source.stop(now + remaining);
    this.graph = {
      nodes: [source, master, envelope],
      sources: [source],
      master,
      envelope,
      startedAt: now,
      kind: "breath",
    };
  }
  volumes(prefs) {
    if (!this.graph) return;
    const now = this.ctx.currentTime;
    for (const [p, v] of [
      [
        this.graph.master.gain,
        this.graph.kind === "breath"
          ? (prefs.breathVolume ?? prefs.masterVolume)
          : prefs.masterVolume,
      ],
      [
        this.graph.balance?.gain,
        prefs.beatVolume * gainForIntensity(prefs.intensity),
      ],
      [this.graph.noiseGain?.gain, prefs.noiseVolume * NOISE_GAIN],
    ])
      p?.setTargetAtTime(v, now, 0.06);
  }
  stop() {
    const g = this.graph;
    if (!g) return;
    this.graph = null;
    const now = this.ctx.currentTime;
    g.envelope.gain.cancelScheduledValues(now);
    g.envelope.gain.setTargetAtTime(0, now, 0.025);
    for (const s of g.sources) {
      try {
        s.stop(now + 0.15);
      } catch {}
    }
    setTimeout(() => g.nodes.forEach((n) => n.disconnect()), 200);
  }
  async test(pan, volume = 0.2) {
    await this.unlock();
    const c = this.ctx,
      o = c.createOscillator(),
      g = c.createGain(),
      p = c.createStereoPanner();
    p.pan.value = pan;
    g.gain.value = 0;
    o.frequency.value = 440;
    o.connect(g);
    g.connect(p);
    p.connect(c.destination);
    const now = c.currentTime;
    g.gain.setTargetAtTime(Math.min(0.12, volume * 0.15), now, 0.02);
    g.gain.setTargetAtTime(0, now + 0.25, 0.025);
    o.start(now);
    o.stop(now + 0.5);
    o.onended = () => {
      o.disconnect();
      g.disconnect();
      p.disconnect();
    };
  }
}
