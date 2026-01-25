'use client';
import { Hero } from '@/components/hero';
import { SearchBar } from '@/components/search-bar';
import React, { ReactNode } from 'react';
import { SkeletonCardVerticalList } from '@/components/skeletons/skeleton-card-vertical-list';
import { useSearchParams } from 'next/navigation';

export default function SearchLoadingPage(): ReactNode {
    const searchParams = useSearchParams();
    const query = searchParams.get('query');

    return (
        <>
            <Hero />
            <SearchBar totalResults={undefined} />

            {query?.trim() && (
                <>
                    <div className="pt-2">
                        <SkeletonCardVerticalList title="Media results" />
                    </div>
                    <div className="pt-2">
                        <SkeletonCardVerticalList title="Person results" />
                    </div>
                </>
            )}
        </>
    );
}
