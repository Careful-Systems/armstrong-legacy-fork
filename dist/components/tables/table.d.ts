import * as React from "react";
import { IPaginateButtonProps } from "./tablePagingation";
import { IDataTableOptions, IFilter, IFilterParameters, TFilterAction, TSortDirection } from "./tableTypes";
export interface ITableProps<T> {
    /** (React.ReactNode) Specify the formatting of the individual column, you have access to both the  */
    columnFormatter?: {
        [P in keyof T]?: (value: T[P], row?: T) => React.ReactNode;
    };
    /** (T[]) The data to display */
    data?: T[];
    /** (IFilter[]) The active filter list  */
    filters?: IFilter[];
    /** The filterable list */
    filterList?: Array<IFilterParameters<T>>;
    /** (React.ReactNode) Specify the formatting of the header column */
    headerFormatter: {
        [P in keyof T]?: (name: keyof T) => React.ReactNode;
    };
    /** (number) The number of pages of data */
    numberOfPages?: number;
    /** ((rows:number) => void) Event to fire when user changes the max number of items per page */
    onChangeRowsPerPage?: (rows: number) => void;
    /** ((pageNumber:number) => void) Event to fire when user changes the page number */
    onChangePage?: (pageNumber: number) => void;
    /** () => void Event to fire when user downloads the table */
    onDownload?: () => void;
    /** () => void Event to fire when user prints the table */
    onPrint?: (ref: HTMLTableElement) => void;
    /** ((key:keyof T, direction: TSortDirection) => void) Event to fire when user sorts the columns */
    onSortBy?: (key: keyof T, direction: TSortDirection) => void;
    /** () => void Event to fire when user filters the data by a column */
    onUpdateFilter?: (action: TFilterAction, key?: any, value?: React.ReactNode) => void;
    /** (options:IDataTableOptions) Options for the data table */
    options?: IDataTableOptions<T>;
    /** (component) Pagination Element  */
    paginationElement?: React.FC<IPaginateButtonProps>;
    /** (string) The sub or secondary title of the table */
    subTitle?: string;
    /** (string) The title of the table */
    title?: string;
}
export declare function Table<T = any>({ data, filters, filterList, columnFormatter, headerFormatter, numberOfPages, onChangeRowsPerPage, onChangePage, onDownload, onPrint, onSortBy, onUpdateFilter, options, paginationElement: PaginationElement, subTitle, title, }: React.PropsWithChildren<ITableProps<T>>): JSX.Element;
