import { sessions } from "./catalog.js";
import { sessionFields, quietVisual } from "./experience.js";
import { ritualFields, ritualFor } from "./rituals.js";
import { backgroundIds } from "./background-catalog.js";
const KEY = "cortex.preferences.v5";
const HISTORY = "cortex.history.v3";
export const defaults = {
  version: 5,
  lang: "pl",
  goal: "focus",
  lastSessionId: "deepFocus",
  masterVolume: 0.5,
  beatVolume: 0.95,
  noiseVolume: 0.75,
  noiseType: "soundscape",
  breathVolume: 0.5,
  intensity: "medium",
  hypnosDuration: "30",
  breathDuration: 180,
  breathPattern: "4-6",
  breathCues: false,
  breathHaptics: false,
  breathVisual: true,
  breathBackground: "none",
  breathBackgroundVolume: 0.3,
  ritualVisual: "calm",
  ritualProfiles: {},
  sessionProfiles: {},
  prelude: false,
  reduceMotion: null,
  audioOnly: false,
  keepScreenAwake: true,
};
const num = (value, fallback, min, max) =>
  Number.isFinite(Number(value))
    ? Math.max(min, Math.min(max, Number(value)))
    : fallback;
export function migratePreferences(raw = {}, legacyLang) {
  const p = { ...defaults, ...raw };
  p.lang = ["pl", "en"].includes(raw.lang || legacyLang)
    ? raw.lang || legacyLang
    : "pl";
  p.goal = ["breath", "focus", "calm", "sleep", "energy"].includes(raw.goal)
    ? raw.goal
    : "focus";
  p.noiseType = backgroundIds.includes(raw.noiseType || raw.preferredNoiseType)
    ? raw.noiseType || raw.preferredNoiseType
    : "soundscape";
  p.breathPattern = ["4-6", "4-7-8", "box"].includes(raw.breathPattern)
    ? raw.breathPattern
    : "4-6";
  p.intensity = ["low", "medium", "high"].includes(
    raw.intensity || raw.intensityLevel,
  )
    ? raw.intensity || raw.intensityLevel
    : "medium";
  for (const [k, max] of [
    ["masterVolume", 1.1],
    ["beatVolume", 1.2],
    ["noiseVolume", 1.2],
    ["breathVolume", 1],
    ["breathBackgroundVolume", 1],
  ])
    p[k] = num(raw[k] ?? defaults[k], defaults[k], 0, max);
  if (raw.breathVolume === undefined)
    p.breathVolume = num(
      raw.masterVolume ?? defaults.breathVolume,
      defaults.breathVolume,
      0,
      1,
    );
  p.hypnosDuration = ["30", "45", "90", "infinity"].includes(
    String(raw.hypnosDuration),
  )
    ? String(raw.hypnosDuration)
    : "30";
  p.breathDuration = [60, 180, 300].includes(Number(raw.breathDuration))
    ? Number(raw.breathDuration)
    : 180;
  for (const key of ["breathCues", "breathHaptics", "prelude", "audioOnly"])
    p[key] = raw[key] === true;
  p.breathVisual = raw.breathVisual !== false;
  p.breathBackground = ["none", "soundscape", "brown", "pink"].includes(
    raw.breathBackground,
  )
    ? raw.breathBackground
    : "none";
  p.ritualVisual = ["calm", "none", "night", "black"].includes(raw.ritualVisual)
    ? raw.ritualVisual
    : "calm";
  p.ritualProfiles = {};
  for (const [id, profile] of Object.entries(raw.ritualProfiles || {})) {
    if (!ritualFor(id) || !profile || typeof profile !== "object") continue;
    const clean = migratePreferences(
      Object.fromEntries(ritualFields.map((k) => [k, profile[k]])),
    );
    p.ritualProfiles[id] = Object.fromEntries(
      ritualFields.map((k) => [k, clean[k]]),
    );
  }
  p.sessionProfiles = {};
  for (const [id, profile] of Object.entries(raw.sessionProfiles || {})) {
    if (!Object.hasOwn(sessions, id) || !profile || typeof profile !== "object")
      continue;
    const clean = migratePreferences(
      Object.fromEntries(sessionFields.map((k) => [k, profile[k]])),
    );
    p.sessionProfiles[id] = {
      ...Object.fromEntries(sessionFields.map((k) => [k, clean[k]])),
      visual: quietVisual(profile.visual, sessions[id].goal),
    };
  }
  p.keepScreenAwake = raw.keepScreenAwake !== false;
  p.reduceMotion =
    typeof raw.reduceMotion === "boolean" ? raw.reduceMotion : null;
  // Advanced stimulation is deliberately never persisted or inherited.
  delete p.visualMode;
  delete p.safeVisuals;
  p.version = 5;
  if (
    typeof p.lastSessionId !== "string" ||
    !/^[a-zA-Z0-9]{1,64}$/.test(p.lastSessionId)
  )
    p.lastSessionId = defaults.lastSessionId;
  return Object.fromEntries(Object.keys(defaults).map((key) => [key, p[key]]));
}
export function createStore(storage) {
  let available = Boolean(storage);
  const read = (key) => {
    try {
      const raw = storage?.getItem(key);
      return raw ? JSON.parse(raw) : null;
    } catch {
      available = false;
      return null;
    }
  };
  let lang;
  try {
    lang = storage?.getItem("kora-lang");
  } catch {
    available = false;
  }
  let prefs = migratePreferences(
    read(KEY) ||
      read("cortex.preferences.v4") ||
      read("cortex.preferences.v3") ||
      read("koraUserPreferences") ||
      {},
    lang,
  );
  const rawHistory = read(HISTORY) ?? read("koraSessionLogs") ?? [];
  let history = Array.isArray(rawHistory)
    ? rawHistory
        .filter((x) => x && typeof x === "object")
        .map((x, i) => ({
          ...x,
          id: x.id || `legacy-${i}`,
          durationSeconds: num(x.durationSeconds, 0, 0, 86400),
        }))
    : [];
  function write(key, value) {
    try {
      storage?.setItem(key, JSON.stringify(value));
    } catch {
      available = false;
    }
  }
  function syncHistory() {
    const saved = read(HISTORY);
    if (Array.isArray(saved))
      history = [
        ...new Map(
          [...history, ...saved]
            .filter((x) => x && typeof x === "object")
            .map((x) => [x.id, x]),
        ).values(),
      ];
  }
  const checkpoints = new Map();
  const prefix = "cortex.active.v1.";
  return {
    checkpoints() {
      try {
        if (typeof storage?.length === "number") checkpoints.clear();
        for (let i = 0; i < (storage?.length || 0); i++) {
          const key = storage.key(i);
          if (key?.startsWith(prefix)) {
            const saved = read(key);
            if (saved) checkpoints.set(key.slice(prefix.length), saved);
          }
        }
      } catch {
        available = false;
      }
      return [...checkpoints.values()];
    },
    checkpoint(value) {
      checkpoints.set(value.id, value);
      write(prefix + value.id, value);
    },
    getCheckpoint(id) {
      const value = read(prefix + id);
      return value || (available ? null : checkpoints.get(id));
    },
    clearCheckpoint(id) {
      checkpoints.delete(id);
      try {
        storage?.removeItem(prefix + id);
      } catch {
        available = false;
      }
    },
    importHistory(entries) {
      syncHistory();
      const ids = new Set(history.map((h) => h.id));
      const additions = entries.filter((h) => !ids.has(h.id));
      history.push(...additions);
      write(HISTORY, history);
      return additions.length;
    },
    get prefs() {
      return prefs;
    },
    get history() {
      syncHistory();
      return history;
    },
    get available() {
      return available;
    },
    save(changes) {
      prefs = migratePreferences({
        ...prefs,
        ...(read(KEY) || {}),
        ...changes,
      });
      write(KEY, prefs);
      return prefs;
    },
    add(entry) {
      syncHistory();
      history = [
        ...new Map([...history, entry].map((h) => [h.id, h])).values(),
      ];
      write(HISTORY, history);
    },
    feedback(id, usefulness) {
      if (!["helpful", "neutral", "unsuitable"].includes(usefulness)) return;
      syncHistory();
      history = history.map((x) => (x.id === id ? { ...x, usefulness } : x));
      write(HISTORY, history);
    },
    saveRitual(id, settings) {
      if (!ritualFor(id)) return;
      const existing = read(KEY)?.ritualProfiles || prefs.ritualProfiles;
      prefs = migratePreferences({
        ...prefs,
        ...(read(KEY) || {}),
        ritualProfiles: { ...existing, [id]: settings },
      });
      write(KEY, prefs);
      return prefs.ritualProfiles[id];
    },
    saveSession(id, settings) {
      if (!Object.hasOwn(sessions, id)) return;
      const existing = read(KEY)?.sessionProfiles || prefs.sessionProfiles;
      return this.save({ sessionProfiles: { ...existing, [id]: settings } })
        .sessionProfiles[id];
    },
    rate(id, rating) {
      syncHistory();
      history = history.map((x) => (x.id === id ? { ...x, rating } : x));
      write(HISTORY, history);
    },
  };
}
