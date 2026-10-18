import { boxPosition } from "./breath.js";
let serial = 0;
export function orb(goal = "calm", className = "") {
  const id = `orb${++serial}`;
  let contours = "";
  for (let i = 0; i < 22; i++) {
    const s = 0.38 + i * 0.027;
    contours += `<path d="M150 25C220 18 267 68 275 139S234 270 158 275 26 231 24 156 69 34 150 25Z" transform="translate(${150 * (1 - s)} ${150 * (1 - s)}) scale(${s})" fill="none" stroke="currentColor" stroke-width=".75" opacity="${0.25 + i * 0.018}"/>`;
  }
  return `<div class="orb ${className}" data-goal="${goal}" aria-hidden="true"><svg viewBox="0 0 300 300" fill="none"><defs><radialGradient id="${id}"><stop stop-color="currentColor" stop-opacity=".28"/><stop offset=".8" stop-color="currentColor" stop-opacity=".06"/><stop offset="1" stop-color="currentColor" stop-opacity="0"/></radialGradient></defs><circle cx="150" cy="150" r="143" fill="url(#${id})"/><g class="orb-lines">${contours}</g><g class="orb-inner" transform="rotate(55 150 150)">${contours}</g></svg></div>`;
}
export function updateOrb(
  element,
  { elapsed = 0, breath = null, reduced = false, paused = false } = {},
) {
  if (!element) return;
  // The session clock already freezes on pause. Do not snap the artwork back.
  const rhythm =
    (2 * Math.PI) /
    ({ focus: 16, calm: 12, sleep: 24, energy: 9 }[element.dataset.goal] || 12);
  const level = breath ? breath.level : (Math.sin(elapsed * rhythm) + 1) / 2;
  const scale = reduced || breath ? 1 : 0.76 + level * 0.24;
  const turn = reduced || breath ? 0 : Math.sin(elapsed * rhythm * 0.5) * 13;
  // Write the animated transform directly to the HTML element. This avoids
  // inherited custom-property invalidation across an SVG/compositor boundary.
  element.style.setProperty("transform", `scale(${scale}) rotate(${turn}deg)`);
  element.style.opacity = "1";
  if (breath) {
    if (element.dataset.pattern === "box") {
      const [x, y] = boxPosition(breath);
      element
        .querySelector(".box-dot")
        ?.setAttribute("transform", `translate(${x} ${y})`);
      element
        .querySelector(".box-trace")
        ?.setAttribute(
          "stroke-dasharray",
          `${reduced ? 0 : (breath.index + breath.progress) * 25} 100`,
        );
      element.dataset.step = String(breath.index);
      element.dataset.reduced = String(reduced);
      element.dataset.phase = paused ? "paused" : breath.phase;
      return;
    }
    const lung = element.querySelector(".breath-lung");
    lung?.style.setProperty(
      "transform",
      `scale(${reduced ? 0.82 : 0.46 + level * 0.54})`,
    );
    element.dataset.phase = paused ? "paused" : breath.phase;
  } else {
    const layer = element.querySelector(".orb-inner");
    const drift = reduced ? 0 : Math.sin(elapsed * rhythm) * 0.08;
    layer?.setAttribute(
      "transform",
      `translate(150 150) rotate(${55 - turn * 2}) scale(${1 + drift} ${1 - drift}) translate(-150 -150)`,
    );
  }
}
export function breathingForm(pattern = "4-6", labels = {}) {
  if (pattern === "box")
    return `<div class="orb breath-orb breath-box" data-goal="breath" data-pattern="box" data-step="0" aria-hidden="true"><svg viewBox="0 0 300 300" fill="none"><rect x="48" y="48" width="204" height="204" rx="0" class="box-wash"/><path class="box-track" d="M48 252V48H252V252H48"/><path class="box-trace" d="M48 252V48H252V252H48" pathLength="100" stroke-dasharray="0 100"/><path class="box-edge" data-edge="0" d="M48 252V48"/><path class="box-edge" data-edge="1" d="M48 48H252"/><path class="box-edge" data-edge="2" d="M252 48V252"/><path class="box-edge" data-edge="3" d="M252 252H48"/><g class="box-dot" transform="translate(48 252)"><circle r="11" class="box-halo"/><circle r="5"/></g></svg><span class="box-label box-inhale" data-edge="0">${labels.inhale || "Wdech"}<small>4 s</small></span><span class="box-label box-hold-full" data-edge="1">${labels.hold || "Zatrzymaj"}<small>4 s</small></span><span class="box-label box-exhale" data-edge="2">${labels.exhale || "Wydech"}<small>4 s</small></span><span class="box-label box-hold-empty" data-edge="3">${labels.hold || "Zatrzymaj"}<small>4 s</small></span></div>`;
  return `<div class="orb breath-orb" data-goal="breath" aria-hidden="true"><span class="breath-boundary"></span><span class="breath-lung"></span><span class="breath-direction"><svg viewBox="0 0 24 24"><path d="m8 12 4-4 4 4m-8 5 4-4 4 4" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg></span></div>`;
}

export function fitBreathingForm(stage, element) {
  if (!stage || !element?.classList.contains("breath-orb")) return;
  const { width, height } = stage.getBoundingClientRect();
  const size = Math.max(0, Math.min(width, height, 400));
  element.style.width = `${size}px`;
  element.style.height = `${size}px`;
  if (element.dataset) element.dataset.compact = String(size < 245);
}
