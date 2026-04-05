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

interface TVShowSeason extends ReducedTVShowSeason {
    episodes: TVShowSeasonEpisode[];
    networks: Network[];
}

interface ReducedTVShowSeason extends Media {
    episodeCount: number;
    seasonNumber: number;
    showId: string;
    type: 'showSeason';
}

interface TVShowSeasonEpisode extends Media {
    episodeNumber: number;
    seasonNumber: number;
    episodeType: string;
    showId: string;
}

export type { TVShow, TVShowSeason, ReducedTVShowSeason, TVShowSeasonEpisode };
