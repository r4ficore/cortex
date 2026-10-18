import {
  NavigationMemory,
  canonicalRoute,
  repeatSetup,
  sessionProfile,
  quietVisual,
} from "./experience.js";
import { prepareOffline, installApp } from "./offline.js";
import {
  ritualFor,
  ritualPlan,
  ritualAt,
  ritualPreferences,
  ritualVisual,
  ritualFields,
  ritualAudio,
} from "./rituals.js";
import {
  snapshotFlow,
  restoreFlow,
  validSnapshot,
  audioSettings,
} from "./recovery.js";
import { parseBackup } from "./data-transfer.js";
import { ScreenAwake } from "./wake-lock.js";
import {
  paths,
  sessions,
  programs,
  sessionFor,
  makeSession,
  pathFor,
} from "./catalog.js";
import { createStore, migratePreferences } from "./store.js";
import { SessionController, phaseAt } from "./session.js";
import { breathAt, cycleDuration, practiceDuration } from "./breath.js";
import { AudioEngine } from "./audio.js";
import {
  sessionId,
  breathHaptic,
  stopHaptics,
  requestPlayerFullscreen,
} from "./platform.js";
import {
  FrameMonitor,
  lightRecovery,
  availableLightHz,
  visualFrequency,
  visualCycles,
  lightSample,
} from "./stimulation.js";
import { updateOrb, fitBreathingForm } from "./visual.js";
import { t, local, language, setLanguage, esc, icon, time } from "./i18n.js";
import * as views from "./views.js";
import {
  exportPanel,
  exportMetadata,
  updateExportSize,
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
const ownerId = sessionId();
const wake = new ScreenAwake(navigator.wakeLock, showWakeStatus);
let importPreview = null;
let frameHandle = null;
const mediaMotion = matchMedia("(prefers-reduced-motion: reduce)");
const navigation = new NavigationMemory(location.hash.slice(1));
let linkedNavigation = false;
if ("scrollRestoration" in history) history.scrollRestoration = "manual";
const state = {
  flow: null,
  result: null,
  starting: false,
  token: 0,
  selected: "",
  nightResult: false,
  expanded: false,
  lightSettings: { mode: "adaptive", contrast: 0.06 },
  visual: "calm",
  pendingProgram: null,
  ritualDraft: null,
  ritualDraftId: null,
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
  syncRuntime();
  blackScreen.querySelector("button").focus({ preventScroll: true });
}
blackScreen.addEventListener("click", () => blackScreen.close());
blackScreen.addEventListener("close", () => {
  syncRuntime();
  (document.getElementById("playerVisual") || main).focus({
    preventScroll: true,
  });
});
let restoreFocus = null,
  refs = {},
  lastCue = "",
  lastSecond = "",
  toastTimer,
  breathPreviewTimer,
  breathPreviewToken = 0,
  breathPreviewPlaying = false;
const prefs = () => store.prefs;
const breathAudio = (p) =>
  p.breathCues || (p.breathBackground && p.breathBackground !== "none");
const currentPrefs = () =>
  state.route === "ritual" && !dialog.open
    ? state.ritualDraft || prefs()
    : state.flow?.ritual
      ? state.flow.audioPrefs
      : prefs();
const reduced = () => mediaMotion.matches || prefs().reduceMotion === true;
function applyPreferences() {
  document.body.classList.toggle("reduce-motion", reduced());
  updateMotionNote();
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
  stopBreathPreview();
  const rawRoute = location.hash.slice(1) || "home";
  const route = canonicalRoute(rawRoute);
  if (route !== rawRoute) history.replaceState(null, "", "#" + route);
  const [page, id] = route.split("/");
  state.route = page;
  const playerPage =
    page === "session" && state.flow && state.flow.stage !== "between";
  if (!playerPage) state.expanded = false;
  document.body.classList.toggle("player-page", Boolean(playerPage));
  document.body.classList.toggle("player-expanded", state.expanded);
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
  const selectedTab = navigation.context.tab;
  document.body.classList.toggle(
    "setup-page",
    ["prepare", "ritual"].includes(page),
  );
  document.getElementById("header").innerHTML = views.header(selectedTab);
  document.getElementById("mobileNav").innerHTML = views.nav(selectedTab, true);
  document
    .getElementById("mobileNav")
    .setAttribute("aria-label", t("Nawigacja", "Navigation"));
  document.title = `${t("Cortex — chwila dla Ciebie", "Cortex — a moment for you")}`;
  if (page === "library")
    main.innerHTML = views.library(state.filters, prefs());
  else if (page === "ritual" && ritualFor(id)) {
    if (state.ritualDraftId !== id) {
      state.ritualDraftId = id;
      state.ritualDraft = migratePreferences(ritualPreferences(id, prefs()));
    }
    main.innerHTML = views.ritualPrepare(
      id,
      state.ritualDraft,
      active(),
      Boolean(prefs().ritualProfiles[id]),
    );
  } else if (page === "prepare") {
    const selected = Object.hasOwn(sessions, id) ? id : "deepFocus";
    if (state.selected !== selected) {
      state.selected = selected;
      const saved = prefs().sessionProfiles[selected];
      if (saved && !active()) store.save(saved);
      state.visual = prefs().audioOnly
        ? "none"
        : sessions[selected]?.goal === "sleep"
          ? "night"
          : "calm";
      if (saved)
        state.visual = quietVisual(saved.visual, sessions[selected].goal);
    }
    if (selected === "breath")
      state.visual =
        prefs().breathVisual && !prefs().audioOnly ? "calm" : "none";
    main.innerHTML = views.prepare(
      selected,
      prefs(),
      state.visual,
      state.starting,
      active(),
      state.pendingProgram,
      state.lightSettings,
    );
  } else if (page === "program")
    main.innerHTML = views.programView(id, active());
  else if (page === "mine")
    main.innerHTML = views.mySessions(prefs(), store.history, active());
  else if (page === "knowledge") main.innerHTML = views.knowledge();
  else if (page === "session")
    main.innerHTML = state.flow
      ? state.flow.stage === "between"
        ? views.between(state.flow)
        : views.player(playerFlow(state.flow), currentPrefs())
      : state.result
        ? views.completed(state.result)
        : views.home(prefs(), store.history, state.flow);
  else if (page === "complete" && state.result)
    main.innerHTML = views.completed(state.result);
  else main.innerHTML = views.home(prefs(), store.history, state.flow);
  main
    .querySelectorAll("[data-back]")
    .forEach((link) =>
      link.setAttribute("href", "#" + navigation.context.back),
    );
  if (!state.flow) {
    const recoverable = availableRecoveries();
    state.recoveryIds = recoverable.map((s) => s.id).join();
    if (recoverable.length)
      main.insertAdjacentHTML(
        "afterbegin",
        `<section class="notice recovery-notice" aria-label="${t("Przerwane sesje", "Interrupted sessions")}"><h2>${t("Twoja sesja czeka", "Your session is waiting")}</h2><p>${t("Wróć do zapisanego miejsca lub zachowaj ten czas w historii. Dźwięk ruszy dopiero po naciśnięciu Wznów. Światło pozostanie wyłączone.", "Return to your saved position or keep this time in history. Sound starts only when you press Resume. Light stays off.")}</p>${recoverable.map((s) => `<div class="button-row"><span>${ritualFor(s.ritualId) ? local(ritualFor(s.ritualId).name) : s.sessionId === "breath" ? local(sessions.breath.title) : esc(sessionFor(s.sessionId).name)} · ${time(s.position)}</span>${views.button("recover", t("Wróć do sesji", "Return to session"), "", "btn", `data-id="${esc(s.id)}"`)}${views.button("closeRecovery", t("Zapisz i zakończ", "Save and finish"), "", "btn btn-quiet", `data-id="${esc(s.id)}"`)}</div>`).join("")}</section>`,
      );
  }
  refs = {
    orb: main.querySelector(".player-stage>.orb"),
    label: document.getElementById("breathLabel"),
    count: document.getElementById("breathCount"),
    clock: document.getElementById("playerClock"),
    progress: document.getElementById("playerProgress"),
    pause: document.getElementById("pauseButton"),
    tip: document.getElementById("playerTip"),
    light: document.getElementById("lightField"),
    lightStatus: document.getElementById("lightStatus"),
    motionNote: document.getElementById("motionNote"),
  };
  if (refs.light && state.flow) state.flow.lastLightReason = null;
  visualResize?.disconnect();
  const stage = main.querySelector(".player-stage");
  if (stage) visualResize?.observe(stage);
  fitPlayer();
  syncExpandedView();
  updateMotionNote();
  lastSecond = "";
  updateMini();
  updatePlayer();
  syncRuntime();
}
function fitPlayer() {
  fitBreathingForm(main.querySelector(".player-stage"), refs.orb);
}
const visualResize =
  typeof ResizeObserver === "function" ? new ResizeObserver(fitPlayer) : null;
window.addEventListener("resize", fitPlayer);
window.visualViewport?.addEventListener("resize", fitPlayer);
function updateMotionNote() {
  if (!refs.motionNote) return;
  const message =
    state.flow && playerFlow(state.flow).visual === "none"
      ? t(
          "Animacja wyłączona: wybrano sam dźwięk.",
          "Animation off: audio-only mode is selected.",
        )
      : mediaMotion.matches
        ? t(
            "Animacja wyłączona przez ustawienie systemowe Ogranicz ruch.",
            "Animation off: your system requests reduced motion.",
          )
        : prefs().reduceMotion
          ? t(
              "Animacja wyłączona w ustawieniach Cortex: Ogranicz ruch.",
              "Animation off in Cortex settings: Reduce motion.",
            )
          : "";
  refs.motionNote.hidden = !message;
  if (refs.motionNote.textContent !== message)
    refs.motionNote.textContent = message;
  if (
    refs.tip &&
    (state.flow?.session.id === "breath" || state.flow?.stage === "prelude")
  )
    refs.tip.textContent = message
      ? t(
          "Podążaj za fazą i odliczaniem. Nie wymuszaj oddechu.",
          "Follow the phase and countdown. Do not force your breath.",
        )
      : views.breathTip(
          state.flow.stage === "prelude" ? "4-6" : state.flow.pattern,
        );
}
function syncExpandedView() {
  const expanded = state.expanded || Boolean(document.fullscreenElement);
  const player = document.getElementById("player");
  const immersive =
    expanded &&
    state.flow?.visual === "advanced" &&
    state.flow?.stage === "session";
  player?.classList.toggle("light-immersive", immersive);
  showLightControls(immersive && state.flow?.lastLightReason === "ready");
  const button = document.querySelector('[data-action="fullscreen"]');
  if (button) {
    button.setAttribute(
      "aria-label",
      expanded
        ? t("Zwiń widok", "Collapse view")
        : t("Rozwiń widok", "Expand view"),
    );
    button.setAttribute("aria-pressed", String(expanded));
    button.innerHTML = icon(expanded ? "close" : "expand");
  }
  fitPlayer();
}
let controlsTimer;
function showLightControls(autoHide = false) {
  clearTimeout(controlsTimer);
  const player = document.getElementById("player");
  if (!player) return;
  player.classList.remove("light-clean");
  player
    .querySelectorAll(".player-top, .player-bottom, .light-info")
    .forEach((el) => (el.inert = false));
  if (autoHide && player.classList.contains("light-immersive"))
    controlsTimer = setTimeout(hideLightControls, 3000);
}
function hideLightControls() {
  const player = document.getElementById("player");
  if (
    !player?.classList.contains("light-immersive") ||
    !["ready", "paused"].includes(state.flow?.lastLightReason) ||
    dialog.open
  )
    return;
  const controls = [
    ...player.querySelectorAll(".player-top, .player-bottom, .light-info"),
  ];
  if (controls.some((el) => el.contains(document.activeElement)))
    player.querySelector(".light-reveal")?.focus({ preventScroll: true });
  controls.forEach((el) => (el.inert = true));
  player.classList.add("light-clean");
}
document.addEventListener("pointerdown", (event) => {
  if (
    event.target.closest(
      ".light-immersive .player-top, .light-immersive .player-bottom, .light-immersive .light-info",
    )
  )
    showLightControls(false);
});
document.addEventListener("pointermove", (event) => {
  if (
    event.pointerType === "mouse" &&
    Math.abs(event.movementX) + Math.abs(event.movementY) > 2 &&
    document.querySelector(".light-immersive")
  )
    showLightControls(true);
});
document.addEventListener("fullscreenchange", syncExpandedView);
document.addEventListener("keydown", (event) => {
  if (event.key !== "Escape" && document.querySelector(".light-immersive"))
    showLightControls(false);
  if (
    event.key === "Escape" &&
    state.expanded &&
    !dialog.open &&
    !blackScreen.open
  ) {
    state.expanded = false;
    document.body.classList.remove("player-expanded");
    syncExpandedView();
    document.querySelector('[data-action="fullscreen"]')?.focus();
  }
});
function updateMini() {
  const mini = document.getElementById("miniPlayer"),
    f = state.flow;
  mini.hidden =
    !f || ["home", "session", "prepare", "ritual"].includes(state.route);
  if (!f) return;
  mini.innerHTML = `<a href="#session">${icon(pathFor(f.session.goal).icon)}<span><strong>${local(f.ritual?.name || f.session.title)}</strong><small id="miniTime">${f.stage === "between" ? t("Gotowy na kolejny etap", "Ready for the next step") : time(f.clock.duration - f.clock.position())}</small></span></a>${f.stage !== "between" ? views.button("pause", "", f.clock.status === "paused" ? "play" : "pause", "icon-btn", `aria-label="${f.clock.status === "paused" ? t("Wznów", "Resume") : t("Pauza", "Pause")}"`) : ""}`;
}
function updatePlayer() {
  const f = state.flow;
  if (!f || f.stage === "between") return;
  const shown = playerFlow(f);
  const elapsed = shown.clock.position(),
    paused = f.clock.status === "paused",
    breath = f.session.id === "breath" || f.stage === "prelude";
  const pattern = f.stage === "prelude" ? "4-6" : f.pattern;
  const b = breath ? breathAt(elapsed, pattern) : null;
  if (!blackScreen.open && !document.hidden)
    updateOrb(refs.orb, {
      elapsed,
      breath: b,
      reduced: reduced() || (f.visual === "advanced" && !breath),
      paused,
    });
  if (refs.light && !blackScreen.open) updateLight(f, elapsed, paused);
  const key = `${Math.ceil(elapsed)}-${paused}-${language}-${f.stage}`;
  if (key !== lastSecond) {
    lastSecond = key;
    const remaining = Number.isFinite(shown.clock.duration)
      ? shown.clock.duration - elapsed
      : elapsed;
    if (refs.clock)
      refs.clock.textContent =
        time(remaining) + (Number.isFinite(shown.clock.duration) ? "" : " · ∞");
    if (refs.progress) {
      const p = Number.isFinite(shown.clock.duration)
        ? Math.min(100, (elapsed / shown.clock.duration) * 100)
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
    const total = document.getElementById("ritualRemaining");
    if (total && f.ritual)
      total.textContent =
        t("Cały rytuał: ", "Whole ritual: ") +
        time(f.clock.duration - f.clock.position());
    const mini = document.getElementById("miniTime");
    if (mini)
      mini.textContent =
        (paused ? t("Pauza · ", "Paused · ") : "") + time(remaining);
  }
  if (b && !paused && !document.hidden && b.key !== lastCue) {
    lastCue = b.key;
    if (prefs().breathHaptics) breathHaptic(b.phase);
  }
}
function updateLight(f, elapsed, paused) {
  const baseline = frameMonitor.assess(0);
  if (baseline.ok && f.lightLimit == null)
    f.lightLimit = availableLightHz(baseline.fps);
  const requested = visualFrequency(phaseAt(f.session, elapsed), elapsed);
  const ceiling = f.lightMode === "protocol" ? 40 : (f.lightLimit ?? 0);
  const applied = Math.min(requested, ceiling);
  const assessment = frameMonitor.assess(applied || requested);
  const reason = paused
    ? "paused"
    : reduced()
      ? "reduced"
      : document.hidden || state.route !== "session" || dialog.open
        ? "hidden"
        : f.lightStopped
          ? "stopped"
          : baseline.reason !== "ready"
            ? baseline.reason
            : applied <= 0
              ? "slow"
              : assessment.reason;
  const ready = reason === "ready";
  if (lightRecovery(f, reason)) {
    frameMonitor.reset();
    f.lightInterruptedAt = elapsed;
  }
  if (ready) {
    f.appliedLightHz = applied;
    f.lightFrequencyRange = {
      min: Math.min(f.lightFrequencyRange?.min ?? applied, applied),
      max: Math.max(f.lightFrequencyRange?.max ?? applied, applied),
    };
  }
  if (ready) {
    if (f.lightStartedAt == null) f.lightStartedAt = elapsed;
    f.lightStarted = true;
  } else f.lightStartedAt = null;
  const sample = lightSample(
    visualCycles(f.session, elapsed, ceiling),
    f.lightContrast,
    ready ? Math.min(1, (elapsed - f.lightStartedAt) / 2) : 0,
  );
  refs.light.style.backgroundColor = `rgb(${sample.channel},${sample.channel},${sample.channel})`;
  const adapted = f.lightMode !== "protocol" && applied < requested - 0.05;
  const message = {
    measuring: t(
      "Sprawdzam ekran… pulsacja rozpocznie się po pomiarze.",
      "Checking the display… pulsation begins after measurement.",
    ),
    ready: `${t("Światło", "Light")} ${applied.toFixed(1)} Hz${adapted ? ` · ${t("protokół", "protocol")} ${requested.toFixed(1)} Hz` : ""} · ${Math.round(assessment.fps)} ${t("klatek/s", "frames/s")}`,
    slow: `${t("Protokół", "Protocol")}: ${requested.toFixed(1)} Hz. ${t("Ten ekran: do", "This display: up to")} ${availableLightHz(baseline.fps)} Hz.`,
    unstable: t(
      "Chwilowa nierówność klatek. Światło wróci po ponownym pomiarze stabilności.",
      "Temporary uneven frames. Light resumes after stability is measured again.",
    ),
    stopped: t(
      "Światło wstrzymane po przerwie w wyświetlaniu. Sprawdź ponownie, aby wznowić.",
      "Light paused after a display interruption. Check again to resume.",
    ),
    reduced: t(
      "Ograniczenie ruchu wyłącza pulsację.",
      "Reduced motion disables pulsation.",
    ),
    paused: t("Pauza · światło jest zatrzymane.", "Paused · light is stopped."),
    hidden: t("Pulsacja wstrzymana.", "Pulsation suspended."),
  }[reason];
  const reasonChanged = f.lastLightReason !== reason;
  if (reasonChanged || elapsed - (f.lastLightReport ?? -1) >= 1) {
    if (refs.lightStatus && refs.lightStatus.textContent !== message)
      refs.lightStatus.textContent = message;
    const retry = document.getElementById("retryLight");
    const adapt = document.getElementById("adaptLight");
    if (retry) retry.hidden = !["stopped", "unstable"].includes(reason);
    if (refs.lightStatus)
      refs.lightStatus.closest(".light-info").dataset.state = reason;
    const hide = document.querySelector('[data-action="hideLightControls"]');
    if (hide) hide.disabled = !["ready", "paused"].includes(reason);
    if (adapt)
      adapt.hidden = !(reason === "slow" && f.lightMode === "protocol");
    f.lastLightReason = reason;
    f.lastLightReport = elapsed;
  }
  if (reasonChanged) showLightControls(ready);
}
function retryLight(adapt = false) {
  const f = state.flow;
  if (!f || f.visual !== "advanced") return;
  if (adapt) f.lightMode = "adaptive";
  frameMonitor.reset();
  f.lightLimit = null;
  f.lightRecovering = false;
  f.lightStopped = false;
  f.lightStarted = false;
  f.lightStartedAt = null;
  f.lastLightReason = null;
  showLightControls(false);
}
function setPlayerVisual(value) {
  const f = state.flow;
  if (!f) return;
  f.visual = value === "black" ? "night" : value;
  f.lightStopped = true;
  if (f.ritual) {
    f.ritualPrefs.ritualVisual = value;
    checkpoint();
  }
  render();
  if (value === "black") openBlackScreen();
  else document.getElementById("playerVisual")?.focus({ preventScroll: true });
}
function setMedia() {
  if (!("mediaSession" in navigator) || !state.flow) return;
  try {
    navigator.mediaSession.metadata = new MediaMetadata({
      title: local(state.flow.ritual?.name || state.flow.session.title),
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
  stopBreathPreview();
  const lightContrast = state.lightSettings.contrast;
  const lightMode = state.lightSettings.mode;
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
    if (!standalone || breathAudio(prefs())) await audio.unlock();
    if (token !== state.token) return;
    const p =
      state.pendingProgram?.program.steps[state.pendingProgram.index]
        .sessionId === id
        ? state.pendingProgram
        : null;
    const duration = p
      ? p.program.steps[p.index].durationMinutes * 60
      : standalone
        ? practiceDuration(prefs().breathDuration, prefs().breathPattern)
        : id === "hypnos"
          ? prefs().hypnosDuration === "infinity"
            ? Infinity
            : Number(prefs().hypnosDuration) * 60
          : undefined;
    const session = makeSession(id, duration),
      prelude = !standalone && prefs().prelude && (!p || p.index === 0);
    const usesAudio = !standalone || breathAudio(prefs());
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
      breathSound: breathAudio(prefs()),
      audioPrefs: audioSettings(prefs()),
      sessionPrefs: sessionProfile(prefs(), state.visual),
      recoveryId: sessionId(),
      logId: sessionId(),
      visual: state.visual,
      program: p?.program || null,
      stepIndex: p?.index || 0,
      total: 0,
      logged: false,
      startedAt: Date.now(),
      lightContrast,
      lightMode,
      lightLimit: null,
      lightStarted: false,
      lightStopped: false,
      lightStartedAt: null,
    };
    clock.start(prelude ? 60 : session.duration);
    if (!prelude && !standalone) {
      audio.play(session, 0, prefs());
      clock.anchor = audio.graph.startedAt;
    } else if (breathAudio(prefs())) {
      audio.playBreath(
        prelude ? "4-6" : state.flow.pattern,
        clock.duration,
        0,
        prefs(),
      );
      clock.anchor = audio.graph.startedAt;
    }
    store.save({ lastSessionId: id, goal: session.goal });
    state.pendingProgram = null;
    lastCue = "";
    checkpoint();
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
function stopBreathPreview() {
  ++breathPreviewToken;
  clearTimeout(breathPreviewTimer);
  if (breathPreviewPlaying && !state.flow) audio.stop();
  breathPreviewPlaying = false;
  for (const button of document.querySelectorAll(
    '[data-action="previewBreath"], [data-action="previewSession"]',
  )) {
    button.innerHTML =
      icon("volume") +
      (button.dataset.action === "previewSession"
        ? t("Posłuchaj brzmienia · 12 s", "Preview the sound · 12 s")
        : t("Posłuchaj jednego cyklu", "Listen to one cycle"));
    button.setAttribute("aria-pressed", "false");
  }
}
async function previewBreath(kind = "breath") {
  if (state.flow || state.starting) return;
  if (breathPreviewPlaying) {
    stopBreathPreview();
    return;
  }
  const token = ++breathPreviewToken;
  breathPreviewPlaying = true;
  try {
    await audio.unlock();
    if (token !== breathPreviewToken || state.flow) return;
    const pattern =
      state.route === "prepare" && state.selected !== "breath"
        ? "4-6"
        : currentPrefs().breathPattern;
    const duration = kind === "breath" ? cycleDuration(pattern) : 12;
    if (kind === "breath")
      audio.playBreath(pattern, duration, 0, {
        ...currentPrefs(),
        breathCues: true,
      });
    else {
      const session = makeSession(state.selected);
      const stage = session.phases[1] || session.phases[0];
      audio.play(
        {
          ...session,
          duration,
          phases: [{ ...stage, start: 0, end: duration }],
        },
        0,
        prefs(),
      );
    }
    const button = document.querySelector(
      `[data-action="${kind === "breath" ? "previewBreath" : "previewSession"}"]`,
    );
    if (button) {
      button.innerHTML = icon("stop") + t("Zatrzymaj odsłuch", "Stop preview");
      button.setAttribute("aria-pressed", "true");
    }
    breathPreviewTimer = setTimeout(stopBreathPreview, duration * 1000 + 100);
  } catch {
    if (token !== breathPreviewToken) return;
    stopBreathPreview();
    showStartError(
      t(
        "Nie udało się odtworzyć dźwięku. Spróbuj ponownie.",
        "Could not play the sound. Please try again.",
      ),
    );
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
  checkpoint();
  syncRuntime();
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
    if (
      f.ritual
        ? ritualAudio(f.steps, f.audioPrefs)
        : f.session.id !== "breath" || breathAudio(f.audioPrefs)
    )
      await audio.unlock();
    if (state.flow !== f || token !== state.token) return;
    if (f.ritual) {
      if (ritualAudio(f.steps, f.audioPrefs))
        audio.playRitual(f.steps, f.clock.position(), f.audioPrefs);
    } else if (f.stage === "session" && f.session.id !== "breath")
      audio.play(f.session, f.clock.position(), {
        ...prefs(),
        ...f.audioPrefs,
      });
    else if (breathAudio(f.audioPrefs))
      audio.playBreath(
        f.stage === "prelude" ? "4-6" : f.pattern,
        f.clock.duration,
        f.clock.position(),
        { ...prefs(), ...f.audioPrefs },
      );
    frameMonitor.reset();
    f.lightLimit = null;
    f.lightStopped = false;
    f.lightStarted = false;
    f.lightStartedAt = null;
    f.clock.resume();
    if (audio.graph) f.clock.anchor = audio.graph.startedAt;
    if (
      f.ritual &&
      ritualVisual(ritualAt(f.steps, f.clock.position()), f.ritualPrefs) ===
        "black"
    )
      openBlackScreen();
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
    checkpoint();
    syncRuntime();
    updateMini();
    updatePlayer();
  }
}
function enterSound() {
  const f = state.flow;
  if (!f || f.stage !== "prelude") return;
  try {
    audio.play(f.session, 0, { ...prefs(), ...f.audioPrefs });
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
  f.logId = sessionId();
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
  checkpoint();
  render();
}
function saveLog(f, complete) {
  if (f.logged) return null;
  f.logged = true;
  const prelude = f.stage === "prelude";
  const entry = {
    id: f.logId,
    visitId: f.recoveryId,
    sessionId: prelude ? "breath" : f.session.id,
    goal: prelude ? "breath" : f.session.goal,
    startedAt: f.startedAt,
    endedAt: Date.now(),
    durationSeconds: Math.round(f.clock.position()),
    audioVersion: 2,
    audioPrefs: f.audioPrefs,
    sessionPrefs: sessionProfile(
      {
        ...prefs(),
        ...f.sessionPrefs,
        ...f.audioPrefs,
        ...(prelude
          ? { breathDuration: 60, breathPattern: "4-6", prelude: false }
          : {}),
      },
      f.visual,
    ),
    pattern: prelude ? "4-6" : f.pattern,
    visual: f.visual,
    appliedLightHz: f.appliedLightHz ?? null,
    lightContrast: f.lightContrast,
    lightFrequencyRange: f.lightFrequencyRange,
    soundBackground:
      prelude || f.session.id === "breath" ? null : f.audioPrefs.noiseType,
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
  if (f?.ritual) return finishRitual(complete);
  if (!f) return;
  audio.stop();
  f.clock.finish();
  const entry = saveLog(f, complete);
  f.total += entry?.durationSeconds || 0;
  if (complete && f.program && f.stepIndex < f.program.steps.length - 1) {
    f.stage = "between";
    if (blackScreen.open) blackScreen.close();
    checkpoint();
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
  store.clearCheckpoint(f.recoveryId);
  if (blackScreen.open) blackScreen.close();
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
    f.audioPrefs = audioSettings(prefs());
    f.stepIndex++;
    f.session = session;
    f.stage = "session";
    f.logged = false;
    f.logId = sessionId();
    f.startedAt = Date.now();
    f.visual = prefs().audioOnly
      ? "none"
      : session.goal === "sleep"
        ? "night"
        : "calm";
    f.clock.start(f.session.duration);
    if (audio.graph) f.clock.anchor = audio.graph.startedAt;
    checkpoint();
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
  store.clearCheckpoint(f.recoveryId);
  if (blackScreen.open) blackScreen.close();
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
  if (f?.ritual) syncRitualStage();
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
function showWakeStatus() {
  const node = document.getElementById("wakeStatus");
  if (!node) return;
  const messages = {
    active: t("Ekran pozostaje włączony", "Screen stays on"),
    pending: t("Utrzymuję ekran…", "Keeping the screen on…"),
    unavailable: t(
      "System może wygasić ekran. Utrzymywanie ekranu jest niedostępne.",
      "The system may turn the screen off. Screen wake lock is unavailable.",
    ),
    released: t(
      "System zwolnił utrzymywanie ekranu.",
      "The system released the screen wake lock.",
    ),
  };
  node.hidden = !messages[wake.status];
  const text = messages[wake.status] || "";
  if (node.textContent !== text) node.textContent = text;
}
function syncRuntime() {
  const f = state.flow;
  const visible =
    !document.hidden &&
    !blackScreen.open &&
    state.route === "session" &&
    !dialog.open;
  const running = f?.clock.status === "running" && f.stage !== "between";
  const breath = f?.session.id === "breath" || f?.stage === "prelude";
  wake.setWanted(
    Boolean(
      visible &&
        running &&
        prefs().keepScreenAwake &&
        (breath || (f.visual === "advanced" && !f.lightStopped)),
    ),
  );
  showWakeStatus();
  const visual = f ? playerFlow(f).visual : "none";
  const animate =
    visible &&
    running &&
    !reduced() &&
    ((breath && visual !== "none") ||
      (f?.visual === "advanced" && !f.lightStopped) ||
      (refs.orb && visual !== "none"));
  if (animate && frameHandle === null)
    frameHandle = requestAnimationFrame(frame);
  else if (!animate && frameHandle !== null) {
    cancelAnimationFrame(frameHandle);
    frameHandle = null;
  }
}
function frame(timestamp) {
  frameHandle = null;
  if (!document.hidden) {
    if (state.flow?.visual === "advanced") frameMonitor.add(timestamp);
    tick();
  }
  syncRuntime();
}
setInterval(() => {
  tick();
  syncRuntime();
}, 300);
function availableRecoveries() {
  return store
    .checkpoints()
    .filter(
      (s) =>
        validSnapshot(s) &&
        (s.released || Date.now() - s.updatedAt > 15000) &&
        (s.stage === "between" || !store.history.some((h) => h.id === s.logId)),
    );
}
setInterval(() => {
  if (state.flow) checkpoint();
  else if (
    ["home", "session", "mine"].includes(state.route) &&
    availableRecoveries()
      .map((s) => s.id)
      .join() !== state.recoveryIds
  )
    render();
}, 5000);
function checkpoint(released = false) {
  const f = state.flow;
  if (!f) return;
  const saved = store.getCheckpoint(f.recoveryId);
  if (saved && saved.owner !== ownerId) {
    relinquish();
    return;
  }
  store.checkpoint({
    ...snapshotFlow(f, ownerId),
    released: released || f.clock.status !== "running",
  });
}
function relinquish() {
  if (!state.flow) return;
  state.flow.clock.pause();
  audio.stop();
  stopHaptics();
  state.flow = null;
  state.token++;
  toast(
    t(
      "Ta sesja została przejęta w innej karcie.",
      "This session was taken over in another tab.",
    ),
  );
  render();
}
function recover(id, finishSaved = false) {
  const s = store.getCheckpoint(id);
  if (state.flow || !validSnapshot(s)) return;
  if (!s.released && Date.now() - s.updatedAt < 15000) {
    toast(
      t(
        "Sesja jest aktywna w innej karcie.",
        "The session is active in another tab.",
      ),
    );
    return;
  }
  if (s.stage !== "between" && store.history.some((h) => h.id === s.logId)) {
    store.clearCheckpoint(id);
    render();
    return;
  }
  const f = restoreFlow(s, () => audio.now());
  if (!f.ritual) store.save(f.audioPrefs);
  state.flow = f;
  store.checkpoint({
    ...s,
    owner: ownerId,
    updatedAt: Date.now(),
    released: true,
  });
  if (finishSaved) {
    if (f.stage === "between") finishProgram();
    else finish(false);
  } else {
    setMedia();
    go("session");
  }
}
window.addEventListener("storage", (event) => {
  if (state.flow && event.key === "cortex.active.v1." + state.flow.recoveryId) {
    const saved = store.getCheckpoint(state.flow.recoveryId);
    if (!saved || saved.owner !== ownerId) relinquish();
  } else if (
    !state.flow &&
    ["home", "session", "mine"].includes(state.route) &&
    event.key?.startsWith("cortex.active.v1.")
  )
    render();
});
audio.onInterrupted = () => {
  stopBreathPreview();
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
  if (document.hidden) stopBreathPreview();
  stopHaptics();
  frameMonitor.reset();
  if (state.flow?.visual === "advanced") state.flow.lightStopped = true;
  if (
    document.hidden &&
    !state.flow?.breathSound &&
    (state.flow?.session.id === "breath" || state.flow?.stage === "prelude")
  )
    pause();
  checkpoint();
  if (!document.hidden) tick();
  syncRuntime();
});

function openDialog(type) {
  stopBreathPreview();
  if (!dialog.open) restoreFocus = document.activeElement;
  dialog.dataset.type = type;
  dialog.innerHTML =
    type === "settings"
      ? views.settings(prefs(), store.available, active())
      : exportPanel(state.selected, prefs());
  if (type === "export") updateExportSize(dialog);
  if (!dialog.open) dialog.showModal();
  syncRuntime();
  if (dialog.open) dialog.querySelector("button")?.focus();
}
function closeDialog() {
  cancelExport();
  dialog.close();
  restoreFocus?.focus?.();
}
dialog.addEventListener("cancel", () => {
  cancelExport();
});
dialog.addEventListener("close", () => {
  restoreFocus?.focus?.();
  syncRuntime();
});
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
function openDisclosures(scope) {
  return [...scope.querySelectorAll("details[open]")].map(
    (el) => el.id || el.querySelector("summary")?.textContent.trim(),
  );
}
function restoreDisclosures(scope, keys = []) {
  scope.querySelectorAll("details").forEach((el) => {
    if (keys.includes(el.id || el.querySelector("summary")?.textContent.trim()))
      el.open = true;
  });
}
function savedMessage() {
  return store.available
    ? t("Zapisano w Moich sesjach.", "Saved in My sessions.")
    : t(
        "Zapis działa do zamknięcia strony. Pamięć przeglądarki jest niedostępna.",
        "Saved until this page closes. Browser storage is unavailable.",
      );
}
async function replayEntry(id, play) {
  if (active()) {
    go("session");
    return;
  }
  const setup = repeatSetup(
    store.history.find((entry) => entry.id === id),
    prefs(),
  );
  if (!setup) return;
  if (setup.kind === "program") {
    linkedNavigation = true;
    go("program/" + setup.id);
    return;
  }
  if (setup.kind === "ritual") {
    state.ritualDraftId = setup.id;
    state.ritualDraft = migratePreferences(setup.settings);
    if (play) await startRitual(setup.id, state.ritualDraft);
    else {
      linkedNavigation = true;
      go("ritual/" + setup.id);
    }
  } else {
    store.save(setup.settings);
    state.selected = setup.id;
    state.visual = setup.visual;
    state.pendingProgram = null;
    if (play) await start(setup.id);
    else {
      linkedNavigation = true;
      go("prepare/" + setup.id);
    }
  }
}
function updatePreference(key, value, rerender = true) {
  const scope = dialog.open ? dialog : main;
  const openDetails = openDisclosures(scope);
  const focused = document.activeElement;
  const selector = focused?.dataset.pref
    ? `[data-pref="${focused.dataset.pref}"]`
    : focused?.dataset.key
      ? `[data-key="${focused.dataset.key}"][data-value="${focused.dataset.value}"]`
      : null;
  const draft = state.route === "ritual" && state.ritualDraft && !dialog.open;
  const liveRitual =
    state.flow?.ritual && state.route === "session" && !dialog.open;
  if (draft)
    state.ritualDraft = migratePreferences({
      ...state.ritualDraft,
      [key]: value,
    });
  else if (liveRitual) {
    state.flow.audioPrefs = migratePreferences({
      ...state.flow.audioPrefs,
      [key]: value,
    });
    state.flow.ritualPrefs = state.flow.audioPrefs;
    checkpoint();
  } else store.save({ [key]: value });
  applyPreferences();
  if (
    !draft &&
    state.flow &&
    [
      "masterVolume",
      "beatVolume",
      "noiseVolume",
      "intensity",
      "breathVolume",
      "breathBackgroundVolume",
    ].includes(key)
  ) {
    state.flow.audioPrefs[key] = liveRitual
      ? state.flow.audioPrefs[key]
      : prefs()[key];
    if (state.flow.ritual)
      state.flow.ritualPrefs[key] = state.flow.audioPrefs[key];
    checkpoint();
  }
  if (!draft)
    audio.volumes(
      state.flow ? { ...prefs(), ...state.flow.audioPrefs } : currentPrefs(),
    );
  syncRuntime();
  if (key === "audioOnly") {
    state.visual = value ? "none" : "calm";
    if (state.flow) {
      state.flow.visual = state.visual;
      // Rebuild the renderer too: a light disc must not survive switching
      // to audio-only while Settings is open.
      render();
    }
  }
  updateMotionNote();
  if (rerender) {
    if (dialog.open && dialog.dataset.type === "settings")
      dialog.innerHTML = views.settings(prefs(), store.available, active());
    else render();
    restoreDisclosures(scope, openDetails);
    if (selector) scope.querySelector(selector)?.focus({ preventScroll: true });
  }
}
document.addEventListener("input", (e) => {
  const el = e.target;
  if (el.id === "searchSessions") {
    state.filters.query = el.value;
    document.getElementById("libraryResults").innerHTML = views.libraryCards(
      state.filters,
      prefs(),
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
document.addEventListener("change", async (e) => {
  const el = e.target;
  if (el.id === "exportRate" || el.id === "exportDuration")
    updateExportSize(dialog);
  if (el.id === "importFile") {
    const file = el.files?.[0];
    if (!file) return;
    try {
      if (file.size > 8 * 1024 * 1024) throw Error("Too large");
      importPreview = parseBackup(await file.text());
      const count = importPreview.history.filter(
        (h) => !store.history.some((old) => old.id === h.id),
      ).length;
      dialog.dataset.type = "import";
      dialog.innerHTML = `<div class="dialog-head"><h2 id="dialogTitle">${t("Przenieś historię", "Import history")}</h2>${views.button("closeDialog", "", "close", "icon-btn", `aria-label="${t("Zamknij", "Close")}"`)}</div><div class="dialog-body"><p>${t("Nowe wpisy", "New entries")}: ${count}. ${t("Istniejące wpisy pozostaną bez zmian.", "Existing entries will be kept.")}</p>${importPreview.preferences ? `<label class="toggle"><input id="importPreferences" type="checkbox" ${active() ? "disabled" : ""}>${t("Przenieś także ustawienia", "Also import preferences")}</label>` : ""}${views.button("confirmImport", t("Dodaj do historii", "Add to history"), "", "btn btn-primary")}</div>`;
      dialog.querySelector("button")?.focus();
    } catch {
      toast(
        t(
          "Nieprawidłowy plik kopii Cortex. Żadne dane nie zostały zmienione.",
          "Invalid Cortex backup. No data was changed.",
        ),
      );
    }
    return;
  }
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
  if (el.id === "lightMode")
    state.lightSettings.mode =
      el.value === "protocol" ? "protocol" : "adaptive";
  if (el.id === "lightContrast")
    state.lightSettings.contrast = [0.04, 0.06, 0.08].includes(Number(el.value))
      ? Number(el.value)
      : 0.06;
  if (el.id === "playerVisual") {
    setPlayerVisual(el.value);
    return;
  }
  if (el.id === "visualMode") {
    const opened = openDisclosures(main);
    state.visual = el.value;
    render();
    restoreDisclosures(main, opened);
    document.getElementById("visualMode")?.focus({ preventScroll: true });
  }
  if (el.id === "durationFilter") {
    state.filters.duration = el.value;
    document.getElementById("libraryResults").innerHTML = views.libraryCards(
      state.filters,
      prefs(),
    );
  }
});
document.addEventListener("click", async (e) => {
  const readingLink = e.target.closest("a[href]");
  if (
    readingLink?.getAttribute("href").startsWith("#") &&
    !readingLink.classList.contains("skip-link")
  ) {
    linkedNavigation = !readingLink.hasAttribute("data-back");
    navigation.leave({
      scroll: window.scrollY,
      details: openDisclosures(main),
      filters: { ...state.filters },
      focusHref: readingLink.getAttribute("href"),
    });
  }
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
  else if (a === "installApp") await installApp();
  else if (a === "closeDialog") closeDialog();
  else if (a === "recover") recover(el.dataset.id);
  else if (a === "closeRecovery") recover(el.dataset.id, true);
  else if (a === "importData") dialog.querySelector("#importFile").click();
  else if (a === "confirmImport" && importPreview) {
    const count = store.importHistory(importPreview.history);
    if (
      !active() &&
      dialog.querySelector("#importPreferences")?.checked &&
      importPreview.preferences
    ) {
      store.save(importPreview.preferences);
      setLanguage(prefs().lang);
      applyPreferences();
    }
    importPreview = null;
    closeDialog();
    render();
    toast(t("Dodano wpisy: ", "Entries added: ") + count);
  } else if (a === "filterGoal") {
    state.filters.goal = el.dataset.value;
    render();
  } else if (a === "clearFilters") {
    state.filters = { goal: "all", duration: "all", query: "" };
    render();
  } else if (a === "guidance") {
    updatePreference("breathCues", el.dataset.value !== "visual", false);
    updatePreference("breathVisual", el.dataset.value !== "sound");
  } else if (a === "playRitual") await startRitual(el.dataset.id);
  else if (a === "skipRitual") skipRitual();
  else if (a === "playSaved") {
    const saved = prefs().sessionProfiles[el.dataset.id];
    if (saved) {
      if (active()) go("session");
      else {
        store.save(saved);
        state.visual = quietVisual(saved.visual, sessions[el.dataset.id]?.goal);
        state.pendingProgram = null;
        await start(el.dataset.id);
      }
    }
  } else if (a === "repeatLast") {
    await replayEntry(el.dataset.id, true);
  } else if (a === "replaySession") {
    await replayEntry(el.dataset.id, false);
  } else if (a === "saveSession") {
    store.saveSession(
      el.dataset.session,
      sessionProfile(prefs(), state.visual),
    );
    el.textContent = t("Zapisz moje ustawienia", "Update my settings");
    toast(savedMessage());
  } else if (a === "saveResult") {
    const result = state.result;
    if (result?.ritualId) store.saveRitual(result.ritualId, result.ritualPrefs);
    else if (result?.sessionId)
      store.saveSession(
        result.sessionId,
        result.sessionPrefs ||
          sessionProfile({ ...prefs(), ...result.audioPrefs }, result.visual),
      );
    toast(savedMessage());
    el.textContent = t("Zapisano w Moich sesjach", "Saved in My sessions");
  } else if (a === "saveRitual") {
    store.saveRitual(el.dataset.id, state.ritualDraft);
    el.textContent = t("Zapisz moje ustawienia", "Update my settings");
    toast(
      store.available
        ? t("Zapisano w Moich sesjach.", "Saved in My sessions.")
        : t(
            "Pamięć jest niedostępna. Zapis działa tylko do zamknięcia strony.",
            "Storage is unavailable. Saved until this page closes only.",
          ),
    );
  } else if (a === "replayRitual") {
    await replayEntry(el.dataset.id, false);
  } else if (a === "usefulness") {
    store.feedback(el.dataset.id, el.dataset.value);
    if (state.result?.id === el.dataset.id)
      state.result.usefulness = el.dataset.value;
    const details = el.closest("details");
    render();
    const selected = main.querySelector(
      `[data-action="usefulness"][data-id="${el.dataset.id}"][data-value="${el.dataset.value}"]`,
    );
    if (details && selected?.closest("details"))
      selected.closest("details").open = true;
    selected?.focus({ preventScroll: true });
  } else if (a === "preference") {
    updatePreference(
      el.dataset.key,
      ["breathDuration"].includes(el.dataset.key)
        ? Number(el.dataset.value)
        : el.dataset.value,
    );
  } else if (a === "previewBreath") await previewBreath();
  else if (a === "previewSession") await previewBreath("session");
  else if (a === "start") await start(el.dataset.session);
  else if (a === "pause") {
    if (state.flow?.clock.status === "paused") await resume();
    else pause();
  } else if (a === "end") finish(false);
  else if (a === "skipPrelude") enterSound();
  else if (a === "startProgram") {
    const p = programs.find((p) => p.id === el.dataset.program);
    state.pendingProgram = { program: p, index: 0 };
    linkedNavigation = true;
    go("prepare/" + p.steps[0].sessionId);
  } else if (a === "nextStep") await nextStep();
  else if (a === "endProgram") finishProgram();
  else if (a === "showLightControls") showLightControls(false);
  else if (a === "hideLightControls") hideLightControls();
  else if (a === "retryLight") retryLight();
  else if (a === "adaptLight") retryLight(true);
  else if (a === "disableLight") setPlayerVisual("calm");
  else if (a === "fullscreen") {
    const player = document.getElementById("player");
    if (!player) return;
    if (document.fullscreenElement)
      await document.exitFullscreen().catch(() => {});
    else if (state.expanded) state.expanded = false;
    else if (!(await requestPlayerFullscreen(player))) state.expanded = true;
    if (!player.isConnected) state.expanded = false;
    document.body.classList.toggle("player-expanded", state.expanded);
    syncExpandedView();
    // Resizing/reparenting into native fullscreen may drop a frame. Measure
    // the new surface afresh instead of treating that transition as a fault.
    if (state.flow?.visual === "advanced") retryLight();
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
            { version: 5, history: store.history, preferences: prefs() },
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
    exportMetadata(dialog, prefs());
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
  // Browser Back/Forward restores the saved screen just like the in-app Back.
  navigation.leave({
    scroll: window.scrollY,
    details: openDisclosures(main),
    filters: { ...state.filters },
  });
  const route = canonicalRoute(location.hash.slice(1));
  const context = navigation.enter(route, linkedNavigation);
  linkedNavigation = false;
  if (route.startsWith("library"))
    state.filters = context.filters || {
      goal: paths.some((p) => p.id === route.split("/")[1])
        ? route.split("/")[1]
        : "all",
      duration: "all",
      query: "",
    };
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
  if (!location.hash.startsWith("#ritual/")) {
    state.ritualDraftId = null;
    state.ritualDraft = null;
  }
  render();
  restoreDisclosures(main, context.details);
  main.focus({ preventScroll: true });
  const previousLink = [...main.querySelectorAll("a[href]")].find(
    (link) => link.getAttribute("href") === context.focusHref,
  );
  previousLink?.focus({ preventScroll: true });
  window.scrollTo(0, context.scroll || 0);
});
window.addEventListener("pagehide", () => {
  state.token++;
  state.starting = false;
  pause();
  checkpoint(true);
  wake.setWanted(false);
  audio.stop();
  cancelExport();
});
window.addEventListener("pageshow", (event) => {
  if (event.persisted) render();
});
if (navigation.current.startsWith("library/")) {
  const goal = navigation.current.split("/")[1];
  if (paths.some((p) => p.id === goal)) state.filters.goal = goal;
}
render();
prepareOffline();

function playerFlow(f) {
  if (!f.ritual)
    return f.stage === "prelude"
      ? {
          ...f,
          visual:
            f.audioPrefs.breathVisual !== false && !prefs().audioOnly
              ? "calm"
              : "none",
        }
      : f;
  const step = ritualAt(f.steps, f.clock.position());
  return {
    ...f,
    ritualRemaining: f.clock.duration - f.clock.position(),
    clock: {
      duration: step.session.duration,
      position: () => step.position,
      status: f.clock.status,
    },
  };
}
async function startRitual(id, override) {
  if (state.flow) {
    go("session");
    return;
  }
  if (state.starting || !ritualFor(id)) return;
  stopBreathPreview();
  const settings = migratePreferences(
    override ||
      (state.route === "ritual" && state.ritualDraftId === id
        ? state.ritualDraft
        : ritualPreferences(id, prefs())),
  );
  state.starting = true;
  const token = ++state.token;
  document
    .querySelectorAll('[data-action="playRitual"]')
    .forEach((b) => (b.disabled = true));
  try {
    const steps = ritualPlan(id, settings);
    const usesAudio = ritualAudio(steps, settings);
    if (usesAudio) await audio.unlock();
    if (token !== state.token) return;
    if (usesAudio) audio.playRitual(steps, 0, settings);
    const clock = new SessionController(
      usesAudio ? () => audio.now() : () => performance.now() / 1000,
    );
    clock.start(steps.at(-1).end);
    if (audio.graph) clock.anchor = audio.graph.startedAt;
    state.flow = {
      ritual: ritualFor(id),
      ritualPrefs: settings,
      steps,
      skipped: 0,
      session: steps[0].session,
      stage: "session",
      clock,
      pattern: settings.breathPattern,
      breathSound: breathAudio(settings),
      audioPrefs: settings,
      recoveryId: sessionId(),
      logId: sessionId(),
      visual: "calm",
      stepIndex: -1,
      total: 0,
      logged: false,
      startedAt: Date.now(),
      lightStopped: true,
      lightStarted: false,
    };
    state.nightResult = false;
    syncRitualStage(false);
    checkpoint();
    setMedia();
    go("session");
  } catch (error) {
    audio.stop();
    state.flow = null;
    showStartError(
      t(
        "Nie udało się uruchomić rytuału. Spróbuj ponownie.",
        "The ritual could not start. Try again.",
      ),
    );
    console.error(error);
  } finally {
    state.starting = false;
    document
      .querySelectorAll('[data-action="playRitual"]')
      .forEach((b) => (b.disabled = false));
  }
}
function syncRitualStage(redraw = true) {
  const f = state.flow;
  if (!f?.ritual) return;
  const step = ritualAt(f.steps, f.clock.position());
  if (step.index === f.stepIndex) return;
  f.stepIndex = step.index;
  f.session = step.session;
  f.pattern = step.pattern || f.ritualPrefs.breathPattern;
  const mode = ritualVisual(step, f.ritualPrefs);
  f.visual = mode === "black" ? "night" : mode;
  lastCue = "";
  lastSecond = "";
  setMedia();
  if (redraw && state.route === "session") render();
  if (mode === "black" && f.clock.status === "running") openBlackScreen();
}
function skipRitual() {
  const f = state.flow;
  if (!f?.ritual || state.starting) return;
  const current = ritualAt(f.steps, f.clock.position()),
    next = f.steps[current.index + 1];
  if (!next) return;
  const wasRunning = f.clock.status === "running";
  f.clock.pause();
  audio.stop();
  f.skipped = (f.skipped || 0) + next.start - f.clock.position();
  f.clock.elapsed = next.start;
  if (wasRunning) {
    try {
      audio.playRitual(f.steps, next.start, f.audioPrefs);
      f.clock.resume();
      f.clock.anchor = audio.graph.startedAt;
    } catch {
      toast(t("Etap gotowy. Naciśnij Wznów.", "Step ready. Press Resume."));
    }
  }
  syncRitualStage();
  checkpoint();
  syncRuntime();
  updatePlayer();
}
function finishRitual(complete) {
  const f = state.flow;
  if (!f?.ritual) return;
  f.clock.finish();
  audio.stop();
  stopHaptics();
  const durationSeconds = Math.max(
    0,
    Math.round(f.clock.position() - (f.skipped || 0)),
  );
  const entry = {
    id: f.logId,
    visitId: f.recoveryId,
    sessionId: f.steps.at(-1).session.id,
    goal: f.ritual.goal,
    ritualId: f.ritual.id,
    ritualPrefs: Object.fromEntries(
      ritualFields.map((k) => [k, f.ritualPrefs[k]]),
    ),
    skippedSeconds: f.skipped || 0,
    audioPrefs: audioSettings(f.audioPrefs),
    audioVersion: 2,
    startedAt: f.startedAt,
    endedAt: Date.now(),
    durationSeconds,
    completed: complete,
    pattern: f.ritualPrefs.breathPattern,
    visual: f.visual,
    soundBackground: f.audioPrefs.noiseType,
  };
  if (durationSeconds > 0) store.add(entry);
  const night = f.ritual.id === "evening";
  state.result = { ...entry, name: f.ritual.name, night };
  state.nightResult = night;
  store.clearCheckpoint(f.recoveryId);
  state.flow = null;
  state.token++;
  state.expanded = false;
  state.selected = "";
  if ("mediaSession" in navigator)
    navigator.mediaSession.playbackState = "none";
  if (document.fullscreenElement) document.exitFullscreen().catch(() => {});
  go("complete");
  if (night && complete) openBlackScreen();
  else if (blackScreen.open) blackScreen.close();
  syncRuntime();
}
