import { DetailLayout } from '@/components/detail-layout';
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
import { CardVerticalListSkeleton } from '@/components/skeletons/card-vertical-list-skeleton';
import { ItemList } from '@/components/lists/item-list';

export const generateMetadata = async ({
    params,
}: PageProps<'/people/[id]'>): Promise<Metadata> => {
    const personId = (await params).id;
    const { name, type, roles, biography } = await getPersonDetails(personId);

    return Meta({
        title: `${name} | Details`,
        description: biography,
        keywords: [name, type, roles?.map((role) => role.name)]
            .filter((keyword) => keyword != undefined)
            .join(', '),
    });
};

export default async function PersonPage({
    params,
}: PageProps<'/people/[id]'>): Promise<ReactNode> {
    const personId = (await params).id;
    const { biography, birthday, deathday, gender, homepage, name, portrait } =
        await getPersonDetails(personId);

    let pronoun = 'The';
    if (gender === Gender.FEMALE) pronoun = 'Her';
    else if (gender === Gender.MALE) pronoun = 'His';

    const birthdayRow = birthday
        ? {
              label: 'Birthday',
              value: dayjs(birthday).format('MMMM DD, YYYY'),
          }
        : null;
    const deathdayRow = deathday
        ? {
              label: 'Death',
              value: dayjs(deathday).format('MMMM DD, YYYY'),
          }
        : null;

    return (
        <>
            <DetailLayout
                backdrop={null}
                image={portrait}
                imageAspect="portrait"
                alt={`${name} portrait`}
                title={name}
                homepage={homepage}
                description={biography}
                metadata={[birthdayRow, deathdayRow]}
            />
            <Suspense
                fallback={
                    <CardVerticalListSkeleton title={`${pronoun} Movies`} />
                }
            >
                <ItemList
                    title={`${pronoun} Movies`}
                    loadItems={() => getPersonMovies(personId)}
                />
            </Suspense>
            <Suspense
                fallback={
                    <CardVerticalListSkeleton title={`${pronoun} TV Shows`} />
                }
            >
                <ItemList
                    title={`${pronoun} TV Shows`}
                    loadItems={() => getPersonTVShows(personId)}
                />
            </Suspense>
        </>
    );
}
