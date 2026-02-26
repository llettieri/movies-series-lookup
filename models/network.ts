import { Item } from '@/models/base';

export interface Network extends Item {
    name: string;
    logo: string;
    homepage?: string;
}
