import { Media } from '@/models/media';
import { Network } from '@/models/network';

export interface TVShow extends Media {
    networks: Network[];
    seasonsCount: number;
    episodeCount: number;
    lastAirDate: string | undefined;
    inProduction: boolean;
}
