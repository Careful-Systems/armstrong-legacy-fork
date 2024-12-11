import * as React from "react";
import { FormBinder } from "./formBinders";
import { IDataBinder, IFormValidationResult, ValidationModes } from "./formCore";
export declare class FormDataClone {
    static json<T>(source: T): T;
    static custom<T>(source: T): T;
}
export declare function generateUniqueId(formatter?: (unique: string) => string): string;
export interface IFormCoreProps {
    /** The forms data binder instance, this contains the data that is used by bound form elements */
    dataBinder: IDataBinder<any>;
    /** An optional array of validation results - bound controls whose dataBinder dataPath matches an attribute will be annotated with a 'data-validation-message' and 'data-validation-mode' property */
    validationResults?: IFormValidationResult[];
    /** (string) How to display validation messages. 'icon' (default) shows a small exclamation symbol in the right of the field, 'below' shows the message below the field, while 'both' is a combination, and none hides all validation UI */
    validationMode?: ValidationModes;
}
export interface IFormProps extends React.FormHTMLAttributes<typeof Form>, IFormCoreProps {
    /** Called when bound form data changes: NOTE, this is called on every key stroke/interaction on any of the bound fields */
    onDataChanged?: (data?: any) => void;
    /** Called when bound form data changes: NOTE, this is called on every key stroke/interaction on any of the bound fields */
    onDataBinderChange?: (dataBinder: IDataBinder<any>) => void;
    /** (boolean) Automatically focus the first input (if it's empty) when the form is rendered */
    focusFirstEmptyInput?: boolean;
    /** (() => void) Allows custom submit handling */
    onSubmit?: () => void;
}
export interface IFormContext {
    /** The dataBinder of the Form */
    dataBinder: IDataBinder<any>;
    /** The core properties of the form */
    coreProps: IFormCoreProps;
    /** Notifies any change made to the bound form data */
    notifyChange: () => void;
    /** If the Form is nested inside another Form, the IFormContext of the parent Form */
    parent: IFormContext;
}
export declare function extractChildValidationResults(validationResults: IFormValidationResult[], dataPath: string): {
    attribute: string;
    message: string;
}[];
export declare const FormContext: React.Context<IFormContext>;
/**
 * A stateless data bindable form - state is held within the 'dataBinder' property
 * NOTE: This is designed to render all elements in the form on every change. This allows other participating elements to react to these changes
 * NOTE: This element provides a react context, this can be used to get access to the Forms dataBinder (or any parent Form dataBinder when nested)
 */
export declare function Form(props: IFormProps): JSX.Element;
export declare namespace Form {
    var Bind: FormBinder<any>;
    var jsonDataBinder: <T>(data: T) => IDataBinder<T>;
    var jsonDataBinderWithClone: <T>(data: T) => IDataBinder<T>;
}
export declare function ParentFormContext(props: {
    children: React.ReactNode;
}): any;
