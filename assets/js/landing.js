import { BreathDemo } from "./breath-demo.js";
import { shareCampaign } from "./campaign.js";
const en = document.documentElement.lang === "en";
const l = (pl, english) => (en ? english : pl);
const demo = new BreathDemo();
const section = document.getElementById("breath-demo");
const button = document.getElementById("demoToggle");
const phaseLabel = document.getElementById("demoPhase");
const phaseTime = document.getElementById("demoSeconds");
const status = document.getElementById("demoStatus");
const form = document.getElementById("demoForm");
const motion = matchMedia("(prefers-reduced-motion: reduce)");
let frame = null;
function paint() {
  const s = demo.snapshot(motion.matches);
  form.style.setProperty("--breath-scale", s.scale);
  section.dataset.state = s.status;
  const phase = ["idle", "finished"].includes(s.status)
    ? l("W Twoim rytmie", "At your pace")
    : s.phase === "inhale"
      ? l("Wdech", "Breathe in")
      : l("Wydech", "Breathe out");
  if (phaseLabel.textContent !== phase) phaseLabel.textContent = phase;
  phaseTime.textContent = ["idle", "finished"].includes(s.status)
    ? ""
    : s.phaseRemaining + " s";
  const labels = {
    idle: l("Spróbuj · 20 sekund", "Try it · 20 seconds"),
    playing: l("Pauza", "Pause"),
    paused: l("Wznów", "Resume"),
    finished: l("Jeszcze raz", "Try again"),
  };
  button.textContent = labels[s.status];
  status.textContent =
    s.status === "idle"
      ? l("Dwa cykle. Bez dźwięku.", "Two cycles. No sound.")
      : s.status === "finished"
        ? l("To właśnie chwila dla Ciebie.", "A little moment, just for you.")
        : (s.status === "paused" ? l("Wstrzymano · ", "Paused · ") : "") +
          s.remaining +
          l(" s do końca", " s remaining");
  if (s.status === "playing") frame = requestAnimationFrame(paint);
}
function pause() {
  cancelAnimationFrame(frame);
  demo.pause();
  paint();
}
button.disabled = false;
button.addEventListener("click", () => {
  cancelAnimationFrame(frame);
  if (demo.status === "playing") demo.pause();
  else demo.play();
  paint();
});
document.addEventListener("visibilitychange", () => {
  if (document.hidden) pause();
});
window.addEventListener("pagehide", pause);
motion.addEventListener("change", () => {
  cancelAnimationFrame(frame);
  paint();
});
if ("IntersectionObserver" in window)
  new IntersectionObserver(
    ([entry]) => {
      if (!entry.isIntersecting && demo.status === "playing") pause();
    },
    { threshold: 0 },
  ).observe(section);
paint();
document.querySelectorAll("[data-share]").forEach((control) => {
  control.hidden = false;
  control.addEventListener("click", async () => {
    control.disabled = true;
    const panel = control.closest("article").querySelector(".share-result");
    try {
      const result = await shareCampaign(
        control.dataset.share,
        en ? "en" : "pl",
      );
      panel.replaceChildren();
      if (result.status === "cancelled") return;
      const message = document.createElement("span");
      message.setAttribute("role", "status");
      message.textContent =
        result.status === "copied"
          ? l("Link skopiowany.", "Link copied.")
          : result.status === "shared"
            ? l("Link udostępniony.", "Link shared.")
            : l("Skopiuj adres:", "Copy this address:");
      panel.append(message);
      if (result.status === "manual") {
        const input = document.createElement("input");
        input.readOnly = true;
        input.value = result.url;
        input.setAttribute("aria-label", l("Adres sesji", "Session address"));
        panel.append(input);
        input.focus();
        input.select();
      }
    } finally {
      control.disabled = false;
    }
  });
});
