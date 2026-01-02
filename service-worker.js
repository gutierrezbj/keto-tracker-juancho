/* ========================================
   SERVICE WORKER - Funcionalidad Offline
   ======================================== */

const CACHE_NAME = 'keto-tracker-v1.0.0';
const ASSETS_TO_CACHE = [
    '/',
    '/index.html',
    '/manifest.json',
    '/css/main.css',
    '/css/dashboard.css',
    '/css/components.css',
    '/css/responsive.css',
    '/js/storage.js',
    '/js/menus.js',
    '/js/fasting.js',
    '/js/metrics.js',
    '/js/charts.js',
    '/js/app.js'
];

// Instalación: Cachear recursos
self.addEventListener('install', (event) => {
    console.log('🔥 Service Worker: Instalando...');
    
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then((cache) => {
                console.log('✅ Service Worker: Recursos cacheados');
                return cache.addAll(ASSETS_TO_CACHE);
            })
            .then(() => self.skipWaiting())
    );
});

// Activación: Limpiar cachés antiguos
self.addEventListener('activate', (event) => {
    console.log('🔥 Service Worker: Activando...');
    
    event.waitUntil(
        caches.keys().then((cacheNames) => {
            return Promise.all(
                cacheNames.map((cacheName) => {
                    if (cacheName !== CACHE_NAME) {
                        console.log('🗑️ Service Worker: Eliminando caché antiguo:', cacheName);
                        return caches.delete(cacheName);
                    }
                })
            );
        }).then(() => self.clients.claim())
    );
});

// Fetch: Estrategia Cache-First con Network Fallback
self.addEventListener('fetch', (event) => {
    event.respondWith(
        caches.match(event.request)
            .then((cachedResponse) => {
                // Si está en caché, devolverlo
                if (cachedResponse) {
                    return cachedResponse;
                }
                
                // Si no, intentar desde la red
                return fetch(event.request)
                    .then((networkResponse) => {
                        // Si es una respuesta válida, cachearla para el futuro
                        if (networkResponse && networkResponse.status === 200) {
                            const responseToCache = networkResponse.clone();
                            
                            caches.open(CACHE_NAME).then((cache) => {
                                cache.put(event.request, responseToCache);
                            });
                        }
                        
                        return networkResponse;
                    })
                    .catch(() => {
                        // Si falla la red y no hay caché, mostrar página offline
                        if (event.request.destination === 'document') {
                            return caches.match('/index.html');
                        }
                    });
            })
    );
});

// Mensaje desde la app
self.addEventListener('message', (event) => {
    if (event.data.action === 'skipWaiting') {
        self.skipWaiting();
    }
    
    if (event.data.action === 'clearCache') {
        caches.delete(CACHE_NAME).then(() => {
            console.log('✅ Caché limpiado');
        });
    }
});

console.log('🔥 Service Worker cargado correctamente');
