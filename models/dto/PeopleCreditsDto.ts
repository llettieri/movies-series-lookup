import { Person } from '@/models/Person';

export interface PeopleCreditsDto {
    id: string;
    crew: Person[];
    cast: Person[];
}
