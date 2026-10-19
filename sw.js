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
        // Older workers may still serve an open player. Promote the next
        // navigation without replacing modules already loaded by that player.
        for (const key of await caches.keys()) {
          if (!key.startsWith(`cortex-${ROOT.pathname}-`)) continue;
          if (key === CACHE) continue;
          const previous = await caches.open(key);
          // Copy the complete new offline dependency set before replacing HTML.
          // The active worker can then serve new navigations while an already
          // running player keeps its immutable old module URLs and audio graph.
          for (const path of FILES.filter(p => p !== "index.html")) {
            const url = new URL(path, ROOT).href;
            const response = await cache.match(url);
            await previous.put(url, response.clone());
          }
          const entry = new URL("index.html", ROOT).href;
          await previous.put(entry, (await cache.match(entry)).clone());
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
      // A stable escape route for clients controlled by a legacy cache-first
      // worker. Never cache latest.html in old releases.
      if (url.pathname === ROOT.pathname + "latest.html") {
        try { return await fetch(event.request, { cache: "no-cache" }); }
        catch { return await cache.match(new URL("index.html", ROOT).href); }
      }
      const saved = await cache.match(canonical.href);
      if (saved) return saved;
      return fetch(event.request);
    })(),
  );
});
