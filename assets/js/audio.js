import {
  envelopePlan,
  envelopeAt,
  scheduleEnvelope,
  holdEnvelope,
} from "./envelope.js";
import { OUTPUT_HEADROOM, NOISE_GAIN, gainForIntensity } from "./signal.js";
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
  play(session, offset, prefs, at = null) {
    this.stop();
    const c = this.ctx;
    // Build before taking the start timestamp: buffer generation must not put
    // scheduled audio in the past on mobile devices.
    const buffer =
      prefs.noiseType === "none"
        ? null
        : this.background(prefs.noiseType, session);
    const timeline = audioTimeline(session);
    const now = at ?? c.currentTime + 0.04;
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
    const plan = envelopePlan(session.duration, offset, profileFor(session));
    scheduleEnvelope(envelope.gain, plan, now);
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
      plan,
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
  playBreath(pattern, duration, offset, prefs, at = null) {
    this.stop();
    const c = this.ctx;
    const key = `${c.sampleRate}:${pattern}`;
    if (!this.breathBuffers.has(key)) {
      const data = breathSound(pattern, c.sampleRate, 4);
      const buffer = c.createBuffer(1, data.length, c.sampleRate);
      buffer.copyToChannel(data, 0);
      this.breathBuffers.set(key, buffer);
    }
    const background =
      prefs.breathBackground && prefs.breathBackground !== "none"
        ? this.background(prefs.breathBackground, { goal: "calm" })
        : null;
    const now = at ?? c.currentTime + 0.04;
    const source = c.createBufferSource(),
      master = c.createGain(),
      guide = c.createGain(),
      noiseGain = c.createGain(),
      envelope = c.createGain();
    const nodes = [source, master, guide, noiseGain, envelope],
      sources = [source];
    source.buffer = this.breathBuffers.get(key);
    source.loop = true;
    master.gain.value = 1;
    guide.gain.value =
      prefs.breathCues === false
        ? 0
        : (prefs.breathVolume ?? prefs.masterVolume);
    noiseGain.gain.value = (prefs.breathBackgroundVolume ?? 0.3) * NOISE_GAIN;
    source.connect(guide);
    guide.connect(envelope);
    noiseGain.connect(envelope);
    envelope.connect(master);
    master.connect(c.destination);
    const remaining = Math.max(0, duration - offset);
    const plan = envelopePlan(duration, offset, {
      fadeIn: 0.08,
      fadeOut: 0.08,
    });
    scheduleEnvelope(envelope.gain, plan, now);
    source.start(now, offset % source.buffer.duration);
    source.stop(now + remaining);
    if (background) {
      const ambient = c.createBufferSource();
      ambient.buffer = background;
      ambient.loop = true;
      ambient.connect(noiseGain);
      ambient.start(now, offset % background.duration);
      ambient.stop(now + remaining);
      nodes.push(ambient);
      sources.push(ambient);
    }
    this.graph = {
      nodes,
      sources,
      master,
      guide,
      noiseGain,
      envelope,
      startedAt: now,
      plan,
      kind: "breath",
    };
  }
  // Schedule every stage on the audio clock up front. A hidden/throttled tab
  // cannot insert a silent gap or keep a breathing guide playing over focus.
  playRitual(steps, offset, prefs) {
    this.stop();
    const children = [];
    const pending = steps.filter((s) => s.end > offset);
    // Generate buffers before choosing one shared start timestamp.
    for (const step of pending) {
      if (step.kind === "sound" && prefs.noiseType !== "none")
        this.background(prefs.noiseType, step.session);
      if (step.kind === "breath") {
        const key = `${this.ctx.sampleRate}:${step.pattern}`;
        if (!this.breathBuffers.has(key)) {
          const data = breathSound(step.pattern, this.ctx.sampleRate, 4);
          const b = this.ctx.createBuffer(1, data.length, this.ctx.sampleRate);
          b.copyToChannel(data, 0);
          this.breathBuffers.set(key, b);
        }
        if (prefs.breathBackground !== "none")
          this.background(prefs.breathBackground, { goal: "calm" });
      }
    }
    const startedAt = this.ctx.currentTime + 0.08;
    try {
      for (const step of pending) {
        const child = new AudioEngine();
        child.ctx = this.ctx;
        child.breathBuffers = this.breathBuffers;
        child.backgroundBuffers = this.backgroundBuffers;
        children.push(child);
        const local = Math.max(0, offset - step.start);
        const when = startedAt + Math.max(0, step.start - offset);
        if (step.kind === "breath")
          child.playBreath(
            step.pattern,
            step.session.duration,
            local,
            prefs,
            when,
          );
        else child.play(step.session, local, prefs, when);
      }
    } catch (error) {
      children.forEach((c) => c.stop());
      throw error;
    }
    this.sequence = children;
    this.graph = { kind: "ritual", startedAt };
  }
  volumes(prefs) {
    if (this.sequence) {
      this.sequence.forEach((c) => c.volumes(prefs));
      return;
    }
    if (!this.graph) return;
    const now = this.ctx.currentTime;
    for (const [p, v] of [
      [
        this.graph.kind === "breath"
          ? this.graph.guide.gain
          : this.graph.master.gain,
        this.graph.kind === "breath"
          ? prefs.breathCues === false
            ? 0
            : (prefs.breathVolume ?? prefs.masterVolume)
          : prefs.masterVolume,
      ],
      [
        this.graph.balance?.gain,
        prefs.beatVolume * gainForIntensity(prefs.intensity),
      ],
      [
        this.graph.noiseGain?.gain,
        (this.graph.kind === "breath"
          ? (prefs.breathBackgroundVolume ?? 0.3)
          : prefs.noiseVolume) * NOISE_GAIN,
      ],
    ])
      p?.setTargetAtTime(v, now, 0.06);
  }
  stop() {
    if (this.sequence) {
      this.sequence.forEach((c) => c.stop());
      this.sequence = null;
      this.graph = null;
      return;
    }
    const g = this.graph;
    if (!g) return;
    this.graph = null;
    const now = this.ctx.currentTime;
    holdEnvelope(
      g.envelope.gain,
      now,
      now < g.startedAt ? 0 : envelopeAt(g.plan, now - g.startedAt),
    );
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
