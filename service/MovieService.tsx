import axios from "axios";
import {movieUrl, searchUrl} from "../config";
import {Credits} from "./PersonService";
import {Media} from "./CollectionService";

export interface Movie extends Media {
	release_date: string;
	runtime: number;
	belongs_to_collection: Collection;
}



export interface Collection {
	id: string;
	name: string;
}

export async function fetchPopularMovies(page: number): Promise<Movie[]> {
	return axios.get(`${movieUrl}popular?api_key=${process.env.API_KEY}&page=${page}`)
		.then(r => r.data.results);
}

export async function fetchNowPlayingMovies(page: number): Promise<Movie[]> {
	return axios.get(`${movieUrl}now_playing?api_key=${process.env.API_KEY}&page=${page}`)
		.then(r => r.data.results);
}

export async function fetchSimilarMovies(movieId: string, page: number): Promise<Movie[]> {
	return axios.get(`${movieUrl}${movieId}/similar?api_key=${process.env.API_KEY}&page=${page}`)
		.then(r => r.data.results);
}

export async function fetchMovieDetails(movieId: string, page: number): Promise<Movie> {
	return axios.get(`${movieUrl}${movieId}?api_key=${process.env.API_KEY}&page=${page}`)
		.then(r => r.data);
}

export async function fetchMovieCredits(movieId: string): Promise<Credits> {
	return axios.get(`${movieUrl}${movieId}/credits?api_key=${process.env.API_KEY}`)
		.then(r => r.data);
}

export async function searchMovies(searchParam: string, page: number): Promise<Movie[]> {
	return axios.get(`${searchUrl}movie?api_key=${process.env.API_KEY}&query=${searchParam}&page=${page}`)
		.then(r => r.data.results);
}
