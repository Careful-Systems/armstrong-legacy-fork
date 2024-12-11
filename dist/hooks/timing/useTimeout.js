"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var useDidUpdateEffect_1 = require("../lifecycle/useDidUpdateEffect");
var useWillUnmountEffect_1 = require("../lifecycle/useWillUnmountEffect");
/**
 * Runs the callback after the given time in ms
 */
exports.useTimeout = function (
/** The callback to run after the given time */
callback, 
/** The time in ms to wait before running the callback */
time, 
/** Set to true to allow changes to the callback to be respected when it's executed (by default, the callback will be run as it is when runTimeout is called) */
updating) {
    if (updating === void 0) { updating = false; }
    var timeout = React.useRef();
    var _a = React.useState(false), resolved = _a[0], setResolved = _a[1];
    var clear = React.useCallback(function () {
        if (typeof window !== "undefined") {
            window.clearTimeout(timeout.current);
        }
        else {
            clearTimeout(timeout.current);
        }
    }, [timeout.current]);
    var set = React.useCallback(function () {
        if (updating) {
            if (typeof window !== "undefined") {
                timeout.current = window.setTimeout(function () { return setResolved(true); }, time);
            }
            else {
                timeout.current = setTimeout(function () { return setResolved(true); }, time);
            }
        }
        else {
            if (typeof window !== "undefined") {
                timeout.current = window.setTimeout(callback, time);
            }
            else {
                timeout.current = setTimeout(callback, time);
            }
        }
    }, [callback, time, updating]);
    useDidUpdateEffect_1.useDidUpdateEffect(function () {
        if (updating && resolved) {
            callback();
        }
    }, [resolved]);
    useWillUnmountEffect_1.useWillUnmountEffect(clear);
    return {
        /** clear the timeout, stopping it from executing */
        clear: clear,
        /** set the timeout callback */
        set: set,
    };
};
