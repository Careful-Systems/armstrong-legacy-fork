import * as React from "react";
export interface ICodeInput {
    focus: () => void;
    blur: () => void;
}
export interface ICodeInputProps extends React.HTMLAttributes<HTMLElement> {
    /** An array of lengths of each input in the code */
    lengthPerBox?: number[];
    /** Callback to fire when the value changes */
    onCodeChange?: (value: string | number) => void;
    /** Current value of the code */
    value?: string | number;
    /** A placeholder to display in each input */
    placeholder?: string;
    /** Render the value of the input as a password */
    hideValue?: boolean;
    /** Override the type property of the input elements (overrides hideValue prop) */
    type?: string;
    /** Restrict to numeric values */
    numeric?: boolean;
    /** Disable the inputs */
    readonly?: boolean;
    /** Automatically focus on the first input element */
    autoFocus?: boolean;
    /** Regex pattern to match on input */
    pattern?: string;
    /** Adds a label above the input */
    label?: string;
}
export declare const CodeInput: React.ForwardRefExoticComponent<ICodeInputProps & React.RefAttributes<ICodeInput>>;
