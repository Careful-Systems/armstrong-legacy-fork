"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
exports.useInterval = function (callback, interval) {
    var intervalRef = React.useRef();
    React.useEffect(function () {
        intervalRef.current = window.setInterval(callback, interval);
        return function () { return clearInterval(intervalRef.current); };
    }, [callback, interval]);
};
