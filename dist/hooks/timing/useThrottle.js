"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
function useThrottle(value, limit, onValueChange) {
    var _a = React.useState(value), throttledValue = _a[0], setThrottledValue = _a[1];
    var lastRan = React.useRef(Date.now());
    React.useEffect(function () {
        var handler = setTimeout(function () {
            if (Date.now() - lastRan.current >= limit) {
                setThrottledValue(value);
                if (onValueChange) {
                    onValueChange(value);
                }
                lastRan.current = Date.now();
            }
        }, limit - (Date.now() - lastRan.current));
        return function () {
            clearTimeout(handler);
        };
    }, [value, limit]);
    return throttledValue;
}
exports.useThrottle = useThrottle;
