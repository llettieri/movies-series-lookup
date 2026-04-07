export type MediaItemType =
    | 'movie'
    | 'show'
    | 'showSeason'
    | 'showSeasonEpisode';

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
