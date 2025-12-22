import { ProviderDto } from '@/models/dto/provider-dto';

export interface CountryProvidersDto {
    link: string;
    flatrate?: ProviderDto[];
    buy?: ProviderDto[];
    free?: ProviderDto[];
}
