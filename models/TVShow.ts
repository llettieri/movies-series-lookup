import { Media } from '@/models/Media';
import { Network } from '@/models/Network';

export interface TVShow extends Media {
    name: string;
    first_air_date: string;
    networks: Network[];
    number_of_seasons: number;
}
