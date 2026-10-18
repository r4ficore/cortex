const content = document.getElementById("content");
const pending = setTimeout(() => failure(), 15000);
function failure() {
  if (
    document.querySelector(
      ".page-head, .home-hero, .player, .prepare-layout",
    ) ||
    content.dataset.ready
  )
    return;
  content.innerHTML = `<h1>Cortex</h1><p>Nie udało się załadować aplikacji. Sprawdź połączenie i spróbuj ponownie.<br>Could not load the app. Check your connection and try again.</p><button id="retryStartup" class="btn btn-primary">Spróbuj ponownie / Try again</button>`;
  document.getElementById("retryStartup").onclick = () => {
    const url = new URL(location.href);
    url.searchParams.set("reload", Date.now());
    location.replace(url);
  };
}
import("./app.js")
  .then(() => {
    clearTimeout(pending);
    content.dataset.ready = "true";
  })
  .catch(() => {
    clearTimeout(pending);
    failure();
  });
