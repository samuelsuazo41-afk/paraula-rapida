const CACHE_NAME = 'paraula-rapida-v26';
const FILES_TO_CACHE = [
  './',
  './index.html',
  './styles.css',
  './manifest.json',
  './icon-192.png',
  './icon-512.png',
  // Dades - ordre no importa aquí, però han d’estar tots cachejats
  './emoji-data.js',
  './frases-data.js',
  './tips-data.js',
  './botiga-data.js',
  // Lògica
  './main.js'
];

// Install: cachejar tot + activar nou SW al instant
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('[SW] Cachejant arxius v15');
        return cache.addAll(FILES_TO_CACHE);
      })
      .then(() => self.skipWaiting())
  );
});

// Activate: esborrar cachés velles v12, v13, v14
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keyList => {
      return Promise.all(
        keyList.map(key => {
          if (key !== CACHE_NAME && key.startsWith('paraula-rapida-')) {
            console.log('[SW] Esborrant caché vella:', key);
            return caches.delete(key);
          }
        })
      );
    }).then(() => self.clients.claim())
  );
});

// Fetch: cache first, fallback a network
self.addEventListener('fetch', event => {
  // Ignorar requests que no són GET
  if (event.request.method !== 'GET') return;

  event.respondWith(
    caches.match(event.request)
      .then(response => {
        // Si està al cache, tornar-ho. Si no, anar a network i cachejar-ho
        return response || fetch(event.request).then(networkResponse => {
          return caches.open(CACHE_NAME).then(cache => {
            cache.put(event.request, networkResponse.clone());
            return networkResponse;
          });
        });
      })
      .catch(() => {
        // Si falla tot, tornar index.html per que l’app PWA segueixi funcionant offline
        return caches.match('./index.html');
      })
  );
});