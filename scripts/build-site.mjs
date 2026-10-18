import { readdir, readFile, writeFile, mkdir, cp, rm } from "node:fs/promises";
import { createHash } from "node:crypto";
import { join, relative } from "node:path";
const pages = [
  "index.html",
  "landing.html",
  "guide.html",
  "guide-pl.html",
  "whitepaper.html",
  "whitepaper-pl.html",
];
async function files(dir) {
  const result = [];
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const path = join(dir, entry.name);
    if (entry.isDirectory()) result.push(...(await files(path)));
    else result.push(path);
  }
  return result.sort();
}
const assets = await files("assets");
const hash = createHash("sha256");
for (const file of [...pages, "manifest.webmanifest", "sw.js", ...assets]) {
  hash.update(file);
  hash.update(await readFile(file));
}
const version = hash.digest("hex").slice(0, 16);
await rm("dist", { recursive: true, force: true });
await mkdir(`dist/releases/${version}`, { recursive: true });
await cp("assets", `dist/releases/${version}/assets`, { recursive: true });
for (const file of assets.filter((p) => p.startsWith("assets/js/"))) {
  const compiled = (await readFile(file, "utf8")).replaceAll(
    '"assets/',
    `"releases/${version}/assets/`,
  );
  await writeFile(`dist/releases/${version}/${file}`, compiled);
}
for (const page of pages) {
  const html = (await readFile(page, "utf8")).replaceAll(
    '"assets/',
    `"releases/${version}/assets/`,
  );
  await writeFile(`dist/${page}`, html);
}
const manifest = (await readFile("manifest.webmanifest", "utf8")).replaceAll(
  '"assets/',
  `"releases/${version}/assets/`,
);
await writeFile("dist/manifest.webmanifest", manifest);
const precache = [
  ...pages,
  "manifest.webmanifest",
  ...assets.map((p) => `releases/${version}/${p}`),
];
const worker = (await readFile("sw.js", "utf8"))
  .replace("__RELEASE__", version)
  .replace("__PRECACHE__", JSON.stringify(precache));
await writeFile("dist/sw.js", worker);
await writeFile("dist/.nojekyll", "");
await writeFile(
  "dist/release.json",
  JSON.stringify({ version, commit: process.env.GITHUB_SHA || "local" }),
);
// Every static HTML asset reference must exist in the release artifact.
const published = new Set(
  (await files("dist")).map((p) => relative("dist", p)),
);
for (const page of pages)
  for (const m of (await readFile(`dist/${page}`, "utf8")).matchAll(
    /(?:src|href)="([^"#]+)"/g,
  )) {
    if (/^(https?:|data:|mailto:)/.test(m[1])) continue;
    const path = decodeURIComponent(m[1].split(/[?#]/)[0]);
    if (path && !published.has(path))
      throw Error(`Missing published reference ${page}: ${path}`);
  }
if ([...published].some((p) => /^(backups|tests|docs|node_modules)\//.test(p)))
  throw Error("Non-product files in release");
console.log(
  `Built ${published.size} product files in dist; release ${version}`,
);
