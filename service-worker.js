
const CACHE_NAME = 'gothic-schlossknacker-v6-6-3';

self.addEventListener('install', event => {
self.skipWaiting();
});

self.addEventListener('activate', event => {
event.waitUntil(
caches.keys().then(keys =>
Promise.all(
keys
.filter(key => key !== CACHE_NAME)
.map(key => caches.delete(key))
)
)
);
self.clients.claim();
});

self.addEventListener('fetch', event => {
event.respondWith(
caches.open(CACHE_NAME).then(cache =>
cache.match(event.request).then(response =>
response ||
fetch(event.request).then(networkResponse => {
if (event.request.method === 'GET') {
cache.put(event.request, networkResponse.clone());
}
return networkResponse;
})
)
)
);
