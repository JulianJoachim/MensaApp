var CACHE_NAME = 'my-site-cache-v1';

const cacheAssets = [
  '/',
  '/index.html', 
  '/src/index.jsx',
  '/src/app.jsx',
  '/src/pages/about.jsx',
  '/src/pages/home.jsx',
  '/src/pages/contact.jsx',
  '/src/pages/speisen.jsx',
  '/src/styles/styles.css',
  '/src/pages/profile.jsx',
  '/src/pages/login.jsx',
  '/src/pages/register.jsx',
  '/src/styles/logos.css',
  '/database.js',
  '/script.js',
  '/src/sw-register.js',
  '/@react-refresh',
  '/@vite/client',
  '/@fs/rbd/pnpm-volume/f015ef12-6ad3-4fe3-8100-7523fe8017a0/node_modules/.registry.npmjs.org/vite/2.1.5/node_modules/vite/dist/client/env.js',
  '/node_modules/.vite/react.js?v=470883b8',
  '/node_modules/.vite/react-router-dom.js?v=470883b8',
  '/node_modules/.vite/react-hook-form.js?v=470883b8',
  '/node_modules/.vite/react-dom.js?v=470883b8',
  '/node_modules/.vite/google-map-react.js?v=470883b8',
  '/node_modules/.vite/firebase_compat_firestore.js?v=470883b8',
  '/node_modules/.vite/firebase_compat_auth.js?v=470883b8',
  '/node_modules/.vite/firebase_compat_app.js?v=470883b8',
  '/node_modules/.vite/firebase_auth.js?v=470883b8',
  '/api/v2/canteens'
];

// Call Install Event





console.log("Bevor Install Methode")
self.addEventListener('install', e => {
  console.log('Service Worker: Installed');
  e.waitUntil(
    caches
      .open(CACHE_NAME)
      .then(cache => {
        console.log('Service Worker: Caching Files');
        cache.addAll(cacheAssets);
      })
      .then(() => self.skipWaiting())
  );
});
self.addEventListener('activate', e => {
  console.log('Service Worker: Activated');
  // Remove unwanted caches
  e.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cache => {
          if (cache !== CACHE_NAME) {
            console.log('Service Worker: Clearing Old Cache');
            return caches.delete(cache);
          }
        })
      );
    })
  );
});

self.addEventListener('fetch', function (event) {
  event.respondWith(
    caches.open(CACHE_NAME).then(function (cache) {
      return cache.match(event.request).then(function (response) {
        var fetchPromise = fetch(event.request).then(function (networkResponse) {
          cache.put(event.request, networkResponse.clone());
          return networkResponse;
    });
        return response || fetchPromise;
      });
    }))
}) 
    