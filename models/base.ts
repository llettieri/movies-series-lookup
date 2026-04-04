export type MediaItemType = 'movie' | 'show' | 'showSeason';

export type ItemType =
    | MediaItemType
    | 'collection'
    | 'genre'
    | 'network'
    | 'person'
    | 'provider';

export interface Item {
    id: string;
    type: ItemType;
}
