import { ITimeParts, ITimeUtils } from "../definitions";
export declare class MomentTimeUtils implements ITimeUtils {
    getParts(time: string): ITimeParts;
    getMinutes(minuteStep?: number): number[];
    getHours(): number[];
}
