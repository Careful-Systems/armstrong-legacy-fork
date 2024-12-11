import * as React from "react";
import { IAutoCompleteOption, IAutoCompleteProps } from "./autoCompleteOptionHooks";
export declare type IAutoCompleteSelectProps<TMulti extends "single" | "multiple", TOption> = {
    multiSelect: TMulti;
} & IAutoCompleteProps<TOption>;
export declare const AutoCompleteInput: React.FunctionComponent<IAutoCompleteSelectProps<"single", IAutoCompleteOption> | IAutoCompleteSelectProps<"multiple", IAutoCompleteOption[]>>;
