import { ProviderDto } from '@/models/dto/ProviderDto';

export interface CountryProvidersDto {
    link: string;
    flatrate?: ProviderDto[];
    buy?: ProviderDto[];
    free?: ProviderDto[];
}
