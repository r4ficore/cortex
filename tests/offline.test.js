import test from "node:test";
import assert from "node:assert/strict";
import vm from "node:vm";
import { readFileSync } from "node:fs";

async function worker({ failInstall = false } = {}) {
  const listeners = {},
    buckets = new Map(),
    fetched = [];
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
          for (const u of urls) map.set(u, { body: u });
        },
        async match(u) {
          return map.get(u);
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
    fetch: async (request) => {
      fetched.push(request.url);
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
  w.buckets.set("cortex-/cortex/-old", new Map());
  await assert.rejects(w.lifecycle("install"));
  assert.equal(w.buckets.has("cortex-/cortex/-new"), false);
  assert.equal(w.buckets.has("cortex-/cortex/-old"), true);
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
