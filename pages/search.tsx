import Hero from "../components/Hero";
import React, {useState} from "react";
import {useRouter} from "next/router";
import {GetServerSidePropsContext} from "next";
import {Movie, searchMovies} from "../service/MovieService";
import VideoList from "../components/VideoList";
import {searchShows, TVShow} from "../service/TVShowService";

export default function Search({movies, shows}: { movies: Movie[], shows: TVShow[] }) {
	const router = useRouter();
	const [searchParam, setSearchParam] = useState(router.query["searchParam"]);

	async function triggerSearch() {
		await router.replace("", {query: {searchParam}}, {});
		router.reload();
	}

	return (
		<div className="bg-gray-700">
			<Hero/>
			<div className="container mx-auto flex flex-col justify-center">
				<input type="text" onChange={event => setSearchParam(event.target.value)} defaultValue={searchParam}
					placeholder="Search..." className="mx-auto block form-input rounded-md w-80 shadow-sm mt-16"
					onKeyDown={event => event.key === "Enter" ? triggerSearch() : ""}/>
				<button type="button" onClick={triggerSearch}
					className="mx-auto my-6 block bg-blue-500 w-32 rounded-md hover:bg-blue-400">Search
				</button>
			</div>
			{
				movies.length > 0 ? <div className="bg-gray-700 pt-2">
					<VideoList title="Your search results" movies={movies} shows={shows}/>
				</div> : ""
			}
		</div>
	);
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
	const param = context.query["searchParam"] as string;
	let movies: Movie[] = [];
	let shows: TVShow[] = [];

	if (param && param !== "undefined") {
		movies = await searchMovies(param, 1);
		shows = await searchShows(param, 1);
	}

	return {
		props: {
			movies,
			shows
		}
	};
}


