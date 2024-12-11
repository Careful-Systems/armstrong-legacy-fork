"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
/** define a number of css variables on a dom element in a ref */
exports.useCSSVariables = function (variables) {
    var element = React.useRef(null);
    React.useEffect(function () {
        if (element.current) {
            variables.forEach(function (variable) {
                if ((variable.enabled || variable.enabled === undefined) &&
                    !!variable.value) {
                    element.current.style.setProperty(variable.name, variable.value, variable.priority);
                }
            });
        }
    }, [element, variables]);
    return element;
};
