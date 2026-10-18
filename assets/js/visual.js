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
export function breathingForm() {
  return `<div class="orb breath-orb" data-goal="breath" aria-hidden="true"><span class="breath-boundary"></span><span class="breath-lung"></span><span class="breath-direction"><svg viewBox="0 0 24 24"><path d="m8 12 4-4 4 4m-8 5 4-4 4 4" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg></span></div>`;
}

export function fitBreathingForm(stage, element) {
  if (!stage || !element?.classList.contains("breath-orb")) return;
  const { width, height } = stage.getBoundingClientRect();
  const size = Math.max(0, Math.min(width, height, 400));
  element.style.width = `${size}px`;
  element.style.height = `${size}px`;
}
