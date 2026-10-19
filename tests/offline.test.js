import test from "node:test";
import assert from "node:assert/strict";
import vm from "node:vm";
import { readFileSync } from "node:fs";
import { clearMarketingPages } from "../assets/js/marketing-cache.js";

async function worker({ failInstall = false, failPromotion = false, offline = false } = {}) {
  const listeners = {},
    buckets = new Map(),
    fetched = [],
    fetchOptions = [];
  let claimed = 0,
    skipped = 0;
  const caches = {
    async open(name) {
      if (!buckets.has(name)) buckets.set(name, new Map());
      const map = buckets.get(name);
      return {
        async addAll(urls) {
          if (failInstall) {
            map.set("partial", "bad");
            throw Error("network");
          }
          for (const u of urls) map.set(u, { body: u, clone() { return this; } });
        },
        async put(u, response) {
          if (failPromotion && name.endsWith("-old") && u.includes("/releases/new/")) throw Error("quota");
          map.set(u, response);
        },
        async match(u) {
          return map.get(u);
        },
        async delete(u) {
          return map.delete(u);
        },
      };
    },
    async keys() {
      return [...buckets.keys()];
    },
    async delete(key) {
      return buckets.delete(key);
    },
  };
  const self = {
    location: { href: "https://example.test/cortex/sw.js" },
    clients: {
      async claim() {
        claimed++;
      },
    },
    skipWaiting() {
      skipped++;
    },
    addEventListener(k, fn) {
      listeners[k] = fn;
    },
  };
  const source = readFileSync("sw.js", "utf8")
    .replace("__RELEASE__", "new")
    .replace(
      "__PRECACHE__",
      JSON.stringify([
        "index.html",
        "guide.html",
        "releases/new/assets/js/app.js",
        "manifest.webmanifest",
      ]),
    );
  vm.runInNewContext(source, {
    self,
    caches,
    URL,
    fetch: async (request, options) => {
      if (offline) throw Error("offline");
      fetched.push(request.url);
      fetchOptions.push(options);
      return { body: "network" };
    },
  });
  const lifecycle = async (type) => {
    let pending;
    listeners[type]({ waitUntil: (p) => (pending = p) });
    await pending;
  };
  const request = async (path, method = "GET") => {
    let pending;
    listeners.fetch({
      request: { url: "https://example.test" + path, method },
      respondWith: (p) => (pending = p),
    });
    return pending ? await pending : null;
  };
  return {
    buckets,
    fetched,
    fetchOptions,
    caches,
    lifecycle,
    request,
    claimed: () => claimed,
    skipped: () => skipped,
  };
}
test("offline cache serves the Pages subpath, deep hash entry, documents and exact release assets", async () => {
  const w = await worker();
  await w.lifecycle("install");
  assert.equal(w.skipped(), 0);
  assert.equal(
    (await w.request("/cortex/")).body,
    "https://example.test/cortex/index.html",
  );
  assert.equal(
    (await w.request("/cortex/index.html?from=home")).body,
    "https://example.test/cortex/index.html",
  );
  assert.equal(
    (await w.request("/cortex/guide.html")).body,
    "https://example.test/cortex/guide.html",
  );
  assert.equal(
    (await w.request("/cortex/releases/new/assets/js/app.js")).body,
    "https://example.test/cortex/releases/new/assets/js/app.js",
  );
  assert.equal(w.fetched.length, 0);
  assert.equal(await w.request("/cortex/release.json"), null);
  assert.equal(await w.request("/cortex/sw.js"), null);
  assert.equal(await w.request("/another-app/"), null);
  assert.equal(await w.request("/cortex/", "POST"), null);
});
test("an incomplete offline install is discarded and the old working release survives", async () => {
  const w = await worker({ failInstall: true });
  const previous = new Map([
    ["https://example.test/cortex/landing.html", "previous landing"],
  ]);
  w.buckets.set("cortex-/cortex/-old", previous);
  await assert.rejects(w.lifecycle("install"));
  assert.equal(w.buckets.has("cortex-/cortex/-new"), false);
  assert.equal(w.buckets.has("cortex-/cortex/-old"), true);
  assert.equal(previous.size, 1);
});

test("install promotes the next navigation while retaining the active player’s immutable assets", async () => {
  const w = await worker();
  const root = "https://example.test/cortex/";
  const previous = new Map([
    [root + "landing.html", { body: "old landing without images" }],
    [root + "landing-en.html", { body: "old English landing" }],
    [root + "index.html", { body: "open player" }],
    [root + "releases/old/assets/js/audio.js", { body: "active audio" }],
  ]);
  const other = new Map([[root + "landing.html", "not our cache"]]);
  w.buckets.set("cortex-/cortex/-old", previous);
  w.buckets.set("cortex-/another-app/-old", other);
  await w.lifecycle("install");
  assert.equal(previous.has(root + "landing.html"), false);
  assert.equal(previous.has(root + "landing-en.html"), false);
  assert.equal(previous.get(root + "index.html").body, root + "index.html");
  assert.equal(previous.get(root + "releases/new/assets/js/app.js").body, root + "releases/new/assets/js/app.js");
  assert.equal(
    previous.get(root + "releases/old/assets/js/audio.js").body,
    "active audio",
  );
  assert.equal(other.size, 1);
  assert.equal(w.claimed(), 0);
  assert.equal(w.skipped(), 0);
});

test("public landing pages bypass stale caches and revalidate HTTP while app stays offline-first", async () => {
  const w = await worker();
  await w.lifecycle("install");
  w.buckets
    .get("cortex-/cortex/-new")
    .set("https://example.test/cortex/landing.html", { body: "obsolete" });
  for (const page of ["landing.html", "landing-en.html", "refresh.html"]) {
    assert.equal(
      (await w.request("/cortex/" + page + "?refresh=1")).body,
      "network",
    );
    assert.equal(w.fetchOptions.at(-1).cache, "no-cache");
  }
  assert.equal(
    (await w.request("/cortex/index.html")).body,
    "https://example.test/cortex/index.html",
  );
  assert.equal(w.fetched.length, 3);
});

test("one-click refresh repairs legacy workers without removing application caches or other projects", async () => {
  const w = await worker();
  const root = "https://example.test/cortex/";
  const previous = new Map([
    [root + "landing.html", "stale"],
    [root + "index.html", "player"],
    [root + "releases/old/assets/js/audio.js", "audio"],
  ]);
  const unrelated = new Map([[root + "landing.html", "unrelated"]]);
  w.buckets.set("cortex-/cortex/-old", previous);
  w.buckets.set("other-cache", unrelated);
  assert.equal(
    await clearMarketingPages(w.caches, root + "refresh.html?lang=pl"),
    1,
  );
  assert.deepEqual([...previous.values()], ["player", "audio"]);
  assert.equal(unrelated.size, 1);
  assert.equal(w.buckets.size, 2);
  assert.equal(await clearMarketingPages(w.caches, root + "refresh.html"), 0);
  assert.equal(await clearMarketingPages(undefined, root), 0);
});
test("only activation cleans up previous Cortex releases, retaining other applications", async () => {
  const w = await worker();
  w.buckets.set("cortex-/cortex/-old", new Map());
  w.buckets.set("cortex-/other/-old", new Map());
  await w.lifecycle("install");
  assert.ok(w.buckets.has("cortex-/cortex/-old"));
  await w.lifecycle("activate");
  assert.equal(w.buckets.has("cortex-/cortex/-old"), false);
  assert.ok(w.buckets.has("cortex-/other/-old"));
  assert.equal(w.claimed(), 1);
});

test("offline status survives a network failure and reports a failed first installation", async () => {
  const original = Object.fromEntries(
    ["navigator", "document", "location", "isSecureContext"].map((k) => [
      k,
      Object.getOwnPropertyDescriptor(globalThis, k),
    ]),
  );
  const worker = new EventTarget();
  worker.state = "installing";
  const reg = new EventTarget();
  Object.assign(reg, {
    active: {},
    installing: null,
    waiting: null,
    update: () => Promise.reject(Error("offline")),
  });
  const sw = new EventTarget();
  Object.assign(sw, {
    getRegistration: async () => reg,
    ready: new Promise(() => {}),
  });
  try {
    for (const [key, value] of Object.entries({
      navigator: { serviceWorker: sw },
      document: { getElementById: () => null },
      location: { href: "https://example.test/cortex/" },
      isSecureContext: true,
    }))
      Object.defineProperty(globalThis, key, { configurable: true, value });
    const module = await import("../assets/js/offline.js");
    await module.prepareOffline();
    assert.match(module.offlinePanel(), /Gotowe do działania offline/);
    reg.active = null;
    reg.installing = worker;
    await module.prepareOffline();
    worker.state = "redundant";
    worker.dispatchEvent(new Event("statechange"));
    assert.match(module.offlinePanel(), /Nie potwierdzono gotowości offline/);
  } finally {
    for (const [key, descriptor] of Object.entries(original)) {
      if (descriptor) Object.defineProperty(globalThis, key, descriptor);
      else delete globalThis[key];
    }
  }
});


test("failed cache promotion keeps the old entry point and running audio usable", async () => {
  const w = await worker({ failPromotion: true });
  const root = "https://example.test/cortex/";
  const previous = new Map([[root + "index.html", { body: "old entry" }], [root + "releases/old/assets/js/audio.js", { body: "old audio" }]]);
  w.buckets.set("cortex-/cortex/-old", previous);
  await assert.rejects(w.lifecycle("install"), /quota/);
  assert.equal(previous.get(root + "index.html").body, "old entry");
  assert.equal(previous.get(root + "releases/old/assets/js/audio.js").body, "old audio");
  assert.equal(w.buckets.has("cortex-/cortex/-new"), false);
});

test("latest entry revalidates the network and falls back to the complete offline app", async () => {
  const online = await worker();
  await online.lifecycle("install");
  assert.equal((await online.request("/cortex/latest.html?update=1")).body, "network");
  assert.equal(online.fetchOptions.at(-1).cache, "no-cache");
  const offline = await worker({ offline: true });
  await offline.lifecycle("install");
  assert.equal((await offline.request("/cortex/latest.html")).body, "https://example.test/cortex/index.html");
});

test("update action cannot interrupt a running session and retains the destination hash", async () => {
  const keys = ["navigator", "document", "location", "isSecureContext"];
  const saved = Object.fromEntries(keys.map(k => [k, Object.getOwnPropertyDescriptor(globalThis, k)]));
  const destinations = [];
  let busy = true;
  try {
    for (const [key, value] of Object.entries({
      navigator: {}, document: { getElementById: () => null }, isSecureContext: true,
      location: { href: "https://example.test/cortex/index.html#prepare/prime", hash: "#prepare/prime", replace: u => destinations.push(u) },
    })) Object.defineProperty(globalThis, key, { configurable: true, value });
    const module = await import("../assets/js/offline.js");
    await module.prepareOffline({ busy: () => busy });
    assert.equal(module.openLatest(), false);
    assert.equal(destinations.length, 0);
    assert.match(module.offlinePanel(), /data-action="updateApp" disabled/);
    busy = false;
    assert.equal(module.openLatest(), true);
    assert.equal(new URL(destinations[0]).hash, "#prepare/prime");
    assert.equal(new URL(destinations[0]).pathname, "/cortex/"); // Source checkout uses its uncached entry.
  } finally {
    for (const [key, descriptor] of Object.entries(saved)) {
      if (descriptor) Object.defineProperty(globalThis, key, descriptor);
      else delete globalThis[key];
    }
  }
});
