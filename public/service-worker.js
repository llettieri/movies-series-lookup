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

const cloneCache = async (e) => {
    const req = e.request;
    const res = await fetch(req);
    const resClone = res.clone();

    const url = req.url;
    const cache = caches.open(CACHE_NAME);

    if (!url.includes('chrome-extension') && req.method !== 'POST') {
        cache.then((c) => c.put(req, resClone));
    }

    return res;
};

const fetchEvent = () => {
    self.addEventListener('fetch', (e) => {
        e.respondWith(
            cloneCache(e)
                .catch(() => caches.match(e.request))
                .then((r) => r),
        );
    });
};

fetchEvent();
