import { PersonDto } from '@/models/dto/PersonDto';

export interface CreditsDto {
    cast: PersonDto[];
    crew: PersonDto[];
    id: string;
}
