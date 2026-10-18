import { ritualFor, ritualFields } from "./rituals.js";
import { sessions, paths } from "./catalog.js";
import { migratePreferences } from "./store.js";
export function parseBackup(text) {
  if (text.length > 8 * 1024 * 1024) throw Error("File too large");
  const raw = JSON.parse(text);
  if (
    ![3, 4, 5].includes(raw?.version) ||
    !Array.isArray(raw.history) ||
    raw.history.length > 10000
  )
    throw Error("Invalid backup");
  const ids = new Set();
  const history = raw.history.map((h) => {
    if (
      !h ||
      typeof h.id !== "string" ||
      !/^[\w-]{1,128}$/.test(h.id) ||
      ids.has(h.id) ||
      !Object.hasOwn(sessions, h.sessionId) ||
      !Number.isFinite(h.durationSeconds) ||
      h.durationSeconds < 0 ||
      h.durationSeconds > 86400
    )
      throw Error("Invalid history entry");
    ids.add(h.id);
    const item = {
      id: h.id,
      sessionId: h.sessionId,
      goal: paths.some((p) => p.id === h.goal)
        ? h.goal
        : sessions[h.sessionId].goal,
      durationSeconds: h.durationSeconds,
      completed: h.completed === true,
    };
    for (const k of [
      "startedAt",
      "endedAt",
      "audioVersion",
      "appliedLightHz",
      "lightContrast",
      "skippedSeconds",
    ])
      if (Number.isFinite(h[k]) && h[k] >= 0) item[k] = h[k];
    if (ritualFor(h.ritualId)) {
      item.ritualId = h.ritualId;
      const p = migratePreferences(h.ritualPrefs || {});
      item.ritualPrefs = Object.fromEntries(ritualFields.map((k) => [k, p[k]]));
    }
    if (["helpful", "neutral", "unsuitable"].includes(h.usefulness))
      item.usefulness = h.usefulness;
    if ([1, 2, 3, 4, 5].includes(h.rating)) item.rating = h.rating;
    for (const k of [
      "programId",
      "programName",
      "visitId",
      "pattern",
      "visual",
      "soundBackground",
    ])
      if (typeof h[k] === "string" && h[k].length <= 128) item[k] = h[k];
    if (h.audioPrefs && typeof h.audioPrefs === "object") {
      const p = migratePreferences(h.audioPrefs);
      item.audioPrefs = Object.fromEntries(
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
        ].map((k) => [k, p[k]]),
      );
    }
    return item;
  });
  return {
    history,
    preferences:
      raw.preferences && typeof raw.preferences === "object"
        ? migratePreferences(raw.preferences)
        : null,
  };
}
