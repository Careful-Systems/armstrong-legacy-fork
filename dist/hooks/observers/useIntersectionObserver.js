"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
/**
 * Use an intersection observer to fire the passed callback upon intersection - also cleans up on unmount
 * @param ref the html element to watch
 * @param callback the callback to be fired
 * @param options an intersection observer options object
 */
exports.useIntersectionObserver = function (ref, callback, options) {
    var io = React.useRef(null);
    React.useLayoutEffect(function () {
        if (!!ref && !!ref.current && typeof window !== "undefined" && "IntersectionObserver" in window) {
            io.current = new IntersectionObserver(function (entries, observer) {
                return callback && callback(entries[0].isIntersecting, entries, observer);
            }, options);
            io.current.observe(ref.current);
            return function () { return io.current.unobserve(ref.current); };
        }
    }, [ref]);
};
