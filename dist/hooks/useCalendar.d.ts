import { DayOfWeek, IMonthValue } from "../utilities/definitions";
export interface IUseCalendarSettings {
    /**
     * The initial date to display the calendar for.
     * Must be in the 'format' specified
     * Defaults to 'selectedDate' or 'today' if not specified
     */
    seedDate?: string;
    /**
     * The initial selected date to display the calendar for.
     * Must be in the 'format' specified
     * Defaults to '' if not specified
     */
    selectedDate?: string;
    /**
     * The min date the calendar can select.
     * Must be in the 'format' specified
     */
    minDate?: string;
    /**
     * The max date the calendar can select.
     * Must be in the 'format' specified
     */
    maxDate?: string;
    /**
     * The format of the date (defaults to "YYYY-MM-DD").
     */
    format?: string;
    /**
     * The display format of the day date (defaults to "YYYY-MM-DD").
     */
    displayFormat?: string;
    /**
     * The day of week to start the calendar week.
     */
    beginOnDay?: DayOfWeek;
    /** Callback when date changes */
    onDateChanged?: (date: string) => void;
}
export interface IDay {
    /** The Day Of Week */
    dayOfWeek: DayOfWeek;
    /** The days date (in 'format' from settings ) */
    date: string;
    /** The days number (1...31) */
    dayNumber: number;
    /** The days display date (in 'format' from settings ) */
    display: string;
    /** Is this day today? */
    isToday?: boolean;
    /** Is this day the current selected one? */
    isCurrentDate?: boolean;
    /** Is this day within the current month? */
    isCurrentMonth?: boolean;
    /** Is this day outwith the 'min' and 'max' settings? */
    outOfRange?: boolean;
}
export interface IWeek {
    /** The days of the week */
    days: IDay[];
}
export interface IMonth extends IMonthValue {
    daysOfWeek: DayOfWeek[];
    /** The year number */
    year: number;
    /** The weeks of the month */
    weeks: IWeek[];
}
export interface IUseCalendar {
    /** The displaying month */
    month: IMonth;
    /** The selected date */
    selectedDate: string;
    /** The selected date in display format */
    selectedDateDisplay: string;
    /** Is the selected date valid (not empty and within 'min' and 'max' range from settings) */
    isSelectedDateValid: boolean;
    /** Move to the next month */
    nextMonth: () => void;
    /** Move to the previous month */
    previousMonth: () => void;
    /** Move to the next year */
    nextYear: () => void;
    /** Move to the previous year */
    previousYear: () => void;
    /** Move to the a specified date (using the 'format' specified in settings) */
    gotoDate: (newDate: string) => void;
    /** Move to and select the a specified date (using the 'format' specified in settings) */
    selectDate: (newDate: string) => void;
    /** Clears the selected date  */
    clearSelectedDate: () => void;
}
export declare function useCalendar(settings: IUseCalendarSettings): IUseCalendar;
