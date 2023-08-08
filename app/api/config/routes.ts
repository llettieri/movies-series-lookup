const base = {
    movies: 'https://api.themoviedb.org/3/movie',
    tv: 'https://api.themoviedb.org/3/tv',
    search: 'https://api.themoviedb.org/3/search',
    person: 'https://api.themoviedb.org/3/person',
    collection: 'https://api.themoviedb.org/3/collection',
    discover: 'https://api.themoviedb.org/3/discover',
};

export const routes = {
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
        },
        /**
         * QueryParams: page
         */
        popular: `${base.movies}/popular{?page}`,
        /**
         * QueryParams: page
         */
        nowPlaying: `${base.movies}/now_playing{?page}`,
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
        },
        /**
         * QueryParams: page
         */
        popular: `${base.tv}/popular{?page}`,
        /**
         * QueryParams: page
         */
        airingToday: `${base.tv}/airing_today{?page}`,
        /**
         * QueryParams: include_adult, page, sort_by, air_date.lte, air_date.gte
         */
        discover: `${base.discover}/tv{?include_adult}{?page}{?sort_by}{?air_date.lte}{?air_date.gte}{?region}`,
    },
    images: 'https://image.tmdb.org/t/p/original',

    search: {
        /**
         * QueryParams: query
         */
        multi: `${base.search}/multi{?query}`,
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
    collection: {
        byId: {
            /**
             * Params: id
             */
            details: `${base.collection}/{id}`,
        },
    },
};
