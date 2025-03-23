// Service Worker for CuisineIdées PWA

const CACHE_NAME = 'cuisine-idees-v1';
const ASSETS_TO_CACHE = [
  '/',
  '/index.html',
  '/manifest.json',
  '/src/main.tsx',
  '/src/App.tsx',
  '/src/index.css'
];

// API data cache
const API_CACHE_NAME = 'cuisine-idees-api-v1';

// Install event - cache basic assets
self.addEventListener('install', (event) => {
  console.log('Service Worker installing...');
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('Service Worker caching app shell assets...');
        return cache.addAll(ASSETS_TO_CACHE);
      })
      .then(() => {
        console.log('Service Worker installed');
        return self.skipWaiting();
      })
  );
});

// Activate event - clean up old caches
self.addEventListener('activate', (event) => {
  console.log('Service Worker activating...');
  event.waitUntil(
    caches.keys()
      .then((cacheNames) => {
        return Promise.all(
          cacheNames.filter((cacheName) => {
            return cacheName !== CACHE_NAME && cacheName !== API_CACHE_NAME;
          }).map((cacheName) => {
            console.log('Service Worker deleting old cache:', cacheName);
            return caches.delete(cacheName);
          })
        );
      })
      .then(() => {
        console.log('Service Worker activated');
        return self.clients.claim();
      })
  );
});

// Helper function to determine if a request is an API call
const isApiRequest = (url) => {
  return url.pathname.startsWith('/api/');
};

// Helper function to determine if a request is for a static asset
const isStaticAsset = (url) => {
  return url.pathname.match(/\.(js|css|png|jpg|jpeg|svg|ico)$/);
};

// Fetch event - serve from cache, falling back to network
self.addEventListener('fetch', (event) => {
  const url = new URL(event.request.url);
  
  // Skip cross-origin requests
  if (url.origin !== self.location.origin) {
    return;
  }
  
  // Strategy for API requests: Network first, fallback to cache
  if (isApiRequest(url)) {
    event.respondWith(
      fetch(event.request)
        .then((response) => {
          // Clone the response before caching it
          const responseToCache = response.clone();
          caches.open(API_CACHE_NAME)
            .then((cache) => {
              cache.put(event.request, responseToCache);
            });
          return response;
        })
        .catch(() => {
          // If network fails, try to serve from cache
          return caches.match(event.request)
            .then((cachedResponse) => {
              if (cachedResponse) {
                return cachedResponse;
              }
              // If no cache match, return a custom offline response for API
              return new Response(JSON.stringify({ 
                error: true, 
                message: 'Vous êtes hors ligne. Cette donnée n\'est pas disponible actuellement.' 
              }), {
                headers: { 'Content-Type': 'application/json' }
              });
            });
        })
    );
    return;
  }
  
  // Strategy for static assets: Cache first, fallback to network
  if (isStaticAsset(url)) {
    event.respondWith(
      caches.match(event.request)
        .then((cachedResponse) => {
          return cachedResponse || fetch(event.request)
            .then((response) => {
              // Clone the response before caching it
              const responseToCache = response.clone();
              caches.open(CACHE_NAME)
                .then((cache) => {
                  cache.put(event.request, responseToCache);
                });
              return response;
            });
        })
    );
    return;
  }
  
  // Strategy for HTML navigation: Network first, fallback to cache
  event.respondWith(
    fetch(event.request)
      .catch(() => {
        return caches.match(event.request)
          .then((cachedResponse) => {
            if (cachedResponse) {
              return cachedResponse;
            }
            // For navigation requests, fallback to index.html
            if (event.request.mode === 'navigate') {
              return caches.match('/index.html');
            }
            
            // If all else fails, show offline page
            return caches.match('/index.html');
          });
      })
  );
});

// Push event - handle push notifications
self.addEventListener('push', (event) => {
  let message = 'Notification par défaut';
  
  if (event.data) {
    message = event.data.text();
  }
  
  const options = {
    body: message,
    icon: 'https://cdn.jsdelivr.net/npm/remixicon@3.5.0/icons/Others/restaurant-2-fill.svg',
    badge: 'https://cdn.jsdelivr.net/npm/remixicon@3.5.0/icons/Others/restaurant-2-fill.svg',
    vibrate: [100, 50, 100],
    data: {
      dateOfArrival: Date.now(),
    }
  };
  
  event.waitUntil(
    self.registration.showNotification('CuisineIdées', options)
  );
});

// Notification click event - handle notification clicks
self.addEventListener('notificationclick', (event) => {
  event.notification.close();
  
  event.waitUntil(
    clients.openWindow('/')
  );
});

// Listen for messages from the client
self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});
