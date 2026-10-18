// The build injects the exact release files, including all local audio code.
const RELEASE = "__RELEASE__";
const FILES = __PRECACHE__;
const ROOT = new URL("./", self.location.href);
const CACHE = `cortex-${ROOT.pathname}-${RELEASE}`;
const MARKETING = ["landing.html", "landing-en.html", "refresh.html"].map(
  (page) => new URL(page, ROOT).href,
);
self.addEventListener("install", (event) => {
  event.waitUntil(
    (async () => {
      const cache = await caches.open(CACHE);
      try {
        await cache.addAll(FILES.map((p) => new URL(p, ROOT).href));
        // Older workers may still serve an open player. Retire only their
        // marketing HTML so a normal reload can reach the current website.
        for (const key of await caches.keys()) {
          if (!key.startsWith(`cortex-${ROOT.pathname}-`)) continue;
          const previous = await caches.open(key);
          for (const url of MARKETING) await previous.delete(url);
        }
      } catch (error) {
        await caches.delete(CACHE);
        throw error;
      }
    })(),
  );
  // No skipWaiting: an update cannot replace a release used by an open player.
});
self.addEventListener("activate", (event) => {
  event.waitUntil(
    (async () => {
      const prefix = `cortex-${ROOT.pathname}-`;
      for (const key of await caches.keys())
        if (key.startsWith(prefix) && key !== CACHE) await caches.delete(key);
      await self.clients.claim();
    })(),
  );
});
self.addEventListener("fetch", (event) => {
  const url = new URL(event.request.url);
  if (
    event.request.method !== "GET" ||
    url.origin !== ROOT.origin ||
    !url.pathname.startsWith(ROOT.pathname)
  )
    return;
  if (url.pathname.endsWith("/sw.js") || url.pathname.endsWith("/release.json"))
    return;
  if (MARKETING.includes(new URL(url.pathname, ROOT.origin).href)) {
    // Marketing is a live website, not part of the app's frozen offline release.
    event.respondWith(fetch(event.request, { cache: "no-cache" }));
    return;
  }
  event.respondWith(
    (async () => {
      const cache = await caches.open(CACHE);
      const canonical = new URL(url.pathname, ROOT.origin);
      if (canonical.pathname === ROOT.pathname)
        canonical.pathname += "index.html";
      const saved = await cache.match(canonical.href);
      if (saved) return saved;
      return fetch(event.request);
    })(),
  );
});
