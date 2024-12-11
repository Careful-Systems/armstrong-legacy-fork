export declare type PageToken = string | number;
export interface IInfinitePagingResult<T> {
    data: T[];
    nextPageToken?: PageToken;
}
export declare type InfinitePagingKey<T> = keyof T | ((item: T) => string);
export interface IUseInfinitePagingSettings<T> {
    firstPageToken?: PageToken;
    onFetched?: (item: T[]) => void | Promise<void>;
    key: InfinitePagingKey<T>;
    initialItems?: T[];
    pageSize?: number;
    fetch(pageToken: PageToken): Promise<IInfinitePagingResult<T>>;
}
export declare function useInfinitePaging<T>(settings: IUseInfinitePagingSettings<T>): {
    items: T[];
    isFetching: boolean;
    fetchError: any;
    hasData: boolean;
    hasFinished: boolean;
    loadMore: () => Promise<void>;
    reload: () => Promise<void>;
    insert: (replacements: T[]) => void;
    remove: <K extends keyof T>(value: T[K]) => void;
};
