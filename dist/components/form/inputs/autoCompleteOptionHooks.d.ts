import * as React from "react";
import { IconOrJsx } from "../../..";
export interface IAutoCompleteOption {
    id: number | string;
    name: string;
    data?: any;
    className?: string;
    style?: React.CSSProperties;
    prefixElement?: React.ReactNode;
}
export interface IUseOptionsConfig {
    emptyOnLoad?: boolean;
}
export declare function useOptions(allOptions: IAutoCompleteOption[], config?: IUseOptionsConfig): {
    options: IAutoCompleteOption[];
    filter: string;
    setFilter: (query: string) => void;
};
export declare function useRemoteOptions(remoteQuery?: (query: string) => Promise<IAutoCompleteOption[]>): {
    options: IAutoCompleteOption[];
    filter: string;
    setFilter: React.Dispatch<React.SetStateAction<string>>;
};
export interface IAutoCompleteProps<TValue> {
    disabled?: boolean;
    hasGoButton?: boolean;
    goButtonContent?: React.ReactNode;
    canClear?: boolean;
    className?: string;
    isSearching?: boolean;
    filter: string;
    onFilterChange: (v: string) => void;
    options: IAutoCompleteOption[];
    value?: TValue;
    onValueChange?: (o: TValue, changedItem?: IAutoCompleteOption, changeType?: 'add' | 'remove') => void;
    placeholder?: string;
    visibleItems?: number;
    noResultsMessage?: string;
    leftIcon?: IconOrJsx;
}
