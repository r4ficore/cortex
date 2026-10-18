import { writeFile } from "node:fs/promises";
import { documentHTML } from "../assets/js/documents.js";
import { marketingHTML } from "../assets/js/marketing.js";
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
for (const lang of ["pl", "en"])
  await writeFile(
    new URL(
      "../" + (lang === "pl" ? "landing.html" : "landing-en.html"),
      import.meta.url,
    ),
    marketingHTML(lang),
  );
console.log("Generated bilingual reading and marketing pages.");
