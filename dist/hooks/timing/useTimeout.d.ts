/**
 * Runs the callback after the given time in ms
 */
export declare const useTimeout: (callback: () => void, time: number, updating?: boolean) => {
    /** clear the timeout, stopping it from executing */
    clear: () => void;
    /** set the timeout callback */
    set: () => void;
};
