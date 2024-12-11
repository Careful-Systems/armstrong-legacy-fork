/**
 * Hook to add a mutation observer to an element by returning a react ref
 *
 * A mutation observer listens to the changes to the DOM structure of the children of the ref
 *
 * @param callback the callback to fire on mutation
 * @param options options to pass into the mutation observer
 */
export declare const useMutationObserver: (callback: MutationCallback, options: MutationObserverInit, ref: HTMLElement) => void;
