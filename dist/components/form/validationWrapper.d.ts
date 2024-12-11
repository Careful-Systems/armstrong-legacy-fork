import * as React from "react";
import { HTMLAttributes } from "react";
import { ValidationModes } from "./formCore";
export declare const ValidationWrapper: React.FC<{
    message: string;
} & HTMLAttributes<HTMLDivElement> & {
    validationMode?: ValidationModes;
}>;
export declare const ValidationLabel: React.FC<{
    className?: string;
    message: string;
    mode: ValidationModes;
    wrapper?: React.StatelessComponent<{}>;
}>;
