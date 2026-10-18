// Remove only generated promotional HTML. Player assets, history and preferences
// stay untouched, even if another Cortex tab is currently playing a session.
export async function clearMarketingPages(cacheStorage, base) {
  if (!cacheStorage) return 0;
  const root = new URL("./", base);
  const prefix = `cortex-${root.pathname}-`;
  let removed = 0;
  for (const key of await cacheStorage.keys()) {
    if (!key.startsWith(prefix)) continue;
    const cache = await cacheStorage.open(key);
    for (const page of ["landing.html", "landing-en.html", "refresh.html"]) {
      if (await cache.delete(new URL(page, root).href)) removed++;
    }
  }
  return removed;
}
