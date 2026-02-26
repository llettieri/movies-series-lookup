export type ItemType =
    | 'collection'
    | 'movie'
    | 'network'
    | 'person'
    | 'provider'
    | 'tv';

export interface Item {
    id: string;
    type: ItemType;
}
