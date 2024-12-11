import * as React from "react";
export interface ITimeInputProps extends React.Props<typeof TimeInput> {
    /** (string) CSS className property */
    className?: string;
    /** (number) The tab index of the first select */
    tabIndex?: number;
    /** ((string) => void) Returns the time value when changed */
    onChange?: (time: string) => void;
    /** (string) The time value in HH:mm format */
    time?: string;
    /** (boolean) Should the picker disallow user interaction */
    disabled?: boolean;
    /** (number) Indicates the minute intervals to display */
    minuteStep?: number;
    /** (Func) Filter the available minutes */
    minuteFilter?(minutes: number[]): number[];
    /** (string) The hour label - default to `HH` */
    hourLabel?: string;
    /** (Func) Filter the available hours */
    hourFilter?(hours: number[]): number[];
    /** (string) The minute label - default to `MM` */
    minuteLabel?: string;
    /** (boolean) If true, when you select any hour, the minutes will be automatically set to 0 */
    zeroMinutesOnHourSelected?: boolean;
    /** Adds a label above the input */
    label?: string;
}
export interface ITimerInputState {
    hours?: number;
    minutes?: number;
}
export declare const TimeInput: React.FC<ITimeInputProps>;
