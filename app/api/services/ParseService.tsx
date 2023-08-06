import { routes } from '@/app/api/config/routes';
import { Collection } from '@/models/Collection';
import { CollectionDto } from '@/models/dto/CollectionDto';
import { MovieDto } from '@/models/dto/MovieDto';
import { MultiMediaDto } from '@/models/dto/MultiMediaDto';
import { PersonDto } from '@/models/dto/PersonDto';
import { Media } from '@/models/Media';
import { MediaType } from '@/models/MediaType';
import { Person } from '@/models/Person';

function parseMultiMediaDto(m: MultiMediaDto): Media {
    const type = m.media_type as MediaType;
    return {
        id: m.id,
        title: m.title ?? m.name ?? '',
        backdrop: m.backdrop_path
            ? `${routes.images}${m.backdrop_path}`
            : undefined,
        releaseDate: m.release_date,
        mediaType: type,
        poster: m.poster_path ? `${routes.images}${m.poster_path}` : undefined,
        overview: m.overview,
        runtime: undefined,
        collection: undefined,
        genres: [],
        homepage: '',
    };
}

function parseMovieDto(m: MovieDto): Media {
    return {
        backdrop: m.backdrop_path
            ? `${routes.images}${m.backdrop_path}`
            : undefined,
        collection: m.belongs_to_collection,
        genres: m.genres,
        homepage: m.homepage,
        id: m.id,
        mediaType: MediaType.MOVIE,
        overview: m.overview,
        poster: m.poster_path ? `${routes.images}${m.poster_path}` : undefined,
        releaseDate: m.release_date,
        runtime: m.runtime,
        title: m.title,
    };
}

function parseCollectionDto(collectionDto: CollectionDto): Collection {
    return {
        id: collectionDto.id,
        name: collectionDto.name,
        overview: collectionDto.overview,
        poster: collectionDto.poster_path
            ? `${routes.images}${collectionDto.poster_path}`
            : undefined,
        backdrop: collectionDto.backdrop_path
            ? `${routes.images}${collectionDto.backdrop_path}`
            : undefined,
        parts: collectionDto.parts.map(parseMultiMediaDto),
    };
}

function parsePersonDto(personDto: PersonDto): Person {
    return {
        id: personDto.id,
        name: personDto.name,
        birthday: personDto.birthday,
        portrait: personDto.profile_path
            ? `${routes.images}${personDto.profile_path}`
            : undefined,
        biography: personDto.biography,
        character: personDto.character,
        deathday: personDto.deathday,
        gender: personDto.gender,
        homepage: personDto.deathday,
        department: personDto.known_for_department,
    };
}

export {
    parseMovieDto,
    parsePersonDto,
    parseCollectionDto,
    parseMultiMediaDto,
};
