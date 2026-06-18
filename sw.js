// 라이미 블록코딩 연구소 — 간단한 오프라인 캐시 (PWA)
const CACHE = "raim-block-v3";
const ASSETS = [
  "./",
  "./index.html",
  "./css/styles.css?v=3",
  "./js/app.js?v=3",
  "./js/i18n.js?v=3",
  "./js/maze.js?v=3",
  "./js/quiz.js?v=3",
  "./js/pylab.js?v=3",
  "./assets/raimi.png",
  "./assets/seoulraim_logo.png",
  "./assets/python-logo.svg",
  "./assets/icon-192.png",
  "./assets/icon-512.png",
  "./manifest.json"
];

self.addEventListener("install", (e) => {
  e.waitUntil(caches.open(CACHE).then((c) => c.addAll(ASSETS)).catch(() => {}));
  self.skipWaiting();
});

self.addEventListener("activate", (e) => {
  e.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.filter((k) => k !== CACHE).map((k) => caches.delete(k)))
    )
  );
  self.clients.claim();
});

// 네트워크 우선, 실패하면 캐시 (개발 중 갱신이 잘 보이도록)
self.addEventListener("fetch", (e) => {
  if (e.request.method !== "GET") return;
  e.respondWith(
    fetch(e.request)
      .then((res) => {
        const copy = res.clone();
        caches.open(CACHE).then((c) => c.put(e.request, copy)).catch(() => {});
        return res;
      })
      .catch(() => caches.match(e.request))
  );
});
