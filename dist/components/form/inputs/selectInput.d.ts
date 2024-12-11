import * as React from "react";
export interface ISelectInput {
    focus: () => void;
    blur: () => void;
}
export interface ISelectInputOption {
    id: number | string;
    name: string;
    data?: any;
}
export interface ISelectInputProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
    /** The options to select from */
    options: ISelectInputOption[];
    /** Fires when dropdown item is selected */
    onOptionChange?: (selected: ISelectInputOption) => void;
    /** The placeholder label when nothing is selected */
    optionLabel?: string;
    /** Turns a placeholder label on or off */
    enableOptionLabel?: boolean;
    /** Adds a label above the input */
    label?: string;
}
export declare const SelectInput: React.ForwardRefExoticComponent<ISelectInputProps & React.RefAttributes<ISelectInput>>;
