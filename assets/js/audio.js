import {
  modulationSpec,
  fadeTimes,
  noiseGenerator,
  OUTPUT_HEADROOM,
  NOISE_GAIN,
  TRANSITION_SECONDS,
} from "./signal.js";
import { intensityProfiles, frequencies, phaseVolume } from "./session.js";
export class AudioEngine {
  constructor() {
    this.ctx = null;
    this.graph = null;
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
    const c = this.ctx,
      now = c.currentTime + 0.04;
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
    lfo.start(now);
    sources.push(lfo);
    master.gain.value = prefs.masterVolume;
    balance.gain.value = prefs.beatVolume;
    envelope.gain.setValueAtTime(0, now);
    const remaining = session.duration - offset;
    const fade = fadeTimes(remaining);
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
    const intensity =
      intensityProfiles[prefs.intensity] || intensityProfiles.medium;
    let previous = null;
    for (const phase of session.phases) {
      if (phase.end <= offset) continue;
      const start = now + Math.max(0, phase.start - offset),
        end = now + phase.end - offset;
      const [fl, fr] = frequencies(phase.audio, prefs.intensity);
      const rampEnd = Math.min(start + TRANSITION_SECONDS, end);
      if (previous) {
        l.frequency.setValueAtTime(previous.fl, start);
        r.frequency.setValueAtTime(previous.fr, start);
        l.frequency.linearRampToValueAtTime(fl, rampEnd);
        r.frequency.linearRampToValueAtTime(fr, rampEnd);
      } else {
        l.frequency.setValueAtTime(fl, start);
        r.frequency.setValueAtTime(fr, start);
      }
      const gain =
        phaseVolume(phase, Math.max(offset, phase.start)) * intensity.gain;
      volume.gain.setValueAtTime(previous ? previous.gain : gain, start);
      if (previous) volume.gain.linearRampToValueAtTime(gain, rampEnd);
      if (Number.isFinite(end))
        volume.gain.linearRampToValueAtTime(
          phaseVolume(phase, phase.end) * intensity.gain,
          end,
        );
      const mod = modulationSpec(phase.audio, prefs.intensity);
      lfo.frequency.setValueAtTime(mod.rate, start);
      pulse.gain.setValueAtTime(previous ? previous.base : mod.base, start);
      depth.gain.setValueAtTime(
        previous ? previous.depth / 2 : mod.depth / 2,
        start,
      );
      if (previous) {
        pulse.gain.linearRampToValueAtTime(mod.base, rampEnd);
        depth.gain.linearRampToValueAtTime(mod.depth / 2, rampEnd);
      }
      previous = {
        fl,
        fr,
        gain: phaseVolume(phase, phase.end) * intensity.gain,
        ...mod,
      };
    }
    const noiseGain = node(c.createGain());
    noiseGain.gain.value = prefs.noiseVolume * NOISE_GAIN;
    noiseGain.connect(envelope);
    let noise = null;
    if (prefs.noiseType !== "none") {
      noise = node(c.createBufferSource());
      noise.buffer = this.noise(prefs.noiseType);
      noise.loop = true;
      noise.connect(noiseGain);
      noise.start(now);
      sources.push(noise);
    }
    l.start(now);
    r.start(now);
    sources.push(l, r);
    if (Number.isFinite(session.duration)) {
      const end = now + session.duration - offset;
      if (end > now) {
        envelope.gain.setValueAtTime(
          1,
          Math.max(now + fade.in, end - fade.out),
        );
        envelope.gain.linearRampToValueAtTime(0, end);
      }
      for (const s of [l, r, lfo, noise].filter(Boolean)) s.stop(end);
    }
    this.graph = {
      nodes,
      sources,
      master,
      balance,
      noiseGain,
      envelope,
      startedAt: now,
    };
  }
  noise(type) {
    const c = this.ctx,
      b = c.createBuffer(1, c.sampleRate * 16, c.sampleRate),
      d = b.getChannelData(0);
    const next = noiseGenerator(type);
    for (let i = 0; i < d.length; i++) d[i] = next(i / c.sampleRate);
    const fade = Math.min(1024, d.length / 2);
    for (let i = 0; i < fade; i++) {
      d[i] *= i / fade;
      d[d.length - 1 - i] *= i / fade;
    }
    if (b.copyToChannel) b.copyToChannel(d, 0);
    return b;
  }
  volumes(prefs) {
    if (!this.graph) return;
    const now = this.ctx.currentTime;
    for (const [p, v] of [
      [this.graph.master.gain, prefs.masterVolume],
      [this.graph.balance.gain, prefs.beatVolume],
      [this.graph.noiseGain.gain, prefs.noiseVolume * NOISE_GAIN],
    ])
      p.setTargetAtTime(v, now, 0.06);
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
  cue(phase, volume = 0.5) {
    if (!this.ctx || this.ctx.state !== "running") return;
    const c = this.ctx,
      o = c.createOscillator(),
      g = c.createGain(),
      now = c.currentTime;
    o.frequency.value = phase === "inhale" ? 440 : 330;
    g.gain.value = 0;
    o.connect(g);
    g.connect(c.destination);
    g.gain.setTargetAtTime(0.04 * volume, now, 0.02);
    g.gain.setTargetAtTime(0, now + 0.12, 0.04);
    o.start();
    o.stop(now + 0.4);
    o.onended = () => {
      o.disconnect();
      g.disconnect();
    };
  }
}
