export interface JobDto {
    job: string;
    episode_count: number;
}

export interface RoleDto {
    character: string;
    episode_count: number;
}

export interface PersonDto {
    biography: string;
    birthday: string;
    character: string;
    deathday: string;
    department?: string;
    gender: number;
    homepage: string;
    id: string;
    job?: string;
    jobs?: JobDto[];
    known_for_department?: string;
    media_type?: string;
    name: string;
    profile_path?: string;
    roles?: RoleDto[];
    total_episode_count: number;
}
