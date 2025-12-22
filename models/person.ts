/* eslint-disable no-unused-vars */

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

export interface Person {
    biography: string;
    birthday: string;
    deathday?: string;
    department?: string;
    gender: Gender;
    homepage?: string;
    id: string;
    jobs?: Job[];
    name: string;
    portrait?: string;
    roles?: Job[];
    totalEpisodeCount?: number;
}
