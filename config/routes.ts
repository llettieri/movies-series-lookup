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

export const routes = {
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
            details: `${base.collection}/{id}`,
        },
    },
    country: `${base.ipApi}`,
    /**
     * Params: size
     */
    images: 'https://image.tmdb.org/t/p/{size}',
    movies: {
        byId: {
            /**
             * Params: id
             */
            details: `${base.movies}/{id}`,
            /**
             * Params: id
             *
             * QueryParams: page
             */
            similar: `${base.movies}/{id}/similar{?page}`,
            /**
             * Params: id
             */
            credits: `${base.movies}/{id}/credits`,
            /**
             * Params: id
             */
            watchProviders: `${base.movies}/{id}/watch/providers`,
        },
        /**
         * QueryParams: page
         */
        popular: `${base.movies}/popular{?page,region}`,
        /**
         * QueryParams: page, region
         */
        nowPlaying: `${base.movies}/now_playing{?page,region}`,
    },
    person: {
        byId: {
            /**
             * Params: id
             */
            details: `${base.person}/{id}`,
            /**
             * Params: id
             */
            movieCredits: `${base.person}/{id}/movie_credits`,
            /**
             * Params: id
             */
            tvCredits: `${base.person}/{id}}/tv_credits`,
        },
    },
    search: {
        /**
         * QueryParams: query
         */
        multi: `${base.search}/multi{?query}`,
    },
    tv: {
        byId: {
            /**
             * Params: id
             */
            details: `${base.tv}/{id}}`,
            /**
             * Params: id
             *
             * QueryParams: page
             */
            similar: `${base.tv}/{id}/similar{?page}`,
            /**
             * Params: id
             */
            aggregateCredits: `${base.tv}/{id}/aggregate_credits`,
            /**
             * Params: id
             */
            watchProviders: `${base.tv}/{id}/watch/providers`,
        },
        /**
         * QueryParams: page, sort_by, watch_region, with_watch_monetization_types, air_date.gte, air_date.lte
         */
        discover: `${base.discover}/tv{?page,sort_by,watch_region,with_watch_monetization_types,air_date.gte,air_date.lte}`,
    },
};
