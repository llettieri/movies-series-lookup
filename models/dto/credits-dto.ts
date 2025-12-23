import { PersonDto } from '@/models/dto/person-dto';

export interface CreditsDto {
    cast: PersonDto[];
    crew: PersonDto[];
    id: string;
}
