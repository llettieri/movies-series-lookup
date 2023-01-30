import Link from "next/link";
import Image from "next/image";
import {imageUrl} from "../config";
import dayjs from "dayjs";
import {Movie} from "../service/MovieService";
import React from "react";

export default function MovieCard({movie}: { movie: Movie }) {
	let image = "/placeholder.png";

	if (movie.poster_path && movie.poster_path !== "null") {
		image = `${imageUrl}${movie.poster_path}`;
	}

	return (
		<Link href={`/movies/${movie.id}`}>
			<div className="bg-white shadow-sm rounded-md cursor-pointer">
				<Image src={image}
					width={700}
					height={800}
					alt={""}
					className="rounded-t-md"
					placeholder="blur"
					blurDataURL="/placeholder.png"
					loading="lazy"
				/>
				<div className="px-6 py-2">
					<div className="font-bold text-xl mb-1">{movie.title}</div>
					<p className="text-gray-700 text-base mb-1">{dayjs(movie.release_date).format("MMMM DD, YYYY")}</p>
				</div>
			</div>
		</Link>
	);
}
