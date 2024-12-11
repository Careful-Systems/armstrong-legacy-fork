export declare type TStepperDirection = "vertical" | "horizontal";
export interface IUseStepperProps {
    numberOfSteps: number;
    initialCurrentStep?: number;
}
export interface IUseStepper {
    canGoBack: boolean;
    currentStep: number;
    hasStepCompleted: (step: number) => boolean;
    isLastStep: (step: number) => boolean;
    lastStep: number | undefined;
    nextStep: number | undefined;
    onLastStep: boolean;
    setStep: (step: number, force?: boolean) => void;
}
export declare function useStepper({ numberOfSteps, initialCurrentStep, }: IUseStepperProps): IUseStepper;
