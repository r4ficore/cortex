import { clearMarketingPages } from "./marketing-cache.js";

const en = new URL(location.href).searchParams.get("lang") === "en";
const l = (pl, english) => (en ? english : pl);
const heading = document.querySelector("h1");
const status = document.getElementById("refreshStatus");
const retry = document.getElementById("refreshRetry");
const link = document.getElementById("refreshContinue");
const target = new URL(en ? "landing-en.html" : "landing.html", location.href);
document.documentElement.lang = en ? "en" : "pl";
document.title = l(
  "Cortex — otwórz aktualną stronę",
  "Cortex — open the latest website",
);
heading.textContent = l(
  "Chwila dla aktualnej wersji.",
  "A moment for the latest version.",
);
retry.textContent = l("Spróbuj ponownie", "Try again");
link.textContent = l("Przejdź do strony", "Continue to the website");
link.href = target.href;
async function refresh() {
  retry.hidden = true;
  status.textContent = l(
    "Otwieram aktualną stronę Cortex…",
    "Opening the latest Cortex website…",
  );
  try {
    await clearMarketingPages(globalThis.caches, location.href);
    // No unregister, skipWaiting, or reload of another tab: a player keeps its release.
    navigator.serviceWorker
      ?.getRegistration(new URL("./", location.href))
      .then((registration) => registration?.update())
      .catch(() => {});
    target.searchParams.set("refresh", Date.now());
    location.replace(target.href);
  } catch {
    status.textContent = l(
      "Nie udało się odświeżyć strony. Spróbuj ponownie.",
      "The website could not be refreshed. Please try again.",
    );
    retry.hidden = false;
  }
}
retry.addEventListener("click", refresh);
refresh();
