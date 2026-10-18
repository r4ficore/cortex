import { makeSession } from "./catalog.js";
import { phaseVolume } from "./session.js";
import { migratePreferences } from "./store.js";
import { audioTimeline } from "./audio-timeline.js";
import { backgroundIds } from "./background-catalog.js";

// Hypnos exports scale the complete finite 30-minute edition. Playback retains
// its original 15-minute introduction at 30/45/90 minutes and unlimited length.
export function exportSession(id, duration, loop = "standard") {
  let session = makeSession(id, id === "hypnos" ? 1800 : duration);
  if (id === "hypnos")
    session = {
      ...session,
      duration,
      phases: session.phases.map((p) => ({
        ...p,
        start: (p.start * duration) / 1800,
        end: (p.end * duration) / 1800,
      })),
    };
  if (loop === "stable") {
    const stage = session.phases[1] || session.phases[0];
    session = {
      ...session,
      phases: [
        {
          ...stage,
          start: 0,
          end: duration,
          audio: { ...stage.audio, vol: phaseVolume(stage, stage.end) },
        },
      ],
    };
  }
  return session;
}
export function exportConfig(values, preferences = {}) {
  const duration = Number(values.minutes) * 60;
  if (![60, 300, 900, 1800, 2700].includes(duration))
    throw Error("Invalid duration");
  const prefs = migratePreferences(preferences);
  const options = {
    prefs,
    entrainment: ["binaural", "monaural", "isochronic"].includes(
      values.entrainment,
    )
      ? values.entrainment
      : "binaural",
    carrier: ["110", "220", "432"].includes(String(values.carrier))
      ? String(values.carrier)
      : "native",
    loop: values.loop === "stable" ? "stable" : "standard",
    noise: backgroundIds.includes(values.noise)
      ? values.noise
      : prefs.noiseType,
    sampleRate: values.sampleRate === 24000 ? 24000 : 48000,
    prepared: true,
  };
  const session = exportSession(values.id, duration, options.loop);
  return { session, options };
}
export function exportManifest({ session, options }) {
  return {
    schemaVersion: 1,
    audioVersion: 2,
    sessionId: session.id,
    goal: session.goal,
    name: session.name,
    durationSeconds: session.duration,
    format: {
      type: "WAV",
      channels: 2,
      bits: 16,
      sampleRate: options.sampleRate,
    },
    sequence: options.loop,
    hypnosReferenceSeconds: session.id === "hypnos" ? 1800 : undefined,
    entrainment: options.entrainment,
    carrier: options.carrier,
    background: options.noise,
    levels: Object.fromEntries(
      ["masterVolume", "beatVolume", "noiseVolume", "intensity"].map((k) => [
        k,
        options.prefs[k],
      ]),
    ),
    phases: session.phases,
    audioTimeline: audioTimeline(session, options.prefs.intensity, options),
  };
}
export const wavBytes = (seconds, rate) => 44 + Math.round(seconds * rate) * 4;
export const MAX_BUFFERED_WAV_BYTES = 192 * 1024 * 1024;
