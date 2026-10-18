import { readdir, readFile, writeFile, mkdir, cp, rm } from "node:fs/promises";
import { createHash } from "node:crypto";
import { join, relative } from "node:path";
const pages = [
  "index.html",
  "landing.html",
  "landing-en.html",
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
for (const file of [
  ...pages,
  "manifest.webmanifest",
  "sw.js",
  "sitemap.xml",
  ...(await files("social")),
  ...assets,
]) {
  hash.update(file);
  hash.update(await readFile(file));
}
const version = hash.digest("hex").slice(0, 16);
await rm("dist", { recursive: true, force: true });
await mkdir(`dist/releases/${version}`, { recursive: true });
await cp("assets", `dist/releases/${version}/assets`, { recursive: true });
for (const file of assets.filter((p) => p.startsWith("assets/js/"))) {
  const compiled = (await readFile(file, "utf8")).replaceAll(
    /(?<=["\s])assets\//g,
    `releases/${version}/assets/`,
  );
  await writeFile(`dist/releases/${version}/${file}`, compiled);
}
for (const page of pages) {
  const html = (await readFile(page, "utf8")).replaceAll(
    /(?<=["\s])assets\//g,
    `releases/${version}/assets/`,
  );
  await writeFile(`dist/${page}`, html);
}
const manifest = (await readFile("manifest.webmanifest", "utf8")).replaceAll(
  '"assets/',
  `"releases/${version}/assets/`,
);
await writeFile("dist/manifest.webmanifest", manifest);
await cp("social", "dist/social", { recursive: true });
await cp("sitemap.xml", "dist/sitemap.xml");
const precache = [
  ...pages,
  "manifest.webmanifest",
  ...assets
    .filter((p) => !p.startsWith("assets/images/marketing/"))
    .map((p) => `releases/${version}/${p}`),
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
for (const page of pages) {
  const html = await readFile(`dist/${page}`, "utf8");
  const references = [...html.matchAll(/(?:src|href)="([^"#]+)"/g)].map(
    (m) => m[1],
  );
  for (const m of html.matchAll(/srcset="([^"]+)"/g)) {
    references.push(
      ...m[1].split(",").map((candidate) => candidate.trim().split(/\s+/)[0]),
    );
  }
  for (const reference of references) {
    if (/^(https?:|data:|mailto:)/.test(reference)) continue;
    const path = decodeURIComponent(reference.split(/[?#]/)[0]);
    if (path && !published.has(path))
      throw Error(`Missing published reference ${page}: ${path}`);
  }
}
for (const locale of ["pl", "en"])
  if (!published.has(`social/cortex-${locale}.jpg`))
    throw Error(`Missing stable social preview: ${locale}`);
if (
  precache.some(
    (path) =>
      path.includes("assets/images/marketing/") || path.startsWith("social/"),
  )
)
  throw Error(
    "Marketing artwork must not delay application offline preparation",
  );
if ([...published].some((p) => /^(backups|tests|docs|node_modules)\//.test(p)))
  throw Error("Non-product files in release");
console.log(
  `Built ${published.size} product files in dist; release ${version}`,
);
