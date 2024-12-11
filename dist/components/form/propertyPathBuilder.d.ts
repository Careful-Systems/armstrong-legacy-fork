export declare type PropType<T> = T extends Array<(infer U)> ? IArrayProp<U> : IObjectProp<T>;
export interface IPathResolve {
    resolve(): string;
}
export interface IObjectProp<T> {
    prop<K extends Extract<keyof T, string>>(key: K): PropType<T[K]>;
}
export interface IArrayProp<T> {
    index(index: number): PropType<T>;
}
export declare type PropertyPathFor<T, X> = (builder: PropType<T>) => IObjectProp<X> | IArrayProp<X>;
export declare class PropertyPath {
    static for<T, X = any>(b: PropertyPathFor<T, X>): string;
}
export declare type FormBinderKey<T, X = any> = Extract<keyof T, string> | PropertyPathFor<T, X>;
export declare function toDataPath<T>(param: FormBinderKey<T>, parentPath?: string): string;
