import { defaults } from "./store.js";
import {
  recommendations,
  latestSession,
  repeatSetup,
  sessionDuration,
} from "./experience.js";
import { offlinePanel } from "./offline.js";
import {
  rituals,
  ritualFor,
  ritualPlan,
  ritualPreferences,
} from "./rituals.js";
import { backgrounds } from "./background-catalog.js";
import { practiceDuration } from "./breath.js";
import { breathingCopy } from "./session-content.js";
import {
  paths,
  sessions,
  programs,
  pathFor,
  sessionFor,
  filterSessions,
} from "./catalog.js";
import { t, local, language, esc, icon, minutes, time } from "./i18n.js";
import { audioDescription, evidenceHTML, protocolTable } from "./audio-info.js";
import { hasBreathHaptics } from "./platform.js";
import { supportsStimulation, maxVisualFrequency } from "./stimulation.js";
import { orb, breathingForm } from "./visual.js";
export const button = (action, label, symbol = "", cls = "btn", extra = "") =>
  `<button class="${cls}" data-action="${action}" ${extra}>${symbol ? icon(symbol) : ""}${label}</button>`;
const link = (href, label, symbol = "", cls = "btn") =>
  `<a class="${cls}" href="${href}">${symbol ? icon(symbol) : ""}${label}</a>`;
const back = (href = "#home") =>
  link(href, t("Wróć", "Back"), "back", "back-link").replace(
    'class="back-link"',
    'class="back-link" data-back',
  );
const title = (eyebrow, heading, description = "") =>
  `<div class="page-head"><div><div class="eyebrow">${eyebrow}</div><h1>${heading}</h1></div>${description ? `<p>${description}</p>` : ""}</div>`;
const breathArtwork = (pattern) =>
  breathingForm(pattern, {
    inhale: t("Wdech", "Inhale"),
    exhale: t("Wydech", "Exhale"),
    hold: t("Zatrzymaj", "Hold"),
  });
export const breathTip = (pattern) =>
  pattern === "box"
    ? t(
        "W górę — wdech. W dół — wydech. Poziome boki — zatrzymanie.",
        "Up — inhale. Down — exhale. Horizontal sides — hold.",
      )
    : t(
        "Forma rośnie — wdech. Maleje — wydech.",
        "Growing — breathe in. Shrinking — breathe out.",
      );
export function breathControls(prefs, active = false) {
  const mode = prefs.breathCues
    ? prefs.breathVisual
      ? "both"
      : "sound"
    : "visual";
  return `<div class="field"><span>${t("Prowadzenie oddechu", "Breathing guidance")}</span><div class="segmented" role="group" aria-label="${t("Prowadzenie oddechu", "Breathing guidance")}">${[
    ["visual", t("Obraz", "Visual")],
    ["sound", t("Dźwięk", "Sound")],
    ["both", t("Oba", "Both")],
  ]
    .map(([id, label]) =>
      button(
        "guidance",
        label,
        "",
        "",
        `data-value="${id}" aria-pressed="${mode === id}"`,
      ),
    )
    .join(
      "",
    )}</div></div>${prefs.breathCues ? range("breathVolume", t("Dźwięk oddechu", "Breathing sound"), prefs) : ""}<label class="field"><span>${t("Tło podczas oddechu", "Background while breathing")}</span><select data-pref="breathBackground">${backgrounds
    .filter((b) => ["none", "soundscape", "brown", "pink"].includes(b.id))
    .map(
      (b) =>
        `<option value="${b.id}" ${prefs.breathBackground === b.id ? "selected" : ""}>${local(b)}</option>`,
    )
    .join(
      "",
    )}</select></label>${prefs.breathBackground !== "none" ? range("breathBackgroundVolume", t("Głośność tła", "Background volume"), prefs) : ""}${button("previewBreath", t("Posłuchaj jednego cyklu", "Listen to one cycle"), "volume", "btn btn-quiet", active ? "disabled" : "")}<p class="help">${t("Wdech: łagodnie narastający szum. Wydech: cieplejszy, opadający. To syntezowany dźwięk powietrza. Oddychaj w wygodnym zakresie.", "Inhale: gently rising air. Exhale: a warmer, falling sound. This is synthesized air. Breathe within a comfortable range.")}</p>`;
}
export function nav(current, mobile = false) {
  return [
    ["home", "home", t("Start", "Home")],
    ["library", "library", t("Biblioteka", "Library")],
    ["mine", "history", t("Moje sesje", "My sessions")],
  ]
    .map(
      ([id, symbol, name]) =>
        `<a class="nav-item" href="#${id}" ${current === id ? 'aria-current="page"' : ""}>${mobile ? icon(symbol, 21) : ""}<span>${name}</span></a>`,
    )
    .join("");
}
export function header(current) {
  return `<a class="brand" href="#home" aria-label="Cortex"><img src="assets/images/cortex-mark.svg" alt="">cortex</a><nav class="desktop-nav" aria-label="${t("Nawigacja główna", "Main navigation")}">${nav(current)}</nav><div class="header-actions">${button("settings", "", "settings", "icon-btn", `aria-label="${t("Ustawienia", "Settings")}"`)}</div>`;
}
export function pathCards() {
  return `<div class="paths">${paths.map((p) => `<a href="#${p.id === "breath" ? "prepare/breath" : "path/" + p.id}" class="path-card" data-goal="${p.id}"><span class="path-symbol">${icon(p.icon)}</span><h3>${local(p)}</h3><p>${p.intro[language === "pl" ? 0 : 1]}</p><span class="path-arrow">${icon("arrow", 17)}</span></a>`).join("")}</div>`;
}
export function home(prefs, history = [], flow = null) {
  const last = latestSession(history),
    setup = last && repeatSetup(last, prefs);
  const resume = flow
    ? `<section class="return-card" data-goal="${flow.session.goal}"><div><span class="eyebrow">${t("Sesja w toku", "Session in progress")}</span><h2>${local(flow.ritual?.name || flow.session.title)}</h2><p>${t("Wróć do swojego miejsca.", "Pick up where you left off.")}</p></div>${link("#session", t("Wróć do sesji", "Return to session"), "play", "btn btn-primary")}</section>`
    : setup
      ? `<section class="return-card" data-goal="${setup.goal}"><div><span class="eyebrow">${t("Ostatnio", "Last time")}</span><h2>${local(setup.kind === "program" ? setup.name : setup.kind === "ritual" ? ritualFor(setup.id).name : sessions[setup.id].title)}</h2><p>${durationLabel(setup.duration)} · ${local(pathFor(setup.goal))}</p></div>${button("repeatLast", setup.kind === "program" ? t("Zobacz program", "View programme") : t("Powtórz sesję", "Repeat session"), "play", "btn", `data-id="${esc(last.id)}"`)}<div id="startError" class="error" role="alert" hidden></div></section>`
      : "";
  return `<section class="start-heading"><div class="eyebrow">${t("Chwila dla Ciebie", "A moment for you")}</div><h1>${t("Czego dziś potrzebujesz?", "What do you need today?")}</h1><p>${t("Wybierz potrzebę. Twoja sesja jest gotowa.", "Choose a need. Your session is ready.")}</p></section>${flow ? resume : ""}<div class="need-grid">${paths.map((path) => `<a class="need-card" data-goal="${path.id}" href="#${recommendations[path.id]}"><span class="path-symbol">${icon(path.icon)}</span><span><strong>${local(path)}</strong><span class="need-description">${path.intro[language === "pl" ? 0 : 1]}</span></span>${icon("arrow", 18)}</a>`).join("")}</div>${!flow ? resume : ""}<div class="start-footer">${link("#knowledge", t("Jak korzystać z Cortex", "Getting started with Cortex"), "book", "text-link small")}<span>${t("W swoim rytmie.", "At your own pace.")}</span></div>`;
}
export function sessionCard(s, recommended = false) {
  return `<a class="session-card" href="#prepare/${s.id}" data-goal="${s.goal}"><div class="session-card-top"><span class="path-symbol">${icon(pathFor(s.goal).icon)}</span><span class="pill">${s.id === "hypnos" ? t("30–90 min lub bez limitu", "30–90 min or unlimited") : minutes(s.duration)}</span></div><div><p class="protocol">${s.id === "breath" ? t("Prowadzony oddech", "Guided breathing") : s.name}${recommended ? " · " + t("Na początek", "Start here") : ""}</p><h3>${local(s.title)}</h3></div><p>${local(s.description)}</p><span class="card-link">${t("Zobacz sesję", "View session")}${icon("arrow", 18)}</span></a>`;
}
export function libraryCards(filters, prefs = defaults) {
  return (
    rituals
      .filter((r) => {
        const duration =
          ritualPlan(r.id, ritualPreferences(r.id, prefs)).at(-1).end / 60;
        return (
          (filters.goal === "all" || filters.goal === r.goal) &&
          (!filters.query ||
            `${local(r.name)} ${local(r.description)}`
              .toLocaleLowerCase()
              .includes(filters.query.toLocaleLowerCase())) &&
          (filters.duration === "all" ||
            (filters.duration === "short" && duration <= 5) ||
            (filters.duration === "medium" && duration > 5 && duration <= 15) ||
            (filters.duration === "long" && duration > 15))
        );
      })
      .map(
        (r) =>
          `<a class="session-card" href="#ritual/${r.id}" data-goal="${r.goal}"><div class="session-card-top"><span class="path-symbol">${icon(pathFor(r.goal).icon)}</span><span class="pill">${minutes(ritualPlan(r.id, ritualPreferences(r.id, prefs)).at(-1).end)}</span></div><h3>${local(r.name)}</h3><p>${local(r.description)}</p><span class="card-link">${t("Zobacz sesję", "View session")}${icon("arrow", 18)}</span></a>`,
      )
      .join("") +
      filterSessions(filters.goal, filters.duration, filters.query, language)
        .map((s) => sessionCard(s))
        .join("") ||
    `<div class="empty"><h2>${t("Spróbuj innego wyboru", "Try another combination")}</h2><p>${t("Brak sesji dla tych filtrów. Zmień czas lub ścieżkę.", "No sessions match these filters. Try another duration or path.")}</p>${button("clearFilters", t("Wyczyść filtry", "Clear filters"))}</div>`
  );
}
export function library(filters, prefs = defaults) {
  return `${title(t("W swoim rytmie", "At your own pace"), t("Biblioteka", "Your library"), t("Wszystkie sesje, oddech i gotowe sekwencje w jednym miejscu.", "All sessions, breathing and ready-made sequences in one place."))}<div class="library-help">${link(language === "pl" ? "guide-pl.html" : "guide.html", t("Jak korzystać", "Getting started"), "book", "text-link small")}${link(language === "pl" ? "whitepaper-pl.html" : "whitepaper.html", t("Podstawy naukowe", "The science"), "", "text-link small")}</div><div class="filter-tabs" role="group" aria-label="${t("Ścieżka", "Path")}">${[["all", t("Wszystkie", "All")], ...paths.map((p) => [p.id, local(p)])].map(([id, name]) => `<button class="chip" data-action="filterGoal" data-value="${id}" aria-pressed="${filters.goal === id}">${name}</button>`).join("")}</div><div class="filters"><label class="search"><span class="sr-only">${t("Szukaj sesji", "Search sessions")}</span><input type="search" id="searchSessions" value="${esc(filters.query)}" placeholder="${t("Szukaj sesji lub potrzeby…", "Search for a session or intention…")}"></label><label><span class="sr-only">${t("Długość sesji", "Session length")}</span><select id="durationFilter">${[
    ["all", t("Dowolny czas", "Any duration")],
    ["short", t("Do 5 minut", "Up to 5 minutes")],
    ["medium", t("6–15 minut", "6–15 minutes")],
    ["long", t("Ponad 15 minut", "Over 15 minutes")],
  ]
    .map(
      ([id, name]) =>
        `<option value="${id}" ${filters.duration === id ? "selected" : ""}>${name}</option>`,
    )
    .join(
      "",
    )}</select></label></div><div id="libraryResults" class="session-grid" aria-live="polite">${libraryCards(filters, prefs)}</div><div class="section-title"><h2>${t("Zostań na dłużej", "Stay a little longer")}</h2><span class="small muted">${t("Programy · kilka sesji w jednej ścieżce", "Programmes · a few sessions, one journey")}</span></div><div class="programs">${programs.map((p) => `<article class="program-card"><div class="overline">${icon("clock", 18)}${minutes(p.steps.reduce((n, s) => n + s.durationMinutes * 60, 0))}</div><h3>${p.name}</h3><p>${local(p.description)}</p><div class="steps-inline">${p.steps.map((s) => sessionFor(s.sessionId).name).join(" → ")}</div>${link("#program/" + p.id, t("Zobacz program", "View programme"), "arrow", "btn btn-quiet")}</article>`).join("")}</div>`;
}
let fieldSerial = 0;
export const range = (key, label, prefs, max = 100) => {
  const id = `${key}-${++fieldSerial}`;
  return `<div class="field"><label class="range-label" for="${id}"><span>${label}</span><output data-for="${key}">${Math.round(prefs[key] * 100)}%</output></label><input type="range" id="${id}" data-pref="${key}" min="0" max="${max}" value="${Math.round(prefs[key] * 100)}"></div>`;
};
export const toggle = (key, label, description, prefs) =>
  `<label class="switch-row"><span class="switch-copy"><strong>${label}</strong>${description ? `<small>${description}</small>` : ""}</span><input type="checkbox" switch role="switch" data-pref="${key}" ${prefs[key] ? "checked" : ""}></label>`;
const choose = (key, options, prefs) =>
  `<div class="segmented" role="group">${options.map(([id, label]) => `<button data-action="preference" data-key="${key}" data-value="${id}" aria-pressed="${String(prefs[key]) === String(id)}">${label}</button>`).join("")}</div>`;
const noiseField = (prefs) =>
  `<label class="field"><span>${t("Tło dźwiękowe", "Background sound")}</span><select data-pref="noiseType">${backgrounds
    .map((b) => [b.id, local(b)])
    .map(
      ([id, l]) =>
        `<option value="${id}" ${prefs.noiseType === id ? "selected" : ""}>${l}</option>`,
    )
    .join("")}</select></label>`;
const durationLabel = (seconds) =>
  Number.isFinite(seconds) && seconds % 60
    ? `${time(seconds)} min`
    : minutes(seconds);
const backgroundName = (id) =>
  local(
    backgrounds.find((b) => b.id === id) ||
      backgrounds.find((b) => b.id === "none"),
  );
const visualName = (mode) =>
  ({
    calm: t("Spokojna forma", "Quiet form"),
    none: t("Bez animacji", "No animation"),
    night: t("Nocna forma", "Night visual"),
    black: t("Czarny ekran", "Black screen"),
    advanced: t("Rytmiczne światło", "Rhythmic light"),
  })[mode];
function setupSummary(prefs, breath, visual) {
  return `<dl class="setup-summary">${breath ? `<div><dt>${t("Oddech", "Breathing")}</dt><dd>${prefs.breathPattern === "box" ? "Box · 4–4–4–4" : prefs.breathPattern.replaceAll("-", "–")} · ${prefs.breathCues ? (prefs.breathVisual ? t("obraz i dźwięk", "visual & sound") : t("dźwięk", "sound")) : t("obraz", "visual")}</dd></div>` : `<div><dt>${t("Dźwięk", "Sound")}</dt><dd>${backgroundName(prefs.noiseType)} · ${Math.round(prefs.masterVolume * 100)}%</dd></div>`}<div><dt>${breath ? t("Tło", "Background") : t("Ekran", "Screen")}</dt><dd>${breath ? backgroundName(prefs.breathBackground) : visualName(visual)}</dd></div></dl>`;
}
function sessionExplanation(content) {
  return `<details class="setup-about" id="setupAbout"><summary>${t("Co daje ta sesja i jak działa", "What this session offers and how it works")}</summary><div class="session-explanation"><h2>${t("Po co ją wybrać", "Why choose it")}</h2><p>${esc(local(content.benefit))}</p><h2>${t("Jak działa", "How it works")}</h2><p>${esc(local(content.how))}</p><h2>${t("Jak z niej skorzystać", "How to use it")}</h2><p>${esc(local(content.practice))}</p></div></details>`;
}
function setupLayout({
  goal,
  name,
  description,
  explanation,
  duration,
  summary,
  controls,
  action,
  save,
  sequence,
  alternative = true,
}) {
  return `${back()}<div class="setup-layout" data-goal="${goal}"><section class="setup-intro"><div class="overline">${icon(pathFor(goal).icon, 20)}${local(pathFor(goal))}</div><h1>${name}</h1><p>${description}</p><div class="setup-art" aria-hidden="true">${orb(goal)}</div></section><section class="setup-main" aria-label="${t("Twoja sesja", "Your session")}"><div class="setup-duration">${icon("clock", 20)}<strong>${durationLabel(duration)}</strong><span>${goal === "breath" ? t("dla oddechu", "to breathe") : t("dla siebie", "for yourself")}</span></div>${sequence ? `<p class="setup-sequence">${sequence}</p>` : ""}${summary}<div class="start-dock"><div id="startError" class="error" role="alert" hidden></div>${action}</div>${explanation || ""}<details class="setup-adjust" id="setupAdjust"><summary><span>${icon("settings", 18)}${t("Dopasuj", "Adjust")}</span><span class="small muted">${t("Dźwięk i obraz", "Sound & visuals")}</span></summary><div class="form-stack">${controls}${save || ""}</div></details>${alternative ? link("#library/" + goal, t("Inne sesje w tej ścieżce", "Other sessions for this need"), "arrow", "text-link setup-alternatives") : ""}<a class="help text-link setup-help" href="${language === "pl" ? "guide-pl.html" : "guide.html"}#safety">${t("Jak korzystać komfortowo", "Using Cortex comfortably")}</a></section></div>`;
}
export function prepare(
  id,
  prefs,
  visualMode,
  busy,
  active,
  pendingProgram = null,
  lightSettings = { mode: "adaptive", contrast: 0.06 },
) {
  const s = sessionFor(id),
    breath = id === "breath";
  const content = breath
    ? breathingCopy[prefs.breathPattern] || breathingCopy["4-6"]
    : s;
  const programStep = pendingProgram?.program.steps[pendingProgram.index];
  const duration = programStep
    ? programStep.durationMinutes * 60 +
      (prefs.prelude && pendingProgram.index === 0 ? 60 : 0)
    : sessionDuration(id, prefs);
  const controls = `${
    breath
      ? `<div class="field"><span>${t("Czas ćwiczenia", "Practice length")}</span>${choose(
          "breathDuration",
          [
            ...[60, 180, 300].map((n) => [
              n,
              time(practiceDuration(n, prefs.breathPattern)),
            ]),
          ],
          prefs,
        )}</div><label class="field"><span>${t("Rytm oddechu", "Breathing rhythm")}</span><select data-pref="breathPattern"><option value="4-6" ${prefs.breathPattern === "4-6" ? "selected" : ""}>${t("4–6 · wdech i wydech", "4–6 · inhale and exhale")}</option><option value="box" ${prefs.breathPattern === "box" ? "selected" : ""}>${t("Box · 4–4–4–4 z pauzami", "Box · 4–4–4–4 with holds")}</option><option value="4-7-8" ${prefs.breathPattern === "4-7-8" ? "selected" : ""}>${t("4–7–8 · z pauzą", "4–7–8 · with a hold")}</option></select></label><p class="help">${breathTip(prefs.breathPattern)} ${t("Czas obejmuje pełne cykle. W każdej chwili możesz zakończyć i wrócić do naturalnego oddechu.", "The duration includes complete cycles. You can stop and return to natural breathing at any time.")}</p>${breathControls(prefs, active)}${hasBreathHaptics() ? toggle("breathHaptics", t("Rytm dotykiem", "Feel the rhythm"), t("Jeden impuls: wdech. Dwa: wydech.", "One tap: inhale. Two taps: exhale."), prefs) : `<p class="help">${t("Ta przeglądarka nie udostępnia wibracji do prowadzenia oddechu. Możesz podążać za dźwiękiem oddechu.", "This browser does not provide vibration for guided breathing. You can follow the breathing sound instead.")}</p>`}`
      : `${
          id === "hypnos" && !programStep
            ? `<div class="field"><span>${t("Zakończ po", "End after")}</span>${choose(
                "hypnosDuration",
                [
                  ["30", "30 min"],
                  ["45", "45 min"],
                  ["90", "90 min"],
                  ["infinity", "∞"],
                ],
                prefs,
              )}</div>`
            : ""
        }${range("masterVolume", t("Głośność", "Volume"), prefs, 110)}${noiseField(prefs)}<p class="help">${audioDescription(s, language, prefs.noiseType)}</p>${button("previewSession", t("Posłuchaj brzmienia · 12 s", "Preview the sound · 12 s"), "volume", "btn btn-quiet", active ? "disabled" : "")}${toggle("prelude", t("Minuta oddechu przed sesją", "One minute of breathing first"), t("Łagodny rytm 4–6. Możesz go pominąć.", "A gentle 4–6 rhythm. Skip it whenever you like."), prefs)}${prefs.prelude ? breathControls(prefs, active) : ""}<details class="details"><summary>${t("Dopasuj więcej", "More options")}</summary><div class="form-stack">${range("beatVolume", t("Tony", "Tones"), prefs, 120)}${range("noiseVolume", t("Tło", "Background"), prefs, 120)}<label class="field"><span>${t("Intensywność dźwięku", "Sound intensity")}</span><select data-pref="intensity">${[
          ["low", t("Łagodna", "Low")],
          ["medium", t("Standardowa", "Standard")],
          ["high", t("Mocniejsza", "Higher")],
        ]
          .map(
            ([v, l]) =>
              `<option value="${v}" ${prefs.intensity === v ? "selected" : ""}>${l}</option>`,
          )
          .join(
            "",
          )}</select></label><div><span class="small">${t("Test słuchawek", "Headphone check")}</span><div class="button-row">${button("testLeft", t("Lewy kanał", "Left channel"), "headphones")}${button("testRight", t("Prawy kanał", "Right channel"), "headphones")}</div></div><details class="details"><summary>${t("Parametry protokołu", "Protocol details")}</summary>${protocolTable(s, language)}<p class="help">${t("Sekwencja autorska · audio v2. Parametry opisują sygnał, nie stan mózgu.", "Original sequence · audio v2. Parameters describe the signal, not brain activity.")}</p>${evidenceHTML(s.goal, language)}</details></div></details>`
  }<details class="details"><summary>${t("Obraz i ruch", "Visuals and motion")}</summary><div class="form-stack"><label class="field"><span>${t("Wizualizacja", "Visual style")}</span><select id="visualMode">${visualOptions(visualMode, s, breath)}</select></label>${visualMode === "black" ? `<p class="help">${t("Czarny ekran odsłonisz jednym dotknięciem. To wygaszenie strony, nie blokada telefonu. Paski Safari mogą pozostać widoczne.", "Tap once to reveal the controls. This blacks out the page; it does not lock your phone. Safari bars may remain visible.")}</p>` : ""}${visualMode === "advanced" ? `<div class="light-setup"><p class="help">${t("Rozwiń widok, aby światło wypełniło ekran. Sterowanie schowa się po 3 sekundach; dotknij obrazu, aby je przywrócić.", "Expand the view to fill the screen with light. Controls hide after 3 seconds; tap the image to bring them back.")}</p><label class="field"><span>${t("Częstotliwość światła", "Light frequency")}</span><select id="lightMode"><option value="adaptive" ${lightSettings.mode === "adaptive" ? "selected" : ""}>${t("Dopasuj do ekranu", "Adapt to display")}</option><option value="protocol" ${lightSettings.mode === "protocol" ? "selected" : ""}>${t("Dokładnie według protokołu", "Follow the protocol exactly")}</option></select></label><p class="help">${t("Dopasowanie ogranicza częstotliwość światła do możliwości przeglądarki: około 60 klatek/s → maks. 20 Hz, 120 → maks. 40 Hz. Zobaczysz używaną wartość. To wariant wizualny, nie ten sam bodziec co oryginalny protokół; dźwięk pozostaje bez zmian.", "Adaptation caps light frequency to browser capability: about 60 frames/s → up to 20 Hz, 120 → up to 40 Hz. The applied value is shown. This is a visual variant, not the original protocol stimulus; audio is unchanged.")}</p><label class="field"><span>${t("Kontrast pulsacji", "Pulse contrast")}</span><select id="lightContrast"><option value="0.04" ${lightSettings.contrast === 0.04 ? "selected" : ""}>${t("Delikatny", "Gentle")}</option><option value="0.06" ${lightSettings.contrast === 0.06 ? "selected" : ""}>${t("Standardowy", "Standard")}</option><option value="0.08" ${lightSettings.contrast === 0.08 ? "selected" : ""}>${t("Wyraźniejszy", "More visible")}</option></select></label><p class="help">${t("Protokół tej sesji sięga", "This protocol reaches")} ${maxVisualFrequency(s)} Hz. ${t("Tryb dokładny wstrzyma światło tylko podczas etapu, którego ekran nie potrafi odtworzyć.", "Exact mode suspends light only during a stage the display cannot reproduce.")}</p><p class="light-warning">${t("Migotanie może wywołać napad, ból głowy lub nudności. Nie włączaj przy padaczce lub nadwrażliwości na migotanie. Przerwij przy dyskomforcie. Skuteczność tej wersji Cortex nie została potwierdzona.", "Flicker can trigger seizures, headache or nausea. Do not enable with epilepsy or sensitivity to flicker. Stop if uncomfortable. Effectiveness of this Cortex version has not been established.")}</p></div>` : ""}${toggle("reduceMotion", t("Ogranicz ruch", "Reduce motion"), t("Ustawienie systemowe jest zawsze respektowane.", "The system preference is always respected."), prefs)}</div></details>`;
  const action = active
    ? link(
        "#session",
        t("Wróć do trwającej sesji", "Return to current session"),
        "play",
        "btn btn-primary btn-wide",
      )
    : button(
        "start",
        busy
          ? t("Przygotowuję…", "Preparing…")
          : visualMode === "advanced"
            ? t("Rozpocznij z pulsacją", "Begin with light")
            : t("Rozpocznij", "Begin"),
        "play",
        "btn btn-primary btn-wide",
        `${busy ? "disabled" : ""} data-session="${s.id}"`,
      );
  return setupLayout({
    goal: s.goal,
    name: local(s.title),
    description: local(content.description),
    explanation: sessionExplanation(content),
    duration,
    summary: setupSummary(prefs, breath, visualMode),
    controls,
    action,
    sequence: programStep
      ? `${esc(pendingProgram.program.name)} · ${t("Etap", "Step")} ${pendingProgram.index + 1}/${pendingProgram.program.steps.length}`
      : breath
        ? t(
            "Oddychaj łagodnie, w wygodnym dla siebie zakresie.",
            "Breathe gently, within a comfortable range.",
          )
        : `${s.name}${prefs.prelude ? " · " + t("Minuta oddechu na początek", "One minute of breathing first") : ""} · ${t("Słuchawki stereo", "Stereo headphones")}`,
    save: !programStep
      ? button(
          "saveSession",
          prefs.sessionProfiles?.[id]
            ? t("Zapisz moje ustawienia", "Update my settings")
            : t("Dodaj do Moich sesji", "Add to My sessions"),
          "",
          "btn",
          `data-session="${id}"`,
        )
      : "",
    alternative: !programStep,
  });
}
export function programView(id, active) {
  const p = programs.find((p) => p.id === id);
  if (!p) return library({ goal: "all", duration: "all", query: "" });
  const steps = p.steps.map((step, i) => {
    const session = sessionFor(step.sessionId);
    return `<li><span class="step-number">${i + 1}</span><div><h3>${session.name}</h3><p>${minutes(step.durationMinutes * 60)} · ${local(session.title)}</p><p class="program-purpose">${local(session.description)}</p></div></li>`;
  }).join("");
  const action = active
    ? link("#session", t("Wróć do sesji", "Return to session"), "play", "btn btn-primary")
    : button("startProgram", t("Przygotuj pierwszy etap", "Prepare the first step"), "arrow", "btn btn-primary", `data-program="${p.id}"`);
  return `${back("#library")}${title(t("Program", "Programme"), p.name, local(p.description))}<div class="prepare-layout program-layout"><section class="prepare-panel"><h2>${minutes(p.steps.reduce((n, s) => n + s.durationMinutes * 60, 0))}</h2><p>${t("Po każdym etapie możesz zrobić przerwę. Kolejny uruchomisz wtedy, gdy zechcesz.", "Take a break after each step. Start the next one when you are ready.")}</p><div class="form-stack" style="margin-top:25px">${action}</div></section><section class="program-outline" aria-label="${t("Etapy programu", "Programme steps")}"><ol class="program-steps">${steps}</ol></section></div>`;
}
export function visualOptions(mode, session, breath = false, playing = false) {
  const options = [
    ["calm", t("Spokojna forma", "Quiet form")],
    ["none", t("Bez animacji", "No animation")],
  ];
  if (!breath)
    options.push(
      ["night", t("Nocna wizualizacja", "Night visual")],
      ["black", t("Całkowicie czarny ekran", "Completely black screen")],
    );
  if (supportsStimulation(session) && (!playing || mode === "advanced"))
    options.push([
      "advanced",
      t("Rytmiczne światło · eksperymentalne", "Rhythmic light · experimental"),
    ]);
  return options
    .map(
      ([id, label]) =>
        `<option value="${id}" ${mode === id ? "selected" : ""}>${label}</option>`,
    )
    .join("");
}
export function player(flow, prefs) {
  const s = flow.session,
    breath = s.id === "breath" || flow.stage === "prelude",
    goal = breath ? "breath" : s.goal,
    light = flow.visual === "advanced" && !breath,
    pattern = flow.stage === "prelude" ? "4-6" : flow.pattern;
  return `<section class="player" id="player" data-goal="${goal}"><header class="player-top"><div><div class="overline">${flow.ritual ? `${local(flow.ritual.name)} · ${flow.stepIndex + 1}/${flow.steps.length}` : flow.program ? `${flow.program.name} · ${flow.stepIndex + 1}/${flow.program.steps.length}` : local(pathFor(goal))}</div><h1>${flow.stage === "prelude" ? t("Chwila oddechu przed sesją", "A breath before your session") : local(s.title)}</h1><p>${flow.stage === "prelude" ? s.name : breath ? (pattern === "box" ? t("Oddech pudełkowy · 4–4–4–4", "Box breathing · 4–4–4–4") : t("Rytm", "Rhythm") + " " + pattern.replaceAll("-", "–")) : s.name + (s.duration === Infinity ? " · " + t("bez limitu", "unlimited") : "")}</p>${flow.ritual && flow.steps.length > 1 ? `<p class="ritual-progress-copy" id="ritualRemaining">${t("Cały rytuał", "Whole ritual")}: ${time(flow.ritualRemaining)}</p>` : ""}<p class="help" id="wakeStatus" role="status" hidden></p><p class="motion-note" id="motionNote" role="status" hidden></p></div>${button("fullscreen", "", "expand", "icon-btn", `aria-label="${t("Rozwiń widok", "Expand view")}" aria-pressed="false"`)}</header><div class="player-stage ${breath ? "breathing" : ""} ${flow.visual === "none" ? "audio-only" : ""} ${flow.visual === "advanced" && !breath ? "light-stage" : ""}">${breath ? breathArtwork(pattern) : light ? "" : orb(goal)}${light ? `<div class="light-field" id="lightField" aria-hidden="true"></div><button class="light-reveal" data-action="showLightControls" aria-label="${t("Pokaż sterowanie światłem", "Show light controls")}"></button><div class="light-info"><p class="light-status" id="lightStatus" role="status"></p><div class="light-actions">${button("retryLight", t("Sprawdź ponownie", "Check again"), "", "btn btn-quiet", 'id="retryLight" hidden')}${button("adaptLight", t("Dopasuj do ekranu", "Adapt to display"), "", "btn btn-quiet", 'id="adaptLight" hidden')}${button("disableLight", t("Wyłącz światło", "Turn light off"), "", "btn btn-quiet")}</div><p class="light-hint">${t("W pełnym widoku: dotknij, aby pokazać sterowanie.", "In full view: tap to show controls.")}</p></div>` : ""}<div class="breath-caption"><strong id="breathLabel" aria-live="polite" aria-atomic="true">${breath ? t("Wdech", "Breathe in") : ""}</strong><span class="breath-count" id="breathCount"></span></div></div><footer class="player-bottom"><div class="player-clock" id="playerClock">${time(flow.clock.duration)}</div><div class="player-progress" role="progressbar" aria-label="${t("Postęp sesji", "Session progress")}" aria-valuemin="0" aria-valuemax="100" aria-valuenow="0"><span id="playerProgress"></span></div><div class="player-controls">${button("pause", t("Pauza", "Pause"), "pause", "btn btn-primary", `id="pauseButton"`)}${button("end", t("Zakończ", "Finish"), "stop", "btn")}</div>${!breath || prefs.breathCues || prefs.breathBackground !== "none" ? `<div class="player-volume">${icon("volume", 18)}<label class="sr-only" for="playerVolume">${breath ? (prefs.breathCues ? t("Dźwięk oddechu", "Breathing sound") : t("Głośność tła", "Background volume")) : t("Głośność", "Volume")}</label><input type="range" id="playerVolume" data-pref="${breath ? (prefs.breathCues ? "breathVolume" : "breathBackgroundVolume") : "masterVolume"}" min="0" max="${breath ? 100 : 110}" value="${Math.round((breath ? (prefs.breathCues ? prefs.breathVolume : prefs.breathBackgroundVolume) : prefs.masterVolume) * 100)}"></div>` : ""}${flow.visual === "advanced" && !breath ? "" : `<p class="player-tip" id="playerTip">${breath ? breathTip(pattern) : t("Ta chwila jest dla Ciebie.", "This moment is yours.")}</p>`}${breath && prefs.breathCues && prefs.breathBackground !== "none" ? `<details class="player-mix"><summary>${t("Głośność tła", "Background volume")}</summary>${range("breathBackgroundVolume", t("Tło", "Background"), prefs)}</details>` : ""}${!breath ? `<label class="player-visual field"><span class="sr-only">${t("Obraz podczas sesji", "Session visual")}</span><select id="playerVisual">${visualOptions(flow.visual, s, false, true)}</select></label>` : ""}${light ? button("hideLightControls", t("Ukryj sterowanie", "Hide controls"), "", "btn btn-quiet light-hide") : ""}${flow.ritual && flow.stepIndex < flow.steps.length - 1 ? button("skipRitual", t("Pomiń ten etap", "Skip this step"), "arrow", "btn btn-quiet") : ""}${flow.stage === "prelude" ? button("skipPrelude", t("Przejdź do sesji", "Skip to session"), "arrow", "btn btn-quiet") : ""}</footer></section>`;
}
export function between(flow) {
  const next = flow.program.steps[flow.stepIndex + 1];
  return `<section class="completion">${orb(flow.session.goal)}<div class="eyebrow">${flow.program.name}</div><h1>${t("Zrób chwilę przerwy.", "Take a little break.")}</h1><p>${t("Kolejny etap", "Up next")}: ${sessionFor(next.sessionId).name} · ${minutes(next.durationMinutes * 60)}</p><div class="button-row" style="justify-content:center">${button("nextStep", t("Rozpocznij kolejny etap", "Start next step"), "play", "btn btn-primary")}${button("endProgram", t("Zakończ program", "Finish programme"))}</div></section>`;
}
export function completed(result) {
  if (result.night)
    return `<section class="completion"><div class="eyebrow">${t("Rytuał zakończony", "Ritual finished")}</div><h1>${t("Spokojnej nocy.", "Rest well.")}</h1><p>${time(result.durationSeconds)}</p>${link("#home", t("Wróć do startu", "Back to home"), "arrow", "btn")}</section>`;
  return `<section class="completion" data-goal="${result.goal}">${orb(result.goal)}<div class="eyebrow">${t("Chwila dla Ciebie", "A moment for you")}</div><h1>${t("Dobrze mieć tę chwilę.", "A little space, just for you.")}</h1><div class="completion-stat">${time(result.durationSeconds)}</div><p>${t("czasu dla siebie", "of time for yourself")} · ${esc(local(result.name))}</p>${!result.ritualId ? `<p class="small">${t("Jak się teraz czujesz?", "How do you feel now?")}</p><div class="rating-row" aria-label="${t("Ocena samopoczucia od 1 do 5", "How you feel, from 1 to 5")}">${[1, 2, 3, 4, 5].map((n) => `<button data-action="rate" data-value="${n}" aria-label="${n} / 5" aria-pressed="${result.rating === n}">${n}</button>`).join("")}</div>` : ""}${result.ritualId ? `<p class="small">${t("Czy ta chwila była pomocna?", "Was this moment helpful?")}</p>` + usefulness(result.id, result.usefulness) : ""}${result.sessionId && !result.programId ? `<div class="completion-save">${button("saveResult", t("Zapisz te ustawienia", "Save these settings"), "", "btn")}</div>` : ""}${link("#home", t("Wróć do startu", "Back to home"), "arrow", "btn btn-primary")}<p class="help" style="margin-top:18px">${t("Ocena jest opcjonalna i zostaje na tym urządzeniu.", "Your rating is optional and stays on this device.")}</p></section>`;
}
export function historyView(history, embedded = false) {
  const total = history.reduce(
    (n, h) => n + (Number(h.durationSeconds) || 0),
    0,
  );
  return `${embedded ? `<div class="section-title history-heading"><h2>${t("Historia", "History")}</h2></div>` : title(t("Twoje chwile", "Your moments"), t("Historia", "History"), t("Czas, który znajdujesz dla siebie. Zapisany tylko na tym urządzeniu.", "The time you make for yourself. Saved only on this device."))}<div class="stats-strip"><div><strong>${history.length}</strong><span>${t("sesji", "sessions")}</span></div><div><strong>${Math.round(total / 60)}</strong><span>${t("minut dla siebie", "minutes for yourself")}</span></div></div>${
    history.length
      ? history
          .slice()
          .sort(
            (a, b) =>
              (b.endedAt || b.startedAt || 0) - (a.endedAt || a.startedAt || 0),
          )
          .map((h) => {
            const s = sessionFor(h.sessionId),
              goal = paths.some((p) => p.id === h.goal) ? h.goal : s.goal;
            const date = new Date(h.endedAt || h.startedAt || 0);
            return `<article class="history-row" data-goal="${goal}"><span class="path-symbol">${icon(pathFor(goal).icon)}</span><div><h3>${h.ritualId && ritualFor(h.ritualId) ? local(ritualFor(h.ritualId).name) : local(s.title)}</h3><p>${local(pathFor(goal))} · ${Number.isNaN(date.getTime()) ? "—" : date.toLocaleDateString(language, { day: "numeric", month: "short" })}${h.programName ? " · " + esc(h.programName) : ""}</p></div><div class="history-time">${time(h.durationSeconds)}<p>${h.completed ? t("Ukończono", "Completed") : t("Zakończono wcześniej", "Finished early")}${h.rating ? " · " + esc(h.rating) + "/5" : ""}</p></div>${h.ritualId && ritualFor(h.ritualId) ? `<div class="history-ritual"><details><summary>${t("Ustawienia i ocena", "Settings and feedback")}</summary>${ritualHistorySettings(h)}${usefulness(h.id, h.usefulness)}</details>${button("replayRitual", t("Powtórz", "Repeat"), "play", "btn btn-quiet", `data-id="${esc(h.id)}"`)}</div>` : `<div class="history-repeat">${button("replaySession", t("Powtórz", "Repeat"), "play", "btn btn-quiet", `data-id="${esc(h.id)}"`)}</div>`}</article>`;
          })
          .join("")
      : `<div class="empty">${icon("history", 32)}<h2>${t("Tu zapiszą się Twoje chwile", "Your moments will appear here")}</h2><p>${t("Po pierwszej sesji zobaczysz jej czas i wybraną ścieżkę.", "After your first session, you will see its duration and path.")}</p>${link("#home", t("Znajdź swoją chwilę", "Find your moment"), "arrow", "btn btn-primary")}</div>`
  }`;
}
export function knowledge() {
  return `${back("#library")}${title(t("Poznaj Cortex", "Get to know Cortex"), t("Zrozum swoją chwilę.", "Make it your own."), t("Proste wskazówki, przejrzyste źródła. Wszystko w jednym miejscu.", "Simple guidance, transparent sources. All in one place."))}<div class="knowledge-grid"><article class="knowledge-card">${icon("headphones", 28)}<h2>${t("Jak korzystać", "Getting started")}</h2><p>${t("Wybór sesji, prowadzenie oddechu, słuchawki i komfort użytkowania.", "Choosing a session, following your breath, headphones and comfortable use.")}</p>${link(language === "pl" ? "guide-pl.html" : "guide.html", t("Otwórz przewodnik", "Read the guide"), "arrow")}</article><article class="knowledge-card">${icon("book", 28)}<h2>${t("Podstawy naukowe", "The science, clearly")}</h2><p>${t("Co opisują badania, czego jeszcze nie wiemy i jak działa Cortex.", "What the research says, what remains uncertain and how Cortex works.")}</p>${link(language === "pl" ? "whitepaper-pl.html" : "whitepaper.html", t("Przeczytaj whitepaper", "Read the whitepaper"), "arrow")}</article></div><div class="notice" style="margin-top:24px"><strong>${t("Twoje odczucia są ważne", "Your comfort comes first")}</strong>${t("Cortex służy osobistym rytuałom odpoczynku i pracy. Nie mierzy stanu mózgu i nie jest narzędziem diagnozy ani leczenia.", "Cortex accompanies personal rest and work rituals. It does not measure brain activity and is not a tool for diagnosis or treatment.")}</div>`;
}
export function settings(prefs, storeAvailable, active) {
  return `<div class="dialog-head"><h2 id="dialogTitle">${t("Ustawienia", "Settings")}</h2>${button("closeDialog", "", "close", "icon-btn", `aria-label="${t("Zamknij", "Close")}"`)}</div><div class="dialog-body"><div class="settings-language"><span>${t("Język", "Language")}</span>${button("language", language === "pl" ? "English" : "Polski", "", "btn")}</div>${toggle("reduceMotion", t("Ogranicz ruch", "Reduce motion"), t("Respektujemy też ustawienie systemowe.", "Your system setting is also respected."), prefs)}${toggle("keepScreenAwake", t("Utrzymuj ekran podczas oddechu i światła", "Keep the screen on for breathing and light"), t("Zwalniane przy pauzie, czarnym ekranie i końcu. Dostępność zależy od przeglądarki i systemu.", "Released on pause, black screen and finish. Availability depends on your browser and system."), prefs)}${toggle("audioOnly", t("Domyślnie bez animacji", "No animation by default"), t("Zachowaj tylko tekst i sterowanie.", "Keep only text and controls."), prefs)}${toggle("prelude", t("Minuta oddechu przed sesją", "One minute of breathing first"), t("Opcjonalny wstęp w rytmie 4–6.", "An optional opening in a 4–6 rhythm."), prefs)}<hr class="divider">${range("masterVolume", t("Głośność", "Volume"), prefs, 110)}<div class="button-row">${button("testLeft", t("Test lewego kanału", "Test left channel"), "headphones")}${button("testRight", t("Test prawego kanału", "Test right channel"), "headphones")}</div><hr class="divider"><div><h3>${t("Twoje dane", "Your data")}</h3><p class="help">${storeAvailable ? t("Historia i preferencje zostają w tej przeglądarce. Nie wysyłamy ich na serwer.", "History and preferences stay in this browser. They are not sent to a server.") : t("Przeglądarka nie pozwala zapisać danych. Sesje działają, ale historia może zniknąć po zamknięciu strony.", "Browser storage is unavailable. Sessions still work, but your history may not persist.")}</p></div><div class="button-row">${button("exportData", t("Pobierz historię", "Download history"), "download")}${button("importData", t("Przenieś historię z pliku", "Import history from file"))}<input id="importFile" type="file" accept="application/json,.json" hidden>${button("export", t("Eksport sesji audio", "Export session audio"), "download", "btn", active ? "disabled" : "")}</div>${active ? `<p class="help">${t("Eksport audio będzie dostępny po zakończeniu sesji.", "Audio export is available after finishing your session.")}</p>` : ""}${offlinePanel()}<a class="text-link small" href="${language === "pl" ? "guide-pl.html" : "guide.html"}">${t("Instrukcja i komfort użytkowania", "Guide and comfortable use")}</a></div>`;
}

export function usefulness(id, value) {
  return `<div class="usefulness" role="group" aria-label="${t("Czy ta sesja była pomocna?", "Was this session helpful?")}">${[
    ["helpful", t("Pomogło", "Helpful")],
    ["neutral", t("Bez zmiany", "No change")],
    ["unsuitable", t("Nie dla mnie", "Not for me")],
  ]
    .map(([key, label]) =>
      button(
        "usefulness",
        label,
        "",
        "chip",
        `data-id="${esc(id || "")}" data-value="${key}" aria-pressed="${value === key}"`,
      ),
    )
    .join("")}</div>`;
}
export function ritualPrepare(id, prefs, active, saved) {
  const r = ritualFor(id);
  if (!r) return home(prefs);
  const steps = ritualPlan(id, prefs),
    breath = id === "reset";
  const controls = `${id !== "reset" ? toggle("prelude", t("Oddech na początek", "Begin with breathing"), t("Około minuty, zawsze pełne cykle.", "About a minute, always complete cycles."), prefs) : ""}${
    id === "reset" || prefs.prelude
      ? `<label class="field"><span>${t("Rytm oddechu", "Breathing rhythm")}</span><select data-pref="breathPattern">${[
          ["4-6", "4–6"],
          ["box", "Box · 4–4–4–4"],
          ["4-7-8", "4–7–8"],
        ]
          .map(
            ([v, l]) =>
              `<option value="${v}" ${prefs.breathPattern === v ? "selected" : ""}>${l}</option>`,
          )
          .join("")}</select></label>${breathControls(prefs, active)}`
      : ""
  }${
    id !== "reset"
      ? `${range("masterVolume", t("Głośność sesji", "Session volume"), prefs, 110)}${noiseField(prefs)}<details class="details"><summary>${t("Miks dźwięku", "Sound mix")}</summary><div class="form-stack">${range("beatVolume", t("Tony", "Tones"), prefs, 120)}${range("noiseVolume", t("Tło", "Background"), prefs, 120)}</div></details><label class="field"><span>${t("Ekran podczas dźwięku", "Screen during audio")}</span><select data-pref="ritualVisual">${[
          ["calm", t("Spokojna forma", "Quiet form")],
          ["none", t("Sam dźwięk", "Audio only")],
          ["night", t("Nocna forma", "Night visual")],
          ["black", t("Czarny ekran", "Black screen")],
        ]
          .map(
            ([v, l]) =>
              `<option value="${v}" ${prefs.ritualVisual === v ? "selected" : ""}>${l}</option>`,
          )
          .join("")}</select></label>`
      : ""
  }${id === "evening" ? `<label class="field"><span>${t("Czas Hypnos", "Hypnos duration")}</span><select data-pref="hypnosDuration">${["30", "45", "90", "infinity"].map((v) => `<option value="${v}" ${prefs.hypnosDuration === v ? "selected" : ""}>${v === "infinity" ? t("Bez limitu", "Unlimited") : v + " min"}</option>`).join("")}</select></label>` : ""}`;
  return setupLayout({
    goal: r.goal,
    name: local(r.name),
    description: local(r.description),
    explanation: sessionExplanation(
      breath
        ? breathingCopy[prefs.breathPattern] || breathingCopy["4-6"]
        : sessionFor(id === "evening" ? "hypnos" : "deepFocus"),
    ),
    duration: steps.at(-1).end,
    summary: setupSummary(prefs, breath, prefs.ritualVisual),
    controls,
    sequence:
      steps
        .map(
          (step) =>
            `${step.kind === "breath" ? t("Oddech", "Breathing") : step.session.name} · ${minutes(step.session.duration)}`,
        )
        .join(" → ") +
      (id === "evening"
        ? " · " + t("Ciche zakończenie", "A quiet ending")
        : ""),
    action: active
      ? link(
          "#session",
          t("Wróć do trwającej sesji", "Return to current session"),
          "play",
          "btn btn-primary btn-wide",
        )
      : button(
          "playRitual",
          t("Rozpocznij", "Begin"),
          "play",
          "btn btn-primary btn-wide",
          `data-id="${id}"`,
        ),
    save:
      button(
        "saveRitual",
        saved
          ? t("Zapisz moje ustawienia", "Update my settings")
          : t("Dodaj do Moich sesji", "Add to My sessions"),
        "",
        "btn",
        `data-id="${id}"`,
      ) +
      `<p class="help">${t("Zapisane ustawienia znajdziesz w Moich sesjach.", "Find your saved settings in My sessions.")}</p>`,
  });
}

export function mySessions(prefs, history, active = false) {
  const saved = [
    ...rituals
      .filter((r) => prefs.ritualProfiles?.[r.id])
      .map((r) => ({
        id: r.id,
        name: local(r.name),
        goal: r.goal,
        duration: ritualPlan(r.id, ritualPreferences(r.id, prefs)).at(-1).end,
        route: "ritual/" + r.id,
        action: "playRitual",
      })),
    ...Object.entries(prefs.sessionProfiles || {})
      .filter(([id]) => sessions[id])
      .map(([id, settings]) => ({
        id,
        name: local(sessions[id].title),
        goal: sessions[id].goal,
        duration: sessionDuration(id, settings),
        route: "prepare/" + id,
        action: "playSaved",
      })),
  ];
  return `${title(t("W swoim rytmie", "At your own pace"), t("Moje sesje", "My sessions"), t("Twoje ustawienia i historia, zapisane na tym urządzeniu.", "Your settings and history, saved on this device."))}<section aria-labelledby="savedTitle"><div class="section-title"><h2 id="savedTitle">${t("Zapisane", "Saved")}</h2></div>${saved.length ? `<div class="saved-grid">${saved.map((item) => `<article class="saved-card" data-goal="${item.goal}"><span class="path-symbol">${icon(pathFor(item.goal).icon)}</span><h3>${item.name}</h3><p>${durationLabel(item.duration)} · ${local(pathFor(item.goal))}</p><div class="button-row">${active ? link("#session", t("Wróć do sesji", "Return to session"), "play", "btn btn-primary") : button(item.action, t("Rozpocznij", "Begin"), "play", "btn btn-primary", `data-id="${item.id}"`)}${link("#" + item.route, t("Dopasuj", "Adjust"), "", "btn btn-quiet")}</div></article>`).join("")}</div>` : `<div class="saved-empty"><p>${t("Zapisz ulubione ustawienia po sesji lub w opcji Dopasuj. Następnym razem wystarczy jeden przycisk.", "Save your favourite settings after a session or under Adjust. Next time, start with one tap.")}</p>${link("#home", t("Wybierz sesję", "Choose a session"), "arrow", "text-link")}</div>`}<div id="startError" class="error" role="alert" hidden></div></section>${historyView(history, true)}`;
}

function ritualHistorySettings(entry) {
  const p = entry.ritualPrefs;
  if (!p) return "";
  const background = (id) =>
    local(
      backgrounds.find((b) => b.id === id) ||
        backgrounds.find((b) => b.id === "none"),
    );
  const breathing = entry.ritualId === "reset" || p.prelude;
  return `<div class="history-settings">${breathing ? `<p>${t("Oddech", "Breathing")}: ${esc(p.breathPattern)} · ${p.breathCues ? t("dźwięk", "sound") + " " + Math.round(p.breathVolume * 100) + "%" : t("bez prowadzenia dźwiękiem", "no sound guidance")}</p><p>${t("Tło oddechu", "Breathing background")}: ${esc(background(p.breathBackground))}${p.breathBackground !== "none" ? " · " + Math.round(p.breathBackgroundVolume * 100) + "%" : ""}</p>` : ""}${entry.ritualId !== "reset" ? `<p>${t("Sesja dźwiękowa", "Sound session")}: ${Math.round(p.masterVolume * 100)}% · ${esc(background(p.noiseType))}</p>` : ""}</div>`;
}
