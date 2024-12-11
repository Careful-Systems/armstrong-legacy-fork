"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
function usePrevious(value) {
    var ref = React.useRef();
    React.useEffect(function () {
        ref.current = value;
    }, [value]);
    return ref.current;
}
exports.usePrevious = usePrevious;
