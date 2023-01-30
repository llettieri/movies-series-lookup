import axios from "axios";
import {personUrl} from "../config";
import {Movie} from "./MovieService";
import {TVShow} from "./TVShowService";

export interface Credits {
	id: string;
	crew: Person[];
	cast: Person[];
}

export interface Person {
	id: string;
	name: string;
	character: string;
	birthday: string;
	gender: number;
	profile_path: string;
	deathday: string;
	biography: string;
	homepage: string;
}

export function fetchPersonDetails(personId: string): Promise<Person> {
	return axios.get(`${personUrl}${personId}?api_key=${process.env.API_KEY}`)
		.then(r => r.data);
}

export function fetchPersonMovieCredits(personId: string): Promise<Movie[]> {
	return axios.get(`${personUrl}${personId}/movie_credits?api_key=${process.env.API_KEY}`)
		.then(r => {
			const results = [...r.data.crew, ...r.data.cast];
			const movies: Movie[] = [];
			results.forEach(result => {
				if (!movies.map(movie => movie.id).includes(result.id)) {
					movies.push(result);
				}
			});
			return movies;
		});
}

export function fetchPersonShowCredits(personId: string): Promise<TVShow[]> {
	return axios.get(`${personUrl}${personId}/tv_credits?api_key=${process.env.API_KEY}`)
		.then(r => {
			const results = [...r.data.crew, ...r.data.cast];
			const shows: TVShow[] = [];
			results.forEach(result => {
				if (!shows.map(show => show.id).includes(result.id)) {
					shows.push(result);
				}
			});
			return shows;
		});
}
