import * as React from "react";
export interface IRadioListInput {
    focus: () => void;
    blur: () => void;
}
export interface IRadioListInputOption {
    labelContent: React.ReactNode;
    value: string;
}
export interface IRadioListInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    options: IRadioListInputOption[];
}
export declare const RadioListInput: React.ForwardRefExoticComponent<IRadioListInputProps & React.RefAttributes<IRadioListInput>>;
