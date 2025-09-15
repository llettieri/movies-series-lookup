import { MediaList } from '@/components/lists/MediaList';
import { Meta } from '@/components/Meta';
import { Gender } from '@/models/Person';
import {
    getPersonDetails,
    getPersonMovies,
    getPersonTVShows,
} from '@/services/person-service';
import dayjs from 'dayjs';
import { Metadata } from 'next';
import Image from 'next/image';
import React, { ReactNode } from 'react';

interface PersonPageProps {
    params: Promise<{ id: number }>;
}

export const generateMetadata = async ({
    params,
}: PersonPageProps): Promise<Metadata> => {
    const personId = (await params).id;
    const person = await getPersonDetails(personId);

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
    const personId = (await params).id;
    const person = await getPersonDetails(personId);
    const movieCredits = await getPersonMovies(personId);
    const showCredits = await getPersonTVShows(personId);
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
                        src={person.portrait ?? '/fallback.png'}
                        width={200}
                        height={400}
                        className="mx-auto block h-auto w-auto rounded-md"
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
                        <span className="text-secondary-text font-bold">
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
                {movieCredits.length > 0 ? (
                    <MediaList
                        title={`${pronoun} Movies`}
                        medias={movieCredits}
                    />
                ) : null}
                {showCredits.length > 0 ? (
                    <MediaList
                        title={`${pronoun} TV Shows`}
                        medias={showCredits}
                    />
                ) : null}
            </div>
        </>
    );
}
