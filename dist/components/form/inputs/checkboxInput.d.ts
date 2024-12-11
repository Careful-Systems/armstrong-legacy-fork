import * as React from "react";
export interface ICheckboxInput {
    focus: () => void;
    blur: () => void;
}
export interface ICheckboxInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    labelContent: React.ReactNode;
    label?: string;
}
export declare const CheckboxInput: React.ForwardRefExoticComponent<ICheckboxInputProps & React.RefAttributes<ICheckboxInput>>;
