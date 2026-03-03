'use client';

import { Spinner } from '@/components/ui/spinner';
import { useIsMobile } from '@/hooks/use-is-mobile';
import { useRouter } from 'next/navigation';
import React, { ReactNode, useEffect, useRef, useState } from 'react';

const PULL_THRESHOLD = 80;
const MAX_PULL_DISTANCE = 120;
const MIN_REFRESH_VISIBLE_MS = 1500;

const INDICATOR_HIDDEN_Y = -60;
const INDICATOR_VISIBLE_Y = 16;

function usePullToRefresh(): { pullDistance: number; isRefreshing: boolean } {
    const router = useRouter();
    const { isMobile } = useIsMobile();
    const [isRefreshing, setIsRefreshing] = useState(false);
    const [pullDistance, setPullDistance] = useState(0);
    const pullDistanceRef = useRef(0);
    const startYRef = useRef(0);
    const pullingRef = useRef(false);
    const refreshTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

    useEffect(() => {
        if (!isMobile) return;

        const container = document.getElementById('scrollable-content');
        if (!container) return;

        const updatePullDistance = (dist: number): void => {
            pullDistanceRef.current = dist;
            setPullDistance(dist);
        };

        const onTouchStart = (e: TouchEvent): void => {
            if (container.scrollTop === 0) {
                startYRef.current = e.touches[0].clientY;
                pullingRef.current = true;
            }
        };

        const onTouchMove = (e: TouchEvent): void => {
            if (!pullingRef.current) return;

            const touch = e.touches[0];
            if (!touch) return;

            const delta = touch.clientY - startYRef.current;
            const scrollTop = container.scrollTop;

            if (delta > 0 && scrollTop === 0) {
                e.preventDefault();

                updatePullDistance(Math.min(delta, MAX_PULL_DISTANCE));
            } else if (delta <= 0) {
                pullingRef.current = false;

                updatePullDistance(0);
            }
        };

        const onTouchEnd = (): void => {
            if (!pullingRef.current) return;

            pullingRef.current = false;

            if (pullDistanceRef.current >= PULL_THRESHOLD) {
                router.refresh();
                setIsRefreshing(true);

                if (refreshTimerRef.current) {
                    clearTimeout(refreshTimerRef.current);
                }

                refreshTimerRef.current = setTimeout(
                    () => setIsRefreshing(false),
                    MIN_REFRESH_VISIBLE_MS,
                );
            }

            updatePullDistance(0);
        };

        container.addEventListener('touchstart', onTouchStart, {
            passive: true,
        });
        container.addEventListener('touchmove', onTouchMove, {
            passive: false,
        });
        container.addEventListener('touchend', onTouchEnd, { passive: true });

        return (): void => {
            container.removeEventListener('touchstart', onTouchStart);
            container.removeEventListener('touchmove', onTouchMove);
            container.removeEventListener('touchend', onTouchEnd);
            if (refreshTimerRef.current) clearTimeout(refreshTimerRef.current);
        };
    }, [router, isMobile]);

    return { pullDistance, isRefreshing };
}

export function PullToRefresh(): ReactNode {
    const { pullDistance, isRefreshing } = usePullToRefresh();

    if (pullDistance === 0 && !isRefreshing) return null;

    // Slides from INDICATOR_HIDDEN_Y (clipped by overflow-auto parent) to INDICATOR_VISIBLE_Y below the nav
    const progress = Math.min(pullDistance / MAX_PULL_DISTANCE, 1);
    const translateY = isRefreshing
        ? INDICATOR_VISIBLE_Y
        : INDICATOR_HIDDEN_Y +
          progress * (INDICATOR_VISIBLE_Y - INDICATOR_HIDDEN_Y);

    return (
        <div className="sticky top-0 z-50 flex h-0 justify-center">
            <div
                className="bg-primary flex size-14 items-center justify-center rounded-full p-2 shadow-md"
                style={{ transform: `translateY(${translateY}px)` }}
            >
                <Spinner className="size-14" />
            </div>
        </div>
    );
}
