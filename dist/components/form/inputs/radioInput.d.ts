import * as React from "react";
export interface IRadioInput {
    focus: () => void;
    blur: () => void;
}
export interface IRadioInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    labelContent: React.ReactNode;
}
export declare const RadioInput: React.ForwardRefExoticComponent<IRadioInputProps & React.RefAttributes<IRadioInput>>;
