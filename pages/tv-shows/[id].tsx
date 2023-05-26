import {fetchShowCredits, fetchShowDetails, fetchSimilarShows, TVShow} from "../../service/TVShowService";
import Meta from "../../components/Meta";
import Image from "next/image";
import {companyImageUrl} from "../../config";
import dayjs from "dayjs";
import NetworkLogo from "../../components/NetworkLogo";
import {fetchNetworkDetails, Network} from "../../service/NetworkService";
import {GetServerSidePropsContext} from "next";
import {Credits} from "../../service/PersonService";
import VideoList from "../../components/VideoList";
import PersonItem from "../../components/PersonItem";
import React from "react";

interface TVShowDetailsProps {
    show: TVShow;
    networks: Network[];
    credits: Credits;
    similarShows: TVShow[];
}

export default function TVShowDetails({show, networks, credits, similarShows}: TVShowDetailsProps) {
    const image = `${companyImageUrl}${show.backdrop_path ?? show.poster_path}`
    const width = show.backdrop_path ? 1000 : 500;

    return (
        <div>
            <div className="container max-w-4xl mx-auto py-6">
                <Meta title={`${show.name} | Details`}/>
                <div className="px-3">
                    <Image
                        src={image}
                        width={width}
                        height={600}
                        className="rounded-md"
                        placeholder="blur"
                        blurDataURL="/placeholder.png"
                        loading="lazy"
                        alt="show Wallpaper"
                    />
                    <a href={show.homepage} target="_blank" className="underline" rel="noreferrer">
                        <h1 className="font-bold text-xl my-2">{show.name}</h1>
                    </a>
                    <p className="text-gray-600 text-sm mt-4">{show.overview}</p>
                    <p className="mt-5 text-gray-600 text-sm">Genres: <span
                        className="font-bold">{show.genres.map(genre => genre.name).join(", ")}</span></p>
                    <p className="text-gray-600 text-sm">Release Date: <span
                        className="font-bold">{dayjs(show.first_air_date).format("MMMM DD, YYYY")}</span></p>
                    <p className="text-gray-600 text-sm mt-12">
                        Cast: <PersonItem persons={credits.cast}/>
                    </p>
                    <div className="flex gap-4 mt-5 mx-auto align-middle container">
                        <p className="text-gray-600 text-md">Streaming Platforms: </p>
                        {networks.map(network => <NetworkLogo key={network.id} network={network}/>)}
                    </div>
                </div>
            </div>
            <div className="bg-gray-700 pt-2">
                <VideoList title="Similar Shows" shows={similarShows}/>
            </div>
        </div>
    );
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
    const id = context.query["id"] as string;
    const show = await fetchShowDetails(id, 1);
    const similarShows = await fetchSimilarShows(id, 1);
    const networks: Network[] = await Promise.all(show.networks.map(async network => fetchNetworkDetails(network.id)));
    const credits = await fetchShowCredits(id);

    return {
        props: {
            show,
            networks,
            credits,
            similarShows
        }
    };
}
