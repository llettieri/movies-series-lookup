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
import { Network } from '@/models/network';
import { Job, Person } from '@/models/person';
import { Provider } from '@/models/provider';
import { TVShow } from '@/models/tv-show';
import { FALLBACK_IMAGE } from '@/components/image';
import { ItemType } from '@/models/base';

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
        homepage: dto.homepage,
        id: dto.id,
        logo: dto.logo_path,
        name: dto.name,
        type: 'network',
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
        overview: dto.overview,
        poster: dto.poster_path ?? FALLBACK_IMAGE,
        releaseDate: dto.release_date,
        runtime: dto.runtime,
        title: dto.title,
        type: 'movie',
    };
};

const parseTVShowDto = (dto: TVShowDto): TVShow => {
    return {
        averageVote: dto.vote_average * 10,
        backdrop: dto.backdrop_path ?? FALLBACK_IMAGE,
        collection: undefined,
        episodeCount: dto.number_of_episodes,
        genres: dto.genres,
        homepage: dto.homepage,
        id: dto.id,
        inProduction: dto.in_production,
        lastAirDate: dto.last_air_date ?? undefined,
        networks: dto.networks?.map(parseNetworkDto) ?? [],
        overview: dto.overview,
        poster: dto.poster_path ?? FALLBACK_IMAGE,
        releaseDate: dto.first_air_date,
        seasonsCount: dto.number_of_seasons,
        title: dto.name,
        type: 'tv',
    };
};

const parseCollectionDto = (dto: CollectionDto): Collection => {
    return {
        backdrop: dto.backdrop_path,
        id: dto.id,
        name: dto.name,
        overview: dto.overview,
        parts: dto.parts.map(parseMultiMediaDto),
        poster: dto.poster_path ?? FALLBACK_IMAGE,
        type: 'collection',
    };
};

const parseMultiMediaDto = (dto: MultiMediaDto): Media => {
    const type = dto.media_type as ItemType;
    return {
        averageVote: dto.vote_average * 10,
        backdrop: dto.backdrop_path ?? FALLBACK_IMAGE,
        collection: undefined,
        genres: [],
        homepage: '',
        id: dto.id,
        overview: dto.overview,
        poster: dto.poster_path ?? FALLBACK_IMAGE,
        releaseDate: dto.release_date ?? dto.first_air_date,
        runtime: undefined,
        title: dto.title ?? dto.name ?? '',
        type: type,
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
        type: 'person',
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
        displayPriority: dto.display_priority,
        id: dto.provider_id.toString(),
        logo: dto.logo_path,
        name: dto.provider_name,
        type: 'provider',
    };
};

const parseSearchItemDto = (dto: MultiMediaDto | PersonDto): Media | Person => {
    switch (dto.media_type) {
        case 'person':
            return parsePersonDto(dto as PersonDto);
        default:
            return parseMultiMediaDto(dto as MultiMediaDto);
    }
};

export {
    parseMovieDto,
    parseTVShowDto,
    parseCollectionDto,
    parseMultiMediaDto,
    parsePersonDto,
    parseCreditsDto,
    parseProviderDto,
    parseSearchItemDto,
};
