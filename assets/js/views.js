import {
  paths,
  sessions,
  programs,
  pathFor,
  sessionFor,
  filterSessions,
} from "./catalog.js";
import { t, local, language, esc, icon, minutes, time } from "./i18n.js";
import { orb } from "./visual.js";
export const button = (action, label, symbol = "", cls = "btn", extra = "") =>
  `<button class="${cls}" data-action="${action}" ${extra}>${symbol ? icon(symbol) : ""}${label}</button>`;
const link = (href, label, symbol = "", cls = "btn") =>
  `<a class="${cls}" href="${href}">${symbol ? icon(symbol) : ""}${label}</a>`;
const back = (href = "#home") =>
  link(href, t("Wróć", "Back"), "back", "back-link");
const title = (eyebrow, heading, description = "") =>
  `<div class="page-head"><div><div class="eyebrow">${eyebrow}</div><h1>${heading}</h1></div>${description ? `<p>${description}</p>` : ""}</div>`;
export function nav(current, mobile = false) {
  return [
    ["home", "home", t("Start", "Home")],
    ["library", "library", t("Biblioteka", "Library")],
    ["history", "history", t("Historia", "History")],
    ["knowledge", "book", t("Wiedza", "Learn")],
  ]
    .map(
      ([id, symbol, name]) =>
        `<a class="nav-item" href="#${id}" ${current === id ? 'aria-current="page"' : ""}>${mobile ? icon(symbol, 21) : ""}<span>${name}</span></a>`,
    )
    .join("");
}
export function header(current) {
  return `<a class="brand" href="#home" aria-label="Cortex"><img src="assets/images/cortex-mark.svg" alt="">cortex</a><nav class="desktop-nav" aria-label="${t("Nawigacja główna", "Main navigation")}">${nav(current)}</nav><div class="header-actions">${button("language", language.toUpperCase(), "", "icon-btn language-btn", `aria-label="${t("Switch to English", "Zmień na polski")}"`)}${button("settings", "", "settings", "icon-btn", `aria-label="${t("Ustawienia", "Settings")}"`)}</div>`;
}
export function pathCards() {
  return `<div class="paths">${paths.map((p) => `<a href="#${p.id === "breath" ? "prepare/breath" : "path/" + p.id}" class="path-card" data-goal="${p.id}"><span class="path-symbol">${icon(p.icon)}</span><h3>${local(p)}</h3><p>${p.intro[language === "pl" ? 0 : 1]}</p><span class="path-arrow">${icon("arrow", 17)}</span></a>`).join("")}</div>`;
}
export function home(prefs) {
  return `<section class="home-hero"><div><div class="eyebrow">${t("Twoja codzienna chwila", "A little room for you")}</div><h1>${t("Czego dziś<br>potrzebujesz?", "What do you<br>need today?")}</h1><p class="intro">${t("Trochę oddechu. Więcej przestrzeni.<br>Znajdź swój rytm — na teraz.", "A little breath. A little space.<br>Find your rhythm, right here.")}</p></div><div class="hero-art">${orb("breath")}<span class="art-note">${t("Dźwięk · oddech · Ty", "Sound · breath · you")}</span></div></section>${pathCards()}<section class="home-bottom"><article><span class="quiet-icon">${icon("breath", 30)}</span><div><h3>${t("Zacznij od jednego oddechu", "Start with a single breath")}</h3><p>${minutes(prefs.breathDuration)}. ${t("Bez słuchawek, bez pośpiechu.", "No headphones. No rush.")}</p></div>${link("#prepare/breath", t("Spróbuj", "Try it"), "arrow", "btn btn-quiet")}</article><article><span class="quiet-icon">${icon("book", 28)}</span><div><h3>${t("Pierwszy raz w Cortex?", "New to Cortex?")}</h3><p>${t("Poznaj sesje i wybierz coś dla siebie.", "Get to know the sessions. Make yourself at home.")}</p></div>${link("#knowledge", t("Poznaj", "Explore"), "arrow", "btn btn-quiet")}</article></section><div class="app-note"><span>${t("Twój czas. Twoje tempo.", "Your time. Your pace.")}</span><a class="text-link" href="landing.html">${t("O Cortex", "About Cortex")}</a></div>`;
}
export function sessionCard(s, recommended = false) {
  return `<a class="session-card" href="#prepare/${s.id}" data-goal="${s.goal}"><div class="session-card-top"><span class="path-symbol">${icon(pathFor(s.goal).icon)}</span><span class="pill">${s.id === "hypnos" ? t("30–90 min lub bez limitu", "30–90 min or unlimited") : minutes(s.duration)}</span></div><div><p class="protocol">${s.id === "breath" ? t("Prowadzony oddech", "Guided breathing") : s.name}${recommended ? " · " + t("Na początek", "Start here") : ""}</p><h3>${local(s.title)}</h3></div><p>${local(s.description)}</p><span class="card-link">${t("Przygotuj sesję", "Prepare session")}${icon("arrow", 18)}</span></a>`;
}
export function pathView(goal) {
  const p = pathFor(goal),
    list = Object.values(sessions)
      .filter((s) => s.goal === p.id)
      .sort((a, b) => (b.id === p.session) - (a.id === p.session));
  return `${back()}<section class="path-hero" data-goal="${p.id}"><div><div class="overline">${icon(p.icon, 20)}${t("Twoja ścieżka", "Your path")}</div><h1>${local(p)}</h1><p>${p.intro[language === "pl" ? 0 : 1]}</p></div>${orb(p.id)}</section><div class="session-grid">${list.map((s) => sessionCard(s, s.id === p.session)).join("")}</div><p class="app-note">${goal === "energy" ? t("Wybierz charakter sesji. Głośność i wizualizacje ustawisz niezależnie.", "Choose the character of your session. Volume and visuals are separate choices.") : t("Zacznij od tego, co pasuje do Twojej chwili.", "Start with what fits your moment.")}</p>`;
}
export function libraryCards(filters) {
  return (
    filterSessions(filters.goal, filters.duration, filters.query, language)
      .map((s) => sessionCard(s))
      .join("") ||
    `<div class="empty"><h2>${t("Spróbuj innego wyboru", "Try another combination")}</h2><p>${t("Brak sesji dla tych filtrów. Zmień czas lub ścieżkę.", "No sessions match these filters. Try another duration or path.")}</p>${button("clearFilters", t("Wyczyść filtry", "Clear filters"))}</div>`
  );
}
export function library(filters) {
  return `${title(t("W swoim rytmie", "At your own pace"), t("Biblioteka", "Your library"), t("14 sesji dźwiękowych, oddech i programy. Wybierz to, czego dziś potrzebujesz.", "14 sound sessions, breathing and programmes. Find what you need today."))}<div class="filter-tabs" role="group" aria-label="${t("Ścieżka", "Path")}">${[["all", t("Wszystkie", "All")], ...paths.map((p) => [p.id, local(p)])].map(([id, name]) => `<button class="chip" data-action="filterGoal" data-value="${id}" aria-pressed="${filters.goal === id}">${name}</button>`).join("")}</div><div class="filters"><label class="search"><span class="sr-only">${t("Szukaj sesji", "Search sessions")}</span><input type="search" id="searchSessions" value="${esc(filters.query)}" placeholder="${t("Szukaj sesji lub potrzeby…", "Search for a session or intention…")}"></label><label><span class="sr-only">${t("Długość sesji", "Session length")}</span><select id="durationFilter">${[
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
    )}</select></label></div><div id="libraryResults" class="session-grid" aria-live="polite">${libraryCards(filters)}</div><div class="section-title"><h2>${t("Zostań na dłużej", "Stay a little longer")}</h2><span class="small muted">${t("Programy · kilka sesji w jednej ścieżce", "Programmes · a few sessions, one journey")}</span></div><div class="programs">${programs.map((p) => `<article class="program-card"><div class="overline">${icon("clock", 18)}${minutes(p.steps.reduce((n, s) => n + s.durationMinutes * 60, 0))}</div><h3>${p.name}</h3><p>${local(p.description)}</p><div class="steps-inline">${p.steps.map((s) => sessionFor(s.sessionId).name).join(" → ")}</div>${link("#program/" + p.id, t("Zobacz program", "View programme"), "arrow", "btn btn-quiet")}</article>`).join("")}</div>`;
}
let fieldSerial = 0;
export const range = (key, label, prefs, max = 100) => {
  const id = `${key}-${++fieldSerial}`;
  return `<div class="field"><label class="range-label" for="${id}"><span>${label}</span><output data-for="${key}">${Math.round(prefs[key] * 100)}%</output></label><input type="range" id="${id}" data-pref="${key}" min="0" max="${max}" value="${Math.round(prefs[key] * 100)}"></div>`;
};
export const toggle = (key, label, description, prefs) =>
  `<label class="switch-row"><span class="switch-copy"><strong>${label}</strong>${description ? `<small>${description}</small>` : ""}</span><input type="checkbox" role="switch" data-pref="${key}" ${prefs[key] ? "checked" : ""}></label>`;
const choose = (key, options, prefs) =>
  `<div class="segmented" role="group">${options.map(([id, label]) => `<button data-action="preference" data-key="${key}" data-value="${id}" aria-pressed="${String(prefs[key]) === String(id)}">${label}</button>`).join("")}</div>`;
const noiseField = (prefs) =>
  `<label class="field"><span>${t("Tło dźwiękowe", "Background sound")}</span><select data-pref="noiseType">${[
    ["brown", t("Brązowy szum · głęboki", "Brown noise · deep")],
    ["pink", t("Różowy szum · miękki", "Pink noise · soft")],
    ["white", t("Biały szum · równy", "White noise · even")],
    ["none", t("Bez tła", "No background")],
  ]
    .map(
      ([id, l]) =>
        `<option value="${id}" ${prefs.noiseType === id ? "selected" : ""}>${l}</option>`,
    )
    .join("")}</select></label>`;
export function prepare(
  id,
  prefs,
  visualMode,
  busy,
  active,
  pendingProgram = null,
) {
  const s = sessionFor(id),
    breath = id === "breath";
  const programStep = pendingProgram?.program.steps[pendingProgram.index];
  return `${back("#" + (breath ? "home" : "path/" + s.goal))}<div class="prepare-layout" data-goal="${s.goal}"><section class="prepare-story"><div class="overline">${icon(pathFor(s.goal).icon)}${local(pathFor(s.goal))} ${!breath ? " · " + s.name : ""}</div><h1>${local(s.title)}</h1><p>${local(s.description)}</p><div class="session-meta"><span>${icon("clock", 18)}${programStep ? minutes(programStep.durationMinutes * 60) : breath ? minutes(prefs.breathDuration) : id === "hypnos" ? (prefs.hypnosDuration === "infinity" ? minutes(Infinity) : prefs.hypnosDuration + " min") : minutes(s.duration)}</span><span>${icon(breath ? "breath" : "headphones", 18)}${breath ? t("Bez słuchawek", "No headphones needed") : t("Słuchawki stereo", "Stereo headphones")}</span></div>${orb(s.goal)}<p class="help">${breath ? t("Oddychaj łagodnie, w wygodnym dla siebie zakresie. W każdej chwili możesz wrócić do naturalnego oddechu.", "Breathe gently, within a comfortable range. You can return to your natural breath at any time.") : t("Znajdź wygodne miejsce. Zacznij od niskiej głośności i dopasuj ją do siebie.", "Find a comfortable place. Start with a low volume and adjust it to suit you.")}</p></section><section class="prepare-panel"><h2>${t("Twoja chwila", "Make it yours")}</h2>${programStep ? `<p class="help" style="margin-bottom:20px">${esc(pendingProgram.program.name)} · ${t("Etap", "Step")} ${pendingProgram.index + 1}/${pendingProgram.program.steps.length}</p>` : ""}<div class="form-stack">${
    breath
      ? `<div class="field"><span>${t("Czas ćwiczenia", "Practice length")}</span>${choose(
          "breathDuration",
          [
            [60, "1 min"],
            [180, "3 min"],
            [300, "5 min"],
          ],
          prefs,
        )}</div><label class="field"><span>${t("Rytm oddechu", "Breathing rhythm")}</span><select data-pref="breathPattern"><option value="4-6" ${prefs.breathPattern === "4-6" ? "selected" : ""}>${t("4–6 · wdech i wydech", "4–6 · inhale and exhale")}</option><option value="box" ${prefs.breathPattern === "box" ? "selected" : ""}>${t("Box · 4–4–4–4 z pauzami", "Box · 4–4–4–4 with holds")}</option><option value="4-7-8" ${prefs.breathPattern === "4-7-8" ? "selected" : ""}>${t("4–7–8 · z pauzą", "4–7–8 · with a hold")}</option></select></label><p class="help">${t("Podążaj za rozszerzającą się formą na wdechu i kurczącą na wydechu. Nie wymuszaj rytmu.", "Follow the expanding form as you inhale and the contracting form as you exhale. Do not force the rhythm.")}</p>${toggle("breathCues", t("Delikatne sygnały dźwiękowe", "Gentle sound cues"), t("Dźwięk przy zmianie fazy oddechu.", "A sound when the breathing phase changes."), prefs)}${prefs.breathCues ? range("masterVolume", t("Głośność sygnałów", "Cue volume"), prefs) : ""}`
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
        }${range("masterVolume", t("Głośność", "Volume"), prefs, 110)}${noiseField(prefs)}${toggle("prelude", t("Minuta oddechu przed sesją", "One minute of breathing first"), t("Łagodny rytm 4–6. Możesz go pominąć.", "A gentle 4–6 rhythm. Skip it whenever you like."), prefs)}<details class="details"><summary>${t("Dopasuj więcej", "More options")}</summary><div class="form-stack">${range("beatVolume", t("Tony", "Tones"), prefs, 120)}${range("noiseVolume", t("Szum", "Noise"), prefs, 120)}<label class="field"><span>${t("Intensywność dźwięku", "Sound intensity")}</span><select data-pref="intensity">${[
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
          )}</select></label><div><span class="small">${t("Test słuchawek", "Headphone check")}</span><div class="button-row">${button("testLeft", t("Lewy kanał", "Left channel"), "headphones")}${button("testRight", t("Prawy kanał", "Right channel"), "headphones")}</div></div><details class="details"><summary>${t("Parametry protokołu", "Protocol details")}</summary><div class="table-scroll"><table class="tech-table"><thead><tr><th>${t("Etap", "Stage")}</th><th>L / R (Hz)</th></tr></thead><tbody>${s.phases.map((p, i) => `<tr><td>${i + 1}</td><td>${p.audio.l} / ${p.audio.r}</td></tr>`).join("")}</tbody></table></div><p class="help">${t("To parametry dźwięku, nie pomiar aktywności mózgu.", "These describe the sound, not a measurement of brain activity.")}</p></details></div></details>`
  }<details class="details"><summary>${t("Obraz i ruch", "Visuals and motion")}</summary><div class="form-stack"><label class="field"><span>${t("Wizualizacja", "Visual style")}</span><select id="visualMode"><option value="calm" ${visualMode === "calm" ? "selected" : ""}>${t("Spokojna forma", "Quiet form")}</option><option value="none" ${visualMode === "none" ? "selected" : ""}>${t("Bez animacji", "No animation")}</option>${!breath ? `<option value="advanced" ${visualMode === "advanced" ? "selected" : ""}>${t("Pulsacja · zaawansowane", "Pulsation · advanced")}</option>` : ""}</select></label>${visualMode === "advanced" ? `<div class="notice"><strong>${t("Dodatkowe bodźce wizualne", "Additional visual stimulation")}</strong>${t("Pulsacja jest ograniczona do 2 Hz i delikatnej zmiany kontrastu. Nie używaj przy nadwrażliwości na migające światło. Wybór dotyczy tylko tej sesji.", "Pulsation is limited to 2 Hz and a subtle contrast change. Do not use if sensitive to flashing light. This choice applies to this session only.")}<label class="switch-row"><span>${t("Włącz pulsację w tej sesji", "Enable pulsation for this session")}</span><input type="checkbox" id="advancedConsent"></label></div>` : ""}${toggle("reduceMotion", t("Ogranicz ruch", "Reduce motion"), t("Ustawienie systemowe jest zawsze respektowane.", "The system preference is always respected."), prefs)}</div></details><div id="startError" role="alert" hidden class="error"></div>${active ? link("#session", t("Wróć do trwającej sesji", "Return to current session"), "play", "btn btn-primary btn-wide") : button("start", busy ? t("Przygotowuję…", "Preparing…") : t("Rozpocznij", "Begin"), "play", "btn btn-primary btn-wide", `${busy ? "disabled" : ""} data-session="${s.id}"`)}<a class="help text-link" href="${language === "pl" ? "guide-pl.html" : "guide.html"}#safety">${t("Jak korzystać komfortowo", "Using Cortex comfortably")}</a></div></section></div>`;
}
export function programView(id, active) {
  const p = programs.find((p) => p.id === id);
  if (!p) return library({ goal: "all", duration: "all", query: "" });
  return `${back("#library")}${title(t("Program", "Programme"), p.name, local(p.description))}<div class="prepare-layout"><section><ol class="program-steps">${p.steps.map((step, i) => `<li><span class="step-number">${i + 1}</span><div><h3>${sessionFor(step.sessionId).name}</h3><p>${minutes(step.durationMinutes * 60)} · ${local(sessionFor(step.sessionId).title)}</p></div></li>`).join("")}</ol></section><section class="prepare-panel"><h2>${minutes(p.steps.reduce((n, s) => n + s.durationMinutes * 60, 0))}</h2><p>${t("Po każdym etapie możesz zrobić przerwę. Kolejny uruchomisz wtedy, gdy zechcesz.", "Take a break after each step. Start the next one when you are ready.")}</p><div class="form-stack" style="margin-top:25px">${active ? link("#session", t("Wróć do sesji", "Return to session"), "play", "btn btn-primary") : button("startProgram", t("Przygotuj pierwszy etap", "Prepare the first step"), "arrow", "btn btn-primary", `data-program="${p.id}"`)}</div></section></div>`;
}
export function player(flow, prefs) {
  const s = flow.session,
    breath = s.id === "breath" || flow.stage === "prelude",
    goal = breath ? "breath" : s.goal;
  return `<section class="player" id="player" data-goal="${goal}"><header class="player-top"><div><div class="overline">${flow.program ? `${flow.program.name} · ${flow.stepIndex + 1}/${flow.program.steps.length}` : local(pathFor(goal))}</div><h1>${flow.stage === "prelude" ? t("Chwila oddechu przed sesją", "A breath before your session") : local(s.title)}</h1><p>${flow.stage === "prelude" ? s.name : breath ? t("W Twoim rytmie", "At your own pace") : s.name + (s.duration === Infinity ? " · " + t("bez limitu", "unlimited") : "")}</p></div>${button("fullscreen", "", "expand", "icon-btn", `aria-label="${t("Pełny ekran", "Fullscreen")}"`)}</header><div class="player-stage ${breath ? "breathing" : ""} ${flow.visual === "none" ? "audio-only" : ""} ${flow.dim ? "sleep-dim" : ""}">${orb(goal)}<div class="breath-caption"><strong id="breathLabel" aria-live="polite" aria-atomic="true">${breath ? t("Wdech", "Breathe in") : ""}</strong><span class="breath-count" id="breathCount"></span></div></div><footer class="player-bottom"><div class="player-clock" id="playerClock">${time(flow.clock.duration)}</div><div class="player-progress" role="progressbar" aria-label="${t("Postęp sesji", "Session progress")}" aria-valuemin="0" aria-valuemax="100" aria-valuenow="0"><span id="playerProgress"></span></div><div class="player-controls">${button("pause", t("Pauza", "Pause"), "pause", "btn btn-primary", `id="pauseButton"`)}${button("end", t("Zakończ", "Finish"), "stop", "btn")}</div><div class="player-volume">${icon("volume", 18)}<label class="sr-only" for="playerVolume">${t("Głośność", "Volume")}</label><input type="range" id="playerVolume" data-pref="masterVolume" min="0" max="110" value="${Math.round(prefs.masterVolume * 100)}"></div><p class="player-tip" id="playerTip">${breath ? t("Podążaj za formą. Oddychaj bez wysiłku.", "Follow the form. Keep your breath comfortable.") : t("Ta chwila jest dla Ciebie.", "This moment is yours.")}</p><div class="button-row">${flow.stage === "prelude" ? button("skipPrelude", t("Przejdź do sesji", "Skip to session"), "arrow", "btn btn-quiet") : s.goal === "sleep" ? button("dim", t("Przygaś obraz", "Dim the visual"), "sleep", "btn btn-quiet") : ""}</div></footer></section>`;
}
export function between(flow) {
  const next = flow.program.steps[flow.stepIndex + 1];
  return `<section class="completion">${orb(flow.session.goal)}<div class="eyebrow">${flow.program.name}</div><h1>${t("Zrób chwilę przerwy.", "Take a little break.")}</h1><p>${t("Kolejny etap", "Up next")}: ${sessionFor(next.sessionId).name} · ${minutes(next.durationMinutes * 60)}</p><div class="button-row" style="justify-content:center">${button("nextStep", t("Rozpocznij kolejny etap", "Start next step"), "play", "btn btn-primary")}${button("endProgram", t("Zakończ program", "Finish programme"))}</div></section>`;
}
export function completed(result) {
  return `<section class="completion" data-goal="${result.goal}">${orb(result.goal)}<div class="eyebrow">${t("Chwila dla Ciebie", "A moment for you")}</div><h1>${t("Dobrze mieć tę chwilę.", "A little space, just for you.")}</h1><div class="completion-stat">${time(result.durationSeconds)}</div><p>${t("czasu dla siebie", "of time for yourself")} · ${esc(local(result.name))}</p><p class="small">${t("Jak się teraz czujesz?", "How do you feel now?")}</p><div class="rating-row" aria-label="${t("Ocena samopoczucia od 1 do 5", "How you feel, from 1 to 5")}">${[1, 2, 3, 4, 5].map((n) => `<button data-action="rate" data-value="${n}" aria-label="${n} / 5" aria-pressed="${result.rating === n}">${n}</button>`).join("")}</div>${link("#home", t("Wróć do startu", "Back to home"), "arrow", "btn btn-primary")}<p class="help" style="margin-top:18px">${t("Ocena jest opcjonalna i zostaje na tym urządzeniu.", "Your rating is optional and stays on this device.")}</p></section>`;
}
export function historyView(history) {
  const total = history.reduce(
    (n, h) => n + (Number(h.durationSeconds) || 0),
    0,
  );
  return `${title(t("Twoje chwile", "Your moments"), t("Historia", "History"), t("Czas, który znajdujesz dla siebie. Zapisany tylko na tym urządzeniu.", "The time you make for yourself. Saved only on this device."))}<div class="stats-strip"><div><strong>${history.length}</strong><span>${t("sesji", "sessions")}</span></div><div><strong>${Math.round(total / 60)}</strong><span>${t("minut dla siebie", "minutes for yourself")}</span></div></div>${
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
            return `<article class="history-row" data-goal="${goal}"><span class="path-symbol">${icon(pathFor(goal).icon)}</span><div><h3>${h.sessionId === "breath" ? local(s.title) : s.name}</h3><p>${local(pathFor(goal))} · ${Number.isNaN(date.getTime()) ? "—" : date.toLocaleDateString(language, { day: "numeric", month: "short" })}${h.programName ? " · " + esc(h.programName) : ""}</p></div><div class="history-time">${time(h.durationSeconds)}<p>${h.completed ? t("Ukończono", "Completed") : t("Zakończono wcześniej", "Finished early")}${h.rating ? " · " + esc(h.rating) + "/5" : ""}</p></div></article>`;
          })
          .join("")
      : `<div class="empty">${icon("history", 32)}<h2>${t("Tu zapiszą się Twoje chwile", "Your moments will appear here")}</h2><p>${t("Po pierwszej sesji zobaczysz jej czas i wybraną ścieżkę.", "After your first session, you will see its duration and path.")}</p>${link("#home", t("Znajdź swoją chwilę", "Find your moment"), "arrow", "btn btn-primary")}</div>`
  }`;
}
export function knowledge() {
  return `${title(t("Poznaj Cortex", "Get to know Cortex"), t("Zrozum swoją chwilę.", "Make it your own."), t("Proste wskazówki, przejrzyste źródła. Wszystko w jednym miejscu.", "Simple guidance, transparent sources. All in one place."))}<div class="knowledge-grid"><article class="knowledge-card">${icon("headphones", 28)}<h2>${t("Jak korzystać", "Getting started")}</h2><p>${t("Wybór sesji, prowadzenie oddechu, słuchawki i komfort użytkowania.", "Choosing a session, following your breath, headphones and comfortable use.")}</p>${link(language === "pl" ? "guide-pl.html" : "guide.html", t("Otwórz przewodnik", "Read the guide"), "arrow")}</article><article class="knowledge-card">${icon("book", 28)}<h2>${t("Podstawy naukowe", "The science, clearly")}</h2><p>${t("Co opisują badania, czego jeszcze nie wiemy i jak działa Cortex.", "What the research says, what remains uncertain and how Cortex works.")}</p>${link(language === "pl" ? "whitepaper-pl.html" : "whitepaper.html", t("Przeczytaj whitepaper", "Read the whitepaper"), "arrow")}</article></div><div class="notice" style="margin-top:24px"><strong>${t("Twoje odczucia są ważne", "Your comfort comes first")}</strong>${t("Cortex służy osobistym rytuałom odpoczynku i pracy. Nie mierzy stanu mózgu i nie jest narzędziem diagnozy ani leczenia.", "Cortex accompanies personal rest and work rituals. It does not measure brain activity and is not a tool for diagnosis or treatment.")}</div>`;
}
export function settings(prefs, storeAvailable, active) {
  return `<div class="dialog-head"><h2 id="dialogTitle">${t("Ustawienia", "Settings")}</h2>${button("closeDialog", "", "close", "icon-btn", `aria-label="${t("Zamknij", "Close")}"`)}</div><div class="dialog-body">${toggle("reduceMotion", t("Ogranicz ruch", "Reduce motion"), t("Respektujemy też ustawienie systemowe.", "Your system setting is also respected."), prefs)}${toggle("audioOnly", t("Domyślnie bez animacji", "No animation by default"), t("Zachowaj tylko tekst i sterowanie.", "Keep only text and controls."), prefs)}${toggle("prelude", t("Minuta oddechu przed sesją", "One minute of breathing first"), t("Opcjonalny wstęp w rytmie 4–6.", "An optional opening in a 4–6 rhythm."), prefs)}<hr class="divider">${range("masterVolume", t("Głośność", "Volume"), prefs, 110)}<div class="button-row">${button("testLeft", t("Test lewego kanału", "Test left channel"), "headphones")}${button("testRight", t("Test prawego kanału", "Test right channel"), "headphones")}</div><hr class="divider"><div><h3>${t("Twoje dane", "Your data")}</h3><p class="help">${storeAvailable ? t("Historia i preferencje zostają w tej przeglądarce. Nie wysyłamy ich na serwer.", "History and preferences stay in this browser. They are not sent to a server.") : t("Przeglądarka nie pozwala zapisać danych. Sesje działają, ale historia może zniknąć po zamknięciu strony.", "Browser storage is unavailable. Sessions still work, but your history may not persist.")}</p></div><div class="button-row">${button("exportData", t("Pobierz historię", "Download history"), "download")}${button("export", t("Eksport sesji audio", "Export session audio"), "download", "btn", active ? "disabled" : "")}</div>${active ? `<p class="help">${t("Eksport audio będzie dostępny po zakończeniu sesji.", "Audio export is available after finishing your session.")}</p>` : ""}<a class="text-link small" href="${language === "pl" ? "guide-pl.html" : "guide.html"}">${t("Instrukcja i komfort użytkowania", "Guide and comfortable use")}</a></div>`;
}
