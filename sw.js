var cacheName = 'BauC';

self.addEventListener('install', function (event) {
  caches.open(cacheName).then((cache) => {
    cache.addAll([
       '/',
        '/index.html',
        '/pisos.html',
        '/styles-index.css',
        '/styles-pisos.css',
        '/manifest.json',
        '/assets/logo.png',
        '/assets/voltar.png',
    ]);
  });
});

self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys().then((keyList) => {
      return Promise.all(
        keyList.map((key) => {
          if (key !== cacheName) {
            return caches.delete(key);
          }
        })
      );
    })
  );
});

self.addEventListener('fetch', function (event) { 
  let resposta = caches.open(cacheName).then((cache) => { 
    return cache.match(event.request).then((recurso) => { 
      if (recurso) return recurso; 
      return fetch(event.request).then((recurso) => { 
        cache.put(event.request, recurso.clone()); 
        return recurso; 
      }); 
    }); 
  }); 
  event.respondWith(resposta); 
});