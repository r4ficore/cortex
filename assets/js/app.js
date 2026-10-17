import {
  paths,
  sessions,
  programs,
  sessionFor,
  makeSession,
  pathFor,
} from "./catalog.js";
import { createStore } from "./store.js";
import { SessionController, phaseAt } from "./session.js";
import { breathAt } from "./breath.js";
import { AudioEngine } from "./audio.js";
import { sessionId, breathHaptic, stopHaptics } from "./platform.js";
import {
  FrameMonitor,
  supportsStimulation,
  maxVisualFrequency,
  visualFrequency,
  visualCycles,
  lightSample,
} from "./stimulation.js";
import { updateOrb } from "./visual.js";
import { t, local, language, setLanguage, esc, icon, time } from "./i18n.js";
import * as views from "./views.js";
import {
  exportPanel,
  startExport,
  downloadBlob,
  cancelExport,
} from "./export.js";

let storage;
try {
  storage = localStorage;
} catch {}
const store = createStore(storage),
  audio = new AudioEngine();
const frameMonitor = new FrameMonitor();
const mediaMotion = matchMedia("(prefers-reduced-motion: reduce)");
const state = {
  flow: null,
  result: null,
  starting: false,
  token: 0,
  selected: "",
  nightResult: false,
  visual: "calm",
  pendingProgram: null,
  route: "home",
  filters: { goal: "all", duration: "all", query: "" },
};
const main = document.getElementById("content"),
  dialog = document.getElementById("dialog");
const blackScreen = document.createElement("dialog");
blackScreen.id = "blackScreen";
document.body.append(blackScreen);
function openBlackScreen() {
  blackScreen.innerHTML = `<button id="wakeScreen" aria-label="${t("Pokaż sterowanie sesją", "Show session controls")}"><span>${t("Dotknij ekranu, aby wrócić", "Tap to return")}</span></button>`;
  if (!blackScreen.open) blackScreen.showModal();
  blackScreen.querySelector("button").focus({ preventScroll: true });
}
blackScreen.addEventListener("click", () => blackScreen.close());
blackScreen.addEventListener("close", () => {
  (document.getElementById("playerVisual") || main).focus({ preventScroll: true });
});
let restoreFocus = null,
  refs = {},
  lastCue = "",
  lastSecond = "",
  toastTimer;
const prefs = () => store.prefs;
const reduced = () => mediaMotion.matches || prefs().reduceMotion === true;
function applyPreferences() {
  document.body.classList.toggle("reduce-motion", reduced());
}
setLanguage(prefs().lang);
applyPreferences();
mediaMotion.addEventListener("change", applyPreferences);

function go(route) {
  if (location.hash === `#${route}`) render();
  else location.hash = route;
}
function toast(message) {
  const e = document.getElementById("toast");
  e.textContent = message;
  e.hidden = false;
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => (e.hidden = true), 6500);
}
function active() {
  return Boolean(state.flow);
}
function render() {
  const route = location.hash.slice(1) || "home";
  const [page, id] = route.split("/");
  state.route = page;
  const playerPage =
    page === "session" && state.flow && state.flow.stage !== "between";
  document.body.classList.toggle("player-page", Boolean(playerPage));
  const night =
    (page === "session" &&
      state.flow &&
      state.flow.stage !== "prelude" &&
      ["night", "black"].includes(state.flow.visual)) ||
    (page === "complete" && state.nightResult);
  document.body.classList.toggle("night-mode", Boolean(night));
  document
    .querySelector('meta[name="theme-color"]')
    ?.setAttribute("content", night ? "#000000" : "#f7f8f5");
  document.getElementById("header").innerHTML = views.header(
    page === "path" || page === "prepare" || page === "program" ? "home" : page,
  );
  document.getElementById("mobileNav").innerHTML = views.nav(page, true);
  document
    .getElementById("mobileNav")
    .setAttribute("aria-label", t("Nawigacja", "Navigation"));
  document.title = `${t("Cortex — chwila dla Ciebie", "Cortex — a moment for you")}`;
  if (page === "path") main.innerHTML = views.pathView(id);
  else if (page === "library") main.innerHTML = views.library(state.filters);
  else if (page === "prepare") {
    const selected = sessions[id] ? id : "deepFocus";
    if (state.selected !== selected) {
      state.selected = selected;
      state.visual = prefs().audioOnly
        ? "none"
        : sessions[selected]?.goal === "sleep"
          ? "night"
          : "calm";
    }
    main.innerHTML = views.prepare(
      selected,
      prefs(),
      state.visual,
      state.starting,
      active(),
      state.pendingProgram,
    );
  } else if (page === "program")
    main.innerHTML = views.programView(id, active());
  else if (page === "history")
    main.innerHTML = views.historyView(store.history);
  else if (page === "knowledge") main.innerHTML = views.knowledge();
  else if (page === "session")
    main.innerHTML = state.flow
      ? state.flow.stage === "between"
        ? views.between(state.flow)
        : views.player(state.flow, prefs())
      : state.result
        ? views.completed(state.result)
        : views.home(prefs());
  else if (page === "complete" && state.result)
    main.innerHTML = views.completed(state.result);
  else main.innerHTML = views.home(prefs());
  refs = {
    orb: main.querySelector(".player-stage>.orb"),
    label: document.getElementById("breathLabel"),
    count: document.getElementById("breathCount"),
    clock: document.getElementById("playerClock"),
    progress: document.getElementById("playerProgress"),
    pause: document.getElementById("pauseButton"),
    tip: document.getElementById("playerTip"),
    light: document.getElementById("lightDisc"),
    lightStatus: document.getElementById("lightStatus"),
  };
  lastSecond = "";
  updateMini();
  updatePlayer();
}
function updateMini() {
  const mini = document.getElementById("miniPlayer"),
    f = state.flow;
  mini.hidden = !f || state.route === "session";
  if (!f) return;
  mini.innerHTML = `<a href="#session">${icon(pathFor(f.session.goal).icon)}<span><strong>${local(f.session.title)}</strong><small id="miniTime">${f.stage === "between" ? t("Gotowy na kolejny etap", "Ready for the next step") : time(f.clock.duration - f.clock.position())}</small></span></a>${f.stage !== "between" ? views.button("pause", "", f.clock.status === "paused" ? "play" : "pause", "icon-btn", `aria-label="${f.clock.status === "paused" ? t("Wznów", "Resume") : t("Pauza", "Pause")}"`) : ""}`;
}
function updatePlayer() {
  const f = state.flow;
  if (!f || f.stage === "between") return;
  const elapsed = f.clock.position(),
    paused = f.clock.status === "paused",
    breath = f.session.id === "breath" || f.stage === "prelude";
  const pattern = f.stage === "prelude" ? "4-6" : f.pattern;
  const b = breath ? breathAt(elapsed, pattern) : null;
  updateOrb(refs.orb, {
    elapsed,
    breath: b,
    reduced: reduced(),
    paused,
  });
  if (refs.light) updateLight(f, elapsed, paused);
  const key = `${Math.ceil(elapsed)}-${paused}-${language}-${f.stage}`;
  if (key !== lastSecond) {
    lastSecond = key;
    const remaining = Number.isFinite(f.clock.duration)
      ? f.clock.duration - elapsed
      : elapsed;
    if (refs.clock)
      refs.clock.textContent =
        time(remaining) + (Number.isFinite(f.clock.duration) ? "" : " · ∞");
    if (refs.progress) {
      const p = Number.isFinite(f.clock.duration)
        ? Math.min(100, (elapsed / f.clock.duration) * 100)
        : 0;
      refs.progress.style.width = p + "%";
      refs.progress.parentElement.setAttribute(
        "aria-valuenow",
        String(Math.round(p)),
      );
    }
    if (refs.pause) {
      refs.pause.innerHTML =
        icon(paused ? "play" : "pause") +
        t(paused ? "Wznów" : "Pauza", paused ? "Resume" : "Pause");
      refs.pause.setAttribute(
        "aria-label",
        t(
          paused ? "Wznów sesję" : "Wstrzymaj sesję",
          paused ? "Resume session" : "Pause session",
        ),
      );
    }
    if (refs.label) {
      const label = paused
        ? t("Chwila przerwy", "Take your time")
        : breath
          ? {
              inhale: t("Wdech", "Breathe in"),
              exhale: t("Wydech", "Breathe out"),
              hold: t("Zatrzymaj", "Hold gently"),
            }[b.phase]
          : "";
      if (refs.label.textContent !== label) refs.label.textContent = label;
    }
    if (refs.count)
      refs.count.textContent = paused
        ? ""
        : breath
          ? `${b.remaining} ${t("sek", "sec")}`
          : "";
    const mini = document.getElementById("miniTime");
    if (mini)
      mini.textContent =
        (paused ? t("Pauza · ", "Paused · ") : "") + time(remaining);
  }
  if (b && !paused && !document.hidden && b.key !== lastCue) {
    lastCue = b.key;
    if (prefs().breathCues) audio.cue(b.phase, prefs().masterVolume);
    if (prefs().breathHaptics) breathHaptic(b.phase);
  }
}
function updateLight(f, elapsed, paused) {
  const assessment = frameMonitor.assess(maxVisualFrequency(f.session));
  const reason = paused
    ? "paused"
    : reduced()
      ? "reduced"
      : document.hidden || state.route !== "session" || dialog.open
        ? "hidden"
        : f.lightStopped
          ? "stopped"
          : assessment.reason;
  const ready = reason === "ready";
  if (
    f.lightStarted &&
    !ready &&
    ["unstable", "slow", "hidden"].includes(reason)
  )
    f.lightStopped = true;
  if (ready) {
    if (f.lightStartedAt == null) f.lightStartedAt = elapsed;
    f.lightStarted = true;
  }
  const sample = lightSample(
    visualCycles(f.session, elapsed),
    f.lightContrast,
    ready ? Math.min(1, (elapsed - f.lightStartedAt) / 2) : 0,
  );
  refs.light.style.backgroundColor = `rgb(${sample.channel},${sample.channel},${sample.channel})`;
  const message = {
    measuring: t(
      "Sprawdzanie tempa klatek… światło jest statyczne.",
      "Checking frame cadence… light is static.",
    ),
    ready: `${visualFrequency(phaseAt(f.session, elapsed), elapsed).toFixed(1)} Hz · ${t("tempo klatek", "frame cadence")} ≈ ${Math.round(assessment.fps)}/s`,
    slow: t(
      "Za wolne odświeżanie dla tego protokołu. Światło pozostaje statyczne.",
      "Frame cadence is too low for this protocol. Light stays static.",
    ),
    unstable: t(
      "Nierówne tempo klatek. Pulsacja wyłączona.",
      "Uneven frame cadence. Pulsation is off.",
    ),
    stopped: t(
      "Pulsacja zatrzymana. Pauza i Wznów, aby sprawdzić ponownie.",
      "Pulsation stopped. Pause and Resume to recheck.",
    ),
    reduced: t(
      "Ograniczenie ruchu wyłącza pulsację.",
      "Reduced motion disables pulsation.",
    ),
    paused: t("Pauza · światło jest statyczne.", "Paused · light is static."),
    hidden: t("Pulsacja wstrzymana.", "Pulsation suspended."),
  }[reason];
  if (
    refs.lightStatus &&
    (f.lastLightReason !== reason || elapsed - (f.lastLightReport ?? -1) >= 1)
  ) {
    if (refs.lightStatus.textContent !== message)
      refs.lightStatus.textContent = message;
    f.lastLightReason = reason;
    f.lastLightReport = elapsed;
  }
}
function setPlayerVisual(value) {
  const f = state.flow;
  if (!f) return;
  f.visual = value === "black" ? "night" : value;
  f.lightStopped = true;
  render();
  if (value === "black") openBlackScreen();
  else document.getElementById("playerVisual")?.focus({ preventScroll: true });
}
function setMedia() {
  if (!("mediaSession" in navigator) || !state.flow) return;
  try {
    navigator.mediaSession.metadata = new MediaMetadata({
      title: local(state.flow.session.title),
      artist: "Cortex",
      album:
        state.flow.program?.name || local(pathFor(state.flow.session.goal)),
    });
    navigator.mediaSession.setActionHandler("pause", () => pause());
    navigator.mediaSession.setActionHandler("play", () =>
      state.flow?.stage === "between" ? nextStep() : resume(),
    );
    navigator.mediaSession.setActionHandler("stop", () => finish(false));
    navigator.mediaSession.playbackState =
      state.flow.clock.status === "running" ? "playing" : "paused";
  } catch {}
}
async function start(id) {
  if (state.starting || state.flow) return;
  const advanced =
    state.visual === "advanced" && supportsStimulation(sessionFor(id));
  const lightContrast =
    Number(document.getElementById("lightContrast")?.value) || 0.04;
  if (advanced && !document.getElementById("advancedConsent")?.checked) {
    showStartError(
      t(
        "Potwierdź wybór pulsacji lub wybierz spokojną formę.",
        "Confirm pulsation or choose the quiet form.",
      ),
    );
    return;
  }
  state.starting = true;
  const token = ++state.token;
  const startButton = document.querySelector('[data-action="start"]');
  if (startButton) {
    startButton.disabled = true;
    startButton.setAttribute("aria-busy", "true");
    startButton.textContent = t("Przygotowuję…", "Preparing…");
  }
  try {
    const standalone = id === "breath";
    if (!standalone || prefs().breathCues) await audio.unlock();
    if (token !== state.token) return;
    const p =
      state.pendingProgram?.program.steps[state.pendingProgram.index]
        .sessionId === id
        ? state.pendingProgram
        : null;
    const duration = p
      ? p.program.steps[p.index].durationMinutes * 60
      : standalone
        ? prefs().breathDuration
        : id === "hypnos"
          ? prefs().hypnosDuration === "infinity"
            ? Infinity
            : Number(prefs().hypnosDuration) * 60
          : undefined;
    const session = makeSession(id, duration),
      prelude = !standalone && prefs().prelude && (!p || p.index === 0);
    const usesAudio = !standalone || prefs().breathCues;
    const clock = new SessionController(
      usesAudio ? () => audio.now() : () => performance.now() / 1000,
    );
    state.nightResult = false;
    frameMonitor.reset();
    state.flow = {
      session,
      stage: prelude ? "prelude" : "session",
      clock,
      pattern: prefs().breathPattern,
      visual: state.visual,
      program: p?.program || null,
      stepIndex: p?.index || 0,
      total: 0,
      logged: false,
      startedAt: Date.now(),
      lightContrast,
      lightStarted: false,
      lightStopped: false,
      lightStartedAt: null,
    };
    clock.start(prelude ? 60 : session.duration);
    if (!prelude && !standalone) {
      audio.play(session, 0, prefs());
      clock.anchor = audio.graph.startedAt;
    }
    store.save({ lastSessionId: id, goal: session.goal });
    state.pendingProgram = null;
    lastCue = "";
    setMedia();
    go("session");
    if (!prelude && state.visual === "black") {
      state.flow.visual = "night";
      openBlackScreen();
    }
  } catch (error) {
    audio.stop();
    state.flow = null;
    showStartError(
      t(
        "Nie udało się uruchomić dźwięku. Sprawdź ustawienia przeglądarki i spróbuj ponownie.",
        "Sound could not start. Check your browser settings and try again.",
      ),
    );
    console.error(error);
  } finally {
    state.starting = false;
    if (startButton?.isConnected) {
      startButton.disabled = false;
      startButton.removeAttribute("aria-busy");
      startButton.innerHTML = icon("play") + t("Rozpocznij", "Begin");
    }
  }
}
function showStartError(message) {
  const e = document.getElementById("startError");
  if (e) {
    e.textContent = message;
    e.hidden = false;
  } else toast(message);
}
function pause() {
  const f = state.flow;
  if (!f || f.stage === "between" || f.clock.status !== "running") return;
  f.clock.pause();
  stopHaptics();
  audio.stop();
  if ("mediaSession" in navigator)
    navigator.mediaSession.playbackState = "paused";
  lastSecond = "";
  updateMini();
  updatePlayer();
}
async function resume() {
  const f = state.flow;
  if (!f || f.clock.status !== "paused" || state.starting) return;
  state.starting = true;
  const token = ++state.token;
  try {
    if (f.session.id !== "breath" || prefs().breathCues) await audio.unlock();
    if (state.flow !== f || token !== state.token) return;
    if (f.stage === "session" && f.session.id !== "breath")
      audio.play(f.session, f.clock.position(), prefs());
    frameMonitor.reset();
    f.lightStopped = false;
    f.lightStarted = false;
    f.lightStartedAt = null;
    f.clock.resume();
    if (audio.graph && f.stage === "session")
      f.clock.anchor = audio.graph.startedAt;
    lastCue = "";
    if ("mediaSession" in navigator)
      navigator.mediaSession.playbackState = "playing";
  } catch {
    toast(
      t(
        "Dźwięk jest chwilowo niedostępny. Spróbuj wznowić ponownie.",
        "Sound is temporarily unavailable. Try resuming again.",
      ),
    );
  } finally {
    state.starting = false;
    updateMini();
    updatePlayer();
  }
}
function enterSound() {
  const f = state.flow;
  if (!f || f.stage !== "prelude") return;
  try {
    audio.play(f.session, 0, prefs());
  } catch {
    pause();
    toast(
      t(
        "Nie udało się rozpocząć dźwięku. Spróbuj ponownie lub zakończ sesję.",
        "Sound could not start. Try again or finish the session.",
      ),
    );
    return;
  }
  const opening = saveLog(f, f.clock.complete);
  f.total += opening?.durationSeconds || 0;
  f.logged = false;
  f.stage = "session";
  frameMonitor.reset();
  if (f.visual === "black") {
    f.visual = "night";
    openBlackScreen();
  }
  f.clock.start(f.session.duration);
  if (audio.graph) f.clock.anchor = audio.graph.startedAt;
  f.startedAt = Date.now();
  lastCue = "";
  render();
}
function saveLog(f, complete) {
  if (f.logged) return null;
  f.logged = true;
  const prelude = f.stage === "prelude";
  const entry = {
    id: sessionId(),
    sessionId: prelude ? "breath" : f.session.id,
    goal: prelude ? "breath" : f.session.goal,
    startedAt: f.startedAt,
    endedAt: Date.now(),
    durationSeconds: Math.round(f.clock.position()),
    completed: complete,
    programId: f.program?.id || null,
    programName: f.program?.name || null,
  };
  if (entry.durationSeconds > 0) store.add(entry);
  f.lastLogId = entry.durationSeconds > 0 ? entry.id : f.lastLogId;
  return entry;
}
function finish(complete) {
  const f = state.flow;
  if (!f) return;
  audio.stop();
  f.clock.finish();
  const entry = saveLog(f, complete);
  f.total += entry?.durationSeconds || 0;
  if (complete && f.program && f.stepIndex < f.program.steps.length - 1) {
    f.stage = "between";
    setMedia();
    go("session");
    render();
    return;
  }
  state.result = {
    ...(entry || {}),
    id: entry?.id || f.lastLogId,
    goal: entry?.goal || f.session.goal,
    name:
      f.stage === "prelude"
        ? sessions.breath.title
        : f.program?.name || f.session.title,
    durationSeconds: f.total,
  };
  state.nightResult = ["night", "black"].includes(f.visual);
  stopHaptics();
  state.flow = null;
  state.visual = prefs().audioOnly ? "none" : "calm";
  state.selected = "";
  state.token++;
  if ("mediaSession" in navigator)
    navigator.mediaSession.playbackState = "none";
  if (document.fullscreenElement) document.exitFullscreen().catch(() => {});
  go("complete");
}
async function nextStep() {
  const f = state.flow;
  if (!f || f.stage !== "between" || state.starting) return;
  state.starting = true;
  const token = ++state.token;
  try {
    await audio.unlock();
    if (state.flow !== f || token !== state.token) return;
    const step = f.program.steps[f.stepIndex + 1];
    const session = makeSession(step.sessionId, step.durationMinutes * 60);
    audio.play(session, 0, prefs());
    f.stepIndex++;
    f.session = session;
    f.stage = "session";
    f.logged = false;
    f.startedAt = Date.now();
    f.visual = prefs().audioOnly
      ? "none"
      : session.goal === "sleep"
        ? "night"
        : "calm";
    f.clock.start(f.session.duration);
    if (audio.graph) f.clock.anchor = audio.graph.startedAt;
    setMedia();
    render();
  } catch {
    toast(
      t(
        "Nie udało się uruchomić kolejnego etapu. Spróbuj ponownie.",
        "The next step could not start. Please try again.",
      ),
    );
  } finally {
    state.starting = false;
  }
}
function finishProgram() {
  const f = state.flow;
  if (!f) return;
  state.result = {
    id: f.lastLogId,
    goal: f.session.goal,
    name: f.program.name,
    durationSeconds: f.total,
  };
  state.nightResult = ["night", "black"].includes(state.flow?.visual);
  stopHaptics();
  state.flow = null;
  state.token++;
  if ("mediaSession" in navigator)
    navigator.mediaSession.playbackState = "none";
  go("complete");
}
function tick() {
  const f = state.flow;
  if (
    f?.clock.status === "running" &&
    f.stage !== "between" &&
    f.clock.complete
  ) {
    if (f.stage === "prelude") enterSound();
    else finish(true);
  }
  updatePlayer();
}
function frame(timestamp) {
  if (!document.hidden) {
    frameMonitor.add(timestamp);
    tick();
  }
  requestAnimationFrame(frame);
}
requestAnimationFrame(frame);
setInterval(() => {
  if (document.hidden) tick();
}, 300);
audio.onInterrupted = () => {
  if (state.flow?.clock.status === "running") {
    pause();
    toast(
      t(
        "Odtwarzanie zostało przerwane przez system. Wznów, kiedy zechcesz.",
        "Playback was interrupted by the system. Resume when you are ready.",
      ),
    );
  }
};
document.addEventListener("visibilitychange", () => {
  stopHaptics();
  frameMonitor.reset();
  if (state.flow?.visual === "advanced") state.flow.lightStopped = true;
  if (
    document.hidden &&
    (state.flow?.session.id === "breath" || state.flow?.stage === "prelude")
  )
    pause();
  if (!document.hidden) tick();
});

function openDialog(type) {
  if (!dialog.open) restoreFocus = document.activeElement;
  dialog.dataset.type = type;
  dialog.innerHTML =
    type === "settings"
      ? views.settings(prefs(), store.available, active())
      : exportPanel(state.selected, prefs());
  if (!dialog.open) dialog.showModal();
  else dialog.querySelector("button")?.focus();
}
function closeDialog() {
  cancelExport();
  dialog.close();
  restoreFocus?.focus?.();
}
dialog.addEventListener("cancel", () => {
  cancelExport();
});
dialog.addEventListener("close", () => restoreFocus?.focus?.());
dialog.addEventListener("click", (e) => {
  if (e.target === dialog) {
    const r = dialog.getBoundingClientRect();
    if (
      e.clientX < r.left ||
      e.clientX > r.right ||
      e.clientY < r.top ||
      e.clientY > r.bottom
    )
      closeDialog();
  }
});
function updatePreference(key, value, rerender = true) {
  const scope = dialog.open ? dialog : main;
  const openDetails = [...scope.querySelectorAll("details")].map((d) => d.open);
  const focused = document.activeElement;
  const selector = focused?.dataset.pref
    ? `[data-pref="${focused.dataset.pref}"]`
    : focused?.dataset.key
      ? `[data-key="${focused.dataset.key}"][data-value="${focused.dataset.value}"]`
      : null;
  store.save({ [key]: value });
  applyPreferences();
  audio.volumes(prefs());
  if (key === "audioOnly") {
    state.visual = value ? "none" : "calm";
    if (state.flow) {
      state.flow.visual = state.visual;
      main
        .querySelector(".player-stage")
        ?.classList.toggle("audio-only", value);
    }
  }
  if (rerender) {
    if (dialog.open && dialog.dataset.type === "settings")
      dialog.innerHTML = views.settings(prefs(), store.available, active());
    else render();
    scope
      .querySelectorAll("details")
      .forEach((d, i) => (d.open = openDetails[i] || d.open));
    if (selector) scope.querySelector(selector)?.focus({ preventScroll: true });
  }
}
document.addEventListener("input", (e) => {
  const el = e.target;
  if (el.id === "searchSessions") {
    state.filters.query = el.value;
    document.getElementById("libraryResults").innerHTML = views.libraryCards(
      state.filters,
    );
    return;
  }
  if (el.matches("input[type=range][data-pref]")) {
    updatePreference(el.dataset.pref, Number(el.value) / 100, false);
    document
      .querySelectorAll(`output[data-for="${el.dataset.pref}"]`)
      .forEach((o) => (o.textContent = el.value + "%"));
  }
});
document.addEventListener("change", (e) => {
  const el = e.target;
  if (el.dataset.pref) {
    updatePreference(
      el.dataset.pref,
      el.type === "checkbox"
        ? el.checked
        : el.type === "range"
          ? Number(el.value) / 100
          : el.value,
      el.type !== "range",
    );
  }
  if (el.id === "playerVisual") {
    setPlayerVisual(el.value);
    return;
  }
  if (el.id === "visualMode") {
    state.visual = el.value;
    render();
    document
      .getElementById("visualMode")
      ?.closest("details")
      ?.setAttribute("open", "");
    document.getElementById("visualMode")?.focus({ preventScroll: true });
  }
  if (el.id === "durationFilter") {
    state.filters.duration = el.value;
    document.getElementById("libraryResults").innerHTML = views.libraryCards(
      state.filters,
    );
  }
});
document.addEventListener("click", async (e) => {
  const readingLink = e.target.closest("a[href]");
  if (
    state.flow &&
    readingLink &&
    !readingLink.getAttribute("href").startsWith("#")
  ) {
    readingLink.target = "_blank";
    readingLink.rel = "noopener";
  }
  if (e.target.closest(".skip-link")) {
    e.preventDefault();
    main.focus();
    return;
  }
  const el = e.target.closest("[data-action]");
  if (!el || el.disabled) return;
  const a = el.dataset.action;
  if (a === "language") {
    store.save({ lang: language === "pl" ? "en" : "pl" });
    setLanguage(prefs().lang);
    render();
    if (dialog.open) openDialog(dialog.dataset.type);
    setMedia();
  } else if (a === "settings") openDialog("settings");
  else if (a === "closeDialog") closeDialog();
  else if (a === "filterGoal") {
    state.filters.goal = el.dataset.value;
    render();
  } else if (a === "clearFilters") {
    state.filters = { goal: "all", duration: "all", query: "" };
    render();
  } else if (a === "preference") {
    updatePreference(
      el.dataset.key,
      ["breathDuration"].includes(el.dataset.key)
        ? Number(el.dataset.value)
        : el.dataset.value,
    );
  } else if (a === "start") await start(el.dataset.session);
  else if (a === "pause") {
    if (state.flow?.clock.status === "paused") await resume();
    else pause();
  } else if (a === "end") finish(false);
  else if (a === "skipPrelude") enterSound();
  else if (a === "startProgram") {
    const p = programs.find((p) => p.id === el.dataset.program);
    state.pendingProgram = { program: p, index: 0 };
    go("prepare/" + p.steps[0].sessionId);
  } else if (a === "nextStep") await nextStep();
  else if (a === "endProgram") finishProgram();
  else if (a === "disableLight") setPlayerVisual("calm");
  else if (a === "fullscreen") {
    const player = document.getElementById("player");
    try {
      if (document.fullscreenElement) await document.exitFullscreen();
      else if (player?.requestFullscreen) await player.requestFullscreen();
      else
        toast(
          t(
            "Ten ekran nie obsługuje pełnego ekranu.",
            "Fullscreen is not available on this device.",
          ),
        );
    } catch {
      toast(
        t(
          "Pełny ekran jest niedostępny w tej przeglądarce.",
          "Fullscreen is unavailable in this browser.",
        ),
      );
    }
  } else if (a === "testLeft" || a === "testRight") {
    el.disabled = true;
    try {
      await audio.test(a === "testLeft" ? -1 : 1, prefs().masterVolume);
      toast(
        t(
          a === "testLeft" ? "Lewy kanał" : "Prawy kanał",
          a === "testLeft" ? "Left channel" : "Right channel",
        ),
      );
    } catch {
      toast(
        t(
          "Nie udało się uruchomić testu dźwięku.",
          "The sound check could not start.",
        ),
      );
    } finally {
      el.disabled = false;
    }
  } else if (a === "rate") {
    const n = Number(el.dataset.value);
    if (state.result) {
      state.result.rating = n;
      if (state.result.id) store.rate(state.result.id, n);
      render();
    }
  } else if (a === "export") {
    if (!active()) openDialog("export");
  } else if (a === "exportData")
    downloadBlob(
      new Blob(
        [
          JSON.stringify(
            { version: 3, history: store.history, preferences: prefs() },
            null,
            2,
          ),
        ],
        { type: "application/json" },
      ),
      "cortex-history.json",
    );
  else if (a === "renderExport") startExport(dialog, prefs());
  else if (a === "cancelExport") cancelExport(dialog);
  else if (a === "exportMetadata") {
    const id = dialog.querySelector("#exportSession").value;
    const s = sessionFor(id);
    downloadBlob(
      new Blob(
        [
          JSON.stringify(
            {
              sessionId: s.id,
              goal: s.goal,
              name: s.name,
              title: local(s.title),
              description: local(s.description),
              duration: s.duration,
              phases: s.phases,
            },
            (_, value) => (value === Infinity ? "Infinity" : value),
            2,
          ),
        ],
        { type: "application/json" },
      ),
      `cortex-${id}.json`,
    );
  } else if (a === "exportArt") {
    const s = sessionFor(dialog.querySelector("#exportSession").value);
    const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="1600" height="900" viewBox="0 0 1600 900"><rect width="1600" height="900" fill="#f7f8f5"/><g fill="none" stroke="#77957d" stroke-width="2">${Array.from({ length: 22 }, (_, i) => `<ellipse cx="1180" cy="440" rx="${70 + i * 9}" ry="${100 + i * 7}" transform="rotate(${i * 3} 1180 440)"/>`).join("")}</g><text x="120" y="150" fill="#386b55" font-family="sans-serif" font-size="38">cortex</text><text x="120" y="430" fill="#243a32" font-family="sans-serif" font-size="68">${esc(s.name)}</text><text x="120" y="510" fill="#627168" font-family="sans-serif" font-size="34">${esc(local(s.title))}</text></svg>`;
    downloadBlob(
      new Blob([svg], { type: "image/svg+xml" }),
      `cortex-${s.id}.svg`,
    );
  }
  if (
    !el.isConnected &&
    ["language", "filterGoal", "clearFilters", "rate"].includes(a)
  ) {
    const selector =
      `[data-action="${a}"]` +
      (el.dataset.value ? `[data-value="${el.dataset.value}"]` : "");
    document.querySelector(selector)?.focus({ preventScroll: true });
  }
});
window.addEventListener("hashchange", () => {
  if (state.flow?.visual === "advanced" && location.hash !== "#session")
    state.flow.lightStopped = true;
  if (
    state.pendingProgram &&
    location.hash !==
      "#prepare/" + state.pendingProgram.program.steps[0].sessionId
  )
    state.pendingProgram = null;
  if (state.starting) {
    state.token++;
    state.starting = false;
  }
  render();
  window.scrollTo(0, 0);
  main.focus({ preventScroll: true });
});
window.addEventListener("pagehide", () => {
  state.token++;
  state.starting = false;
  pause();
  audio.stop();
  cancelExport();
});
window.addEventListener("pageshow", (event) => {
  if (event.persisted) render();
});
render();
