"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
function useDidUpdateEffect(fn, deps) {
    var didMountRef = React.useRef(false);
    React.useEffect(function () {
        if (!didMountRef.current) {
            didMountRef.current = true;
            return;
        }
        return fn();
    }, deps);
}
exports.useDidUpdateEffect = useDidUpdateEffect;
