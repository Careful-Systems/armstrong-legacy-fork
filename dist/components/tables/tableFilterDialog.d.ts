import * as React from "react";
import { IFilterParameters, TFilterAction } from ".";
export interface ITableFilters<T> {
    filterValues: Array<IFilterParameters<T>>;
    onClear: () => void;
    onUpdateFilter: (action: TFilterAction, key?: any, value?: React.ReactNode) => void;
}
export declare function TableFiltersDialog<T>({ filterValues, onClear, onUpdateFilter, }: ITableFilters<T>): JSX.Element;
