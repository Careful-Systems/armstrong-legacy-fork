"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var React = require("react");
var async_1 = require("../../utilities/async");
var icon_1 = require("../display/icon");
var button_1 = require("../interaction/button");
var BurgerMenuComponent = function (_a) {
    var openButtonIcon = _a.openButtonIcon, closeButtonIcon = _a.closeButtonIcon, onChange = _a.onChange, Content = _a.content, position = _a.position, mode = _a.mode, transitionTime = _a.transitionTime, children = _a.children, hideOpenButton = _a.hideOpenButton, hideCloseButton = _a.hideCloseButton, closeOnNavigate = _a.closeOnNavigate;
    var _b = React.useContext(exports.BurgerMenuContext), isOpen = _b.isOpen, setIsOpen = _b.setIsOpen, transitioning = _b.transitioning, setTransitioning = _b.setTransitioning;
    var _c = React.useState(0), menuWidth = _c[0], setMenuWidth = _c[1];
    var menuRef = React.useRef();
    var menuContentRef = React.useRef();
    React.useEffect(function () {
        if (menuContentRef.current && closeOnNavigate) {
            menuContentRef.current
                .querySelectorAll("a")
                .forEach(function (tag) { return tag.addEventListener("click", close); });
        }
        return function () {
            if (menuContentRef.current && closeOnNavigate) {
                menuContentRef.current
                    .querySelectorAll("a")
                    .forEach(function (tag) { return tag.removeEventListener("click", close); });
            }
        };
    }, [menuContentRef]);
    var close = React.useCallback(function () {
        setIsOpen(false);
    }, []);
    React.useEffect(function () {
        if (onChange) {
            onChange(isOpen ? "open" : "closed");
        }
    }, [isOpen]);
    React.useEffect(function () {
        if (menuRef.current) {
            setMenuWidth(menuRef.current.clientWidth);
        }
    }, [menuRef]);
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
    }, [isOpen, transitionTime]);
    var slideTransform = React.useMemo(function () {
        return mode === "push"
            ? {
                transform: isOpen
                    ? "translateX(" + (position === "left" ? menuWidth : -menuWidth) + "px)"
                    : "translateX(0)"
            }
            : {};
    }, [menuWidth, isOpen, mode]);
    return (React.createElement(React.Fragment, null,
        React.createElement("nav", { className: "armstrong-menu", ref: menuRef, "data-open": isOpen, "data-position": position, "data-mode": mode, style: { transition: transitionTime + "ms" }, role: "navigation" },
            !hideCloseButton && (React.createElement(button_1.Button, { className: "armstrong-menu-button close", onClick: function () { return setIsOpen(false); }, "aria-label": "Close the menu" }, closeButtonIcon &&
                icon_1.getIconOrJsx(closeButtonIcon, { "aria-hidden": true }))),
            React.createElement("div", { className: "armstrong-burger-content", ref: menuContentRef }, Content)),
        !hideOpenButton && (React.createElement(button_1.Button, { "data-position": position, className: "armstrong-menu-button open", onClick: function () { return setIsOpen(true); }, "aria-label": "Open the menu" }, openButtonIcon &&
            icon_1.getIconOrJsx(openButtonIcon, { "aria-hidden": true }))),
        mode === "slide" && (React.createElement("div", { className: "armstrong-menu-overlay", onClick: function () { return setIsOpen(false); }, "aria-label": "Close the menu", "aria-hidden": !isOpen, style: { transition: transitionTime + "ms" }, "data-transition": transitioning ? (isOpen ? "in" : "out") : isOpen ? "open" : "closed" })),
        React.createElement("div", { className: "armstrong-site-content-wrapper", style: tslib_1.__assign(tslib_1.__assign({}, slideTransform), { transition: "transform " + transitionTime + "ms" }) }, children)));
};
BurgerMenuComponent.defaultProps = {
    position: "left",
    mode: "slide",
    transitionTime: 300,
    closeButtonIcon: icon_1.Icon.Icomoon.cross,
    openButtonIcon: icon_1.Icon.Icomoon.menu7,
    closeOnNavigate: true
};
exports.BurgerMenuContext = React.createContext(undefined);
exports.BurgerMenu = function (props) {
    var _a = React.useState(false), isOpen = _a[0], setIsOpen = _a[1];
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
    return (React.createElement(exports.BurgerMenuContext.Provider, { value: {
            open: open,
            setIsOpen: setIsOpen,
            transitioning: transitioning,
            setTransitioning: setTransitioning,
            toggle: toggle,
            isOpen: isOpen,
            close: close
        } },
        React.createElement(BurgerMenuComponent, tslib_1.__assign({}, props))));
};
exports.useBurgerMenu = function () {
    var _a = React.useContext(exports.BurgerMenuContext), toggle = _a.toggle, transitioning = _a.transitioning, open = _a.open, close = _a.close, isOpen = _a.isOpen;
    return { toggle: toggle, transitioning: transitioning, open: open, close: close, isOpen: isOpen };
};
