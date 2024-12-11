"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var DataValidationMessage;
(function (DataValidationMessage) {
    var attributeName = "data-validation-message";
    function spread(message) {
        var _a;
        return _a = {}, _a[attributeName] = message, _a;
    }
    DataValidationMessage.spread = spread;
    function set(props, message) {
        props[attributeName] = message;
    }
    DataValidationMessage.set = set;
    function get(props) {
        return props[attributeName];
    }
    DataValidationMessage.get = get;
})(DataValidationMessage = exports.DataValidationMessage || (exports.DataValidationMessage = {}));
var DataValidationMode;
(function (DataValidationMode) {
    var attributeName = "data-validation-mode";
    function spread(mode) {
        var _a;
        return _a = {}, _a[attributeName] = mode, _a;
    }
    DataValidationMode.spread = spread;
    function set(props, mode) {
        props[attributeName] = mode;
    }
    DataValidationMode.set = set;
    function get(props) {
        return props[attributeName] || "none";
    }
    DataValidationMode.get = get;
})(DataValidationMode = exports.DataValidationMode || (exports.DataValidationMode = {}));
var FormBinderInjectorKey = "data-form-binder";
function getFormBinderFromInjector(injector) {
    return injector[FormBinderInjectorKey];
}
exports.getFormBinderFromInjector = getFormBinderFromInjector;
function updateFormBinderInjector(target, formBinder) {
    target[FormBinderInjectorKey] = formBinder;
    return target;
}
exports.updateFormBinderInjector = updateFormBinderInjector;
function getEventTargetAs(evt) {
    return evt.target;
}
exports.getEventTargetAs = getEventTargetAs;
