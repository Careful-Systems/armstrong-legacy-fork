import * as React from "react";
export interface ITableItemDropdown {
    values: number[];
    onSelect: (itemCount: number) => void;
}
export declare const TableItemDropdown: React.FunctionComponent<ITableItemDropdown>;
