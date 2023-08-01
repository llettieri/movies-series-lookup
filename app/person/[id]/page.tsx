import { routes } from '@/app/api/config/routes';
import {
    getPersonDetails,
    getPersonMovies,
    getPersonTVShows,
} from '@/app/api/services/PersonService';
import MediaList from '@/components/lists/MediaList';
import { Meta } from '@/components/Meta';
import dayjs from 'dayjs';
import { Metadata } from 'next';
import Image from 'next/image';
import { ReactNode } from 'react';

interface PersonPageProps {
    params: {
        id: number;
    };
}

export async function generateMetadata({
    params,
}: PersonPageProps): Promise<Metadata> {
    const person = await getPersonDetails(params.id);
    return Meta({ title: `${person.name} | Details` });
}

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
export default async function PersonPage({
    params,
}: PersonPageProps): Promise<ReactNode> {
    const person = await getPersonDetails(params.id);
    const movieCredits = await getPersonMovies(params.id);
    const showCredits = await getPersonTVShows(params.id);
    let pronoun: string;

    if (person.gender === 1) {
        pronoun = 'Her';
    } else if (person.gender === 2) {
        pronoun = 'His';
    } else {
        pronoun = 'The';
    }

    return (
        <div>
            <div className="container max-w-4xl mx-auto py-6">
                <div className="px-3">
                    <Image
                        src={`${routes.images}${person.profile_path}`}
                        width={300}
                        height={100}
                        placeholder="blur"
                        blurDataURL="/placeholder.png"
                        loading="lazy"
                        className="rounded-md mx-auto block"
                        alt="person Wallpaper"
                    />
                    <a
                        href={person.homepage}
                        target="_blank"
                        className={person.homepage ? 'underline' : ''}
                        rel="noreferrer"
                    >
                        <h1 className="font-bold text-primary text-xl my-2">
                            {person.name}
                        </h1>
                    </a>
                    <p className="text-primaryText text-sm mt-4">
                        {person.biography}
                    </p>
                    <p className="mt-5 text-primaryText text-sm">
                        Birthday:{' '}
                        <span className="font-bold text-secondaryText">
                            {dayjs(person.birthday).format('MMMM DD, YYYY')}
                        </span>
                    </p>
                    {person.deathday ? (
                        <p className="text-primaryText text-sm">
                            Death:{' '}
                            <span className="font-bold">
                                {dayjs(person.deathday).format('MMMM DD, YYYY')}
                            </span>
                        </p>
                    ) : (
                        ''
                    )}
                </div>
            </div>
            <div className="pt-2">
                <MediaList title={`${pronoun} Movies`} movies={movieCredits} />
                <MediaList title={`${pronoun} TV Shows`} shows={showCredits} />
            </div>
        </div>
    );
}
