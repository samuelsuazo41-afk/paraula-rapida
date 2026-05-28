const CACHE_NAME = 'paraula-rapida-v14';
const FILES_TO_CACHE = [
  './',
  './index.html',
  './styles.css',
  './main.js',
  './emoji-data.js',
  './manifest.json',
  './icon-192.png',
  './icon-512.png'
];

// Install: cache all files + activar nuevo SW al instante
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(FILES_TO_CACHE))
      .then(() => self.skipWaiting())
  );
});

// Activate: borrar cachés viejas v12, v13, etc
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keyList => {
      return Promise.all(
        keyList.map(key => {
          if (key !== CACHE_NAME) {
            return caches.delete(key);
          }
        })
      );
    }).then(() => self.clients.claim())
  );
});

// Fetch: cache first, fallback to network
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => response || fetch(event.request))
  );
});