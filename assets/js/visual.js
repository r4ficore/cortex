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
  const moving = !reduced && !paused;
  const rhythm =
    { focus: 0.12, calm: 0.2, sleep: 0.09, energy: 0.42 }[
      element.dataset.goal
    ] || 0.28;
  const level = breath ? breath.level : (Math.sin(elapsed * rhythm) + 1) / 2;
  element.style.setProperty(
    "--orb-scale",
    reduced ? "1" : breath ? "1" : String(0.82 + level * 0.18),
  );
  element.style.setProperty(
    "--orb-turn",
    `${moving && !breath ? Math.sin(elapsed * 0.08) * 13 : 0}deg`,
  );
  element.style.opacity = "1";
  if (breath) {
    element.style.setProperty(
      "--breath-scale",
      reduced ? "0.82" : String(0.46 + level * 0.54),
    );
    element.dataset.phase = paused ? "paused" : breath.phase;
  }
}
export function breathingForm() {
  const id = `breath${++serial}`;
  return `<div class="orb breath-orb" data-goal="breath" aria-hidden="true"><span class="breath-boundary"></span><svg class="breath-lung" viewBox="0 0 300 300"><defs><radialGradient id="${id}" cx="35%" cy="28%" r="80%"><stop stop-color="#edf3e9"/><stop offset=".56" stop-color="#b7ceaf"/><stop offset="1" stop-color="#779d82"/></radialGradient></defs><circle cx="150" cy="150" r="140" fill="url(#${id})" stroke="#53785c" stroke-width="1.8"/><circle cx="150" cy="150" r="127" fill="none" stroke="#fff" stroke-opacity=".32"/></svg><span class="breath-direction"><svg viewBox="0 0 24 24"><path d="m8 12 4-4 4 4m-8 5 4-4 4 4" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg></span></div>`;
}
