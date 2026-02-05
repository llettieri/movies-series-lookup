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
import React, { ReactNode, Suspense } from 'react';
import { TMDBImage } from '@/components/image';
import { SkeletonVerticalList } from '@/components/skeletons/skeleton-vertical-list';
import { AspectRatio } from '@/components/ui/aspect-ratio';

export const generateMetadata = async ({
    params,
}: PageProps<'/people/[id]'>): Promise<Metadata> => {
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
}: PageProps<'/people/[id]'>): Promise<ReactNode> {
    const personId = (await params).id;
    const { biography, birthday, deathday, gender, homepage, name, portrait } =
        await getPersonDetails(personId);
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
                    <div className="mx-auto mb-4 block max-w-70 md:max-w-sm">
                        <AspectRatio ratio={9 / 16}>
                            <TMDBImage
                                id="portrait"
                                src={portrait}
                                className="rounded-md object-cover"
                                alt={`${name} portrait image`}
                                scope="profile"
                                fill
                            />
                        </AspectRatio>
                    </div>
                    <h1 id="name">
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
                    <p id="description" className="mt-4 text-sm">
                        {biography}
                    </p>
                    <p id="birthday" className="mt-5 text-sm">
                        Birthday:{' '}
                        <span className="text-secondary font-bold">
                            {dayjs(birthday).format('MMMM DD, YYYY')}
                        </span>
                    </p>
                    {deathday ? (
                        <p id="deathday" className="text-sm">
                            Death:{' '}
                            <span className="text-secondary font-bold">
                                {dayjs(deathday).format('MMMM DD, YYYY')}
                            </span>
                        </p>
                    ) : null}
                </div>
            </div>
            <div className="pt-2">
                <Suspense
                    fallback={
                        <SkeletonVerticalList title={`${pronoun} Movies`} />
                    }
                >
                    <MediaList
                        title={`${pronoun} Movies`}
                        mediaCallback={() => getPersonMovies(personId)}
                    />
                </Suspense>

                <Suspense
                    fallback={
                        <SkeletonVerticalList title={`${pronoun} TV Shows`} />
                    }
                >
                    <MediaList
                        title={`${pronoun} TV Shows`}
                        mediaCallback={() => getPersonTVShows(personId)}
                    />
                </Suspense>
            </div>
        </>
    );
}
