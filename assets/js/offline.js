import { t } from "./i18n.js";
let registration;
let status = "pending";
let installation;
globalThis.window?.addEventListener("beforeinstallprompt", (event) => {
  event.preventDefault();
  installation = event;
  updateOfflinePanel();
});
globalThis.window?.addEventListener("appinstalled", () => {
  installation = null;
  updateOfflinePanel();
});
export async function prepareOffline() {
  if (!("serviceWorker" in navigator) || !isSecureContext) {
    status = "unavailable";
    updateOfflinePanel();
    return;
  }
  try {
    // The source checkout is not a release and must not cache stale dev files.
    registration = await navigator.serviceWorker.getRegistration(
      new URL("./", location.href),
    );
    if (!registration) {
      const response = await fetch("release.json", { cache: "no-store" });
      if (!response.ok) throw Error("No release");
      const release = await response.json();
      if (!/^[a-f0-9]{16}$/.test(release.version))
        throw Error("Invalid release");
      registration = await navigator.serviceWorker.register("sw.js", {
        scope: "./",
        updateViaCache: "none",
      });
    } else {
      // A cached release remains usable when release.json cannot be fetched.
      registration.update().catch(() => {});
    }
    let failed = false;
    const refresh = () => {
      status = registration.waiting
        ? "update"
        : registration.active
          ? "ready"
          : failed
            ? "unavailable"
            : "pending";
      updateOfflinePanel();
    };
    refresh();
    const watch = (worker) => {
      if (!worker) return;
      worker.addEventListener("statechange", () => {
        failed = worker.state === "redundant";
        refresh();
      });
    };
    watch(registration.installing);
    registration.addEventListener("updatefound", () => {
      failed = false;
      watch(registration.installing);
      refresh();
    });
    navigator.serviceWorker.addEventListener("controllerchange", refresh);
    navigator.serviceWorker.ready.then(refresh);
  } catch {
    status = "unavailable";
    updateOfflinePanel();
  }
}
export function offlinePanel() {
  const copy = {
    pending: t(
      "Przygotowuję zasoby do działania bez internetu…",
      "Preparing resources for offline use…",
    ),
    ready: t(
      "Gotowe do działania offline. Przeglądarka może usunąć zapisane zasoby, np. przy czyszczeniu danych.",
      "Ready for offline use. Your browser may remove stored resources, for example when clearing site data.",
    ),
    update: t(
      "Nowa wersja czeka. Zakończ sesję i zamknij wszystkie okna Cortex; aktualizacja zostanie zastosowana przy kolejnym otwarciu.",
      "An update is waiting. Finish your session and close all Cortex windows; the update will apply on your next visit.",
    ),
    unavailable: t(
      "Nie potwierdzono gotowości offline. Otwórz opublikowaną aplikację przez HTTPS z dostępem do internetu.",
      "Offline readiness is not confirmed. Open the published HTTPS app with an internet connection.",
    ),
  };
  return `<div id="offlinePanel" class="offline-note"><h3>${t("Cortex na telefonie", "Cortex on your phone")}</h3><p role="status">${copy[status]}</p><p>${t("iPhone: otwórz w Safari → Udostępnij → Dodaj do ekranu początkowego. Android: menu przeglądarki → Zainstaluj aplikację / Dodaj do ekranu głównego.", "iPhone: open in Safari → Share → Add to Home Screen. Android: browser menu → Install app / Add to Home screen.")}</p>${installation ? `<button class="btn" data-action="installApp">${t("Zainstaluj Cortex", "Install Cortex")}</button>` : ""}</div>`;
}
export function updateOfflinePanel() {
  const panel = document.getElementById("offlinePanel");
  if (panel) panel.outerHTML = offlinePanel();
}
export async function installApp() {
  if (!installation) return;
  await installation.prompt();
  installation = null;
  updateOfflinePanel();
}
