import * as React from "react";
import { IFormProps } from "./form";
import { FormBinder } from "./formBinders";
import { IDataBinder } from "./formCore";
import { IArrayProp, IObjectProp, PropType } from "./propertyPathBuilder";
export interface IUseParentForm<T> {
    bind: FormBinder<T>;
    DataForm: React.FunctionComponent<{}>;
}
export declare function createFormContext<TDataBinder>(): {
    Form: (props: {
        initialData: TDataBinder;
        withoutClone?: boolean;
        children: (value: IUseFormProps<TDataBinder>) => React.ReactNode;
    }) => JSX.Element;
    ChildForm: (props: {
        children: (value: IUseFormProps<TDataBinder>) => React.ReactNode;
    }) => JSX.Element;
};
declare type IHookFormProps<T> = Pick<IFormProps, Exclude<keyof IFormProps, "dataBinder" | "onDataBinderChange" | "onDataChanged">> & {
    onDataChanged?: (data?: T) => void;
};
export interface IUseFormProps<T> {
    dataBinder: IDataBinder<T>;
    bind: FormBinder<T>;
    notifyChange: () => void;
}
export interface IUseForm<T> extends IUseFormProps<T> {
    DataForm: React.FunctionComponent<IHookFormProps<T>>;
    context: UseFormContext<T>;
}
export declare class UseFormContext<TDataBinder> {
    useForm<X>(dataName: (builder: PropType<TDataBinder>) => IObjectProp<X>): IUseParentForm<X>;
    useForm<X>(dataName: (builder: PropType<TDataBinder>) => IArrayProp<X>): IUseParentForm<X[]>;
    useForm<TKey extends Extract<keyof TDataBinder, string>>(dataName: TKey): IUseParentForm<TDataBinder[TKey]>;
    useForm(): IUseParentForm<TDataBinder>;
}
export declare function useForm<T>(initialData: T, withoutClone?: boolean): IUseForm<T>;
export {};
