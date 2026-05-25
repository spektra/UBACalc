// service-worker.js — basic PWA service worker for offline caching.
// caches the app shell on install and serves from cache on fetch.
// this is about as basic as it gets, but it works for a PWA.

const CACHE_NAME = 'uba-calc-v1'

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll([
        '/',
        '/index.html',
        '/logo.png',
        '/favicon.svg',
        '/welcome.opus',
        '/manifest.json',
      ])
    }),
  )
})

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((cached) => {
      return cached || fetch(event.request)
    }),
  )
})
