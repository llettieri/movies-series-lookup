import { MediaList } from '@/components/lists/MediaList';
import { Meta } from '@/components/Meta';
import { Gender } from '@/models/Person';
import {
    getPersonDetails,
    getPersonMovies,
    getPersonTVShows,
} from '@/services/PersonService';
import dayjs from 'dayjs';
import { Metadata } from 'next';
import Image from 'next/image';
import React, { ReactNode } from 'react';

interface PersonPageProps {
    params: {
        id: number;
    };
}

export const generateMetadata = async ({
    params,
}: PersonPageProps): Promise<Metadata> => {
    const person = await getPersonDetails(params.id);
    return Meta({
        title: `${person.name} | Details`,
        keywords: 'person details biography movies tv-shows',
    });
};

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
export default async function PersonPage({
    params,
}: PersonPageProps): Promise<ReactNode> {
    const person = await getPersonDetails(params.id);
    const movieCredits = await getPersonMovies(params.id);
    const showCredits = await getPersonTVShows(params.id);
    let pronoun: string;

    if (person.gender === Gender.FEMALE) {
        pronoun = 'Her';
    } else if (person.gender === Gender.MALE) {
        pronoun = 'His';
    } else {
        pronoun = 'The';
    }

    return (
        <>
            <div className="container mx-auto max-w-4xl py-6">
                <div className="px-3">
                    <Image
                        src={person.portrait ?? '/placeholder.png'}
                        width={300}
                        height={100}
                        placeholder="blur"
                        blurDataURL="/placeholder.png"
                        loading="lazy"
                        className="mx-auto block h-auto rounded-md"
                        alt="person Wallpaper"
                    />

                    <h1>
                        {person.homepage ? (
                            <a
                                href={person.homepage}
                                target="_blank"
                                className="underline"
                                rel="noreferrer"
                            >
                                {person.name}
                            </a>
                        ) : (
                            person.name
                        )}
                    </h1>

                    <p className="mt-4 text-sm">{person.biography}</p>
                    <p className="mt-5 text-sm">
                        Birthday:{' '}
                        <span className="font-bold text-secondaryText">
                            {dayjs(person.birthday).format('MMMM DD, YYYY')}
                        </span>
                    </p>
                    {person.deathday ? (
                        <p className="text-sm">
                            Death:{' '}
                            <span className="font-bold">
                                {dayjs(person.deathday).format('MMMM DD, YYYY')}
                            </span>
                        </p>
                    ) : null}
                </div>
            </div>
            <div className="pt-2">
                <MediaList title={`${pronoun} Movies`} medias={movieCredits} />
                <MediaList title={`${pronoun} TV Shows`} medias={showCredits} />
            </div>
        </>
    );
}
