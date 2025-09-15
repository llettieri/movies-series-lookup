import { CollectionType, ListType } from '@/app/page';
import { Button } from '@/components/Button';
import { redirect } from 'next/navigation';
import React, { ReactNode } from 'react';

interface HomeSubNavProps {
    collection: CollectionType;
    listType: ListType;
}

export const HomeSubNav = ({
    collection,
    listType,
}: HomeSubNavProps): ReactNode => {
    return (
        <>
            <div className="container mx-auto mt-4 flex w-72 justify-center gap-6 align-middle">
                <Button
                    title="Movies"
                    onClick={async (): Promise<void> => {
                        'use server';
                        redirect(`?collection=movies&listType=${listType}`);
                    }}
                    className={`flex-1 ${
                        collection === 'movies' ? 'underline' : ''
                    }`}
                />
                <Button
                    title="TV Series"
                    onClick={async (): Promise<void> => {
                        'use server';
                        redirect(`?collection=tvshows&listType=${listType}`);
                    }}
                    className={`flex-1 ${
                        collection === 'tvshows' ? 'underline' : ''
                    }`}
                />
            </div>
            <div className="container mx-auto mt-4 flex w-72 justify-center gap-6 align-middle">
                <Button
                    title="Popular"
                    onClick={async (): Promise<void> => {
                        'use server';
                        redirect(`/?collection=${collection}&listType=popular`);
                    }}
                    className={`flex-1 ${
                        listType === 'popular' ? 'underline' : ''
                    }`}
                />
                <Button
                    title="Now Playing"
                    onClick={async (): Promise<void> => {
                        'use server';
                        redirect(
                            `/?collection=${collection}&listType=nowPlaying`,
                        );
                    }}
                    className={`flex-1 ${
                        listType === 'nowPlaying' ? 'underline' : ''
                    }`}
                />
            </div>
        </>
    );
};
