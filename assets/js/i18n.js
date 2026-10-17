export let language = "pl";
export const t = (pl, en) => (language === "pl" ? pl : en);
export const local = (value) =>
  typeof value === "object" ? value[language] : value;
export function setLanguage(lang) {
  language = lang === "en" ? "en" : "pl";
  document.documentElement.lang = language;
}
export const esc = (value) =>
  String(value ?? "").replace(
    /[&<>"']/g,
    (c) =>
      ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[
        c
      ],
  );
export function time(seconds) {
  if (!Number.isFinite(seconds)) return "∞";
  const n = Math.max(0, Math.ceil(seconds));
  return `${Math.floor(n / 60)
    .toString()
    .padStart(2, "0")}:${(n % 60).toString().padStart(2, "0")}`;
}
export const minutes = (seconds) =>
  Number.isFinite(seconds)
    ? `${Math.round(seconds / 60)} min`
    : t("Bez limitu", "No time limit");
const icons = {
  home: "M3 10 12 3l9 7v10a1 1 0 0 1-1 1h-5v-7H9v7H4a1 1 0 0 1-1-1Z",
  library: "M4 4v16M9 4v16M14 4v16M18 4l3 16",
  history: "M3 11a9 9 0 1 1 2 7M3 4v7h7M12 7v5l3 2",
  book: "M12 5C8 2 4 3 2 4v15c4-2 7-1 10 1 3-2 6-3 10-1V4c-3-1-6-2-10 1Zm0 0v15",
  breath:
    "M3 8c3-5 7 5 10 0s7-3 8 0M3 12c3-5 7 5 10 0s7-3 8 0M3 16c3-5 7 5 10 0s7-3 8 0",
  focus:
    "M12 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18Zm0 5a4 4 0 1 0 0 8 4 4 0 0 0 0-8Z",
  calm: "M3 9c3-4 6 4 9 0s6-4 9 0M3 15c3-4 6 4 9 0s6-4 9 0",
  sleep: "M20.5 13.5A8.5 8.5 0 0 1 10.5 3a9 9 0 1 0 10 10.5Z",
  energy: "m13 2-9 12h7l-1 8 10-13h-7Z",
  settings:
    "M9 3h6l1 3 3 1 2 5-2 5-3 1-1 3H9l-1-3-3-1-2-5 2-5 3-1Zm3 5a4 4 0 1 0 0 8 4 4 0 0 0 0-8Z",
  arrow: "M5 12h14m-6-6 6 6-6 6",
  back: "M19 12H5m6-6-6 6 6 6",
  close: "m6 6 12 12M6 18 18 6",
  play: "m8 4 12 8-12 8Z",
  pause: "M8 4v16M16 4v16",
  stop: "M5 5h14v14H5Z",
  headphones: "M4 14v-3a8 8 0 0 1 16 0v3M3 12h4v9H3Zm14 0h4v9h-4Z",
  check: "m5 12 4 4L19 6",
  clock: "M12 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18Zm0 4v5l3 2",
  volume: "M11 4 5 9H2v6h3l6 5Zm4 4a6 6 0 0 1 0 8m3-11a10 10 0 0 1 0 14",
  expand: "M8 3H3v5m13-5h5v5M3 16v5h5m13-5v5h-5",
  download: "M12 3v12m-5-5 5 5 5-5M4 16v5h16v-5",
};
export function icon(name, size = 22) {
  return `<svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="${icons[name] || icons.calm}"/></svg>`;
}
