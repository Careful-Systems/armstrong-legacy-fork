"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var React = require("react");
var dialog_1 = require("./dialog");
var DialogProviderContext = React.createContext(undefined);
exports.DialogProvider = function (p) {
    var ref = React.useRef();
    return (React.createElement(DialogProviderContext.Provider, { value: { useDialogPromise: function (component, argument, settings) { return ref.current && ref.current.useDialogPromise(component, argument, settings); } } },
        p.children,
        React.createElement(DialogStack, { ref: ref })));
};
function useDialogProvider(component, settings) {
    var ctx = React.useContext(DialogProviderContext);
    if (!ctx) {
        // tslint:disable-next-line: no-console
        console.log("You are trying to use DialogProvider Context, but no DialogProvider was found in the component hierarchy");
    }
    return React.useCallback(function (argument) { return ctx.useDialogPromise(component, argument, settings); }, [component, settings]);
}
exports.useDialogProvider = useDialogProvider;
function useConfirmDialogProvider(component, settings) {
    return useDialogProvider(component, settings);
}
exports.useConfirmDialogProvider = useConfirmDialogProvider;
function DialogStackRef(props, ref) {
    var _a = React.useState([]), dialogContent = _a[0], setDialogContent = _a[1];
    var setPreviousDialogContentState = React.useCallback(function (previousDialogContentState) {
        setDialogContent(previousDialogContentState);
    }, [dialogContent, setDialogContent]);
    React.useImperativeHandle(ref, function () { return ({
        useDialogPromise: function (Body, argument, settings) {
            var _this = this;
            return new Promise(function (resolve) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
                var choose, close;
                return tslib_1.__generator(this, function (_a) {
                    choose = function (d) {
                        setPreviousDialogContentState(dialogContent);
                        resolve(d);
                    };
                    close = function () {
                        setPreviousDialogContentState(dialogContent);
                        resolve();
                    };
                    setDialogContent(tslib_1.__spreadArrays(dialogContent, [tslib_1.__assign({ body: React.createElement(Body, { argument: argument, close: close, choose: choose }), close: close }, (settings || {}))]));
                    return [2 /*return*/];
                });
            }); });
        },
    }); }, [dialogContent, setPreviousDialogContentState, setDialogContent]);
    return (React.createElement(React.Fragment, null, dialogContent.map(function (dc, idx) { return (React.createElement(dialog_1.Dialog, { key: idx, layerClass: dc.layerClass, width: dc.width, height: dc.height, className: dc.className, isOpen: true, onClose: dc.close, title: dc.title, closeOnBackgroundClick: !!dc.allowCloseOnBackgroundClick, headerTagName: dc.headerTagName }, dc.body)); })));
}
var DialogStack = React.forwardRef(DialogStackRef);
