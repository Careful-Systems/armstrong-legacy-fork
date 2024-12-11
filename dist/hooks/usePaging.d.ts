export interface IPagingResult<T> {
    data: T[];
    totalRecords: number;
}
export interface IUsePagingSettings<T> {
    fetch(page: number, pageSize: number): Promise<IPagingResult<T>>;
    pageSize: number;
}
export declare function usePaging<T>(settings: IUsePagingSettings<T>): {
    items: T[];
    totalPages: number;
    totalRecords: number;
    currentPage: number;
    isFetching: boolean;
    fetchError: any;
    hasData: boolean;
    gotoPage: (page: number) => void;
    reload: () => void;
};
