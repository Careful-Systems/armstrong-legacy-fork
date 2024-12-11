"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
/**
 * hook to add an event listener, and remove it when the component unmounts
 *
 * @param eventHandler the callback to run when the event fires
 * @param type the name of the event to listen to
 * @param element the element to add the listener to, defaults to window
 */
exports.useEventListener = function (type, eventHandler, element) {
    if (element === void 0) { element = typeof window === "undefined" ? null : window; }
    React.useEffect(function () {
        /// CHECK FOR SSR
        if (!!element) {
            element.addEventListener(type, eventHandler, { passive: true });
            return function () {
                element.removeEventListener(type, eventHandler);
            };
        }
    }, [eventHandler]);
};
