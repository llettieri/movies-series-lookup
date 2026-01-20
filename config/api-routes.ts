import { parseTemplate } from 'url-template';

const base = {
    authentication: 'https://api.themoviedb.org/3/authentication',
    collection: 'https://api.themoviedb.org/3/collection',
    discover: 'https://api.themoviedb.org/3/discover',
    ipApi: 'https://ip.lore-le.ch',
    movies: 'https://api.themoviedb.org/3/movie',
    person: 'https://api.themoviedb.org/3/person',
    search: 'https://api.themoviedb.org/3/search',
    tv: 'https://api.themoviedb.org/3/tv',
};

export const apiRoutes = {
    authentication: {
        guest: {
            new: `${base.authentication}/guest_session/new`,
        },
        token: {
            new: `${base.authentication}/token/new`,
        },
    },
    collection: {
        byId: {
            /**
             * Params: id
             */
            details: parseTemplate(`${base.collection}/{id}`),
        },
    },
    country: `${base.ipApi}`,
    /**
     * Params: size
     */
    images: parseTemplate('https://image.tmdb.org/t/p/{size}'),
    movies: {
        byId: {
            /**
             * Params: id
             */
            details: parseTemplate(`${base.movies}/{id}`),
            /**
             * Params: id
             *
             * QueryParams: page
             */
            similar: parseTemplate(`${base.movies}/{id}/similar{?page}`),
            /**
             * Params: id
             */
            credits: parseTemplate(`${base.movies}/{id}/credits`),
            /**
             * Params: id
             */
            watchProviders: parseTemplate(
                `${base.movies}/{id}/watch/providers`,
            ),
        },
        /**
         * QueryParams: page
         */
        popular: parseTemplate(`${base.movies}/popular{?page,region}`),
        /**
         * QueryParams: page, region
         */
        nowPlaying: parseTemplate(`${base.movies}/now_playing{?page,region}`),
    },
    person: {
        byId: {
            /**
             * Params: id
             */
            details: parseTemplate(`${base.person}/{id}`),
            /**
             * Params: id
             */
            movieCredits: parseTemplate(`${base.person}/{id}/movie_credits`),
            /**
             * Params: id
             */
            tvCredits: parseTemplate(`${base.person}/{id}}/tv_credits`),
        },
    },
    search: {
        /**
         * QueryParams: query
         */
        multi: parseTemplate(`${base.search}/multi{?query}`),
    },
    tv: {
        byId: {
            /**
             * Params: id
             */
            details: parseTemplate(`${base.tv}/{id}}`),
            /**
             * Params: id
             *
             * QueryParams: page
             */
            similar: parseTemplate(`${base.tv}/{id}/similar{?page}`),
            /**
             * Params: id
             */
            aggregateCredits: parseTemplate(
                `${base.tv}/{id}/aggregate_credits`,
            ),
            /**
             * Params: id
             */
            watchProviders: parseTemplate(`${base.tv}/{id}/watch/providers`),
        },
        /**
         * QueryParams: page, sort_by, watch_region, with_watch_monetization_types, air_date.gte, air_date.lte
         */
        discover: parseTemplate(
            `${base.discover}/tv{?page,sort_by,watch_region,with_watch_monetization_types,air_date.gte,air_date.lte}`,
        ),
    },
};
