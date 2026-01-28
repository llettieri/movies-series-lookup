let CACHE_NAME = 'unknown'; // fallback

// Fetch version on first run
fetch('/version.json')
    .then((r) => r.json())
    .then(({ version }) => (CACHE_NAME = version));

const installEvent = () => {
    self.addEventListener('install', () => {
        self.skipWaiting();

        console.info('ServiceWorker - Installed');
    });
};
installEvent();

const activateEvent = () => {
    self.addEventListener('activate', (event) => {
        event.waitUntil(
            caches
                .keys()
                .then((cacheNames) =>
                    Promise.all(
                        cacheNames
                            .filter((name) => name !== CACHE_NAME)
                            .map((name) => caches.delete(name)),
                    ),
                ),
        );

        clients.claim();

        console.info(`ServiceWorker - ${CACHE_NAME} - Activated!`);
    });
};
activateEvent();

const EXCLUDED_URIS = ['chrome-extension', 'ip.lore-le.ch', 'cloudflare'];

const cloneCache = async (request) => {
    const res = await fetch(request);
    const resClone = res.clone();

    const cache = caches.open(CACHE_NAME);

    cache.then((c) => c.put(request, resClone));

    return res;
};

const fetchEvent = () => {
    self.addEventListener('fetch', (e) => {
        const request = e.request;
        const isExcluded =
            request.method === 'POST' ||
            EXCLUDED_URIS.some((uri) => request.url.includes(uri));

        if (isExcluded) {
            return;
        }

        e.respondWith(
            cloneCache(request)
                .catch(() => caches.match(request))
                .then((r) => r),
        );
    });
};

fetchEvent();
