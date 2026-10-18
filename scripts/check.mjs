import { readdirSync, readFileSync, existsSync } from "node:fs";
import { execFileSync } from "node:child_process";
import { join, dirname } from "node:path";
for (const dir of ["assets/js", "scripts", "tests"])
  for (const file of readdirSync(dir)) {
    if (/\.(js|mjs)$/.test(file))
      execFileSync(process.execPath, ["--check", join(dir, file)], {
        stdio: "inherit",
      });
  }
for (const page of [
  "index.html",
  "landing.html",
  "landing-en.html",
  "refresh.html",
  "guide.html",
  "guide-pl.html",
  "whitepaper.html",
  "whitepaper-pl.html",
]) {
  const html = readFileSync(page, "utf8");
  for (const m of html.matchAll(/(?:src|href)="([^"#]+)"/g)) {
    const ref = m[1];
    if (/^(https?:|data:|mailto:)/.test(ref)) continue;
    const path = ref.split("#")[0].split("?")[0];
    if (path && !existsSync(join(dirname(page), decodeURIComponent(path))))
      throw Error(`${page}: missing ${path}`);
  }
  if (html.includes("cdn.tailwindcss.com"))
    throw Error("Runtime Tailwind still present");
}
console.log("Syntax and local page assets verified.");
