'use client';
import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from '@/components/ui/pagination';
import { ReactNode, useCallback } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';

interface PaginateResultsProps {
    pages: number;
}

const PaginateResults = ({ pages }: PaginateResultsProps): ReactNode => {
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const currentPage = Number(searchParams.get('page') ?? '1');

    const buildLink = useCallback(
        (newPage: number) => {
            const newSearchParams = new URLSearchParams(searchParams);
            newSearchParams.set('page', String(newPage));
            return `${pathname}?${newSearchParams.toString()}`;
        },
        [searchParams, pathname],
    );

    // If there is only one page no need to display
    if (pages <= 1) {
        return null;
    }

    const renderPageNumbers = (): ReactNode[] => {
        const pageItems: ReactNode[] = [];
        const maxVisible = 5;

        let start = Math.max(1, currentPage - Math.floor(maxVisible / 2));
        const end = Math.min(pages, start + maxVisible - 1);

        if (end - start < maxVisible - 1)
            start = Math.max(1, end - maxVisible + 1);

        if (start > 1) {
            pageItems.push(
                <PaginationItem key="start">
                    <PaginationLink href={buildLink(1)}>1</PaginationLink>
                </PaginationItem>,
            );
            if (start > 2)
                pageItems.push(<PaginationEllipsis key="ellipsis-start" />);
        }

        for (let i = start; i <= end; i++) {
            pageItems.push(
                <PaginationItem key={i}>
                    <PaginationLink
                        href={buildLink(i)}
                        isActive={i === currentPage}
                    >
                        {i}
                    </PaginationLink>
                </PaginationItem>,
            );
        }

        if (end < pages) {
            if (end < pages - 1)
                pageItems.push(<PaginationEllipsis key="ellipsis-end" />);
            pageItems.push(
                <PaginationItem key="end">
                    <PaginationLink href={buildLink(pages)}>
                        {pages}
                    </PaginationLink>
                </PaginationItem>,
            );
        }

        return pageItems;
    };

    return (
        <Pagination>
            <PaginationContent>
                <PaginationItem>
                    <PaginationPrevious
                        href={
                            currentPage > 1 ? buildLink(currentPage - 1) : '#'
                        }
                        aria-disabled={currentPage <= 1}
                    />
                </PaginationItem>
                {renderPageNumbers()}
                <PaginationItem>
                    <PaginationNext
                        href={
                            currentPage < pages
                                ? buildLink(currentPage + 1)
                                : '#'
                        }
                        aria-disabled={currentPage >= pages}
                    />
                </PaginationItem>
            </PaginationContent>
        </Pagination>
    );
};

export { PaginateResults };
