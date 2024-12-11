import * as React from "react";
import { IconOrJsx } from "./icon";
interface ISpinnerProps extends React.HTMLProps<HTMLDivElement> {
    reversed?: boolean;
    /** icon to be rendered if there are no children - defaults to icomoons spinner2 */
    icon?: IconOrJsx;
    fill?: boolean;
}
export declare const Spinner: React.FunctionComponent<ISpinnerProps>;
export {};
