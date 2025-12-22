import { CountryProvidersDto } from '@/models/dto/country-providers-dto';

export interface WatchProvidersDto {
    id: string;
    results: Record<string, CountryProvidersDto>;
}
