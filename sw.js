// sw.js v3.3 - Paraula Ràpida

const CACHE_NAME = 'paraula-rapida-v33';

const ASSETS = [
  './',
  './index.html',
  './styles.css',
  './main.js',
  './lectura-generator.js',  // Generador de lectura
  './lectura-content.js',    // Contingut de lectura - NOU
  './emoji-data.js',
  './frases-data.js',
  './tips-data.js',
  './botiga-data.js',
  './icon-96.png',
  './icon-192.png',
  './icon-512.png',
  './manifest.json'
];

// === INSTALL: cacheja tot ===
self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('SW: Cachejant v33');
        return cache.addAll(ASSETS);
      })
      .then(() => self.skipWaiting())
  );
});

// === ACTIVATE: esborra caché antic ===
self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys().then((keys) => 
      Promise.all(
        keys.filter((k) => k !== CACHE_NAME).map((k) => caches.delete(k))
      )
    ).then(() => self.clients.claim())
  );
});

// === FETCH: cache first ===
self.addEventListener('fetch', (e) => {
  e.respondWith(
    caches.match(e.request).then((resp) => {
      return resp || fetch(e.request).catch(() => {
        if (e.request.mode === 'navigate') {
          return caches.match('./index.html');
        }
      });
    })
  );
});