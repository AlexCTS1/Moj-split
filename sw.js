const CACHE = "moj-split-v2";
const ASSETS = [
  "./index.html",
  "./style.css",
  "./app.js",
  "./data.js",
  "./manifest.json",
  "./icons/icon-192.png",
  "./icons/icon-512.png",
  "./icons/apple-touch-icon.png"
];

// Ucitaj svaku datoteku pojedinacno umjesto cache.addAll — tako jedna
// neuspjela datoteka (404, spor mrezni odgovor na iOS-u i sl.) ne blokira
// spremanje svih ostalih.
self.addEventListener("install", (e) => {
  e.waitUntil(
    caches.open(CACHE).then(cache =>
      Promise.allSettled(
        ASSETS.map(url => fetch(url, { cache: "no-cache" }).then(res => {
          if(res.ok) return cache.put(url, res);
        }))
      )
    )
  );
  self.skipWaiting();
});

self.addEventListener("activate", (e) => {
  e.waitUntil(
    caches.keys().then(keys => Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k))))
  );
  self.clients.claim();
});

self.addEventListener("fetch", (e) => {
  if(e.request.method !== "GET") return;
  e.respondWith(
    caches.match(e.request).then(cached => {
      if(cached) return cached;
      return fetch(e.request).then(res => {
        const copy = res.clone();
        caches.open(CACHE).then(c => c.put(e.request, copy));
        return res;
      }).catch(() => {
        // Offline i nije u cacheu — za navigaciju vrati spremljeni index.html
        // umjesto Safarijeve greske "ne mogu otvoriti stranicu".
        if(e.request.mode === "navigate") return caches.match("./index.html");
      });
    })
  );
});
