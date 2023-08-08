import { routes } from '@/app/api/config/routes';
import { Collection } from '@/models/Collection';
import { Credits } from '@/models/Credits';
import { CollectionDto } from '@/models/dto/CollectionDto';
import { CreditsDto } from '@/models/dto/CreditsDto';
import { MovieDto } from '@/models/dto/MovieDto';
import { MultiMediaDto } from '@/models/dto/MultiMediaDto';
import { JobDto, PersonDto, RoleDto } from '@/models/dto/PersonDto';
import { TVShowDto } from '@/models/dto/TVShowDto';
import { Media } from '@/models/Media';
import { MediaType } from '@/models/MediaType';
import { Job, Person } from '@/models/Person';
import { TVShow } from '@/models/TVShow';

function parseMovieDto(dto: MovieDto): Media {
    return {
        averageVote: dto.vote_average * 10,
        backdrop: dto.backdrop_path
            ? `${routes.images}${dto.backdrop_path}`
            : undefined,
        collection: dto.belongs_to_collection,
        genres: dto.genres,
        homepage: dto.homepage,
        id: dto.id,
        mediaType: MediaType.MOVIE,
        overview: dto.overview,
        poster: dto.poster_path
            ? `${routes.images}${dto.poster_path}`
            : undefined,
        releaseDate: dto.release_date,
        runtime: dto.runtime,
        title: dto.title,
    };
}

function parseTVShowDto(dto: TVShowDto): TVShow {
    return {
        averageVote: dto.vote_average * 10,
        backdrop: dto.backdrop_path
            ? `${routes.images}${dto.backdrop_path}`
            : undefined,
        collection: undefined,
        genres: dto.genres,
        homepage: dto.homepage,
        id: dto.id,
        mediaType: MediaType.TV,
        overview: dto.overview,
        poster: dto.poster_path
            ? `${routes.images}${dto.poster_path}`
            : undefined,
        releaseDate: dto.first_air_date,
        lastAirDate: dto.last_air_date ?? undefined,
        networks: dto.networks,
        seasonsCount: dto.number_of_seasons,
        inProduction: dto.in_production,
        episodeCount: dto.number_of_episodes,
        title: dto.name,
    };
}

function parseCollectionDto(dto: CollectionDto): Collection {
    return {
        id: dto.id,
        name: dto.name,
        overview: dto.overview,
        poster: dto.poster_path
            ? `${routes.images}${dto.poster_path}`
            : undefined,
        backdrop: dto.backdrop_path
            ? `${routes.images}${dto.backdrop_path}`
            : undefined,
        parts: dto.parts.map(parseMultiMediaDto),
    };
}

function parseMultiMediaDto(dto: MultiMediaDto): Media {
    const type = dto.media_type as MediaType;
    return {
        averageVote: dto.vote_average * 10,
        backdrop: dto.backdrop_path
            ? `${routes.images}${dto.backdrop_path}`
            : undefined,
        collection: undefined,
        genres: [],
        homepage: '',
        id: dto.id,
        mediaType: type,
        overview: dto.overview,
        poster: dto.poster_path
            ? `${routes.images}${dto.poster_path}`
            : undefined,
        releaseDate: dto.release_date,
        runtime: undefined,
        title: dto.title ?? dto.name ?? '',
    };
}

function parsePersonDto(dto: PersonDto): Person {
    return {
        biography: dto.biography,
        birthday: dto.birthday,
        roles: dto.character
            ? [{ name: dto.character, episodeCount: Number.NaN }]
            : dto.roles?.map(parseRoleDto),
        deathday: dto.deathday,
        gender: dto.gender,
        homepage: dto.deathday,
        id: dto.id,
        name: dto.name,
        portrait: dto.profile_path
            ? `${routes.images}${dto.profile_path}`
            : undefined,
        department: dto.known_for_department ?? dto.department,
        jobs: dto.job
            ? [{ name: dto.job, episodeCount: Number.NaN }]
            : dto.jobs?.map(parseJobDto),
    };
}

function parseCreditsDto(dto: CreditsDto): Credits {
    return {
        cast: dto.cast.map(parsePersonDto),
        crew: dto.crew.map(parsePersonDto),
    };
}

function parseRoleDto(dto: RoleDto): Job {
    return {
        name: dto.character,
        episodeCount: dto.episode_count,
    };
}

function parseJobDto(dto: JobDto): Job {
    return {
        name: dto.job,
        episodeCount: dto.episode_count,
    };
}

export {
    parseMovieDto,
    parseTVShowDto,
    parseCollectionDto,
    parseMultiMediaDto,
    parsePersonDto,
    parseCreditsDto,
};
