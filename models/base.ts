export type ItemType =
    | 'collection'
    | 'genre'
    | 'movie'
    | 'network'
    | 'person'
    | 'provider'
    | 'tv';

export interface Item {
    id: string;
    type: ItemType;
}
