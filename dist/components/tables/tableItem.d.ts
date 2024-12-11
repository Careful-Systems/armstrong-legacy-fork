import * as React from "react";
export interface ITableItem<T> {
    data: T;
    columnKeys: Array<keyof T>;
    columnFormatter?: {
        [P in keyof T]?: (value: T[P], row?: T) => React.ReactNode;
    };
    onClick?: (data: T) => void;
}
export declare function TableItem<T>({ data, columnFormatter, columnKeys, onClick, }: React.PropsWithChildren<ITableItem<T>>): JSX.Element;
