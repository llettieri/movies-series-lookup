import { Item } from '@/models/base';

export interface Provider extends Item {
    displayPriority: number;
    logo: string;
    name: string;
}
