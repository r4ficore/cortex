import { protocols, programs as originalPrograms } from "./protocols.js";
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
const copy = {
  breath: [
    "breath",
    "Twój rytm",
    "Your rhythm",
    "Kilka minut z oddechem, bez pośpiechu.",
    "A few unhurried minutes with your breath.",
  ],
  deepFocus: [
    "focus",
    "Jedno zadanie",
    "One thing at a time",
    "Spokojna przestrzeń dźwiękowa do pracy nad jednym zadaniem.",
    "A steady sound space for a single task.",
  ],
  clarity: [
    "focus",
    "Uporządkuj myśli",
    "A clear starting point",
    "Sesja do planowania i porządkowania pomysłów.",
    "A session to accompany planning and organising ideas.",
  ],
  genesis: [
    "focus",
    "Miejsce na pomysły",
    "Room for ideas",
    "Łagodna sesja do pracy twórczej i swobodnego myślenia.",
    "A gentle setting for creative work and open thinking.",
  ],
  presence: [
    "focus",
    "Przed spotkaniem",
    "Before a conversation",
    "Krótka przerwa przed rozmową lub kolejnym zadaniem.",
    "A short pause before a conversation or your next task.",
  ],
  cortexForge: [
    "focus",
    "Dłuższe skupienie",
    "A longer focus session",
    "Rozbudowana sekwencja dźwiękowa na blok pracy.",
    "A longer sound sequence to accompany a work block.",
  ],
  equilibrium: [
    "calm",
    "Chwila równowagi",
    "A moment of balance",
    "Równomierne tony i miękkie tło na chwilę odpoczynku.",
    "Steady tones and a soft background for a quiet break.",
  ],
  restoration: [
    "calm",
    "Czas na odpoczynek",
    "Time to rest",
    "Wolno zmieniająca się sesja do spokojnej przerwy.",
    "A slowly changing session for an unhurried break.",
  ],
  parasymPathway: [
    "calm",
    "Dłuższe wyciszenie",
    "A slower interlude",
    "Stopniowe przejście przez łagodniejsze tony i powrót.",
    "A gradual journey through gentler tones and back.",
  ],
  hypnos: [
    "sleep",
    "Wieczorny rytuał",
    "An evening ritual",
    "Ciche tło na wieczór z wybranym czasem zakończenia.",
    "A quiet evening background with your choice of end time.",
  ],
  auroraReset: [
    "sleep",
    "Miękkie przejście",
    "A gentle transition",
    "Dłuższa sekwencja o powoli zmieniającym się charakterze.",
    "A longer sequence with a slowly evolving character.",
  ],
  remSculpt: [
    "sleep",
    "Wieczorne wyciszenie",
    "Evening stillness",
    "Spokojna sekwencja z łagodnym zakończeniem.",
    "An unhurried sequence with a gentle ending.",
  ],
  prime: [
    "energy",
    "Łagodny start",
    "A gentle start",
    "Pięć minut na wejście w działanie. Stopniowo wyraźniejszy rytm.",
    "Five minutes to get going, with a gradually more present rhythm.",
  ],
  overdrive: [
    "energy",
    "Mocniejsze pobudzenie",
    "A stronger lift",
    "Krótka sesja o intensywniejszym charakterze dźwięku.",
    "A short session with a more intense sound character.",
  ],
  gammaLift: [
    "energy",
    "Dłuższa aktywacja",
    "A longer lift",
    "Wyraźniejsza sekwencja z wprowadzeniem i spokojnym zakończeniem.",
    "A more present sequence with a gradual opening and soft ending.",
  ],
};
export const sessions = Object.fromEntries(
  Object.entries(copy).map(([id, c]) => [
    id,
    {
      ...(protocols[id] || {
        id: "breath",
        name: "Breath",
        duration: 180,
        phases: [],
      }),
      goal: c[0],
      title: { pl: c[1], en: c[2] },
      description: { pl: c[3], en: c[4] },
    },
  ]),
);
const programCopy = {
  flow90: [
    "Przestrzeń na dłuższy blok pracy.",
    "Space for a longer work block.",
  ],
  socialUpgrade: [
    "Krótka sekwencja przed rozmową.",
    "A short sequence before a conversation.",
  ],
  sleepReset: [
    "Dwie spokojne sesje na wieczór.",
    "Two quiet sessions for the evening.",
  ],
  powerNap45: ["Przerwa z łagodnym powrotem.", "A break with a gentle return."],
  creativeBloom: [
    "Od przygotowania do pracy nad pomysłami.",
    "From settling in to working on ideas.",
  ],
};
export const programs = originalPrograms.map((p) => ({
  ...p,
  description: { pl: programCopy[p.id][0], en: programCopy[p.id][1] },
}));
export const pathFor = (id) => paths.find((p) => p.id === id) || paths[0];
export const sessionFor = (id) => sessions[id] || sessions.deepFocus;
export function makeSession(id, duration) {
  const original = sessionFor(id);
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
        `${s.name} ${s.title[lang]} ${s.description[lang]} ${pathFor(s.goal)[lang]}`
          .toLocaleLowerCase(lang)
          .includes(q)),
  );
}
