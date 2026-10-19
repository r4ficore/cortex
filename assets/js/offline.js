import { t } from "./i18n.js";
let registration;
let status = "pending";
let installation;
let isBusy = () => false;
let newerVersion = false;
export const runningRelease = import.meta.url.match(/\/releases\/([a-f0-9]{16})\//)?.[1] || "dev";
export async function checkForUpdate() {
  if (runningRelease === "dev") return;
  try {
    const response = await fetch("release.json", { cache: "no-store" });
    if (!response.ok) return;
    const release = await response.json();
    newerVersion = /^[a-f0-9]{16}$/.test(release.version) && release.version !== runningRelease;
    updateOfflinePanel();
  } catch { /* Existing offline release stays usable. */ }
}
export function openLatest() {
  if (isBusy()) return false;
  const url = new URL(runningRelease === "dev" ? "./" : "latest.html", location.href);
  url.hash = location.hash;
  url.searchParams.set("update", Date.now());
  location.replace(url.href);
  return true;
}
globalThis.window?.addEventListener("beforeinstallprompt", (event) => {
  event.preventDefault();
  installation = event;
  updateOfflinePanel();
});
globalThis.window?.addEventListener("appinstalled", () => {
  installation = null;
  updateOfflinePanel();
});
export async function prepareOffline({ busy = () => false } = {}) {
  isBusy = busy;
  checkForUpdate();
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
      "Zasoby nowej wersji są gotowe. Otwórz aktualną wersję po zakończeniu sesji; historia i ustawienia pozostaną zapisane.",
      "New release resources are ready. Open the latest version after your session; history and settings stay saved.",
    ),
    unavailable: t(
      "Nie potwierdzono gotowości offline. Otwórz opublikowaną aplikację przez HTTPS z dostępem do internetu.",
      "Offline readiness is not confirmed. Open the published HTTPS app with an internet connection.",
    ),
  };
  return `<div id="offlinePanel" class="offline-note"><h3>${t("Cortex na telefonie", "Cortex on your phone")}</h3><p role="status">${copy[status]}</p><p>${t("iPhone: otwórz w Safari → Udostępnij → Dodaj do ekranu początkowego. Android: menu przeglądarki → Zainstaluj aplikację / Dodaj do ekranu głównego.", "iPhone: open in Safari → Share → Add to Home Screen. Android: browser menu → Install app / Add to Home screen.")}</p><p class="small">${t("Wersja aplikacji", "App version")}: ${runningRelease} · audio v3</p><button class="btn" data-action="updateApp" ${isBusy() ? "disabled" : ""}>${t("Otwórz aktualną wersję", "Open latest version")}</button>${isBusy() ? `<p>${t("Najpierw zakończ trwającą sesję.", "Finish your current session first.")}</p>` : ""}${installation ? `<button class="btn" data-action="installApp">${t("Zainstaluj Cortex", "Install Cortex")}</button>` : ""}</div>`;
}
export function updateOfflinePanel() {
  const panel = document.getElementById("offlinePanel");
  if (panel) panel.outerHTML = offlinePanel();
  let notice = document.getElementById("updateNotice");
  if (!notice && newerVersion) {
    notice = document.createElement("aside");
    notice.id = "updateNotice";
    notice.className = "update-notice";
    document.getElementById("header")?.insertAdjacentElement("afterend", notice);
  }
  if (notice) {
    notice.hidden = !newerVersion;
    notice.innerHTML = `<p role="status">${isBusy() ? t("Nowa wersja Cortex jest gotowa. Możesz ją otworzyć po zakończeniu sesji.", "A new Cortex release is ready. Open it after your session.") : t("Dostępna jest nowa wersja Cortex z aktualnymi opisami i protokołami.", "A new Cortex release with updated descriptions and protocols is available.")}</p><button class="btn" data-action="updateApp" ${isBusy() ? "disabled" : ""}>${t("Otwórz nową wersję", "Open new version")}</button>`;
  }
}
export async function installApp() {
  if (!installation) return;
  await installation.prompt();
  installation = null;
  updateOfflinePanel();
}
