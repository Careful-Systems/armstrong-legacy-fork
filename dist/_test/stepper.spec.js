"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var assert = require("assert");
var react_hooks_testing_library_1 = require("react-hooks-testing-library");
var useStepper_1 = require("../hooks/useStepper");
describe("useStepper", function () {
    it("Simple", function () { return tslib_1.__awaiter(void 0, void 0, void 0, function () {
        var steps, result;
        return tslib_1.__generator(this, function (_a) {
            steps = ["Stage 1", "Stage 2", "Stage 3"];
            result = react_hooks_testing_library_1.renderHook(function () {
                return useStepper_1.useStepper({
                    initialCurrentStep: 0,
                    numberOfSteps: 3,
                });
            }).result;
            assert(result.current.currentStep === 0, "Current Step should be equal to 0");
            react_hooks_testing_library_1.act(function () { return result.current.setStep(result.current.nextStep); });
            assert(result.current.currentStep === 0, "Current Step should be equal to 0, if setStep force not true");
            react_hooks_testing_library_1.act(function () { return result.current.setStep(result.current.nextStep, true); });
            assert(result.current.currentStep === 1, "Current Step should be equal to 1");
            react_hooks_testing_library_1.act(function () { return result.current.setStep(result.current.lastStep, true); });
            assert(result.current.currentStep === 0, "Current Step should be equal to 0");
            react_hooks_testing_library_1.act(function () { return result.current.setStep(2, true); });
            assert(result.current.currentStep === 2, "Current Step should be equal to 2");
            assert(result.current.isLastStep(result.current.currentStep) === true, "Should be on the last step");
            return [2 /*return*/];
        });
    }); });
});
