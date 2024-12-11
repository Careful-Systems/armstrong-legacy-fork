import { IObjectUtils } from "../definitions";
export declare class UnderscoreObjectUtils implements IObjectUtils {
    keys(object: any): string[];
    isArray(object: any): object is any[];
    isString(object: any): object is string;
    isFunction(object: any): object is Function;
    isObject(object: any): boolean;
    isEqual(object: any, other: any): boolean;
    clone<T>(object: T): T;
    isNullOrUndefined(value: any): value is undefined | null;
    isUndefined(value: any): value is undefined;
    isNull(value: any): value is null;
}
