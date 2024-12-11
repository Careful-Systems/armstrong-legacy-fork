"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
/**
 * Hook to add a mutation observer to an element by returning a react ref
 *
 * A mutation observer listens to the changes to the DOM structure of the children of the ref
 *
 * @param callback the callback to fire on mutation
 * @param options options to pass into the mutation observer
 */
exports.useMutationObserver = function (callback, options, ref) {
    // const ref = React.useRef<HTMLElement & HTMLDivElement>(null)
    var mutationObserver = React.useRef(null);
    React.useLayoutEffect(function () {
        mutationObserver.current = new MutationObserver(callback);
        if (ref) {
            mutationObserver.current.observe(ref, options);
        }
        return function () { return ref && mutationObserver.current.disconnect(); };
    }, [ref, callback, options]);
};
