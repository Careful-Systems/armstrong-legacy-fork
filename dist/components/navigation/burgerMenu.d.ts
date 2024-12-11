import * as React from "react";
import { IconOrJsx } from "../display/icon";
export interface IBurgerMenuProps {
    /** Inner content of the menu */
    content: JSX.Element;
    /** Does the menu come in over the top, or push the side */
    mode?: "push" | "slide";
    /** Callback which passes the state of the menu */
    onChange?: (state: "open" | "closed") => void;
    /** Position of the menu */
    position?: "left" | "right";
    /** Icon for the open button */
    openButtonIcon?: IconOrJsx;
    /** Icon for the close button */
    closeButtonIcon?: IconOrJsx;
    /** How long the transition takes in ms */
    transitionTime?: number;
    /** Hide the open button, so that you can put a custom button in */
    hideOpenButton?: boolean;
    /** Hide the close button, so that you can put a custom button in */
    hideCloseButton?: boolean;
    /** Auto closes the burger menu when navigating */
    closeOnNavigate?: boolean;
}
interface IBurgerMenuContext {
    isOpen: boolean;
    setIsOpen: (open: boolean) => void;
    transitioning: boolean;
    setTransitioning: (transitioning: boolean) => void;
    toggle: () => void;
    open: () => void;
    close: () => void;
}
export declare const BurgerMenuContext: React.Context<IBurgerMenuContext>;
export declare const BurgerMenu: React.FC<IBurgerMenuProps>;
export declare const useBurgerMenu: () => {
    toggle: () => void;
    transitioning: boolean;
    open: () => void;
    close: () => void;
    isOpen: boolean;
};
export {};
