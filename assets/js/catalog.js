import { protocols, legacyProtocols, legacyPrograms, programs as originalPrograms } from "./protocols.js";
import { sessionCopy, programCopy } from "./session-content.js";
export const paths = [
  {
    id: "breath",
    session: "breath",
    pl: "Oddech",
    en: "Breathe",
    intro: ["Zatrzymaj się i znajdź swój rytm.", "Pause and find your rhythm."],
    icon: "breath",
  },
  {
    id: "focus",
    session: "deepFocus",
    pl: "Skupienie",
    en: "Focus",
    intro: ["Zrób przestrzeń na jedno zadanie.", "Make room for one thing."],
    icon: "focus",
  },
  {
    id: "calm",
    session: "equilibrium",
    pl: "Wyciszenie",
    en: "Unwind",
    intro: ["Zwolnij i odetchnij.", "Let the day slow down."],
    icon: "calm",
  },
  {
    id: "sleep",
    session: "hypnos",
    pl: "Sen",
    en: "Sleep",
    intro: ["Przygotuj się do odpoczynku.", "Ease into your evening."],
    icon: "sleep",
  },
  {
    id: "energy",
    session: "prime",
    pl: "Energia",
    en: "Energy",
    intro: ["Złap energię do działania.", "Find your momentum."],
    icon: "energy",
  },
];
export const sessions = Object.fromEntries(
  Object.entries(sessionCopy).map(([id, c]) => [
    id,
    {
      ...(protocols[id] || {
        id: "breath",
        name: "Breath",
        duration: 180,
        phases: [],
      }),
      ...c,
    },
  ]),
);
export const programs = originalPrograms.map((p) => ({
  ...p,
  description: programCopy[p.id],
}));
export const programsForVersion = (version) => version === 2
  ? legacyPrograms.map(p => ({ ...p, description: programCopy[p.id] }))
  : programs;
export const pathFor = (id) => paths.find((p) => p.id === id) || paths[0];
export const sessionFor = (id) =>
  Object.hasOwn(sessions, id) ? sessions[id] : sessions.deepFocus;
export function makeSession(id, duration, audioVersion = 3) {
  const current = sessionFor(id);
  const original = audioVersion === 2 && legacyProtocols[current.id]
    ? { ...current, ...legacyProtocols[current.id] }
    : current;
  const length = duration ?? (id === "hypnos" ? 1800 : original.duration);
  const scale =
    Number.isFinite(original.duration) && original.duration > 0
      ? length / original.duration
      : 1;
  return {
    ...original,
    duration: length,
    phases: original.phases
      .map((p) => ({
        ...p,
        start: p.start * scale,
        end: Math.min(p.end * scale, length),
        audio: { ...p.audio },
        visual: { ...p.visual },
      }))
      .filter((p) => p.start < length),
  };
}
export function filterSessions(
  goal = "all",
  duration = "all",
  query = "",
  lang = "pl",
) {
  const q = query.trim().toLocaleLowerCase(lang);
  return Object.values(sessions).filter(
    (s) =>
      (goal === "all" || s.goal === goal) &&
      (duration === "all" ||
        (duration === "short"
          ? s.duration <= 300
          : duration === "medium"
            ? s.duration > 300 && s.duration <= 900
            : s.duration > 900)) &&
      (!q ||
        `${s.name} ${s.title[lang]} ${s.description[lang]} ${s.benefit[lang]} ${s.practice[lang]} ${pathFor(s.goal)[lang]}`
          .toLocaleLowerCase(lang)
          .includes(q)),
  );
}
