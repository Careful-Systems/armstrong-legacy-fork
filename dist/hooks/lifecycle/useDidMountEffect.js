"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
function useDidMountEffect(fn) {
    React.useEffect(fn, []);
}
exports.useDidMountEffect = useDidMountEffect;
