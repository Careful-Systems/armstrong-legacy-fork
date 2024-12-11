"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var React = require("react");
var useMedia_1 = require("../../hooks/useMedia");
var async_1 = require("../../utilities/async");
var utils_1 = require("../../utilities/utils");
var icon_1 = require("../display/icon");
var button_1 = require("../interaction/button");
var SidebarComponent = function (_a) {
    var openButtonIcon = _a.openButtonIcon, closeButtonIcon = _a.closeButtonIcon, onChange = _a.onChange, Content = _a.content, position = _a.position, transitionTime = _a.transitionTime, children = _a.children, openWidth = _a.openWidth, collaspedWidth = _a.collaspedWidth, autoCollapse = _a.autoCollapse, autoBurger = _a.autoBurger;
    var _b = React.useContext(SidebarContext), open = _b.isOpen, setOpen = _b.setOpen, setTransitioning = _b.setTransitioning, transitioning = _b.transitioning, close = _b.close;
    var sidebarContentRef = React.useRef();
    React.useEffect(function () {
        if (onChange) {
            onChange(open ? "open" : "closed");
        }
    }, [open]);
    var transition = React.useCallback(function () { return tslib_1.__awaiter(void 0, void 0, void 0, function () {
        return tslib_1.__generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    setTransitioning(true);
                    return [4 /*yield*/, async_1.delay(transitionTime)];
                case 1:
                    _a.sent();
                    setTransitioning(false);
                    return [2 /*return*/];
            }
        });
    }); }, [setTransitioning, transitionTime]);
    React.useEffect(function () {
        transition();
    }, [open, transitionTime]);
    React.useEffect(function () {
        if (autoCollapse || autoBurger) {
            setOpen(false);
        }
    }, [autoCollapse, autoBurger]);
    React.useEffect(function () {
        if (sidebarContentRef.current) {
            sidebarContentRef.current
                .querySelectorAll("a")
                .forEach(function (tag) { return tag.addEventListener("click", autoClose); });
        }
        return function () {
            if (sidebarContentRef.current) {
                sidebarContentRef.current
                    .querySelectorAll("a")
                    .forEach(function (tag) { return tag.removeEventListener("click", autoClose); });
            }
        };
    }, [sidebarContentRef, autoCollapse]);
    var autoClose = React.useCallback(function () {
        if (autoCollapse) {
            close();
        }
    }, [autoCollapse]);
    var width = React.useMemo(function () { return (open || autoBurger ? openWidth : collaspedWidth); }, [open, openWidth, collaspedWidth, autoBurger]);
    var wrapperStyle = React.useMemo(function () {
        if (!(autoCollapse || autoBurger)) {
            return position === "left"
                ? { paddingLeft: width }
                : { paddingRight: width };
        }
        else if (autoCollapse && !autoBurger) {
            return position === "left"
                ? { paddingLeft: collaspedWidth }
                : { paddingRight: collaspedWidth };
        }
        else {
            return {};
        }
    }, [width, autoCollapse, autoBurger, collaspedWidth]);
    return (React.createElement(React.Fragment, null,
        React.createElement("nav", { className: "armstrong-sidebar", "data-open": open, "data-position": position, "data-burger": autoBurger, style: { transition: transitionTime + "ms", width: width }, role: "navigation" },
            React.createElement(button_1.Button, { className: "armstrong-menu-button", onClick: function () { return setOpen(!open); }, "aria-label": (open ? "Close" : "Open") + " the sidebar" }, closeButtonIcon &&
                icon_1.getIconOrJsx(open ? closeButtonIcon : openButtonIcon, {
                    "aria-hidden": true
                })),
            React.createElement("div", { ref: sidebarContentRef, className: "armstrong-burger-content" }, utils_1.utils.object.isFunction(Content) ? (React.createElement(Content, { isOpen: autoBurger ? true : open })) : (Content))),
        autoBurger && (React.createElement(button_1.Button, { "data-position": position, className: "armstrong-menu-button open", onClick: function () { return setOpen(true); }, "aria-label": "Open the sidebar" }, closeButtonIcon &&
            icon_1.getIconOrJsx(openButtonIcon, { "aria-hidden": true }))),
        autoBurger && (React.createElement("div", { className: "armstrong-menu-overlay", onClick: function () { return setOpen(false); }, style: { transition: transitionTime + "ms" }, "data-transition": transitioning ? (open ? "in" : "out") : open ? "open" : "closed", "aria-label": "Close the sidebar", "aria-hidden": !open })),
        React.createElement("div", { className: "armstrong-site-content-wrapper", style: tslib_1.__assign(tslib_1.__assign({}, wrapperStyle), { transition: "padding " + transitionTime + "ms" }) }, children)));
};
var SidebarContext = React.createContext(undefined);
exports.Sidebar = function (props) {
    var autoCollapse = useMedia_1.useMedia(props.autoCollapseMediaQuery);
    var autoBurger = useMedia_1.useMedia(props.turnToBurgerMediaQuery);
    var _a = React.useState(autoCollapse || autoBurger ? false : props.openByDefault), isOpen = _a[0], setIsOpen = _a[1];
    var _b = React.useState(false), transitioning = _b[0], setTransitioning = _b[1];
    var toggle = React.useCallback(function () {
        setIsOpen(!isOpen);
    }, [isOpen]);
    var open = React.useCallback(function () {
        setIsOpen(true);
    }, []);
    var close = React.useCallback(function () {
        setIsOpen(false);
    }, []);
    return (React.createElement(SidebarContext.Provider, { value: {
            isOpen: isOpen,
            setOpen: setIsOpen,
            transitioning: transitioning,
            setTransitioning: setTransitioning,
            toggle: toggle,
            open: open,
            close: close
        } },
        React.createElement(SidebarComponent, tslib_1.__assign({}, props, { autoBurger: autoBurger, autoCollapse: autoCollapse }))));
};
exports.Sidebar.defaultProps = {
    openByDefault: true,
    position: "left",
    transitionTime: 300,
    openWidth: 250,
    collaspedWidth: 80,
    autoCollapseMediaQuery: "(max-width: 900px)",
    turnToBurgerMediaQuery: "(max-width: 500px)"
};
exports.useSidebar = function () {
    var _a = React.useContext(SidebarContext), toggle = _a.toggle, transitioning = _a.transitioning, open = _a.open, close = _a.close, isOpen = _a.isOpen;
    return { toggle: toggle, transitioning: transitioning, open: open, close: close, isOpen: isOpen };
};
