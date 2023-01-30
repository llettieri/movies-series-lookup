import {GetServerSidePropsContext} from "next";
import {fetchPersonDetails, fetchPersonMovieCredits, fetchPersonShowCredits, Person} from "../../service/PersonService";
import Image from "next/image";
import {companyImageUrl} from "../../config";
import dayjs from "dayjs";
import Meta from "../../components/Meta";
import VideoList from "../../components/VideoList";
import React from "react";
import {Movie} from "../../service/MovieService";
import {TVShow} from "../../service/TVShowService";

interface PersonDetailProps {
	person: Person;
	movieCredits: Movie[];
	showCredits: TVShow[];
}

export default function PersonDetail({person, movieCredits, showCredits}: PersonDetailProps) {
	let pronoun: string;

	if (person.gender === 1) {
		pronoun = "Her";
	} else if (person.gender === 2) {
		pronoun = "His";
	} else {
		pronoun = "The";
	}

	return (
		<div>
			<div className="container max-w-4xl mx-auto py-6">
				<Meta title={`${person.name} | Details`}/>
				<div className="px-3">
					<Image
						src={`${companyImageUrl}${person.profile_path}`}
						width={300}
						height={100}
						placeholder="blur"
						blurDataURL="/placeholder.png"
						loading="lazy"
						className="rounded-md mx-auto block"
						alt="person Wallpaper"
					/>
					<a href={person.homepage} target="_blank" className={person.homepage ? "underline" : ""} rel="noreferrer">
						<h1 className="font-bold text-xl my-2">{person.name}</h1>
					</a>
					<p className="text-gray-600 text-sm mt-4">{person.biography}</p>
					<p className="mt-5 text-gray-600 text-sm">
						Birthday: <span
						className="font-bold">{dayjs(person.birthday).format("MMMM DD, YYYY")}</span>
					</p>
					{
						person.deathday ? <p className="text-gray-600 text-sm">Death: <span
							className="font-bold">{dayjs(person.deathday).format("MMMM DD, YYYY")}</span></p> : ""
					}
				</div>
			</div>
			<div className="bg-gray-700 pt-2">
				<VideoList title={`${pronoun} Movies`} movies={movieCredits}/>
				<VideoList title={`${pronoun} TV Shows`} shows={showCredits}/>
			</div>
		</div>
	);
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
	const id = context.params?.id;
	let person;
	let movieCredits;
	let showCredits;

	if (id) {
		person = await fetchPersonDetails(id as string);
		movieCredits = await fetchPersonMovieCredits(id as string);
		showCredits = await fetchPersonShowCredits(id as string);
	}

	return {
		props: {
			person,
			movieCredits,
			showCredits
		}
	};
}
