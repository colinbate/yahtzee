const version = '1.2.4';

const cacheName = `YahtzeeCacheV${version}`;

const filesToCache = [
  '/',
  '/index.html',
  '/favicon.png',
  '/build/bundle.css',
  '/build/bundle.js',
  '/manifest.webmanifest',
  '/icon-192x192.png',
  '/icon-256x256.png',
  '/icon-256x256-maskable.png',
  '/icon-384x384.png',
  '/icon-512x512.png',
  '/icon-750x1334.png',
  '/black-orchid.png',
  '/wood.jpg',
];

self.addEventListener('install', function (event) {
  event.waitUntil(
    caches.open(cacheName).then((cache) => cache.addAll(filesToCache)).then(() => {
      console.log('[SW] service worker installed...');
      self.skipWaiting();
    })
  );
});

self.addEventListener('fetch', function (event) {
  event.respondWith(
    caches.match(event.request).then(function (response) {
      console.log(`[SW] Cache ${response ? 'Hit' : 'Miss'}: ${event.request.url}`);
      return response || fetch(event.request);
    })
  );
});

self.addEventListener('activate', function (e) {
  console.log('[SW] Activate');
  e.waitUntil(
    caches.keys().then(function (keyList) {
      return Promise.all(keyList.map(function (key) {
        if (key !== cacheName) {
          console.log('[SW] Removing old cache', key);
          return caches.delete(key);
        }
      }));
    }).then(function () {
      console.log('[SW] Claiming clients for', cacheName);
      return self.clients.claim();
    })
  );
});
