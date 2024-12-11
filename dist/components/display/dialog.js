"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var React = require("react");
var ReactDOM = require("react-dom");
var icon_1 = require("./icon");
exports.Dialog = function (props) {
    if (typeof document === "undefined") {
        return null;
    }
    var onClose = React.useCallback(function (reason) {
        if (reason === "background") {
            if (props.closeOnBackgroundClick !== false) {
                props.onClose();
            }
            return;
        }
        if (props.onXClicked) {
            props.onXClicked();
        }
        else {
            props.onClose();
        }
    }, [props.closeOnBackgroundClick, props.onClose, props.onXClicked]);
    var dialog = (React.createElement(exports.DialogLayer, { title: props.title, layerClass: props.layerClass, className: props.className, width: props.width, height: props.height, onClose: onClose, headerTagName: props.headerTagName, closeButton: props.closeButton }, props.children));
    return props.isOpen
        ? ReactDOM.createPortal(dialog, document.querySelector(props.bodySelector || "#host"))
        : null;
};
exports.Dialog.defaultProps = {
    closeOnBackgroundClick: true
};
exports.DialogLayer = function (_a) {
    var title = _a.title, headerTagName = _a.headerTagName, children = _a.children, className = _a.className, height = _a.height, width = _a.width, onClose = _a.onClose, layerClass = _a.layerClass;
    var onCloseByBackground = React.useCallback(function (e) {
        var clickedElement = e.target;
        if (clickedElement &&
            clickedElement.classList &&
            clickedElement.classList.contains("dialog-layer")) {
            onClose("background");
        }
    }, [onClose]);
    var onCloseByX = React.useCallback(function (e) {
        onClose("x-clicked");
    }, [onClose]);
    return (React.createElement("div", { className: "dialog-layer" + (layerClass ? " " + layerClass : ""), onClick: onCloseByBackground },
        React.createElement(exports.DialogPresenter, { title: title, className: className, width: width, height: height, onClose: onCloseByX, headerTagName: headerTagName }, children)));
};
exports.DialogPresenter = function (_a) {
    var title = _a.title, headerTagName = _a.headerTagName, children = _a.children, className = _a.className, height = _a.height, width = _a.width, onClose = _a.onClose, closeButton = _a.closeButton;
    var style = React.useMemo(function () { return ({ width: width || "500px", height: height || "auto" }); }, [width, height]);
    return (React.createElement("div", { className: "dialog" + (className ? " " + className : ""), style: style },
        !title && (React.createElement("div", { className: "dialog-close-button-no-title", onClick: onClose }, icon_1.getIconOrJsx(closeButton))),
        title && (React.createElement("div", { className: "dialog-header" },
            headerTagName &&
                React.createElement(headerTagName, { children: title }),
            !headerTagName && title,
            React.createElement("div", { className: "dialog-close-button", onClick: onClose }, icon_1.getIconOrJsx(closeButton)))),
        React.createElement("div", { className: "dialog-content", id: "dialog-content" }, children)));
};
exports.DialogPresenter.defaultProps = {
    closeButton: icon_1.getIconProps("Icomoon", "cross3")
};
function useDialog(DialogLayerComponent, settings) {
    var _this = this;
    settings = settings || {};
    var hostElement = settings.hostElement, initiallyOpen = settings.initiallyOpen, beforeDialogClose = settings.beforeDialogClose, rest = tslib_1.__rest(settings, ["hostElement", "initiallyOpen", "beforeDialogClose"]);
    return usePortal(function (p) {
        var onClose = React.useCallback(function (reason) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!beforeDialogClose) return [3 /*break*/, 2];
                        return [4 /*yield*/, beforeDialogClose(reason)];
                    case 1:
                        if (_a.sent()) {
                            p.removeFromDOM();
                        }
                        return [2 /*return*/];
                    case 2:
                        p.removeFromDOM();
                        return [2 /*return*/];
                }
            });
        }); }, [p.removeFromDOM, beforeDialogClose]);
        var onUserClose = React.useCallback(function () { return onClose("user"); }, [onClose]);
        return (React.createElement(exports.DialogLayer, tslib_1.__assign({}, rest, { onClose: onClose }),
            React.createElement(DialogLayerComponent, { onClose: onUserClose })));
    }, { hostElement: hostElement, initiallyOpen: initiallyOpen });
}
exports.useDialog = useDialog;
var defaultState = { open: false, portal: null };
function usePortal(PortalComponent, settings) {
    var portal = React.useMemo(function () {
        if (typeof document === "undefined") {
            return null;
        }
        return ReactDOM.createPortal(React.createElement(PortalComponent, { removeFromDOM: function () { return setState(defaultState); } }), document.querySelector((settings && settings.hostElement) || "#host"));
    }, [PortalComponent, settings && settings.hostElement]);
    var open = React.useCallback(function () {
        setState({ open: true, portal: portal });
    }, [PortalComponent, settings && settings.hostElement]);
    var _a = React.useState(settings && !!settings.initiallyOpen ? { open: true, portal: portal } : defaultState), state = _a[0], setState = _a[1];
    return {
        open: open,
        portal: state.portal
    };
}
exports.usePortal = usePortal;
