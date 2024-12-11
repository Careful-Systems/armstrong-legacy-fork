import * as React from "react";
/**
 * A hook to use a piece of state that lasts a certain time before running a callback and optionally returning back to its initial state
 * @param initialState The starting state
 * @param timeoutTime  The time for the change in state to last
 * @param callback The callback to run after the given time
 * @param reset Whether to reset back to inital state - true by default
 */
export declare const useTemporaryState: <T>(initialState: T, timeoutTime: number, callback?: () => any, reset?: boolean) => [T, React.Dispatch<React.SetStateAction<T>>];
