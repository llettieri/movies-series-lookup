import { Provider } from '@/models/Provider';

export interface CountryProviders {
    link: string;
    flatrate?: Provider[];
    buy?: Provider[];
    free?: Provider[];
}
