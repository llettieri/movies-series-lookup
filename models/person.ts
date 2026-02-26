import { Item } from '@/models/base';

export enum Gender {
    UNDEFINED,
    FEMALE,
    MALE,
    NON_BINARY,
}

export interface Job {
    name: string;
    episodeCount: number;
}

export interface Person extends Item {
    biography: string;
    birthday: string;
    deathday?: string;
    department?: string;
    gender: Gender;
    homepage?: string;
    jobs?: Job[];
    name: string;
    portrait: string;
    roles?: Job[];
    totalEpisodeCount?: number;
}
