import { sessions, programs, makeSession } from "./catalog.js";
import { SessionController } from "./session.js";
import { migratePreferences } from "./store.js";

export const audioSettings = (prefs) =>
  Object.fromEntries(
    [
      "masterVolume",
      "beatVolume",
      "noiseVolume",
      "noiseType",
      "intensity",
      "breathVolume",
    ].map((k) => [k, prefs[k]]),
  );
export function snapshotFlow(f, owner) {
  return {
    version: 1,
    id: f.recoveryId,
    owner,
    logId: f.logId,
    sessionId: f.session.id,
    duration: f.session.duration === Infinity ? "Infinity" : f.session.duration,
    stage: f.stage,
    position: f.clock.position(),
    clockDuration:
      f.clock.duration === Infinity ? "Infinity" : f.clock.duration,
    pattern: f.pattern,
    breathSound: f.breathSound,
    audioPrefs: f.audioPrefs,
    visual: f.visual,
    lightMode: f.lightMode,
    lightContrast: f.lightContrast,
    appliedLightHz: f.appliedLightHz,
    lightFrequencyRange: f.lightFrequencyRange,
    programId: f.program?.id || null,
    stepIndex: f.stepIndex,
    total: f.total,
    logged: f.logged,
    lastLogId: f.lastLogId,
    startedAt: f.startedAt,
    updatedAt: Date.now(),
  };
}
export function validSnapshot(s) {
  const duration = (v) =>
    v === "Infinity" || (Number.isFinite(v) && v > 0 && v <= 86400);
  return (
    s?.version === 1 &&
    typeof s.id === "string" &&
    /^[\w-]{1,128}$/.test(s.id) &&
    typeof s.logId === "string" &&
    /^[\w-]{1,128}$/.test(s.logId) &&
    Object.hasOwn(sessions, s.sessionId) &&
    ["session", "prelude", "between"].includes(s.stage) &&
    duration(s.duration) &&
    duration(s.clockDuration) &&
    Number.isFinite(s.position) &&
    s.position >= 0 &&
    s.position <= 86400 &&
    Number.isFinite(s.startedAt) &&
    Number.isFinite(s.updatedAt) &&
    (!s.programId ||
      programs.some(
        (p) =>
          p.id === s.programId &&
          Number.isInteger(s.stepIndex) &&
          s.stepIndex >= 0 &&
          s.stepIndex < p.steps.length,
      )) &&
    (s.stage !== "between" ||
      programs.some(
        (p) => p.id === s.programId && s.stepIndex < p.steps.length - 1,
      ))
  );
}
export function restoreFlow(s, now) {
  if (!validSnapshot(s)) throw Error("Invalid saved session");
  const p = migratePreferences({ ...s.audioPrefs, breathPattern: s.pattern });
  const clock = new SessionController(now);
  clock.duration = s.clockDuration === "Infinity" ? Infinity : s.clockDuration;
  clock.elapsed = Math.min(s.position, clock.duration);
  clock.status = "paused";
  return {
    recoveryId: s.id,
    logId: s.logId,
    session: makeSession(
      s.sessionId,
      s.duration === "Infinity" ? Infinity : s.duration,
    ),
    stage: s.stage,
    clock,
    pattern: p.breathPattern,
    breathSound: s.breathSound === true,
    audioPrefs: audioSettings(p),
    visual: ["none", "night"].includes(s.visual) ? s.visual : "calm",
    restoredLight: s.visual === "advanced",
    appliedLightHz: Number.isFinite(s.appliedLightHz) ? s.appliedLightHz : null,
    lightFrequencyRange: s.lightFrequencyRange,
    program: programs.find((p) => p.id === s.programId) || null,
    stepIndex: s.stepIndex || 0,
    total: Number.isFinite(s.total) ? Math.max(0, s.total) : 0,
    logged: s.logged === true,
    lastLogId: s.lastLogId,
    startedAt: s.startedAt,
    lightStopped: true,
    lightStarted: false,
    lightLimit: null,
  };
}
