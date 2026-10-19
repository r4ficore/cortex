import { sessionProfile, quietVisual } from "./experience.js";
import { ritualPlan, ritualAt, ritualFor, ritualVisual } from "./rituals.js";
import { sessions, programsForVersion, makeSession } from "./catalog.js";
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
      "breathCues",
      "breathVisual",
      "breathBackground",
      "breathBackgroundVolume",
    ].map((k) => [k, prefs[k]]),
  );
export function snapshotFlow(f, owner) {
  return {
    version: 1,
    audioVersion: f.session.audioVersion || f.steps?.find(s => s.kind === "sound")?.session.audioVersion || 3,
    ritualId: f.ritual?.id || null,
    ritualPrefs: f.ritualPrefs || null,
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
    sessionPrefs: f.sessionPrefs,
    visual: f.visual,
    lightMode: f.lightMode,
    lightContrast: f.lightContrast,
    appliedLightHz: f.appliedLightHz,
    lightFrequencyRange: f.lightFrequencyRange,
    programId: f.program?.id || null,
    stepIndex: f.stepIndex,
    total: f.total,
    skipped: f.skipped || 0,
    logged: f.logged,
    lastLogId: f.lastLogId,
    startedAt: f.startedAt,
    updatedAt: Date.now(),
  };
}
export function validSnapshot(s) {
  const programs = programsForVersion(s?.audioVersion ?? 2);
  const duration = (v) =>
    v === "Infinity" || (Number.isFinite(v) && v > 0 && v <= 86400);
  return (
    s?.version === 1 &&
    [2, 3].includes(s.audioVersion ?? 2) &&
    typeof s.id === "string" &&
    /^[\w-]{1,128}$/.test(s.id) &&
    typeof s.logId === "string" &&
    /^[\w-]{1,128}$/.test(s.logId) &&
    Object.hasOwn(sessions, s.sessionId) &&
    (!s.ritualId || (ritualFor(s.ritualId) && s.stage === "session")) &&
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
  const ritual = ritualFor(s.ritualId);
  const ritualPrefs = ritual ? migratePreferences(s.ritualPrefs || {}) : null;
  const steps = ritual ? ritualPlan(ritual.id, ritualPrefs, s.audioVersion ?? 2) : null;
  if (steps) {
    clock.duration = steps.at(-1).end;
    clock.elapsed = Math.min(clock.elapsed, clock.duration);
  }
  const current = steps ? ritualAt(steps, clock.elapsed) : null;
  return {
    ritual,
    ritualPrefs,
    steps,
    skipped: Number.isFinite(s.skipped)
      ? Math.max(0, Math.min(s.skipped, clock.elapsed))
      : 0,
    recoveryId: s.id,
    logId: s.logId,
    session:
      current?.session ||
      makeSession(
        s.sessionId,
        s.duration === "Infinity" ? Infinity : s.duration,
        s.audioVersion ?? 2,
      ),
    stage: s.stage,
    clock,
    pattern: current?.pattern || p.breathPattern,
    breathSound: s.breathSound === true,
    audioPrefs: ritualPrefs || audioSettings(p),
    sessionPrefs:
      s.sessionPrefs && typeof s.sessionPrefs === "object"
        ? sessionProfile(
            migratePreferences(s.sessionPrefs),
            quietVisual(s.sessionPrefs.visual),
          )
        : undefined,
    visual: current
      ? ritualVisual(current, ritualPrefs) === "black"
        ? "night"
        : ritualVisual(current, ritualPrefs)
      : ["none", "night"].includes(s.visual)
        ? s.visual
        : "calm",
    restoredLight: s.visual === "advanced",
    appliedLightHz: Number.isFinite(s.appliedLightHz) ? s.appliedLightHz : null,
    lightFrequencyRange: s.lightFrequencyRange,
    program: programsForVersion(s.audioVersion ?? 2).find((p) => p.id === s.programId) || null,
    stepIndex: current?.index ?? (s.stepIndex || 0),
    total: Number.isFinite(s.total) ? Math.max(0, s.total) : 0,
    logged: s.logged === true,
    lastLogId: s.lastLogId,
    startedAt: s.startedAt,
    lightStopped: true,
    lightStarted: false,
    lightLimit: null,
  };
}
