import { profileFor } from "./audio-profiles.js";
export const audioContext = {
  breath: {
    name: ["Oddech", "Breathe"],
    sound: [
      "Miękki przepływ powietrza przez cały wdech i wydech, z ciszą podczas zatrzymań. Osobna regulacja głośności prowadzenia.",
      "Soft flowing air throughout each inhale and exhale, with silence during holds. Separate guide volume.",
    ],
    evidence: [
      "Badanie Balban obejmowało pięć minut ćwiczeń dziennie przez miesiąc, w tym box breathing. Nie badało dźwięku Cortex. Nasz syntetyczny oddech jest wskazówką rytmu, a nie dodatkowym bodźcem terapeutycznym.",
      "Balban’s trial included five minutes of daily practice for a month, including box breathing. It did not test Cortex audio. Our synthetic breath is a pacing guide, not an additional therapeutic stimulus.",
    ],
    sources: [
      ["Balban et al., 2023", "https://pubmed.ncbi.nlm.nih.gov/36630953/"],
      [
        "Fincham et al., 2023 · active control",
        "https://www.nature.com/articles/s41598-023-49279-8",
      ],
    ],
  },
  focus: {
    name: ["Skupienie", "Focus"],
    sound: [
      "Stabilne tony i dyskretne, harmonijne tło do dłuższej pracy.",
      "Steady tones and a discreet harmonic background for a longer work session.",
    ],
    evidence: [
      "Lane badał 29 osób przez 30 minut: rytmy 16/24 Hz dawały lepsze wyniki czujności niż 1,5/4 Hz. To kontekst dla eksperymentów z rytmem, nie potwierdzenie naszych częstotliwości, czasów ani wpływu na kreatywność.",
      "Lane studied 29 people for 30 minutes: 16/24 Hz beats produced better vigilance results than 1.5/4 Hz. This provides context for rhythm experiments, not validation of our frequencies, durations or creativity effects.",
    ],
    sources: [
      ["Lane et al., 1998", "https://pubmed.ncbi.nlm.nih.gov/9423966/"],
      [
        "Orozco Perez et al., 2020",
        "https://pmc.ncbi.nlm.nih.gov/articles/PMC7082494/",
      ],
    ],
  },
  calm: {
    name: ["Wyciszenie", "Unwind"],
    sound: [
      "Ciepłe, miękkie tło, łagodne tony i spokojne przejścia.",
      "A warm, soft background, gentle tones and unhurried transitions.",
    ],
    evidence: [
      "Mallik i Russo porównali muzykę, rytmy słuchowe, ich połączenie i szum podczas 24 minut. Wyniki zależały od grupy i rodzaju bodźca. Cortex nie odtwarza badanej muzyki; nazwa Parasym Pathway nie oznacza wykazanej stymulacji nerwu błędnego.",
      "Mallik and Russo compared music, auditory beats, their combination and noise over 24 minutes. Outcomes depended on the group and stimulus. Cortex does not reproduce that music; Parasym Pathway does not imply demonstrated vagus nerve stimulation.",
    ],
    sources: [
      [
        "Mallik & Russo, 2022",
        "https://journals.plos.org/plosone/article?id=10.1371/journal.pone.0259312",
      ],
    ],
  },
  sleep: {
    name: ["Sen", "Sleep"],
    sound: [
      "Niskie, stonowane tło, delikatny rytm i długie wygaszenie na końcu.",
      "A low, subdued background, a gentle rhythm and a long fade at the end.",
    ],
    evidence: [
      "Pilotaż Lee obejmował 10 osób, dynamiczne dudnienia 0–3 Hz i kontrolę bez dźwięku. Nie potwierdza naszych sekwencji ani sterowania fazami snu. Tło jest opcjonalne; więcej szumu nie oznacza lepszego snu.",
      "Lee’s pilot involved 10 people, dynamic 0–3 Hz beats and a silent control. It does not validate our sequences or control of sleep stages. Background sound is optional; more noise does not mean better sleep.",
    ],
    sources: [
      [
        "Lee et al., 2024",
        "https://academic.oup.com/sleep/article/47/10/zsae097/7647043",
      ],
      ["Basner et al., 2026", "https://pubmed.ncbi.nlm.nih.gov/41627391/"],
      ["Vincens et al., 2026", "https://doi.org/10.1038/s43856-026-01380-5"],
    ],
  },
  energy: {
    name: ["Energia", "Energy"],
    sound: [
      "Jaśniejsze, harmonijne tło i wyraźniejszy rytm z płynnym wejściem i zakończeniem.",
      "A brighter harmonic background and a more distinct rhythm with a smooth opening and ending.",
    ],
    evidence: [
      "Attokaren badał uwagę podczas godzinnej stymulacji światłem i dźwiękiem 40 Hz u 62 osób. Wu wykazał odpowiedź EEG bez poprawy badanych funkcji po 30 minutach. Nasze 5- i 16-minutowe sekwencje z sinusoidalną AM są inną procedurą; nie są potwierdzoną dawką pobudzenia.",
      "Attokaren tested attention during an hour of 40 Hz audiovisual stimulation in 62 people. Wu found an EEG response without improvement on the tested functions after 30 minutes. Our five- and sixteen-minute sequences with sinusoidal AM are a different procedure, not a validated activation dose.",
    ],
    sources: [
      ["Attokaren et al., 2026", "https://pubmed.ncbi.nlm.nih.gov/42146314/"],
      ["Wu et al., 2025", "https://pubmed.ncbi.nlm.nih.gov/40034515/"],
    ],
  },
};
export function audioDescription(
  session,
  lang = "pl",
  background = "soundscape",
) {
  const alternatives = {
    none: [
      "Same tony sesji, bez dodatkowego tła.",
      "Session tones without an added background.",
    ],
    brown: [
      "Głębokie tło szumowe z przewagą niskich tonów.",
      "A deep noise background weighted towards low frequencies.",
    ],
    pink: [
      "Miękkie tło szumowe o łagodniejszej górze niż biały szum.",
      "A soft noise background with less high-frequency energy than white noise.",
    ],
    white: [
      "Równe, szerokopasmowe tło szumowe.",
      "An even, broadband noise background.",
    ],
    green: [
      "Filtrowany szum skupiony w środkowej części pasma.",
      "Filtered noise concentrated in the middle of the spectrum.",
    ],
    drone: [
      "Stałe, niskie współbrzmienie tonów w tle.",
      "A sustained, low blend of background tones.",
    ],
  };
  if (alternatives[background])
    return alternatives[background][lang === "pl" ? 0 : 1];
  return audioContext[session.goal || session.soundProfile || "focus"].sound[
    lang === "pl" ? 0 : 1
  ];
}
export function evidenceHTML(goal, lang = "pl") {
  const e = audioContext[goal],
    i = lang === "pl" ? 0 : 1;
  return `<p>${e.evidence[i]}</p><p>${e.sources.map(([name, url]) => `<a href="${url}" target="_blank" rel="noopener">${name}</a>`).join(" · ")}</p>`;
}
export function protocolTable(session, lang = "pl") {
  const pl = lang === "pl";
  return `<div class="table-scroll"><table class="tech-table"><thead><tr><th>${pl ? "Etap" : "Stage"}</th><th>L / R · Hz</th><th>Δ · Hz</th><th>AM · Hz / %</th></tr></thead><tbody>${session.phases.map((p, i) => `<tr><td>${i + 1}</td><td>${p.audio.l} / ${p.audio.r}</td><td>${Math.abs(p.audio.r - p.audio.l)}</td><td>${p.audio.am?.depth ? `${p.audio.am.rate} / ${Math.round(p.audio.am.depth * 100)}` : "—"}</td></tr>`).join("")}</tbody></table></div><p class="help">${pl ? `Wartości docelowe etapów. Przejście trwa ${profileFor(session).transition} s (krócej w skróconym eksporcie). Δ oznacza różnicę L/R; AM — sinusoidalną zmianę amplitudy. Intensywność reguluje poziom tonów, nie częstotliwości.` : `Stage target values. Transitions take ${profileFor(session).transition} s (shorter in shortened exports). Δ is the L/R difference; AM is sinusoidal amplitude modulation. Intensity adjusts tone level, not frequencies.`}</p>`;
}
