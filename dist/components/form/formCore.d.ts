import * as React from "react";
import { IArrayProp, IObjectProp, PropType } from "./propertyPathBuilder";
export declare type ValidationModes = "none" | "icon" | "below" | "both";
export declare namespace DataValidationMessage {
    function spread(message: string): {
        ["data-validation-message"]: string;
    };
    function set(props: any, message: string): void;
    function get(props: any): string;
}
export declare namespace DataValidationMode {
    function spread(mode: ValidationModes): {
        ["data-validation-mode"]: ValidationModes;
    };
    function set(props: any, mode: ValidationModes): void;
    function get(props: any): ValidationModes;
}
export interface IFormValidationResult {
    /** The attribute (dataPath) of the invalid entry */
    attribute: string;
    /** The validation message */
    message: string;
}
/**
 * Form Binder Core interface
 * The defintion of a form binder
 */
export interface IFormBinder<TComponentProps, TData> {
    /** The path used to bind to the data object */
    dataPath: string;
    /**
     * Augment the component props that will be applied to the forms child element being bound
     */
    setElementProperty(props: TComponentProps, dataBinder: IDataBinder<TData>, validationResults?: IFormValidationResult[]): void;
    /**
     * Add the value changed event handler, calling the supplied `notifyChanged` function when a change event has occurred
     */
    handleValueChanged(props: TComponentProps, dataBinder: IDataBinder<TData>, notifyChanged: () => void): void;
    /**
     * Override the children for the element
     */
    overrideChildren?(props: TComponentProps, dataBinder: IDataBinder<TData>): React.ReactNode;
    /**
     * An optional additional set of component props that allows consumers of your FormBinder to add, change or remove the properties that will be applied to the target element
     */
    extender?(props: TComponentProps, dataBinder: IDataBinder<TData>, notifyChanged: () => void): void;
}
/**
 * The Form Data Binder Core interface
 * Wraps access to the data being bound to the form.
 * This provides the bridge between the data source and the form elements
 */
export interface IDataBinder<T> {
    lastDataPathSet?: string;
    /** Gets a value for the key name (does NOT use dot notation) */
    getKeyValue<X>(dataName: (builder: PropType<T>) => IObjectProp<X>): X;
    getKeyValue<X>(dataName: (builder: PropType<T>) => IArrayProp<X>): X[];
    getKeyValue<TKey extends keyof T>(keyName: TKey): T[TKey];
    /** Sets a value for the key name (does NOT use dot notation) */
    setKeyValue<X>(dataName: (builder: PropType<T>) => IObjectProp<X>, value: X): void;
    setKeyValue<X>(dataName: (builder: PropType<T>) => IArrayProp<X>, value: X[]): void;
    setKeyValue<TKey extends keyof T>(keyName: TKey, value: T[TKey]): void;
    /** Gets a value for the data path (uses dot notation) */
    getValue(dataPath: string): any;
    /** Sets a value for the data path (uses dot notation) */
    setValue(dataPath: string, value: any): void;
    /** Gets the inner data as the native object */
    toJson(): T;
    createChildBinder<X>(dataName: (builder: PropType<T>) => IObjectProp<X>, autoSync?: boolean): IChildDataBinder<X>;
    createChildBinder<X>(dataName: (builder: PropType<T>) => IArrayProp<X>, autoSync?: boolean): IChildDataBinder<X[]>;
    createChildBinder<TKey extends keyof T>(keyName: TKey, autoSync?: boolean): IChildDataBinder<T[TKey]>;
}
export interface IChildDataBinder<T> extends IDataBinder<T> {
    sync(): void;
}
declare const FormBinderInjectorKey = "data-form-binder";
/** Used to inject properties onto React components to permit form binding */
export interface IFormBinderInjector<TComponentProps> {
    [FormBinderInjectorKey]: IFormBinder<TComponentProps, any>;
}
export declare function getFormBinderFromInjector<TComponentProps>(injector: IFormBinderInjector<TComponentProps>): IFormBinder<TComponentProps, any>;
export declare function updateFormBinderInjector<TComponentProps>(target: IFormBinderInjector<TComponentProps>, formBinder: IFormBinder<TComponentProps, any>): IFormBinderInjector<TComponentProps>;
export declare function getEventTargetAs<T extends HTMLElement>(evt: React.FormEvent<any>): T;
export {};
