import * as React from "react";
import { TSortDirection } from "./tableTypes";
export interface ITableHeading<T> {
    name: keyof T;
    cell: (name: keyof T) => React.ReactNode;
    sortBy?: (header: keyof T, direction: TSortDirection) => void;
    initSort?: TSortDirection;
}
export declare function TableHeading<T>({ name, cell, sortBy, initSort, }: React.PropsWithChildren<ITableHeading<T>>): JSX.Element;
