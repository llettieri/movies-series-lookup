import { Media } from '@/models/Media';
import { Network } from '@/models/Network';

export interface TVShow extends Media {
    networks: Network[];
    seasonsCount: number;
    episodeCount: number;
    lastAirDate: string | undefined;
    inProduction: boolean;
}
