"use strict";
// TODO: Butter
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var moment = require("moment");
var React = require("react");
var ReactDOM = require("react-dom");
var __1 = require("../../");
var icon_1 = require("./icon");
var ToastContext = React.createContext(undefined);
var toastReducer = function (state, action) {
    switch (action.type) {
        case "add":
            return tslib_1.__spreadArrays(state, action.toasts);
        case "dismiss":
            return tslib_1.__spreadArrays(state.filter(function (__, i) { return i !== action.index; }));
        case "dismiss-all":
            return [];
        default:
            return state;
    }
};
exports.ToastProvider = function (_a) {
    var children = _a.children, renderInProvider = _a.renderInProvider, saveHistory = _a.saveHistory, settings = tslib_1.__rest(_a, ["children", "renderInProvider", "saveHistory"]);
    var _b = React.useReducer(toastReducer, []), toasts = _b[0], dispatchAction = _b[1];
    var _c = React.useReducer(toastReducer, []), toastsHistory = _c[0], dispatchToastsHistoryAction = _c[1];
    /** Dispatch a new toast notification */
    var dispatch = React.useCallback(function () {
        var newToasts = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            newToasts[_i] = arguments[_i];
        }
        dispatchAction({ type: "add", toasts: newToasts });
        // setToasts([...toasts, ...newToasts]);
        if (saveHistory) {
            dispatchToastsHistoryAction({ type: "add", toasts: newToasts });
        }
    }, [dispatchAction]);
    /** Dismiss a toast notification by index */
    var dismiss = React.useCallback(function (index) {
        dispatchAction({ type: "dismiss", index: index });
    }, [dispatchAction]);
    /** Dismiss all toast notifications */
    var dismissAll = React.useCallback(function () { return dispatchAction({ type: "dismiss-all" }); }, [dispatchAction]);
    /** clear entire toast history */
    var clearToastHistory = React.useCallback(function () { return dispatchToastsHistoryAction({ type: "dismiss-all" }); }, []);
    return (React.createElement(ToastContext.Provider, { value: {
            dispatch: dispatch,
            dismiss: dismiss,
            dismissAll: dismissAll,
            toasts: toasts,
            toastsHistory: toastsHistory,
            clearToastHistory: clearToastHistory,
        } },
        children,
        renderInProvider && !!toasts.length && React.createElement(ToastContainer, { settings: settings, toasts: toasts, dismissToast: dismiss })));
};
exports.ToastProvider.defaultProps = {
    location: "top right",
    dismissButton: React.createElement("div", null, "X"),
    dismissTime: 500,
    disableAutodismissOnHover: true,
    renderInProvider: true,
    timestampFormat: "HH:mm",
};
/** Use toast notifications — returns a method that dispatches a toast notification to the ToastContext, which renders it in the ToastProvider component, as well as methods to dismiss notifications */
exports.useToast = function () {
    var context = React.useContext(ToastContext);
    if (!context) {
        // tslint:disable-next-line: no-console
        console.error("You are trying to use a useToast hook outside a ToastProvider, this will not work.");
        return;
    }
    var dismiss = context.dismiss, dismissAll = context.dismissAll, toasts = context.toasts, toastsHistory = context.toastsHistory, clearToastHistory = context.clearToastHistory;
    var dispatch = function () {
        var newToasts = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            newToasts[_i] = arguments[_i];
        }
        return context.dispatch.apply(context, newToasts.map(function (toast) { return (tslib_1.__assign({ timestamp: Date.now() }, toast)); }));
    };
    return {
        dispatch: dispatch,
        dismiss: dismiss,
        dismissAll: dismissAll,
        toasts: toasts,
        toastsHistory: toastsHistory,
        clearToastHistory: clearToastHistory,
    };
};
var ToastContainerInnerCorner = function (_a) {
    var toasts = _a.toasts, dismissToast = _a.dismissToast, settings = _a.settings, location = _a.location;
    return (React.createElement("div", { className: "toasts toasts-" + location.replace(/ /g, "-") }, toasts.map(function (toast, i) { return (React.createElement(exports.Toast, tslib_1.__assign({}, toast, { onDismiss: function () { return dismissToast(i); }, settings: settings, key: JSON.stringify(toast) }))); })));
};
var ToastContainerInner = function (_a) {
    var settings = _a.settings, dismissToast = _a.dismissToast, toasts = _a.toasts;
    var seperatedToasts = React.useMemo(function () {
        var allToasts = {
            "top left": [],
            "top right": [],
            "bottom left": [],
            "bottom right": [],
        };
        toasts.forEach(function (toast) {
            allToasts[toast.location || settings.location].push(toast);
        });
        return allToasts;
    }, [toasts]);
    return (React.createElement("div", { className: "toast-container" }, Object.keys(seperatedToasts).map(function (key) { return (React.createElement(ToastContainerInnerCorner, { toasts: seperatedToasts[key], location: key, dismissToast: dismissToast, settings: settings, key: key })); })));
};
/** Renders the toasts in a list in a fixed element overlaying everything */
var ToastContainer = function (props) {
    if (typeof document === "undefined") {
        return null;
    }
    if (props.settings.hostElement) {
        return ReactDOM.createPortal(React.createElement(ToastContainerInner, tslib_1.__assign({}, props)), document.querySelector(props.settings.hostElement));
    }
    return React.createElement(ToastContainerInner, tslib_1.__assign({}, props));
};
/** Renders a single dismissable toast — if you're happy with the default toast behaviour DONT USE THIS, the ToastProvider component will render all your toasts with animations and stuff like that. This is only if you're overriding that behaviour/layout but still want to use the Armstrong Toast component */
var ToastDate = function (_a) {
    var timestamp = _a.timestamp, settings = _a.settings;
    return settings.renderTimestamp ? React.createElement("p", { className: "toast-timestamp" }, moment.unix(timestamp / 1000).format(settings.timestampFormat)) : null;
};
exports.Toast = function (_a) {
    var title = _a.title, description = _a.message, type = _a.type, settings = _a.settings, autodismiss = _a.autodismiss, content = _a.content, onDismiss = _a.onDismiss, timestamp = _a.timestamp, className = _a.className, allowManualDismiss = _a.allowManualDismiss, onClick = _a.onClick;
    var autoDismissTimeout = React.useRef(null);
    var dismissingTimeout = React.useRef(null);
    var ref = React.useRef(null);
    var _b = React.useState(false), dismissing = _b[0], setDismissing = _b[1];
    var _c = React.useState(false), dismissed = _c[0], setDismissed = _c[1];
    /** start dismiss of notification, set state to play animation and set up timeout for the actual removal from the toast array */
    var dismiss = React.useCallback(function () {
        setDismissing(true);
        dismissingTimeout.current = setTimeout(function () {
            setDismissed(true);
        }, settings.dismissTime);
    }, [settings.dismissTime, dismissingTimeout.current]);
    /** start timeout to autodismiss */
    var initialiseAutodismiss = React.useCallback(function () {
        if (autodismiss !== undefined) {
            autoDismissTimeout.current = setTimeout(dismiss, autodismiss);
        }
    }, [autodismiss, autoDismissTimeout.current, dismiss]);
    /** if set to, stop the autodismiss timeout on mouse enter */
    var mouseEnter = React.useCallback(function () { return settings.disableAutodismissOnHover && clearTimeout(autoDismissTimeout.current); }, [autoDismissTimeout.current, settings.disableAutodismissOnHover]);
    /** if set to, retrigger the autodismiss timeout on mouse leave */
    var mouseLeave = React.useCallback(function () { return settings.disableAutodismissOnHover && initialiseAutodismiss(); }, [initialiseAutodismiss, settings.disableAutodismissOnHover]);
    // set up autodismiss, and clear timeouts on cleanup
    React.useEffect(function () {
        initialiseAutodismiss();
        return function () {
            clearTimeout(autoDismissTimeout.current);
            clearTimeout(dismissingTimeout.current);
        };
    }, []);
    // Effect to listen to dismissed state, and call passed in dismiss method - needs to work like this, as the callback passed into
    // dismiss timeout doesn't update from the timeout being fired, but it needs to know the current index of the notification
    React.useEffect(function () {
        if (dismissed) {
            onDismiss();
        }
    }, [dismissed]);
    /** time for a step of the transition - one step is the time to disappear or reappear, the other is to expand or unexpand the space it's in */
    var transitionStep = React.useMemo(function () { return settings.dismissTime / 2 + "ms"; }, [settings.dismissTime]);
    /** shhh */
    var actuallyToastStyles = React.useMemo(function () {
        return settings.butItsActuallyToast
            ? {
                backgroundImage: "url(https://pngriver.com/wp-content/uploads/2018/04/Download-Toast-PNG-Photos.png)",
                backgroundSize: "100% 100%",
                backgroundColor: "transparent",
                boxShadow: "none",
            }
            : {};
    }, [settings.butItsActuallyToast]);
    return (React.createElement("div", { className: __1.ClassHelpers.classNames("toast-notification", className), "data-type": type, "data-dismissing": dismissing, ref: ref, onMouseEnter: mouseEnter, onMouseLeave: mouseLeave, onClick: function (e) { return onClick && onClick(e, dismiss); }, style: {
            transitionDelay: transitionStep,
            transitionDuration: transitionStep,
            animationDuration: transitionStep,
        } },
        React.createElement("div", { className: "toast-notification-inner", style: tslib_1.__assign({ transitionDuration: transitionStep, animationDelay: transitionStep, animationDuration: transitionStep }, actuallyToastStyles), "aria-live": "assertive", "aria-role": "alert" },
            (allowManualDismiss || settings.renderTimestamp || title) && (React.createElement("div", { className: "toast-notification-top" },
                React.createElement("div", null,
                    React.createElement("h3", null, title),
                    settings.renderTimestamp === "below title" && React.createElement(ToastDate, { timestamp: timestamp, settings: settings })),
                allowManualDismiss && (React.createElement("div", { className: "toast-dismiss", onClick: function (e) {
                        e.stopPropagation();
                        dismiss();
                    } }, icon_1.getIconOrJsx(settings.dismissButton))))),
            React.createElement("p", null, description),
            typeof content === "function" ? content({ dismiss: dismiss, timestamp: timestamp }) : content,
            settings.renderTimestamp === "below content" && React.createElement(ToastDate, { timestamp: timestamp, settings: settings }))));
};
exports.Toast.defaultProps = {
    allowManualDismiss: true,
};
