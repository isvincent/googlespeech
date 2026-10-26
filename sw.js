/* Service Worker — 只快取本站靜態檔案（App Shell）。
   Google API 請求一律直連網路、不快取，避免 API Key 或語音內容留在快取中。
   更新網站檔案後，請把 CACHE_VERSION 加一，使用者才會收到新版本。 */
const CACHE_VERSION = 'v1.0.0';
const CACHE_NAME = `zh-voice-lab-${CACHE_VERSION}`;
const APP_SHELL = [
  './',
  './index.html',
  './manifest.webmanifest',
  './assets/css/style.css',
  './assets/js/app.js',
  './assets/js/pwa.js',
  './icons/icon.svg',
  './icons/icon-192.png',
  './icons/icon-512.png',
  './icons/maskable-512.png',
  './icons/apple-touch-icon.png',
  './icons/favicon-32.png'
];

self.addEventListener('install', event => {
  event.waitUntil(caches.open(CACHE_NAME).then(cache => cache.addAll(APP_SHELL)));
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys()
      .then(keys => Promise.all(keys.filter(k => k.startsWith('zh-voice-lab-') && k !== CACHE_NAME).map(k => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

/* 頁面按下「重新載入」時，讓等待中的新版本立即接手 */
self.addEventListener('message', event => {
  if (event.data === 'SKIP_WAITING') self.skipWaiting();
});

self.addEventListener('fetch', event => {
  const req = event.request;
  const url = new URL(req.url);

  // 只處理同源 GET；Google API 等外部請求直接交給瀏覽器
  if (req.method !== 'GET' || url.origin !== self.location.origin) return;

  // 頁面導覽：網路優先，離線時改用快取的首頁
  if (req.mode === 'navigate') {
    event.respondWith(
      fetch(req)
        .then(res => {
          const copy = res.clone();
          caches.open(CACHE_NAME).then(c => c.put('./index.html', copy));
          return res;
        })
        .catch(() => caches.match('./index.html'))
    );
    return;
  }

  // 靜態資源：快取優先，背景更新（stale-while-revalidate）
  event.respondWith(
    caches.match(req).then(cached => {
      const network = fetch(req)
        .then(res => {
          if (res.ok) {
            const copy = res.clone();
            caches.open(CACHE_NAME).then(c => c.put(req, copy));
          }
          return res;
        })
        .catch(() => cached);
      return cached || network;
    })
  );
});
