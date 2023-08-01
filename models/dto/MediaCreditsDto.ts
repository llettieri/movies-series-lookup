export interface MediaCreditsDto<T> {
    id: string;
    crew: T[];
    cast: T[];
}
