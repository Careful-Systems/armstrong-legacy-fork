import * as React from "react";
import { IconOrJsx } from "../../display/icon";
export interface ICalendarInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    /** The current date */
    date?: string;
    /** The 'wire' format of the date */
    format?: string;
    /** The 'display' format of the date (to use in the UI) */
    displayFormat?: string;
    /** The minimum date */
    min?: string;
    /** The maximum date */
    max?: string;
    /** Always show the calendar inline (not as a popup) */
    alwaysShowCalendar?: boolean;
    /** The icon to display */
    icon?: IconOrJsx;
    /** Is the control disabled */
    disabled?: boolean;
    /** Disable the ability to clear the current date */
    disableClear?: boolean;
    /** Callback when the selected date has changed */
    onDateChanged?: (date: string) => void;
    /** Adds a label above the input */
    label?: string;
}
export declare const CalendarInput: React.FC<ICalendarInputProps>;
