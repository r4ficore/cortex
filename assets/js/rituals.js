import { makeSession } from "./catalog.js";
import { practiceDuration } from "./breath.js";

export const rituals = [
  {
    id: "work",
    goal: "focus",
    name: { pl: "Zaczynam pracę", en: "Time to focus" },
    description: {
      pl: "Gdy trudno zacząć lub co chwilę coś Cię odrywa. Wybierz jedno zadanie i poświęć mu najbliższy kwadrans.",
      en: "When getting started is hard or interruptions keep pulling you away. Choose one task and give it the next quarter of an hour.",
    },
  },
  {
    id: "reset",
    goal: "calm",
    name: { pl: "Potrzebuję przerwy", en: "A little reset" },
    description: {
      pl: "Gdy czujesz przeciążenie między zadaniami. Zrób przerwę od obowiązków i wróć uwagą do oddechu.",
      en: "When you feel overloaded between tasks. Take a break from your responsibilities and return your attention to your breath.",
    },
  },
  {
    id: "evening",
    goal: "sleep",
    name: { pl: "Kończę dzień", en: "Let the day go" },
    description: {
      pl: "Gdy praca się skończyła, ale głowa wciąż jest zajęta. Zamknij dzień i zrób miejsce na spokojny wieczór.",
      en: "When work is over but your mind is still busy. Close the day and make room for a quiet evening.",
    },
  },
];
export const ritualFor = (id) => rituals.find((r) => r.id === id);
// Only presentation and mix settings belong to a saved ritual. Never inherit
// advanced light, stimulation parameters, language or another saved profile.
export const ritualFields = [
  "prelude",
  "breathPattern",
  "breathCues",
  "breathVisual",
  "breathVolume",
  "breathBackground",
  "breathBackgroundVolume",
  "masterVolume",
  "beatVolume",
  "noiseVolume",
  "noiseType",
  "intensity",
  "hypnosDuration",
  "ritualVisual",
];
export function ritualPreferences(id, preferences) {
  return {
    ...preferences,
    breathPattern: "4-6",
    breathVisual: preferences.breathVisual && !preferences.audioOnly,
    ritualVisual:
      id === "evening" ? "black" : preferences.audioOnly ? "none" : "calm",
    ...preferences.ritualProfiles?.[id],
  };
}
export function ritualPlan(id, prefs, audioVersion = 3) {
  if (!ritualFor(id)) throw Error("Unknown ritual");
  const steps = [];
  const breath = (seconds) =>
    steps.push({
      kind: "breath",
      pattern: prefs.breathPattern,
      session: makeSession(
        "breath",
        practiceDuration(seconds, prefs.breathPattern),
      ),
    });
  if (id === "reset") breath(180);
  else {
    if (prefs.prelude) breath(60);
    const duration =
      id === "evening"
        ? prefs.hypnosDuration === "infinity"
          ? Infinity
          : Number(prefs.hypnosDuration) * 60
        : 900;
    steps.push({
      kind: "sound",
      session: makeSession(id === "evening" ? "hypnos" : "deepFocus", duration, audioVersion),
    });
  }
  let start = 0;
  return steps.map((step, index) => {
    const result = {
      ...step,
      index,
      start,
      end: start + step.session.duration,
    };
    start = result.end;
    return result;
  });
}
export function ritualAt(steps, position) {
  const step = steps.find((s) => position < s.end) || steps.at(-1);
  return {
    ...step,
    position: Math.max(
      0,
      Math.min(step.session.duration, position - step.start),
    ),
  };
}
export function ritualVisual(step, prefs) {
  if (step.kind === "breath") return prefs.breathVisual ? "calm" : "none";
  return ["calm", "none", "night", "black"].includes(prefs.ritualVisual)
    ? prefs.ritualVisual
    : "calm";
}

export const ritualAudio = (steps, prefs) =>
  steps.some((s) => s.kind === "sound") ||
  prefs.breathCues ||
  Boolean(prefs.breathBackground && prefs.breathBackground !== "none");
