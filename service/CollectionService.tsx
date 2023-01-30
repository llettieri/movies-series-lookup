import axios from "axios";
import {collectionUrl} from "../config";

export interface Collection {
	id: string;
	name: string;
	overview: string;
	poster_path: string;
	backdrop_path: string;
	parts: Media[];
}

export interface Media {
	id: string;
	title: string;
	poster_path: string;
	backdrop_path: string;
	overview: string;
	homepage: string;
	genres: Genre[];
}

export interface Genre {
	id: string;
	name: string;
}

export async function fetchCollectionDetails(collectionId: string) {
	return axios.get(`${collectionUrl}${collectionId}?api_key=${process.env.API_KEY}`)
		.then(r => r.data);
}
