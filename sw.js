const CACHE_NAME = 'paraula-rapida-v33';
const ASSETS_TO_CACHE = [
  './',
  './index.html',
  './styles.css',
  './main.js',
  './emoji-data.js',
  './frases-data.js',
  './tips-data.js',
  './botiga-data.js',
  './lectura-content.js',
  './manifest.json',
  './icon-96.png',
  './icon-192.png',
  './icon-512.png'
];

// INSTAL·LACIÓ: cacheja tot
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('[SW] Cachejant assets v33');
        return cache.addAll(ASSETS_TO_CACHE);
      })
      .then(() => self.skipWaiting())
  );
});

// ACTIVACIÓ: esborra cache vell
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys => {
      return Promise.all(
        keys.filter(key => key !== CACHE_NAME)
          .map(key => caches.delete(key))
      );
    }).then(() => self.clients.claim())
  );
});

// FETCH: cache first, network fallback
self.addEventListener('fetch', event => {
  if (event.request.method !== 'GET') return;
  
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        if (response) {
          return response;
        }
        return fetch(event.request).then(networkResponse => {
          // Si és un asset nou, el cacheja dinàmicament
          if (networkResponse && networkResponse.status === 200) {
            const responseClone = networkResponse.clone();
            caches.open(CACHE_NAME).then(cache => {
              cache.put(event.request, responseClone);
            });
          }
          return networkResponse;
        });
      })
      .catch(() => {
        // Fallback si no hi ha xarxa i no està al cache
        if (event.request.destination === 'document') {
          return caches.match('./index.html');
        }
      })
  );
});

// MISSATGE PER FORÇAR ACTUALITZACIÓ
self.addEventListener('message', event => {
  if (event.data === 'skipWaiting') {
    self.skipWaiting();
  }
});