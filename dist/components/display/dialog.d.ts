import * as React from "react";
import { IconOrJsx } from "./icon";
export interface IDialogProps extends React.HTMLAttributes<HTMLElement> {
    /** The title of the dialog */
    title?: string;
    /** The element to use to wrap the title of the dialog */
    headerTagName?: keyof React.ReactHTML;
    /** default: '#host' - The selector of the element you'd like to inject the dialog into */
    bodySelector?: string;
    /** An additional class for the dialog layer, normally used for forcing higher z-index values  */
    layerClass?: string;
    /** Setting this to true or false will open or close the dialog */
    isOpen: boolean;
    /** The width of the dialog */
    width?: number;
    /** The height of the dialog */
    height?: number;
    /** Event to fire when the dialog is closed */
    onClose: () => void;
    /** Event to fire when the x button is clicked. Use this to confirm (double dialogs) */
    onXClicked?: () => void;
    /**  Controls wether the dialog closes when the background overlay is clicked */
    closeOnBackgroundClick?: boolean;
    /** icon or element to render as the close button */
    closeButton?: IconOrJsx;
}
export declare const Dialog: React.FC<IDialogProps>;
declare type DialogLayerCloseReason = "x-clicked" | "background" | "user";
export interface IDialogLayerPropsCore {
    title?: string;
    headerTagName?: keyof React.ReactHTML;
    layerClass?: string;
    className?: string;
    width?: number;
    height?: number;
    closeButton?: IconOrJsx;
}
export interface IDialogLayerProps extends IDialogLayerPropsCore {
    onClose: (e: DialogLayerCloseReason) => void;
}
export declare const DialogLayer: React.FC<IDialogLayerProps>;
export interface IDialogPresenterProps {
    title?: string;
    headerTagName?: keyof React.ReactHTML;
    className?: string;
    width?: number;
    height?: number;
    onClose: (e: React.MouseEvent<HTMLElement>) => void;
    closeButton?: IconOrJsx;
}
export declare const DialogPresenter: React.FC<IDialogPresenterProps>;
export interface IUseDialogProps {
    onClose: () => void;
}
export interface IUseDialogSettings extends IUsePortalSettings, IDialogLayerPropsCore {
    beforeDialogClose?: (reason: DialogLayerCloseReason) => Promise<boolean>;
}
export declare function useDialog(DialogLayerComponent: React.FC<IUseDialogProps>, settings?: IUseDialogSettings): {
    open: () => void;
    portal: React.ReactPortal;
};
export interface IUsePortalSettings {
    hostElement?: string;
    initiallyOpen?: boolean;
}
export interface IUsePortalProps {
    removeFromDOM: () => void;
}
export declare function usePortal(PortalComponent: React.FC<IUsePortalProps>, settings?: IUsePortalSettings): {
    open: () => void;
    portal: React.ReactPortal;
};
export {};
