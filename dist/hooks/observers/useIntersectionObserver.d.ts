import * as React from "react";
/**
 * Use an intersection observer to fire the passed callback upon intersection - also cleans up on unmount
 * @param ref the html element to watch
 * @param callback the callback to be fired
 * @param options an intersection observer options object
 */
export declare const useIntersectionObserver: (ref: React.MutableRefObject<HTMLElement>, callback: (isIntersecting: boolean, entries: IntersectionObserverEntry[], io: IntersectionObserver) => any, options?: IntersectionObserverInit) => void;
