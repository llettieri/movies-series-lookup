/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/explicit-function-return-type */

const CACHE_NAME = 'v1';

const installEvent = () => {
    self.addEventListener('install', () => {
        console.log('ServiceWorker - Installed');
    });
};
installEvent();

const activateEvent = () => {
    self.addEventListener('activate', () => {
        console.log('ServiceWorker - Activated!');
    });
};
activateEvent();

const cloneCache = async (e) => {
    const req = e.request;
    const res = await fetch(req);
    const resClone = res.clone();

    const url = req.url;
    const cache = caches.open(CACHE_NAME);

    if (!url.includes('chrome-extension')) {
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
