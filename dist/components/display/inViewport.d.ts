import * as React from "react";
interface IInViewportChildrenArgs {
    element: React.MutableRefObject<any>;
    enteredViewport?: boolean;
}
interface IInViewportProps {
    IOProps?: IntersectionObserverInit;
    once?: boolean;
    onEnter?: (entry: IntersectionObserverEntry) => void;
    onExit?: (entry: IntersectionObserverEntry) => void;
    children: (props: IInViewportChildrenArgs) => any;
}
export declare const InViewport: React.FunctionComponent<IInViewportProps>;
export default InViewport;
