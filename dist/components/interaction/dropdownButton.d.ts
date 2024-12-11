import * as React from "react";
import { IButtonProps } from './button';
interface IDropdownButtonOption {
    label: string | JSX.Element;
    onClick: () => void;
}
declare type BaseButtonProps = Omit<IButtonProps, 'onClick'>;
export interface IDropdownButtonProps extends BaseButtonProps {
    /** The options to show in the dropdown */
    options: IDropdownButtonOption[];
    /** Wether to show the dropdown menu pinned to the left or right of the button */
    alignment?: "left" | "right";
}
export interface IDropdownButton {
    focus: () => void;
    blur: () => void;
}
export declare const DropdownButton: React.ForwardRefExoticComponent<IDropdownButtonProps & React.RefAttributes<IDropdownButton>>;
export {};
