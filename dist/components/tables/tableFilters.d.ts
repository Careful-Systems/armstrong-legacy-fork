import * as React from "react";
import { IFilter } from "./tableTypes";
export interface ITableFilters<T> {
    filters: IFilter[];
    onRemove: (key: keyof T, value: any) => void;
}
export declare function TableFilters<T>({ filters, onRemove, }: React.PropsWithChildren<ITableFilters<T>>): JSX.Element;
