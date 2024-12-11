"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var React = require("react");
var textInput_1 = require("./textInput");
exports.ThrottledTextInput = function (props) {
    var value = props.value, onChange = props.onChange, waitForMilliseconds = props.waitForMilliseconds, root = tslib_1.__rest(props, ["value", "onChange", "waitForMilliseconds"]);
    var _a = React.useState(value), realValue = _a[0], setRealValue = _a[1];
    var onRootChange = React.useCallback(function (e) {
        setRealValue(e.currentTarget.value);
    }, [setRealValue]);
    var sendValue = React.useCallback(function () {
        if (realValue !== value) {
            onChange({ currentTarget: { value: realValue }, target: { value: realValue } });
        }
    }, [realValue, onChange]);
    React.useEffect(function () {
        if (realValue !== value) {
            var handler_1 = setTimeout(sendValue, waitForMilliseconds);
            return function () { return clearTimeout(handler_1); };
        }
        return function () { };
    }, [realValue]);
    React.useEffect(function () {
        setRealValue(value);
    }, [value]);
    return React.createElement(textInput_1.TextInput, tslib_1.__assign({ value: realValue, onChange: onRootChange }, root));
};
exports.ThrottledTextInput.defaultProps = {
    waitForMilliseconds: 500
};
