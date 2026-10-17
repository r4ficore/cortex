import { marketingBody } from "./documents.js";
import { createStore } from "./store.js";
let storage;
try {
  storage = localStorage;
} catch {}
const store = createStore(storage);
function render() {
  document.documentElement.lang = store.prefs.lang;
  document.title =
    store.prefs.lang === "pl"
      ? "Cortex — przestrzeń dla Ciebie"
      : "Cortex — a little space for you";
  document.body.innerHTML = marketingBody(store.prefs.lang);
}
document.addEventListener("click", (e) => {
  if (e.target.closest("[data-language]")) {
    store.save({ lang: store.prefs.lang === "pl" ? "en" : "pl" });
    render();
  }
});
render();
