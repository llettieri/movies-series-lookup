import {searchUrl, tvUrl} from "../config";
import axios from "axios";
import {Network} from "./NetworkService";
import {Credits} from "./PersonService";
import {Media} from "./CollectionService";

export interface TVShow extends Media {
	name: string;
	first_air_date: string;
	networks: Network[];
}


export async function fetchPopularShows(page: number): Promise<TVShow[]> {
	return axios.get(`${tvUrl}popular?api_key=${process.env.API_KEY}&page=${page}`)
		.then(r => r.data.results);
}

export async function fetchOnTheAirShows(page: number): Promise<TVShow[]> {
	return axios.get(`${tvUrl}on_the_air?api_key=${process.env.API_KEY}&page=${page}`)
		.then(r => r.data.results);
}

export async function fetchSimilarShows(showId: string, page: number): Promise<TVShow[]> {
	return axios.get(`${tvUrl}${showId}/similar?api_key=${process.env.API_KEY}&page=${page}`)
		.then(r => r.data.results);
}

export async function fetchShowDetails(showId: string, page: number): Promise<TVShow> {
	return axios.get(`${tvUrl}${showId}?api_key=${process.env.API_KEY}&page=${page}`)
		.then(r => r.data);
}

export async function fetchShowCredits(showId: string): Promise<Credits> {
	return axios.get(`${tvUrl}${showId}/credits?api_key=${process.env.API_KEY}`)
		.then(r => r.data);
}

export async function searchShows(searchParam: string, page: number): Promise<TVShow[]> {
	return axios.get(`${searchUrl}tv?api_key=${process.env.API_KEY}&query=${searchParam}&page=${page}`)
		.then(r => r.data.results);
}

