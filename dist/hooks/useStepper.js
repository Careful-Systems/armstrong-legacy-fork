"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
function useStepper(_a) {
    var numberOfSteps = _a.numberOfSteps, initialCurrentStep = _a.initialCurrentStep;
    var _b = React.useState(initialCurrentStep || 0), currentStep = _b[0], setCurrentStep = _b[1];
    var setStep = React.useCallback(function (step, force) {
        if (step < numberOfSteps && (force || step < currentStep)) {
            setCurrentStep(step);
        }
    }, [currentStep, numberOfSteps]);
    var hasStepCompleted = React.useCallback(function (step) {
        return step < currentStep;
    }, [currentStep]);
    var isLastStep = React.useCallback(function (step) {
        return step === numberOfSteps - 1;
    }, [currentStep]);
    var finalStep = numberOfSteps - 1;
    return {
        canGoBack: currentStep >= 1,
        currentStep: currentStep,
        hasStepCompleted: hasStepCompleted,
        isLastStep: isLastStep,
        lastStep: currentStep >= 1 ? currentStep - 1 : undefined,
        nextStep: currentStep < finalStep ? currentStep + 1 : undefined,
        onLastStep: currentStep === finalStep,
        setStep: setStep,
    };
}
exports.useStepper = useStepper;
