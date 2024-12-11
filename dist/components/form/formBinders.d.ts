import * as React from "react";
import { FormBinderBase } from "./formBinderBase";
import { IDataBinder, IFormBinder, IFormBinderInjector } from "./formCore";
import { IInputValueConverter, INumericOptions, IValueConverter } from "./formValueConverters";
import { IAutoCompleteOption, IAutoCompleteProps } from "./inputs/autoCompleteOptionHooks";
import { ICalendarInputProps } from "./inputs/calendarInput";
import { ICodeInputProps } from "./inputs/codeInput";
import { IDateInputProps } from "./inputs/dateInput";
import { ITagInputProps } from "./inputs/tagInput";
import { ITimeInputProps } from "./inputs/timeInput";
import { FormBinderKey, IArrayProp, IObjectProp, PropType } from "./propertyPathBuilder";
/** An input FormBinder that sets native 'value' and 'onChange: (e) => void' properties */
export declare class InputFormBinder<TDataPropValue, TComponentPropValue> extends FormBinderBase<React.DOMAttributes<{}>, TDataPropValue, TComponentPropValue> {
    setElementProperty(props: React.DOMAttributes<any>, dataBinder: IDataBinder<any>): void;
    protected getDefaultInputValue(): any;
    handleValueChanged(props: React.DOMAttributes<any>, dataBinder: IDataBinder<any>, notifyChanged: () => void): void;
}
export declare class SelectMultipleFormBinder<TDataProp> extends InputFormBinder<TDataProp, string[]> {
    constructor(dataPath: string, valueConverter?: IValueConverter<TDataProp, string[]>);
    setElementProperty(props: React.DOMAttributes<any>, dataBinder: IDataBinder<any>): void;
    handleValueChanged(props: React.DOMAttributes<any>, dataBinder: IDataBinder<any>, notifyChanged: () => void): void;
    private getSelectValues;
}
export declare class CheckboxFormBinder<TDataPropValue, TComponentPropValue> extends InputFormBinder<TDataPropValue, TComponentPropValue> {
    constructor(dataPath: string, valueConverter?: IValueConverter<TDataPropValue, TComponentPropValue>);
    protected getDefaultInputValue(): boolean;
}
/** A radio input FormBinder */
export declare class RadioFormBinder<TDataPropValue, TComponentPropValue> extends InputFormBinder<TDataPropValue, TComponentPropValue> {
    setElementProperty(props: React.DOMAttributes<any>, dataBinder: IDataBinder<any>): void;
}
export declare class RadioListFormBinder<TDataPropValue, TComponentPropValue> extends InputFormBinder<TDataPropValue, TComponentPropValue> {
    setElementProperty(props: React.DOMAttributes<any>, dataBinder: IDataBinder<any>): void;
}
export declare class DateInputFormBinder extends FormBinderBase<IDateInputProps, string, string> {
    constructor(dataPath: string);
    handleValueChanged(props: IDateInputProps, dataBinder: IDataBinder<any>, notifyChanged: () => void): void;
}
export declare class TimeInputFormBinder extends FormBinderBase<ITimeInputProps, string, string> {
    constructor(dataPath: string);
    static customValue(dataName: string): TimeInputFormBinder;
    handleValueChanged(props: ITimeInputProps, dataBinder: IDataBinder<any>, notifyChanged: () => void): void;
}
export declare class CalendarInputFormBinder extends FormBinderBase<ICalendarInputProps, string, string> {
    constructor(dataPath: string);
    static customValue(dataName: string): CalendarInputFormBinder;
    handleValueChanged(props: ICalendarInputProps, dataBinder: IDataBinder<any>, notifyChanged: () => void): void;
}
export declare class AutoCompleteMultiFormBinder implements IFormBinder<IAutoCompleteProps<IAutoCompleteOption[]>, any> {
    dataPath: string;
    private getItemFromId?;
    constructor(dataPath: string, getItemFromId?: (id: string) => IAutoCompleteOption);
    setElementProperty(props: IAutoCompleteProps<IAutoCompleteOption[]>, dataBinder: IDataBinder<any>): void;
    handleValueChanged(props: IAutoCompleteProps<IAutoCompleteOption[]>, dataBinder: IDataBinder<any>, notifyChanged: () => void): void;
}
export declare class AutoCompleteSingleFormBinder implements IFormBinder<IAutoCompleteProps<IAutoCompleteOption>, any> {
    dataPath: string;
    private getItemFromId?;
    constructor(dataPath: string, getItemFromId?: (id: string) => IAutoCompleteOption);
    setElementProperty(props: IAutoCompleteProps<IAutoCompleteOption>, dataBinder: IDataBinder<any>): void;
    handleValueChanged(props: IAutoCompleteProps<IAutoCompleteOption>, dataBinder: IDataBinder<any>, notifyChanged: () => void): void;
}
export declare class TagInputFormBinder implements IFormBinder<ITagInputProps, any> {
    dataPath: string;
    constructor(dataPath: string);
    setElementProperty(props: ITagInputProps, dataBinder: IDataBinder<any>): void;
    handleValueChanged(props: ITagInputProps, dataBinder: IDataBinder<any>, notifyChanged: () => void): void;
}
export declare class CodeInputFormBinder implements IFormBinder<ICodeInputProps, any> {
    dataPath: string;
    constructor(dataPath: string);
    setElementProperty(props: ICodeInputProps, dataBinder: IDataBinder<any>): void;
    handleValueChanged(props: ICodeInputProps, dataBinder: IDataBinder<any>, notifyChanged: () => void): void;
}
/** Form Binder helpers */
export declare class FormBinder<TDataBinder> {
    private parentPath?;
    constructor(parentPath?: string);
    createChildBinder<X>(dataName: (builder: PropType<TDataBinder>) => IObjectProp<X>): FormBinder<X>;
    createChildBinder<X>(dataName: (builder: PropType<TDataBinder>) => IArrayProp<X>): FormBinder<X[]>;
    createChildBinder<TKey extends Extract<keyof TDataBinder, string>>(dataName: TKey): FormBinder<TDataBinder[TKey]>;
    /** bind a custom form binder */
    custom<P>(formBinder: IFormBinder<P, any>): IFormBinderInjector<P>;
    /** Override the children of the React element - used for label binding */
    children<TValue, TProps = HTMLElement>(dataName: FormBinderKey<TDataBinder>, childrenFactory: (value: TValue, props?: TProps, dataBinder?: IDataBinder<any>) => React.ReactNode): IFormBinderInjector<TProps>;
    /** bind to a 'hidden' input */
    hidden<TDataPropValue>(dataName: FormBinderKey<TDataBinder>, valueConverter?: IInputValueConverter<TDataPropValue>): IFormBinderInjector<React.DOMAttributes<any>>;
    /** bind a string property to a 'password' input */
    password<TDataPropValue>(dataName: FormBinderKey<TDataBinder>, valueConverter?: IInputValueConverter<TDataPropValue>): IFormBinderInjector<React.DOMAttributes<any>>;
    /** bind a string property to a 'text' input */
    text<TDataPropValue>(dataName: FormBinderKey<TDataBinder>, valueConverter?: IInputValueConverter<TDataPropValue>): IFormBinderInjector<React.DOMAttributes<any>>;
    /** bind a string property to a 'email' input */
    textEmail<TDataPropValue>(dataName: FormBinderKey<TDataBinder>, valueConverter?: IInputValueConverter<TDataPropValue>): IFormBinderInjector<React.DOMAttributes<any>>;
    autoCompleteSingleInput(dataName: FormBinderKey<TDataBinder>, getItemFromId?: (id: string) => IAutoCompleteOption): IFormBinderInjector<IAutoCompleteProps<IAutoCompleteOption>>;
    autoCompleteMultiInput(dataName: FormBinderKey<TDataBinder>, getItemFromId?: (id: string) => IAutoCompleteOption): IFormBinderInjector<IAutoCompleteProps<IAutoCompleteOption[]>>;
    /** bind a 'value' string array property to a TagInput (e.g. ["cool", "guys", "only"]) */
    tagInput(dataName: FormBinderKey<TDataBinder>): IFormBinderInjector<ITagInputProps>;
    codeInput(dataName: FormBinderKey<TDataBinder>): IFormBinderInjector<ICodeInputProps>;
    /** bind a 'date' string property to a CalendarInput (e.g. YYYY-MM-DD) */
    calendarInput(dataName: FormBinderKey<TDataBinder>): IFormBinderInjector<ICalendarInputProps>;
    /** bind a 'date' string property to a DateInput (e.g. YYYY-MM-DD) */
    dateInput(dataName: FormBinderKey<TDataBinder>): IFormBinderInjector<IDateInputProps>;
    /** bind a 'time' string property to a TimeInput (e.g. HH:MM) */
    timeInput(dataName: FormBinderKey<TDataBinder>): IFormBinderInjector<ITimeInputProps>;
    private defaultInputFormBinder;
    /** bind a number property to a range */
    range(dataName: FormBinderKey<TDataBinder>, options?: INumericOptions): IFormBinderInjector<React.DOMAttributes<any>>;
    /** uncontrolled text input */
    defaultText<TDataPropValue>(dataName: FormBinderKey<TDataBinder>, valueConverter?: IInputValueConverter<TDataPropValue>): IFormBinderInjector<React.DOMAttributes<any>>;
    /** bind a number property to a 'text' input */
    textNumeric(dataName: FormBinderKey<TDataBinder>, options?: INumericOptions): IFormBinderInjector<React.DOMAttributes<any>>;
    /** bind a TDataPropValue property to a select */
    selectCustom<TDataPropValue>(dataName: FormBinderKey<TDataBinder>, valueConverter?: IInputValueConverter<TDataPropValue>): IFormBinderInjector<React.DOMAttributes<any>>;
    /** bind a string property to a select */
    select(dataName: FormBinderKey<TDataBinder>): IFormBinderInjector<React.DOMAttributes<any>>;
    /** bind a number property to a select */
    selectNumeric(dataName: FormBinderKey<TDataBinder>): IFormBinderInjector<React.DOMAttributes<any>>;
    /** bind a TDataPropValue[] property to a multi select */
    selectMultipleCustom<TDataPropValue>(dataName: FormBinderKey<TDataBinder>, valueConverter?: IValueConverter<TDataPropValue, string[]>): IFormBinderInjector<React.DOMAttributes<any>>;
    /** bind a string[] property to a multi select */
    selectMultiple(dataName: FormBinderKey<TDataBinder>): IFormBinderInjector<React.DOMAttributes<any>>;
    /** bind a number[] property to a multi select */
    selectMultipleNumeric(dataName: FormBinderKey<TDataBinder>): IFormBinderInjector<React.DOMAttributes<any>>;
    /** bind a TDataPropValue property to a 'checkbox' input */
    checkboxCustom<TDataPropValue>(dataName: FormBinderKey<TDataBinder>, valueConverter?: IValueConverter<TDataPropValue, boolean>): IFormBinderInjector<React.DOMAttributes<any>>;
    /** bind a boolean property to a 'checkbox' input */
    checkbox(dataName: FormBinderKey<TDataBinder>): IFormBinderInjector<React.DOMAttributes<any>>;
    /** bind a TDataPropValue property to a 'radio' input, using trueValue and falseValue equality testing */
    checkboxConvert<TDataPropValue>(dataName: FormBinderKey<TDataBinder>, trueValue: TDataPropValue, falseValue: TDataPropValue): IFormBinderInjector<React.DOMAttributes<any>>;
    /** bind a TDataPropValue property to a 'radio' input */
    radioCustom<TDataPropValue>(dataName: FormBinderKey<TDataBinder>, value: string, valueConverter: IInputValueConverter<TDataPropValue>): IFormBinderInjector<React.DOMAttributes<any>>;
    /** bind a string property to a 'radio' input */
    radio(dataName: FormBinderKey<TDataBinder>, value: string): IFormBinderInjector<React.DOMAttributes<any>>;
    /** bind a number property to a 'radio' input */
    radioNumeric(dataName: FormBinderKey<TDataBinder>, value: number): IFormBinderInjector<React.DOMAttributes<any>>;
    /** bind a TDataPropValue property to a 'radio' input */
    radioListCustom<TDataPropValue>(dataName: FormBinderKey<TDataBinder>, valueConverter: IInputValueConverter<TDataPropValue>): IFormBinderInjector<React.DOMAttributes<any>>;
    /** bind a string property to a 'radio' input */
    radioList(dataName: FormBinderKey<TDataBinder>): IFormBinderInjector<React.DOMAttributes<any>>;
    /** bind a number property to a 'radio' input */
    radioListNumeric(dataName: FormBinderKey<TDataBinder>): IFormBinderInjector<React.DOMAttributes<any>>;
}
