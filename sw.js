// The build injects the exact release files, including all local audio code.
const RELEASE = "__RELEASE__";
const FILES = __PRECACHE__;
const ROOT = new URL("./", self.location.href);
const CACHE = `cortex-${ROOT.pathname}-${RELEASE}`;
self.addEventListener("install", (event) => {
  event.waitUntil(
    (async () => {
      const cache = await caches.open(CACHE);
      try {
        await cache.addAll(FILES.map((p) => new URL(p, ROOT).href));
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
