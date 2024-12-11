import { IArrayUtils } from "../definitions";
export declare class UnderscoreArrayUtils implements IArrayUtils {
    first<T>(items: T[], n: number): T[];
    find<T>(items: T[], func: (t: T, index: number) => boolean): T;
    each<T>(items: T[], func: (t: T, index: number) => void): void;
    every<T>(items: T[], func: (t: T, index: number) => boolean): boolean;
    some<T>(items: T[], func: (t: T, index: number) => boolean): boolean;
    filterByArray<T, K>(items: T[], filterItems: any[], filterKey: keyof T): T[];
    reduce<T, M>(items: T[], func: (memo: M, item: T, index: number) => M, memo: M): M;
    reject<T>(items: T[], func: (t: T, index: number) => boolean): T[];
    filter<T>(items: T[], func: (t: T, index: number) => boolean): T[];
    range(start: number, stop: number, step?: number, fill?: boolean): number[];
    getPage<T>(items: T[], pageNumber: number, pageSize: number): T[];
}
