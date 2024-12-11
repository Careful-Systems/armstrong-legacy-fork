import * as React from "react";
import { TStepperDirection } from "../../hooks/useStepper";
import "./stepper.scss";
export interface IStepperProps {
    /** (TStepperDirection) Should the stepper be vertical or horizontal */
    direction: TStepperDirection;
}
export declare const Stepper: React.FunctionComponent<IStepperProps>;
export interface IStepProps {
    /** (JSX.Element) Custom Spacer Item */
    customSpacer?: JSX.Element;
    /** (boolean) Should there be a spacer */
    spacer?: boolean;
}
export declare const Step: React.FunctionComponent<IStepProps>;
interface IStepperSpacerProps {
    direction: TStepperDirection;
}
export declare const DefaultSpacer: React.FunctionComponent<IStepperSpacerProps>;
export {};
