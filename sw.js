// sw.js - Paraula Ràpida v2.11
const CACHE_NAME = 'paraula-rapida-v30';
const ASSETS = [
  './',
  './index.html',
  './styles.css',
  './main.js',
  './lectura-generator.js',
  './emoji-data.js',
  './frases-data.js',
  './tips-data.js',
  './botiga-data.js',
  './icon-192.png',
  './icon-512.png',
  './manifest.json'
];

self.addEventListener('install', e => {
  e.waitUntil(caches.open(CACHE_NAME).then(cache => cache.addAll(ASSETS)));
});

self.addEventListener('fetch', e => {
  e.respondWith(
    caches.match(e.request).then(resp => resp || fetch(e.request))
  );
});

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys().then(keys => 
      Promise.all(keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k)))
    )
  );
});