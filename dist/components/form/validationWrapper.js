"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var React = require("react");
var classHelpers_1 = require("../../utilities/classHelpers");
exports.ValidationWrapper = function (props) {
    var message = props.message, validationMode = props.validationMode, className = props.className, children = props.children, attrs = tslib_1.__rest(props, ["message", "validationMode", "className", "children"]);
    return (React.createElement("div", tslib_1.__assign({}, attrs, { className: classHelpers_1.ClassHelpers.classNames(className, { "show-validation": (validationMode !== "none" && !!message) }), title: message }),
        children,
        React.createElement(exports.ValidationLabel, { message: message, mode: validationMode })));
};
exports.ValidationLabel = function (props) {
    var message = props.message, mode = props.mode, Wrapper = props.wrapper;
    if (!message || mode === "none") {
        return null;
    }
    var validationLabel = (React.createElement("label", { className: classHelpers_1.ClassHelpers.classNames(props.className, "validation-message", "validation-message-" + mode), title: message }, (mode === "both" || mode === "below") && message));
    if (Wrapper) {
        return React.createElement(Wrapper, null, validationLabel);
    }
    return validationLabel;
};
