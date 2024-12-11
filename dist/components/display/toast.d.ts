import * as React from "react";
import { IconOrJsx } from "../../";
export declare type DispatchToast = (...toast: IToastNotification[]) => void;
export declare type DismissToast = (index: number) => void;
export declare type ToastLocation = "top left" | "top right" | "bottom left" | "bottom right";
export declare type ToastType = "info" | "success" | "warning" | "error";
export interface IToastNotification {
    title?: string;
    message?: string;
    /** will be put into the toast notification as a data attribute, used to style different types of notifications IE alert / error */
    type: ToastType;
    /** amount of time for the notification to autodismiss - will not autodismiss if left undefined */
    autodismiss?: number;
    /** whether to allow the user to manually dismiss the toast with a close button rendered at the top right - defaults to true */
    allowManualDismiss?: boolean;
    /** method to run when user clicks on notification */
    onClick?: (e: React.MouseEvent<HTMLDivElement>, dismiss: () => void) => void;
    /** jsx to render inside the toast notification - can optionally pass down a function to access the dismiss function and the timestamp */
    content?: ((args: {
        /** method to dismiss this notification */
        dismiss?: () => void;
        /** unix timestamp at which the notification was dispatched */
        timestamp?: number;
    }) => JSX.Element) | JSX.Element;
    /** unix timestamp of when the notification is dispatched, will default to current time but can be overriden  */
    timestamp?: number;
    /** add an additionaly className to the toast notification, to allow for individual styling */
    className?: string;
    /** Area of the screen for this toast to render in - defaults to global settings value set in provider, or to top right if that's not set. */
    location?: ToastLocation;
}
export interface IGlobalToastSettings {
    /** Area of the screen for toasts to render in - can be overidden individually */
    location?: ToastLocation;
    /** jsx to render as a dismiss button on each toast - an icomoon cross by default */
    dismissButton?: IconOrJsx;
    /** Amount of time in ms for a toast to dismiss - used to transition toasts out  */
    dismissTime?: number;
    /** If true, hovering over a notification will cancel autodismiss until the cursor leaves again - true by default */
    disableAutodismissOnHover?: boolean;
    /** Render notifications in the provider component, disable if you want to manually render notifications if you don't want the default Armstrong notifications and want to consume the toasts context yourself - true by default */
    renderInProvider?: boolean;
    /** Query selector for the element to portal the toast container into - if left undefined, will default to rendering where the Toast Provider is places in the tree without creating a portal */
    hostElement?: string;
    /** Location to render the timestamp of a notification, set to false to not render timestamp at all — can alternatively be accessed in the content prop on a notification - below title by default */
    renderTimestamp?: "below title" | "below content" | false;
    /** Timestamp format as a moment format string — only relevant if renderTimestamp is not set to undefined */
    timestampFormat?: string;
    /** Whether to save all toast notifications to a history state that can be accessed from the hook - disabled by default (could be expanded to use localStorage at some point?) */
    saveHistory?: boolean;
}
export declare const ToastProvider: React.FC<IGlobalToastSettings>;
interface IUseToastReturn {
    /** dispatch a toast notification */
    dispatch: DispatchToast;
    /** dimiss a toast notification by its index */
    dismiss: DismissToast;
    /** dimiss all toast notifications */
    dismissAll: () => void;
    /** all the current toast notifications - use if they are to be rendered elsewhere */
    toasts: IToastNotification[];
    /** all previous toasts this session */
    toastsHistory: IToastNotification[];
    /** clears entire toast history */
    clearToastHistory: () => void;
}
/** Use toast notifications — returns a method that dispatches a toast notification to the ToastContext, which renders it in the ToastProvider component, as well as methods to dismiss notifications */
export declare const useToast: () => IUseToastReturn;
interface IToastProps extends IToastNotification {
    settings: IGlobalToastSettings;
    onDismiss: () => void;
}
export declare const Toast: React.FC<IToastProps>;
export {};
