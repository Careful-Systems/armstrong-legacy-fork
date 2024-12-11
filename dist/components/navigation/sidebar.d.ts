import * as React from "react";
import { IconOrJsx } from "../display/icon";
interface ISidebarContentProps {
    isOpen: boolean;
}
export interface ISidebarProps {
    /** Is the sidebar initally open */
    openByDefault?: boolean;
    /** Inner content of the sidebar */
    content: JSX.Element | React.FC<ISidebarContentProps>;
    /** Callback which passes the state of the sidebar */
    onChange?: (state: "open" | "closed") => void;
    /** Position of the sidebar */
    position?: "left" | "right";
    /** Icon for the open button */
    openButtonIcon: IconOrJsx;
    /** Icon for the close button */
    closeButtonIcon: IconOrJsx;
    /** How long the transition takes in ms */
    transitionTime?: number;
    /** Sidebar width when open */
    openWidth?: number;
    /** Sidebar width when closed */
    collaspedWidth?: number;
    /** A media query for when the sidebar should auto collapse */
    autoCollapseMediaQuery?: string;
    /** A media query for when the sidebar should turn into a burger menu (mobile) */
    turnToBurgerMediaQuery?: string;
}
export interface ISidebarContext {
    isOpen: boolean;
    setOpen: (open: boolean) => void;
    transitioning: boolean;
    setTransitioning: (transitioning: boolean) => void;
    open: () => void;
    close: () => void;
    toggle: () => void;
}
export declare const Sidebar: React.FC<ISidebarProps>;
export declare const useSidebar: () => {
    toggle: () => void;
    transitioning: boolean;
    open: () => void;
    close: () => void;
    isOpen: boolean;
};
export {};
