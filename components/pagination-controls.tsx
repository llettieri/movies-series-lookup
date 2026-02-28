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
import { ReactNode, use, useCallback, useMemo } from 'react';
import { useSearchParams } from 'next/navigation';
import useIsMobile from '@/hooks/use-is-mobile';

interface PaginationControlsProps {
    totalPagesPromise: Promise<number>;
}

const PaginationControls = ({
    totalPagesPromise,
}: PaginationControlsProps): ReactNode => {
    const totalPages = use<number>(totalPagesPromise);
    const searchParams = useSearchParams();
    const currentPage = Number(searchParams.get('page') ?? '1');
    const { isMobile } = useIsMobile();

    const buildLink = useCallback(
        (newPage: number) => {
            const newSearchParams = new URLSearchParams(searchParams);
            newSearchParams.set('page', String(newPage));
            return `?${newSearchParams.toString()}`;
        },
        [searchParams],
    );

    const maxVisible = useMemo(() => {
        if (isMobile) {
            return 3;
        }

        return 5;
    }, [isMobile]);

    // If there is only one page no need to display
    if (totalPages <= 1) {
        return null;
    }

    const renderPageNumbers = (): ReactNode[] => {
        const pageItems: ReactNode[] = [];

        let start = Math.max(1, currentPage - Math.floor(maxVisible / 2));
        const end = Math.min(totalPages, start + maxVisible - 1);

        if (end - start < maxVisible - 1)
            start = Math.max(1, end - maxVisible + 1);

        if (start > 1) {
            pageItems.push(
                <PaginationItem key="start">
                    <PaginationLink href={buildLink(1)}>1</PaginationLink>
                </PaginationItem>,
            );
            if (start > 2)
                pageItems.push(
                    <PaginationItem key="ellipsis-start">
                        <PaginationEllipsis />
                    </PaginationItem>,
                );
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

        if (end < totalPages) {
            if (end < totalPages - 1) {
                pageItems.push(
                    <PaginationItem key="ellipsis-end">
                        <PaginationEllipsis />
                    </PaginationItem>,
                );
            }

            pageItems.push(
                <PaginationItem key="end">
                    <PaginationLink href={buildLink(totalPages)}>
                        {totalPages}
                    </PaginationLink>
                </PaginationItem>,
            );
        }

        return pageItems;
    };

    return (
        <Pagination className="mt-8">
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
                            currentPage < totalPages
                                ? buildLink(currentPage + 1)
                                : '#'
                        }
                        aria-disabled={currentPage >= totalPages}
                    />
                </PaginationItem>
            </PaginationContent>
        </Pagination>
    );
};

export { PaginationControls };
