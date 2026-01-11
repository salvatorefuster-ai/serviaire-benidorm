const CACHE_NAME = 'serviaire-v1';
const ASSETS = [
    '/',
    '/index.html',
    '/sobre-nosotros.html',
    '/proyectos.html',
    '/instalacion-aire-acondicionado.html',
    '/mantenimiento-aire-acondicionado-benidorm.html',
    '/sistemas-vrv-hoteles-benidorm.html',
    '/ahorra-30-aire-acondicionado.html',
    '/mantenimiento-filtros-guia.html',
    '/beneficios-vrv-hoteles.html',
    '/aviso-legal.html',
    '/politica-privacidad.html',
    '/politica-cookies.html',
    '/style.css',
    '/script.js',
    '/logo.svg',
    '/site.webmanifest',
    '/hero.webp',
    '/vrv_commercial_roof.webp',
    '/ac_bedroom_interior.webp',
    '/technician_maintenance_close.webp',
    '/success.html',
    '/404.html'
];

self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then((cache) => cache.addAll(ASSETS))
    );
});

self.addEventListener('fetch', (event) => {
    event.respondWith(
        caches.match(event.request)
            .then((response) => response || fetch(event.request))
    );
});
