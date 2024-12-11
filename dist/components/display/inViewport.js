"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var __1 = require("../..");
exports.InViewport = function (_a) {
    var once = _a.once, children = _a.children, IOProps = _a.IOProps, onEnter = _a.onEnter, onExit = _a.onExit;
    var _b = React.useState(false), enteredViewport = _b[0], setEnteredViewport = _b[1];
    var element = React.useRef(null);
    var intersectionCallback = React.useCallback(function (___, entries, io) {
        var entry = entries[0];
        if (entry.isIntersecting) {
            setEnteredViewport(true);
            if (once) {
                io.unobserve(element.current);
            }
            if (!!onEnter) {
                onEnter(entry);
            }
        }
        else {
            setEnteredViewport(false);
            if (!!onExit) {
                onExit(entry);
            }
        }
    }, [once, onEnter, onExit]);
    __1.useIntersectionObserver(element, intersectionCallback, IOProps);
    return children({ element: element, enteredViewport: enteredViewport });
};
exports.InViewport.defaultProps = {
    IOProps: {
        rootMargin: "-50px",
        threshold: 0.4
    },
    once: false
};
exports.default = exports.InViewport;
