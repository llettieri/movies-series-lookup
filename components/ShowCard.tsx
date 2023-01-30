import Image from "next/image";
import {imageUrl} from "../config";
import dayjs from "dayjs";
import Link from "next/link";
import {TVShow} from "../service/TVShowService";

export default function ShowCard({show}: {show: TVShow}) {
	let image = "/placeholder.png";

	if (show.poster_path) {
		image = `${imageUrl}${show.poster_path}`;
	}

	return (
		<Link href={`/tv-shows/${show.id}`}>
			<div className="bg-white shadow-sm rounded-md cursor-pointer">
				<Image src={image}
					width={700}
					height={800}
					alt={""}
					className="rounded-t-md"
					placeholder="blur"
					blurDataURL="/placeholder.png"
					loading="lazy"/>
				<div className="px-6 py-2">
					<div className="font-bold text-xl mb-1">{show.name}</div>
					<p className="text-gray-700 text-base mb-1">{dayjs(show.first_air_date).format("MMMM DD, YYYY")}</p>
				</div>
			</div>
		</Link>
	);
}
