import { CountryProvidersDto } from '@/models/dto/CountryProvidersDto';

export interface WatchProvidersDto {
    id: string;
    results: Record<string, CountryProvidersDto>;
}
