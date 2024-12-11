import * as React from "react";
import { IconOrJsx } from "./../../display/icon";
export interface ITextInput {
    focus: () => void;
    blur: () => void;
    select: () => void;
}
export declare type ITextInputProps = (React.InputHTMLAttributes<HTMLInputElement | HTMLTextAreaElement> | React.TextareaHTMLAttributes<HTMLInputElement | HTMLTextAreaElement>) & {
    multiLine?: boolean;
    readonly?: boolean;
    rightOverlayText?: React.ReactNode;
    leftOverlayText?: React.ReactNode;
    type?: string;
    leftIcon?: IconOrJsx;
    rightIcon?: IconOrJsx;
    label?: string;
    componentDidMount?: (self: ITextInput) => void;
};
export declare const TextInput: React.ForwardRefExoticComponent<(React.InputHTMLAttributes<HTMLInputElement | HTMLTextAreaElement> & {
    multiLine?: boolean;
    readonly?: boolean;
    rightOverlayText?: React.ReactNode;
    leftOverlayText?: React.ReactNode;
    type?: string;
    leftIcon?: IconOrJsx;
    rightIcon?: IconOrJsx;
    label?: string;
    componentDidMount?: (self: ITextInput) => void;
} & React.RefAttributes<ITextInput>) | (React.TextareaHTMLAttributes<HTMLInputElement | HTMLTextAreaElement> & {
    multiLine?: boolean;
    readonly?: boolean;
    rightOverlayText?: React.ReactNode;
    leftOverlayText?: React.ReactNode;
    type?: string;
    leftIcon?: IconOrJsx;
    rightIcon?: IconOrJsx;
    label?: string;
    componentDidMount?: (self: ITextInput) => void;
} & React.RefAttributes<ITextInput>)>;
