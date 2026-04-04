/* eslint-disable camelcase */
import { http, HttpResponse } from 'msw';
import { movieFixture, movieListFixture } from '../fixtures/movie';
import {
    tvShowFixture,
    tvShowListFixture,
    tvShowSeasonFixture,
} from '../fixtures/tv-show';
import { personFixture, creditsFixture } from '../fixtures/person';
import { collectionFixture } from '../fixtures/collection';
import { watchProvidersFixture } from '../fixtures/watch-providers';

const TMDB = 'https://api.themoviedb.org/3';

// Person/TV credits handlers return MediaCreditsDto shape: { id, cast, crew }
const movieCreditsResponse = {
    id: 'credits-movie',
    cast: [movieFixture],
    crew: [],
};
const tvCreditsResponse = { id: 'credits-tv', cast: [tvShowFixture], crew: [] };

export const handlers = [
    // Movies — specific sub-resource routes before the generic :id route
    http.get(`${TMDB}/movie/popular`, () =>
        HttpResponse.json(movieListFixture),
    ),
    http.get(`${TMDB}/movie/now_playing`, () =>
        HttpResponse.json(movieListFixture),
    ),
    http.get(`${TMDB}/movie/:id/credits`, () =>
        HttpResponse.json(creditsFixture),
    ),
    http.get(`${TMDB}/movie/:id/similar`, () =>
        HttpResponse.json(movieListFixture),
    ),
    http.get(`${TMDB}/movie/:id/watch/providers`, () =>
        HttpResponse.json(watchProvidersFixture),
    ),
    http.get(`${TMDB}/movie/:id`, () => HttpResponse.json(movieFixture)),

    // TV Shows
    http.get(`${TMDB}/discover/tv`, () => HttpResponse.json(tvShowListFixture)),
    http.get(`${TMDB}/tv/:id/similar`, () =>
        HttpResponse.json(tvShowListFixture),
    ),
    http.get(`${TMDB}/tv/:id/aggregate_credits`, () =>
        HttpResponse.json(creditsFixture),
    ),
    http.get(`${TMDB}/tv/:id/watch/providers`, () =>
        HttpResponse.json(watchProvidersFixture),
    ),
    http.get(`${TMDB}/tv/:id/season/:seasonNumber/aggregate_credits`, () =>
        HttpResponse.json(creditsFixture),
    ),
    http.get(`${TMDB}/tv/:id/season/:seasonNumber/watch/providers`, () =>
        HttpResponse.json(watchProvidersFixture),
    ),
    http.get(`${TMDB}/tv/:id/season/:seasonNumber`, () =>
        HttpResponse.json(tvShowSeasonFixture),
    ),
    http.get(`${TMDB}/tv/:id`, () => HttpResponse.json(tvShowFixture)),

    // Search
    http.get(`${TMDB}/search/multi`, () =>
        HttpResponse.json({
            page: 1,
            results: [{ ...movieFixture, media_type: 'movie' }],
            total_pages: 1,
            total_results: 1,
        }),
    ),

    // People — specific sub-resource routes before the generic :id route
    http.get(`${TMDB}/person/:id/movie_credits`, () =>
        HttpResponse.json(movieCreditsResponse),
    ),
    http.get(`${TMDB}/person/:id/tv_credits`, () =>
        HttpResponse.json(tvCreditsResponse),
    ),
    http.get(`${TMDB}/person/:id`, () => HttpResponse.json(personFixture)),

    // Collections
    http.get(`${TMDB}/collection/:id`, () =>
        HttpResponse.json(collectionFixture),
    ),
];
