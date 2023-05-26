import Hero from "../components/Hero";
import React, {useState} from "react";
import VideoList from "../components/VideoList";
import {fetchNowPlayingMovies, fetchPopularMovies, Movie} from "../service/MovieService";
import {fetchOnTheAirShows, fetchPopularShows, TVShow} from "../service/TVShowService";

interface HomeProps {
    popularMovies: Movie[];
    popularShows: TVShow[];
    nowPlayingMovies: Movie[];
    nowPlayingShows: TVShow[];
}

export default function Home({popularMovies, popularShows, nowPlayingMovies, nowPlayingShows}: HomeProps) {
	const [collection, setCollection] = useState("movies");
	const [listType, setListType] = useState("popular");

	return (
		<div className="bg-gray-700">
			<Hero/>
			<div className="flex gap-6 justify-center align-middle container mx-auto mt-4">
				<button
					className={`bg-blue-500 text-white rounded-md w-24 ${collection == "movies" ? "bg-blue-300 text-black" : ""} `}
					onClick={() => setCollection("movies")}>Movies
				</button>
				<button
					className={`bg-blue-500 text-white rounded-md w-24 ${collection == "series" ? "bg-blue-300 text-black" : ""} `}
					onClick={() => setCollection("series")}>TV Series
				</button>
			</div>
			<div className="flex gap-6 justify-center align-middle container mx-auto mt-4">
				<button
					className={`bg-blue-500 text-white rounded-md w-24 ${listType == "popular" ? "bg-blue-300 text-black" : ""} `}
					onClick={() => setListType("popular")}>Popular
				</button>
				<button
					className={`bg-blue-500 text-white rounded-md w-24 ${listType == "nowPlaying" ? "bg-blue-300 text-black" : ""} `}
					onClick={() => setListType("nowPlaying")}>Now Playing
				</button>
			</div>
			{
				collection == "movies" ?
					listType == "popular" ? <VideoList movies={popularMovies} title="Popular Movies"/> :
						<VideoList movies={nowPlayingMovies} title="Now Playing"/> :
					listType == "popular" ? <VideoList shows={popularShows} title="Popular TV Shows"/> :
						<VideoList shows={nowPlayingShows} title="Latest TV Shows"/>
			}
		</div>
	);
}

export async function getServerSideProps() {
	const popularMovies: Movie[] = await fetchPopularMovies(1);
	const popularShows: TVShow[] = await fetchPopularShows(1);
	const nowPlayingMovies: Movie[] = await fetchNowPlayingMovies(1);
	const nowPlayingShows: TVShow[] = await fetchOnTheAirShows(1);

	return {
		props: {popularMovies, popularShows, nowPlayingMovies, nowPlayingShows}
	};
}
