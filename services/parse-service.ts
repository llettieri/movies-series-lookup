import { Collection } from '@/models/collection';
import { Credits } from '@/models/credits';
import { CollectionDto } from '@/models/dto/collection-dto';
import { CreditsDto } from '@/models/dto/credits-dto';
import { MovieDto } from '@/models/dto/movie-dto';
import { MultiMediaDto } from '@/models/dto/multi-media-dto';
import { NetworkDto } from '@/models/dto/network-dto';
import { JobDto, PersonDto, RoleDto } from '@/models/dto/person-dto';
import { ProviderDto } from '@/models/dto/provider-dto';
import { TVShowDto } from '@/models/dto/tv-show-dto';
import { Media } from '@/models/media';
import { MediaType } from '@/models/media-type';
import { Network } from '@/models/network';
import { Job, Person } from '@/models/person';
import { Provider } from '@/models/provider';
import { TVShow } from '@/models/tv-show';
import { FALLBACK_IMAGE } from '@/components/image';

const parseRoleDto = (dto: RoleDto): Job => {
    return {
        name: dto.character,
        episodeCount: dto.episode_count,
    };
};

const parseJobDto = (dto: JobDto): Job => {
    return {
        name: dto.job,
        episodeCount: dto.episode_count,
    };
};

const parseNetworkDto = (dto: NetworkDto): Network => {
    return {
        id: dto.id,
        name: dto.name,
        homepage: dto.homepage,
        logo: dto.logo_path,
    };
};

const parseMovieDto = (dto: MovieDto): Media => {
    return {
        averageVote: dto.vote_average * 10,
        backdrop: dto.backdrop_path ?? FALLBACK_IMAGE,
        collection: dto.belongs_to_collection,
        genres: dto.genres,
        homepage: dto.homepage,
        id: dto.id,
        mediaType: MediaType.MOVIE,
        overview: dto.overview,
        poster: dto.poster_path ?? FALLBACK_IMAGE,
        releaseDate: dto.release_date,
        runtime: dto.runtime,
        title: dto.title,
    };
};

const parseTVShowDto = (dto: TVShowDto): TVShow => {
    return {
        averageVote: dto.vote_average * 10,
        backdrop: dto.backdrop_path ?? FALLBACK_IMAGE,
        collection: undefined,
        genres: dto.genres,
        homepage: dto.homepage,
        id: dto.id,
        mediaType: MediaType.TV,
        overview: dto.overview,
        poster: dto.poster_path ?? FALLBACK_IMAGE,
        releaseDate: dto.first_air_date,
        lastAirDate: dto.last_air_date ?? undefined,
        networks: dto.networks?.map(parseNetworkDto) ?? [],
        seasonsCount: dto.number_of_seasons,
        inProduction: dto.in_production,
        episodeCount: dto.number_of_episodes,
        title: dto.name,
    };
};

const parseCollectionDto = (dto: CollectionDto): Collection => {
    return {
        id: dto.id,
        name: dto.name,
        overview: dto.overview,
        poster: dto.poster_path ?? FALLBACK_IMAGE,
        backdrop: dto.backdrop_path,
        parts: dto.parts.map(parseMultiMediaDto),
    };
};

const parseMultiMediaDto = (dto: MultiMediaDto): Media => {
    const type = dto.media_type as MediaType;
    return {
        averageVote: dto.vote_average * 10,
        backdrop: dto.backdrop_path ?? FALLBACK_IMAGE,
        collection: undefined,
        genres: [],
        homepage: '',
        id: dto.id,
        mediaType: type,
        overview: dto.overview,
        poster: dto.poster_path ?? FALLBACK_IMAGE,
        releaseDate: dto.release_date ?? dto.first_air_date,
        runtime: undefined,
        title: dto.title ?? dto.name ?? '',
    };
};

const parsePersonDto = (dto: PersonDto): Person => {
    return {
        biography: dto.biography,
        birthday: dto.birthday,
        roles: dto.character
            ? [{ name: dto.character, episodeCount: Number.NaN }]
            : dto.roles?.map(parseRoleDto),
        deathday: dto.deathday,
        gender: dto.gender,
        homepage: dto.homepage,
        id: dto.id,
        name: dto.name,
        portrait: dto.profile_path ?? FALLBACK_IMAGE,
        department: dto.known_for_department ?? dto.department,
        jobs: dto.job
            ? [{ name: dto.job, episodeCount: Number.NaN }]
            : dto.jobs?.map(parseJobDto),
    };
};

const parseCreditsDto = (dto: CreditsDto): Credits => {
    return {
        cast: dto.cast.map(parsePersonDto),
        crew: dto.crew.map(parsePersonDto),
    };
};

const parseProviderDto = (dto: ProviderDto): Provider => {
    return {
        id: dto.provider_id,
        displayPriority: dto.display_priority,
        name: dto.provider_name,
        logo: dto.logo_path,
    };
};

export {
    parseMovieDto,
    parseTVShowDto,
    parseCollectionDto,
    parseMultiMediaDto,
    parsePersonDto,
    parseCreditsDto,
    parseProviderDto,
};
