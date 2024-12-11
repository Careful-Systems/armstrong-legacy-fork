"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
/**
 * A hook to use a piece of state that lasts a certain time before running a callback and optionally returning back to its initial state
 * @param initialState The starting state
 * @param timeoutTime  The time for the change in state to last
 * @param callback The callback to run after the given time
 * @param reset Whether to reset back to inital state - true by default
 */
exports.useTemporaryState = function (initialState, timeoutTime, callback, reset) {
    if (reset === void 0) { reset = true; }
    var _a = React.useState(initialState), state = _a[0], setState = _a[1];
    var timeout = React.useRef(null);
    React.useEffect(function () {
        if (state) {
            timeout.current = window.setTimeout(function () {
                if (!!callback) {
                    callback();
                }
                if (reset) {
                    timeout.current = window.setTimeout(function () {
                        setState(initialState);
                    }, 50);
                }
            }, timeoutTime);
        }
    }, [state]);
    React.useEffect(function () {
        return function () { return window.clearTimeout(timeout.current); };
    }, []);
    return [state, setState];
};
