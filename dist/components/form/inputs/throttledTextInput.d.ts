import * as React from "react";
import { ITextInputProps } from "./textInput";
export declare type IThrottledTextInputProps = ITextInputProps & {
    /**(number) Amount of time to wait after the user has stopped typing before sending onChange */
    waitForMilliseconds?: number;
};
export declare const ThrottledTextInput: React.FC<IThrottledTextInputProps>;
