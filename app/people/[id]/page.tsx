import { MediaList } from '@/components/lists/media-list';
import { Meta } from '@/components/meta';
import { Gender } from '@/models/person';
import {
    getPersonDetails,
    getPersonMovies,
    getPersonTVShows,
} from '@/services/person-service';
import dayjs from 'dayjs';
import { Metadata } from 'next';
import React, { ReactNode } from 'react';
import { TMDBImage } from '@/components/image';

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
    const { biography, birthday, deathday, gender, homepage, name, portrait } =
        await getPersonDetails(personId);
    const movieCredits = await getPersonMovies(personId);
    const showCredits = await getPersonTVShows(personId);
    const image = portrait ?? '/fallback.png';
    let pronoun: string = 'The';

    if (gender === Gender.FEMALE) {
        pronoun = 'Her';
    } else if (gender === Gender.MALE) {
        pronoun = 'His';
    }

    return (
        <>
            <div className="container mx-auto max-w-4xl py-6">
                <div className="px-3">
                    <TMDBImage
                        src={image}
                        width={600 / 1.5}
                        height={600}
                        className="mx-auto block h-auto w-auto rounded-md"
                        alt="person Wallpaper"
                        scope="profile"
                        loading="eager"
                    />

                    <h1>
                        {homepage ? (
                            <a
                                href={homepage}
                                target="_blank"
                                className="underline"
                                rel="noreferrer"
                            >
                                {name}
                            </a>
                        ) : (
                            name
                        )}
                    </h1>

                    <p className="mt-4 text-sm">{biography}</p>
                    <p className="mt-5 text-sm">
                        Birthday:{' '}
                        <span className="text-secondary-text font-bold">
                            {dayjs(birthday).format('MMMM DD, YYYY')}
                        </span>
                    </p>
                    {deathday ? (
                        <p className="text-sm">
                            Death:{' '}
                            <span className="font-bold">
                                {dayjs(deathday).format('MMMM DD, YYYY')}
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
