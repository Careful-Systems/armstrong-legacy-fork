"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
function useWillUnmountEffect(fn) {
    React.useEffect(function () { return fn; }, []);
}
exports.useWillUnmountEffect = useWillUnmountEffect;
