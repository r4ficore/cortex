import { revisions } from "./protocols.js";
import { esc } from "./i18n.js";
const p = (pl, en) => ({ pl, en });
const notes = {
  beta: p("Para tonów i brak dodatkowej AM odpowiadają bodźcowi pamięciowemu. Tło Cortex, wybrane zadanie i poziom odsłuchu są inne niż w laboratorium. Dłuższe bloki służą organizacji pracy; nie wykazano, że dają większą korzyść.", "The tone pair and absence of extra AM match the memory stimulus. Cortex background, your task and listening level differ from the lab. Longer blocks structure work; a greater benefit has not been established."),
  gamma: p("Para tonów i brak dodatkowej AM odpowiadają badanemu bodźcowi gamma. Słuchaj podczas zadania. Overdrive to skrócona próba, a nie potwierdzona pięciominutowa dawka energii. Badany poziom dB nie jest przeliczany na procent głośności telefonu.", "The tone pair and absence of extra AM match the studied gamma stimulus. Listen during a task. Overdrive is a short trial, not a validated five-minute energy dose. Laboratory dB levels are not converted to phone-volume percentages."),
  creative: p("Badano stałe 10 Hz z tonów 335/345 Hz: 3 minuty przed zadaniami i dalej w ich trakcie, z białym szumem. Cortex zachowuje tę parę tonów; 10 minut to czas na własną pracę, nie ustalona optymalna ekspozycja.", "The experiment used steady 10 Hz from 335/345 Hz tones, three minutes before tasks and then during them, with white noise. Cortex retains that pair; ten minutes is time for your own work, not an established optimal exposure."),
  alpha: p("Pozostawiono kompozycję w zakresie alfa. Wyniki EEG nie wyznaczają optymalnej siedmiominutowej sesji relaksu. Czas i przejścia są wyborem projektu dźwięku.", "The alpha-range composition is retained. EEG findings do not establish an optimal seven-minute relaxation session. Timing and transitions are sound-design choices."),
  calm: p("Badanie HRV trwało 20 minut po wysiłku i stosowało zmienne 5,5–8,5 Hz, akordy oraz różowy szum. Badanie napięcia trwało 24 minuty z inną muzyką. Żadne nie ustala skutecznej dawki dla środka 3 Hz w Cortex; zachowano go jako kompozycję do odpoczynku, usuwając dodatkową AM.", "The HRV study lasted 20 minutes after exercise and used varying 5.5–8.5 Hz, chords and pink noise. The anxiety trial lasted 24 minutes with different music. Neither defines an effective dose for Cortex’s 3 Hz middle; it remains a rest composition, with extra AM removed."),
  sleep: p("Hypnos zachowuje 8 → 1 Hz oraz wybór 30/45/90 minut lub bez limitu. Pilotaż Lee stosował zmienne 0–3 Hz sterowane etapami snu ocenianymi polisomnografią. Bez pomiaru snu nie odtwarzamy tej procedury. Obecne czasy są ustawieniami słuchania, nie potwierdzonymi dawkami na bezsenność.", "Hypnos retains 8 → 1 Hz and 30/45/90-minute or unlimited listening. Lee’s pilot used dynamic 0–3 Hz triggered by polysomnography-assessed sleep stages. Without sleep measurement we do not reproduce that procedure. These are listening durations, not validated insomnia doses."),
  evening: p("Usunięto dodatkową AM; rytmy theta pozostają kompozycją wieczorną. Badanie napięcia trwało 24 minuty z indywidualnie dobieraną muzyką. Nie ustala ono 30 ani 35 minut jako lepszego czasu, nie uzasadnia sterowania REM ani zegarem biologicznym.", "Extra AM has been removed; theta rhythms remain an evening composition. The anxiety trial lasted 24 minutes with personalised music. It does not establish 30 or 35 minutes as better, or justify control of REM or the body clock."),
};
export function reviewFor(session) {
  if (session.id === "breath") return null;
  const revision = revisions[session.id];
  const group = revision?.study === "memory" ? "beta" : revision?.study === "gamma" ? "gamma"
    : revision?.study === "creativity" ? "creative" : ["presence", "equilibrium"].includes(session.id) ? "alpha"
      : session.id === "hypnos" ? "sleep" : session.goal === "sleep" ? "evening" : "calm";
  return { note: notes[group], studiedSeconds: revision?.studiedSeconds };
}
export function reviewHTML(session, lang, actualDuration = session.duration) {
  const review = reviewFor(session);
  if (!review) return "";
  const pl = lang === "pl", duration = Number.isFinite(actualDuration) ? `${+(actualDuration / 60).toFixed(2)} min` : (pl ? "bez limitu" : "unlimited");
  return `<section class="protocol-review"><h2>${pl ? "Częstotliwość i czas · przegląd v3" : "Frequency and duration · v3 review"}</h2><p><strong>${pl ? "Ta sesja:" : "This session:"} ${duration}</strong>${review.studiedSeconds ? ` · ${pl ? "Ekspozycja w badaniu:" : "Study exposure:"} ${review.studiedSeconds / 60} min` : ""}</p><p>${esc(review.note[lang])}</p></section>`;
}
