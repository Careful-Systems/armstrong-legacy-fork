import * as React from "react";
interface ICSSVariable {
    name: string;
    value: any;
    enabled?: boolean;
    priority?: string;
}
/** define a number of css variables on a dom element in a ref */
export declare const useCSSVariables: (variables: ICSSVariable[]) => React.MutableRefObject<any>;
export {};
