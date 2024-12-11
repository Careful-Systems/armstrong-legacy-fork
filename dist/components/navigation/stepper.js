"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
require("./stepper.scss");
var StepperContent = React.createContext(undefined);
exports.Stepper = function (_a) {
    var children = _a.children, direction = _a.direction;
    return (React.createElement(StepperContent.Provider, { value: { direction: direction } },
        React.createElement("div", { className: "stepper", "data-direction": direction }, children)));
};
exports.Step = function (_a) {
    var children = _a.children, customSpacer = _a.customSpacer, spacer = _a.spacer;
    var ctx = React.useContext(StepperContent);
    return (React.createElement(React.Fragment, null,
        children,
        spacer ? (customSpacer ? (customSpacer) : (React.createElement(exports.DefaultSpacer, { direction: ctx.direction }))) : null));
};
exports.DefaultSpacer = function (_a) {
    var direction = _a.direction;
    return React.createElement("span", { className: "stepper-spacer", "data-direction": direction });
};
