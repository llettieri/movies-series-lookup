export enum Gender {
    UNDEFINED,
    FEMALE,
    MALE,
    NON_BINARY,
}

export interface Person {
    id: string;
    name: string;
    character: string;
    birthday: string;
    gender: Gender;
    biography: string;
    homepage: string;
    portrait?: string;
    deathday?: string;
    department?: string;
}
