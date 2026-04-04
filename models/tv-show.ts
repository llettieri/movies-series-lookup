import { Media } from '@/models/media';
import { Network } from '@/models/network';

interface TVShow extends Media {
    episodeCount: number;
    inProduction: boolean;
    lastAirDate: string | undefined;
    networks: Network[];
    seasons: ReducedTVShowSeason[];
    seasonsCount: number;
}

interface ReducedTVShowSeason extends Media {
    episodeCount: number;
    seasonNumber: number;
    showId: string;
    type: 'showSeason';
}

interface TVShowSeason extends ReducedTVShowSeason {
    episodes: Record<string, never>[];
    networks: Network[];
}

export type { TVShow, TVShowSeason, ReducedTVShowSeason };
