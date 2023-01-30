import {companyImageUrl} from "../../config";
import Image from "next/image";
import Meta from "../../components/Meta";
import dayjs from "dayjs";
import {fetchMovieCredits, fetchMovieDetails, fetchSimilarMovies, Movie} from "../../service/MovieService";
import {Credits} from "../../service/PersonService";
import {GetServerSidePropsContext} from "next";
import VideoList from "../../components/VideoList";
import PersonItem from "../../components/PersonItem";
import React from "react";
import Link from "next/link";

interface MovieDetailProps {
	movie: Movie,
	credits: Credits,
	similarMovies: Movie[]
}

export default function MovieDetail({movie, credits, similarMovies}: MovieDetailProps) {
	return (
		<div>
			<div className="container max-w-4xl mx-auto py-6">
				<Meta title={`${movie.title} | Details`}/>
				<div className="px-3">
					<Image
						src={`${companyImageUrl}${movie.backdrop_path}`}
						width={1000}
						height={600}
						className="rounded-md"
						placeholder="blur"
						blurDataURL="/placeholder.png"
						loading="lazy"
						alt="Movie Wallpaper"
					/>
					<a href={movie.homepage} target="_blank" className="underline" rel="noreferrer">
						<h1 className="font-bold text-xl my-2">{movie.title} ({movie.runtime}min)</h1>
					</a>
					{movie.belongs_to_collection ?
						<Link href={`/collection/${movie.belongs_to_collection.id}`}>
							<h2 className="font-bold text-md my-2">{movie.belongs_to_collection.name}</h2>
						</Link> : ""}
					<p className="text-gray-600 text-sm mt-4">{movie.overview}</p>
					<p className="mt-5 text-gray-600 text-sm">
						Genres: <span className="font-bold">{movie.genres.map(genre => genre.name).join(", ")}</span>
					</p>
					<p className="text-gray-600 text-sm">
						Release Date: <span
						className="font-bold">{dayjs(movie.release_date).format("MMMM DD, YYYY")}</span>
					</p>
					<p className="text-gray-600 text-sm mt-12">
						Cast: <PersonItem persons={credits.cast}/>
					</p>
				</div>
			</div>
			<div className="bg-gray-700 pt-2">
				<VideoList title="Similar Movies" movies={similarMovies}/>
			</div>
		</div>
	);
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
	const id: string = context.query["id"] as string;

	const movie = await fetchMovieDetails(id, 1);
	const credits = await fetchMovieCredits(id);
	const similarMovies = await fetchSimilarMovies(id, 1);

	return {
		props: {
			movie,
			credits,
			similarMovies
		}
	};
}
