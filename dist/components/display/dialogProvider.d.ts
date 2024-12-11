import * as React from "react";
import { IDialogLayerPropsCore } from "./dialog";
export declare const DialogProvider: React.FC<{}>;
export declare function useDialogProvider<TResult, TArg = void>(component: React.FC<IDialogProviderProps<TResult, TArg>>, settings?: IDialogSettings): (argument?: TArg) => Promise<TResult>;
export declare function useConfirmDialogProvider(component: React.FC<IDialogProviderProps<boolean>>, settings?: IDialogSettings): (argument?: void) => Promise<boolean>;
interface IDialogSettings extends IDialogLayerPropsCore {
    allowCloseOnBackgroundClick?: boolean;
}
export interface IDialogProviderProps<T, TArg = void> {
    close(): void;
    choose(data: T): void;
    argument?: TArg;
}
export {};
