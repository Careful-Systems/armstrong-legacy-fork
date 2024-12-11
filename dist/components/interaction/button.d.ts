import * as React from "react";
import { IconOrJsx } from "./../display/icon";
import { IDialogProviderProps } from "../display/dialogProvider";
export interface IButtonConfirmDialog {
    /** (string) Text to show in the body of the dialog - defaults to Are you sure? */
    content: string;
    /** (string) Content of the confirm button - defaults to confirm */
    confirmText?: string;
    /** (string) Content of the cancel button - defaults to cancel */
    cancelText?: string;
}
export declare type ButtonConfirmDialog = IButtonConfirmDialog | React.FC<IDialogProviderProps<boolean, void>>;
export declare const useButtonConfirmDialog: (config: ButtonConfirmDialog) => (argument?: void) => Promise<boolean>;
export interface IButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    /** (string) An icon to show on the left of the buttons content */
    leftIcon?: IconOrJsx;
    /** (string) An icon to show on the right of the buttons content */
    rightIcon?: IconOrJsx;
    /** (boolean) Wether or not the button should have rounded edges */
    rounded?: boolean;
    /** (boolean) If true, disables actions and puts button into a 'pending' state */
    pending?: boolean;
    /** (objct) If defined, will pop up a confirmation dialog - must be within a DialogProvider for this to work */
    confirmDialog?: boolean | ButtonConfirmDialog;
    /** (1 | 2 | 3) Level of danger of this button, displayed through colour. 1 is normal, 2 colours with $color-warning, and 3 colours with $color-negative */
    dangerLevel?: 1 | 2 | 3;
}
export interface IButton {
    focus: () => void;
    blur: () => void;
}
export declare const Button: React.ForwardRefExoticComponent<IButtonProps & React.RefAttributes<IButton>>;
