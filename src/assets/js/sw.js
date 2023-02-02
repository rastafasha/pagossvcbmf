importScripts('./sw-utils.js');

const STATIC_CACHE = 'static-v1';
const DYNAMIC_CACHE = 'dynamic-v1';
const INMUTABLE_CACHE = 'inmutable-v1';
const CACHE_DYNAMIC_LIMIT = 50;

const APP_SHELL = [
    // '/',

    // '/assets/assets/ico/apple-touch-icon-114-precomposed.png',
    // '/assets/assets/ico/apple-touch-icon-144-precomposed.png',
    // '/assets/assets/ico/apple-touch-icon-57-precomposed.png',
    // '/assets/assets/ico/apple-touch-icon-72-precomposed.png',
    // '/assets/assets/ico/favicon.png',
    '/assets/css/main.css',
    '/assets/icons/icon-1024x1024.png',
    '/assets/icons/icon-114x114.png',
    '/assets/icons/icon-120x120.png',
    '/assets/icons/icon-128x128.png',
    '/assets/icons/icon-144x144.png',
    '/assets/icons/icon-152x152.png',
    '/assets/icons/icon-180x180.png',
    '/assets/icons/icon-192x192.png',
    '/assets/icons/icon-256x256.png',
    '/assets/icons/icon-32x32.png',
    '/assets/icons/icon-384x384.png',
    '/assets/icons/icon-512x512.png',
    '/assets/icons/icon-57x57.png',
    '/assets/icons/icon-60x60.png',
    '/assets/icons/icon-72x72.png',
    '/assets/icons/icon-76x76.png',
    '/assets/icons/icon-96x96.png',
    '/assets/img/no-image.jpg',
    '/assets/img/icons-ios/apple-launch-1125x2436.png',
    '/assets/img/icons-ios/apple-launch-1242x2208.png',
    '/assets/img/icons-ios/apple-launch-640x1136.png',
    '/assets/img/icons-ios/apple-launch-750x1334.png',
    '/favicon.ico',
    '/assets/js/app.js'
];

const APP_SHELL_INMUTABLE = [
    'https://cdn.ckeditor.com/4.12.1/standard/ckeditor.js',
    'https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css',
    'https://fonts.googleapis.com/css?family=Open+Sans:300,300i,400,400i,600,600i,700,700i|Nunito:300,300i,400,400i,600,600i,700,700i|Poppins:300,300i,400,400i,500,500i,600,600i,700,700i',
    'https://code.jquery.com/jquery-2.1.3.min.js',
    '/assets/vendor/bootstrap/css/bootstrap.min.css',
    '/assets/vendor/bootstrap-icons/bootstrap-icons.css',
    '/assets/vendor/boxicons/css/boxicons.min.css',
    '/assets/vendor/quill/quill.snow.css',
    '/assets/vendor/quill/quill.bubble.css',
    '/assets/vendor/remixicon/remixicon.css',
    '/assets/vendor/simple-datatables/style.css',
    '/assets/css/animate.css',
    '/assets/css/style.css',
    '/assets/css/loading.css',
    // '/main.2b2d0e42d1e0e384135e.js',
    // '/polyfills.8bbb231b43165d65d357.js',
    // '/runtime.26209474bfa8dc87a77c.js',
    // '/styles.3ff695c00d717f2d2a11.css',
];



self.addEventListener('install', e => {

    console.log('SW: Instalando Sw');
    const cacheStatic = caches.open(STATIC_CACHE).then(cache =>
        cache.addAll(APP_SHELL));

    const cacheInmutable = caches.open(INMUTABLE_CACHE).then(cache =>
        cache.addAll(APP_SHELL_INMUTABLE));



    e.waitUntil(Promise.all([cacheStatic, cacheInmutable]));

});


self.addEventListener('activate', e => {

    // borrar cache viejo
    console.log('SW1: Activo y listo para controlar la app');

    const respuesta = caches.keys().then(keys => {

        keys.forEach(key => {

            if (key !== STATIC_CACHE && key.includes('static')) {
                return caches.delete(key);
            }

            if (key !== DYNAMIC_CACHE && key.includes('dynamic')) {
                return caches.delete(key);
            }

        });

    });

    e.waitUntil(respuesta);

});


self.addEventListener('fetch', e => {


    const respuesta = caches.match(e.request).then(res => {

        if (res) {
            return res;
        } else {

            return fetch(e.request).then(newRes => {

                return actualizaCacheDinamico(DYNAMIC_CACHE, e.request, newRes);

            });

        }

    });



    e.respondWith(respuesta);

});

// evento Sync: recuperamos la conexion a internet
self.addEventListener('sync', event => {

    console.log('Tenemos Conexión');
    console.log(event);
    console.log(event.tag);

});