import * as React from "react";
export declare type DateParts = "day" | "month" | "year";
export interface IDateInputProps extends React.Props<typeof DateInput> {
    /** (string) CSS className property */
    className?: string;
    /** (number) The tab index of the first select */
    tabIndex?: number;
    /** (string) Date string in YYYY-MM-DD format */
    date?: string;
    /** (string) Min Date string in YYYY-MM-DD format */
    minDate?: string;
    /** (string) Max Date string in YYYY-MM-DD format */
    maxDate?: string;
    /** ((string) => void) Event which returns the date when it changes and is valid */
    onChange?: (date: string) => void;
    /** (number) How many years from the current year to display in the year dropdown */
    yearsFromNow?: number;
    /** (boolean) Should the picker disallow user interaction */
    disabled?: boolean;
    /** (string) The year label - default to `Year` */
    yearLabel?: string;
    /** (string) The month label - default to `Month` */
    monthLabel?: string;
    /** (string) The day label - default to `Day` */
    dayLabel?: string;
    /** Control date part order (`day`, `month`, `year`) */
    datePartOrder?: DateParts[];
    /** Autofocuses first input */
    autoFocus?: boolean;
    /** Adds a label above the input */
    label?: string;
}
export interface IDateInputState {
    day?: number;
    month?: number;
    year?: number;
    date?: string;
}
export declare const DateInput: React.FC<IDateInputProps>;
