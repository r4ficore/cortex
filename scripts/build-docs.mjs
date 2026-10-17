import { writeFile } from "node:fs/promises";
import { documentHTML, marketingBody } from "../assets/js/documents.js";
for (const lang of ["pl", "en"])
  for (const type of ["science", "guide"]) {
    const name =
      (type === "science" ? "whitepaper" : "guide") +
      (lang === "pl" ? "-pl" : "") +
      ".html";
    await writeFile(
      new URL("../" + name, import.meta.url),
      documentHTML(lang, type),
    );
  }
await writeFile(
  new URL("../landing.html", import.meta.url),
  `<!doctype html><html lang="pl"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1,viewport-fit=cover"><meta name="theme-color" content="#f7f8f5"><title>Cortex — przestrzeń dla Ciebie</title><meta name="description" content="Dźwięk i oddech w Twoim rytmie. Pięć ścieżek na chwilę dla siebie."><link rel="icon" href="assets/images/cortex-mark.svg" type="image/svg+xml"><link rel="stylesheet" href="assets/css/design.css"><script type="module" src="assets/js/landing.js"></script></head><body>${marketingBody("pl")}</body></html>`,
);
console.log("Generated bilingual reading pages and product page.");
