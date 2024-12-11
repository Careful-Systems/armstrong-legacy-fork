import * as React from "react";
import { IDataTableOptions, IFilter, IFilterParameters, ISortParameters, IUseDataTableSettings, TFilterAction, TSortDirection } from "../components/tables/tableTypes";
interface IUseDataTable<T> {
    currentPage: number;
    data: T[];
    downloadTableAsCSV: () => void;
    filters: IFilter[];
    filterList: Array<IFilterParameters<T>>;
    isLoading: boolean;
    options: IDataTableOptions<T>;
    printTable: (ref: HTMLTableElement) => void;
    setRowsPerPage: (newRowsPerPage: number) => void;
    setPage: (currentPage: number) => void;
    sortDataBy: (key: keyof T, direction: TSortDirection) => void;
    sortParameters: ISortParameters<T>;
    totalRows: number;
    totalPages: number;
    updateData: (newData: T[]) => void;
    updateFilter: (action: TFilterAction, key?: any, value?: React.ReactNode) => void;
}
export declare function useDataTable<T>({ data, fetch, options, }: IUseDataTableSettings<T>): IUseDataTable<T>;
export {};
