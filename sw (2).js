const CACHE = "moj-split-v4";
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

// Za html/css/js/json (kod aplikacije): UVIJEK prvo probaj mrezu, kesiraj
// svjezi odgovor usput, a na kes padni samo ako uopce nema interneta.
// Tako se svaka nova izmjena koda odmah vidi bez rucnog ciscenja kesa.
// Za sve ostalo (ikone i sl.): kes prvo, jer se te datoteke rijetko mijenjaju.
self.addEventListener("fetch", (e) => {
  if(e.request.method !== "GET") return;
  const isCoreAsset = e.request.mode === "navigate" || /\.(html|css|js|json)$/.test(new URL(e.request.url).pathname);

  if(isCoreAsset){
    e.respondWith(
      fetch(e.request).then(res => {
        const copy = res.clone();
        caches.open(CACHE).then(c => c.put(e.request, copy));
        return res;
      }).catch(() =>
        caches.match(e.request).then(cached => cached || (e.request.mode === "navigate" ? caches.match("./index.html") : undefined))
      )
    );
  } else {
    e.respondWith(
      caches.match(e.request).then(cached => cached || fetch(e.request).then(res => {
        const copy = res.clone();
        caches.open(CACHE).then(c => c.put(e.request, copy));
        return res;
      }))
    );
  }
});
