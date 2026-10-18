// Only named public presets travel in links; personal settings never do.
export const campaignPresets = Object.freeze({
  break: {
    ritual: "reset",
    title: { pl: "Przerwa na oddech", en: "A breathing break" },
  },
  work: {
    ritual: "work",
    title: { pl: "Zaczynam pracę", en: "Time to focus" },
  },
  evening: {
    ritual: "evening",
    title: { pl: "Kończę dzień", en: "Let the day go" },
  },
});
export const publicSite = "https://r4ficore.github.io/cortex/";
export function campaignURL(id, lang = "pl", base = publicSite) {
  if (!Object.hasOwn(campaignPresets, id)) throw Error("Unknown campaign");
  const url = new URL("index.html", base);
  url.searchParams.set("start", id);
  url.searchParams.set("lang", lang === "en" ? "en" : "pl");
  url.hash = "ritual/" + campaignPresets[id].ritual;
  return url.href;
}
export function readCampaign(href) {
  const id = new URL(href).searchParams.get("start");
  if (!Object.hasOwn(campaignPresets, id)) return null;
  return {
    id,
    ritual: campaignPresets[id].ritual,
    route: "ritual/" + campaignPresets[id].ritual,
  };
}
export function linkLanguage(href) {
  const lang = new URL(href).searchParams.get("lang");
  return ["pl", "en"].includes(lang) ? lang : null;
}
export function campaignPreferences(id, preferences) {
  if (!Object.hasOwn(campaignPresets, id)) throw Error("Unknown campaign");
  return {
    ...preferences,
    prelude: false,
    breathPattern: "4-6",
    breathDuration: 180,
    hypnosDuration: "30",
    ritualVisual:
      id === "evening" ? "black" : preferences.audioOnly ? "none" : "calm",
    breathVisual: preferences.breathVisual && !preferences.audioOnly,
  };
}
export async function shareCampaign(
  id,
  lang,
  api = navigator,
  base = publicSite,
) {
  const url = campaignURL(id, lang, base);
  const title =
    "Cortex · " + campaignPresets[id].title[lang === "en" ? "en" : "pl"];
  if (typeof api.share === "function") {
    try {
      await api.share({ title, url });
      return { status: "shared", url };
    } catch (error) {
      if (error?.name === "AbortError") return { status: "cancelled", url };
    }
  }
  if (api.clipboard?.writeText) {
    try {
      await api.clipboard.writeText(url);
      return { status: "copied", url };
    } catch {}
  }
  return { status: "manual", url };
}
