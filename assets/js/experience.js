import { sessions, programs } from "./catalog.js";
import { ritualFor, ritualFields, ritualPlan } from "./rituals.js";
import { practiceDuration } from "./breath.js";

// A need has one starting point; the library holds the alternatives.
export const recommendations = {
  breath: "prepare/breath",
  focus: "ritual/work",
  calm: "ritual/reset",
  sleep: "ritual/evening",
  energy: "prepare/prime",
};
export const sessionFields = [
  ...ritualFields.filter((key) => key !== "ritualVisual"),
  "breathDuration",
];
export const quietVisual = (value, goal = "focus") =>
  ["calm", "none", "night", "black"].includes(value)
    ? value
    : goal === "sleep"
      ? "night"
      : "calm";
export const sessionProfile = (settings, visual) => ({
  ...Object.fromEntries(sessionFields.map((key) => [key, settings[key]])),
  visual: quietVisual(visual),
});
export function sessionDuration(id, settings) {
  if (id === "breath")
    return practiceDuration(settings.breathDuration, settings.breathPattern);
  const duration =
    id === "hypnos"
      ? settings.hypnosDuration === "infinity"
        ? Infinity
        : Number(settings.hypnosDuration) * 60
      : sessions[id]?.duration || 0;
  return duration + (settings.prelude ? 60 : 0);
}
export const latestSession = (history) =>
  history
    .filter((entry) => sessions[entry.sessionId] && entry.durationSeconds > 0)
    .reduce(
      (latest, entry) =>
        !latest ||
        (entry.endedAt || entry.startedAt || 0) >
          (latest.endedAt || latest.startedAt || 0)
          ? entry
          : latest,
      null,
    );
export function repeatSetup(entry, preferences) {
  if (!entry || !sessions[entry.sessionId]) return null;
  const program = programs.find((p) => p.id === entry.programId);
  if (program)
    return {
      kind: "program",
      id: program.id,
      name: program.name,
      goal: sessions[program.steps[0].sessionId].goal,
      duration: program.steps.reduce(
        (sum, step) => sum + step.durationMinutes * 60,
        0,
      ),
    };
  if (ritualFor(entry.ritualId)) {
    const settings = { ...preferences, ...entry.ritualPrefs };
    return {
      kind: "ritual",
      id: entry.ritualId,
      settings,
      duration: ritualPlan(entry.ritualId, settings).at(-1).end,
      goal: ritualFor(entry.ritualId).goal,
    };
  }
  const settings = {
    ...preferences,
    ...entry.audioPrefs,
    ...entry.sessionPrefs,
  };
  if (["box", "4-6", "4-7-8"].includes(entry.pattern))
    settings.breathPattern = entry.pattern;
  const id = entry.sessionId;
  return {
    kind: "session",
    id,
    settings,
    visual: quietVisual(
      entry.sessionPrefs?.visual || entry.visual,
      sessions[id].goal,
    ),
    duration: sessionDuration(id, settings),
    goal: sessions[id].goal,
  };
}
export function canonicalRoute(route = "home") {
  const [page, id] = route.split("/");
  if (page === "path") return recommendations[id] || recommendations.focus;
  if (page === "history") return "mine";
  return route || "home";
}
export const routeTab = (route, origin = "home") => {
  const page = route.split("/")[0];
  if (page === "mine" || page === "history") return "mine";
  if (["library", "knowledge", "program"].includes(page)) return "library";
  if (["prepare", "ritual"].includes(page)) return origin;
  return "home";
};
export const defaultBack = (route) => {
  const page = route.split("/")[0];
  return ["program", "knowledge"].includes(page) ? "library" : "home";
};

// Each screen remembers its own scroll, disclosure state and parent tab.
export class NavigationMemory {
  constructor(route = "home") {
    this.current = canonicalRoute(route);
    this.entries = new Map();
    this.enter(this.current);
  }
  get context() {
    return this.entries.get(this.current);
  }
  leave(view) {
    Object.assign(this.context, view);
  }
  enter(route, fromLink = false) {
    route = canonicalRoute(route);
    const previous = this.current,
      parentTab = this.context?.tab || "home";
    const transient = ["session", "complete"].includes(route.split("/")[0]);
    const old = transient ? undefined : this.entries.get(route);
    const detail = ["prepare", "ritual", "program", "knowledge"].includes(
      route.split("/")[0],
    );
    if (!old || (fromLink && detail && route !== previous))
      this.entries.set(route, {
        scroll: 0,
        details: [],
        ...old,
        back: fromLink ? previous : defaultBack(route),
        tab: routeTab(route, parentTab),
      });
    this.current = route;
    return this.context;
  }
}
