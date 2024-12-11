import { DayOfWeek, IDateParts, IDatePartUtils, IDateType, IDateUtils, IDayUtils, ILocaleUtils, IMonthUtils, IMonthValue, IYearUtils, UnitOfDate } from "../definitions";
export declare class MomentLocaleUtils implements ILocaleUtils {
    private localeSet;
    setLocale(locale: string): void;
    isLocaleSet(): boolean;
}
export declare class MomentYearUtils implements IYearUtils {
    generate(settings?: {
        range?: number;
        minDate?: string;
        maxDate?: string;
        dateFormat?: string;
    }): number[];
}
export declare class MomentDayUtils implements IDayUtils {
    getMonthYear(month: number, year: number, settings?: {
        minDate?: string;
        maxDate?: string;
        dateFormat?: string;
    }): number[];
    private static range1to;
    private static dayInMonth;
}
export declare class MomentDatePartUtils implements IDatePartUtils {
    equals(original: Partial<IDateParts>, newValue: Partial<IDateParts>): boolean;
    parse(date: string, settings?: {
        includeDate?: boolean;
        dateFormat?: string;
    }): IDateParts & {
        date?: string;
    };
    format(dateParts: Partial<IDateParts>, dateFormat?: string): string;
}
export declare class MomentMonthUtils implements IMonthUtils {
    getMonthsInYear(year: number, minDate: string, maxDate: string, dateFormat?: string): IMonthValue[];
    getMonthValue(dateType: IDateType): IMonthValue;
    getMonthValues(): IMonthValue[];
    private static getMonthValueNative;
}
export declare class MomentDateUtils implements IDateUtils {
    formats: {
        wireDate: string;
    };
    today(): IDateType;
    startOf(dateType: IDateType, unitOfTime: UnitOfDate): IDateType;
    isBefore(dateType: IDateType, minDate: IDateType, unitOfTime?: UnitOfDate): boolean;
    isAfter(dateType: IDateType, maxDate: IDateType, unitOfTime?: UnitOfDate): boolean;
    fallsWithinRange(dateType: IDateType, minDate: IDateType, maxDate: IDateType): boolean;
    parse(date: string, dateFormat: string): IDateType;
    static parse(date: string, dateFormat: string): IDateType;
    parseOrToday(date: string, formatString: string): IDateType;
    parseOrUndefined(date: string, formatString: string): IDateType | undefined;
    get(dateType: IDateType, unitOfTime: UnitOfDate): number;
    format(dateType: IDateType, formatString: string): string;
    formatOrEmpty(date: string, formatString: string): string;
    add(dateType: IDateType, increment: number, unitOfTime: UnitOfDate): IDateType;
    subtract(dateType: IDateType, increment: number, unitOfTime: UnitOfDate): IDateType;
    getDayOfWeek(dateType: IDateType): DayOfWeek;
    isDayOfWeek(dateType: IDateType, dayOfWeek: DayOfWeek): boolean;
}
