import { MultiMediaDto } from '@/models/dto/MultiMediaDto';

export interface CollectionDto {
    id: string;
    name: string;
    overview: string;
    poster_path: string;
    backdrop_path: string;
    parts: MultiMediaDto[];
}
