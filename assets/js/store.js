const KEY = "cortex.preferences.v3";
const HISTORY = "cortex.history.v3";
export const defaults = {
  version: 3,
  lang: "pl",
  goal: "focus",
  lastSessionId: "deepFocus",
  masterVolume: 0.5,
  beatVolume: 0.95,
  noiseVolume: 0.75,
  noiseType: "brown",
  intensity: "medium",
  hypnosDuration: "30",
  breathDuration: 180,
  breathPattern: "4-6",
  breathCues: false,
  breathHaptics: false,
  prelude: false,
  reduceMotion: null,
  audioOnly: false,
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
  p.noiseType = ["brown", "pink", "white", "none"].includes(
    raw.noiseType || raw.preferredNoiseType,
  )
    ? raw.noiseType || raw.preferredNoiseType
    : "brown";
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
  ])
    p[k] = num(raw[k] ?? defaults[k], defaults[k], 0, max);
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
  p.reduceMotion =
    typeof raw.reduceMotion === "boolean" ? raw.reduceMotion : null;
  // Advanced stimulation is deliberately never persisted or inherited.
  delete p.visualMode;
  delete p.safeVisuals;
  p.version = 3;
  return p;
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
    read(KEY) || read("koraUserPreferences") || {},
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
  return {
    get prefs() {
      return prefs;
    },
    get history() {
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
      history = [...history, entry];
      write(HISTORY, history);
    },
    rate(id, rating) {
      syncHistory();
      history = history.map((x) => (x.id === id ? { ...x, rating } : x));
      write(HISTORY, history);
    },
  };
}
