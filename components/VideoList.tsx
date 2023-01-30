import MovieCard from "./MovieCard";
import {Movie} from "../service/MovieService";
import {TVShow} from "../service/TVShowService";
import ShowCard from "./ShowCard";

export default function VideoList({movies, shows, title}: { movies?: Movie[], shows?: TVShow[], title: string }) {
	return (
		<div className="bg-gray-700 container max-w-7xl mx-auto pb-10 px-4">
			<h1 className="text-white text-2xl mt-8 mb-5">{title}</h1>
			<div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
				{movies?.map(movie => <MovieCard key={movie.id} movie={movie}/>)}
				{shows?.map(show => <ShowCard key={show.id} show={show}/>)}
			</div>
		</div>
	);
}
