const base = {
    movies: 'https://api.themoviedb.org/3/movie',
    tv: 'https://api.themoviedb.org/3/tv',
    search: 'https://api.themoviedb.org/3/search',
    person: 'https://api.themoviedb.org/3/person',
};

export const routes = {
    movies: {
        byId: (
            id: number,
        ): {
            details: string;
            // eslint-disable-next-line no-unused-vars
            similar: (page?: number) => string;
            credits: string;
        } => ({
            details: `${base.movies}/${id}`,
            similar: (page?: number): string =>
                `${base.movies}/${id}/similar?page=${page ?? 1}`,
            credits: `${base.movies}/${id}/credits`,
        }),
        popular: (page?: number): string =>
            `${base.movies}/popular?page=${page ?? 1}`,
        nowPlaying: (page?: number): string =>
            `${base.movies}/now_playing?page=${page ?? 1}`,
    },
    tv: {
        byId: (
            id: number,
        ): {
            details: string;
            similar: () => string;
            credits: string;
        } => ({
            details: `${base.tv}/${id}`,
            similar: (page?: number): string =>
                `${base.tv}/${id}/similar?page=${page ?? 1}`,
            credits: `${base.tv}/${id}/credits`,
        }),
        popular: (page?: number): string =>
            `${base.tv}/popular?page=${page ?? 1}`,
        airingToday: (page?: number): string =>
            `${base.tv}/airing_today?page=${page ?? 1}`,
    },
    images: 'https://image.tmdb.org/t/p/original',
    search: {
        multi: (query: string): string => `${base.search}/multi?query=${query}`,
    },
    person: {
        byId: (
            id: number,
        ): {
            details: string;
            movieCredits: string;
            tvCredits: string;
        } => ({
            details: `${base.person}/${id}`,
            movieCredits: `${base.person}/${id}/movie_credits`,
            tvCredits: `${base.person}/${id}/tv_credits`,
        }),
    },
};
