"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var React = require("react");
var classHelpers_1 = require("../../utilities/classHelpers");
var icon_1 = require("./../display/icon");
var dialogProvider_1 = require("../display/dialogProvider");
var isIButtonConfirmDialog = function (dialogProps) {
    return !!dialogProps && !!dialogProps.content;
};
exports.useButtonConfirmDialog = function (config) {
    return dialogProvider_1.useConfirmDialogProvider(isIButtonConfirmDialog(config)
        ? function (_a) {
            var choose = _a.choose;
            if (!config) {
                return;
            }
            return (React.createElement(React.Fragment, null,
                React.createElement("p", null, config.content),
                React.createElement("div", { className: "confirm-dialog-buttons" },
                    React.createElement(exports.Button, { onClick: function () { return choose(false); } }, config.cancelText || "cancel"),
                    React.createElement(exports.Button, { onClick: function () { return choose(true); } }, config.confirmText || "confirm"))));
        }
        : config, { className: "button-confirm-dialog" });
};
var ButtonRef = function (props, ref) {
    var onClick = props.onClick, leftIcon = props.leftIcon, rightIcon = props.rightIcon, className = props.className, rounded = props.rounded, pending = props.pending, disabled = props.disabled, type = props.type, children = props.children, confirmDialog = props.confirmDialog, dangerLevel = props.dangerLevel, attrs = tslib_1.__rest(props, ["onClick", "leftIcon", "rightIcon", "className", "rounded", "pending", "disabled", "type", "children", "confirmDialog", "dangerLevel"]);
    var buttonRef = React.useRef();
    React.useImperativeHandle(ref, function () { return ({
        focus: function () {
            if (buttonRef.current) {
                buttonRef.current.focus();
            }
        },
        blur: function () {
            if (buttonRef.current) {
                buttonRef.current.blur();
            }
        }
    }); }, [buttonRef.current]);
    var openConfirmDialog = exports.useButtonConfirmDialog(typeof confirmDialog === "boolean" ? { content: "Are you sure?" } : confirmDialog);
    var handleClick = React.useCallback(function (e) { return tslib_1.__awaiter(void 0, void 0, void 0, function () {
        var _a;
        return tslib_1.__generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    if (!(onClick && !pending)) return [3 /*break*/, 3];
                    _a = !confirmDialog;
                    if (_a) return [3 /*break*/, 2];
                    return [4 /*yield*/, openConfirmDialog()];
                case 1:
                    _a = (_b.sent());
                    _b.label = 2;
                case 2:
                    if (_a) {
                        onClick(e);
                    }
                    _b.label = 3;
                case 3: return [2 /*return*/];
            }
        });
    }); }, [onClick, pending, openConfirmDialog]);
    var classes = classHelpers_1.ClassHelpers.classNames("btn", className, {
        rounded: rounded,
        "icon-button-left": leftIcon !== undefined,
        "icon-button-right": rightIcon !== undefined,
        pending: pending
    });
    var isIconButton = React.useMemo(function () { return !children && (!!leftIcon || !!rightIcon) && !(leftIcon && rightIcon); }, [
        leftIcon,
        children,
        rightIcon
    ]);
    return (React.createElement("button", tslib_1.__assign({ ref: buttonRef, "data-is-icon-button": isIconButton, "data-danger-level": dangerLevel, disabled: pending || disabled, type: type || "button", onClick: handleClick }, attrs, { className: classes }),
        leftIcon && icon_1.getIconOrJsx(leftIcon, { className: "left-icon" }, function (icon) { return React.createElement("div", { className: "left-icon" }, icon); }),
        children,
        rightIcon && icon_1.getIconOrJsx(rightIcon, { className: "right-icon" }, function (icon) { return React.createElement("div", { className: "right-icon" }, icon); })));
};
exports.Button = React.forwardRef(ButtonRef);
exports.Button.defaultProps = {
    dangerLevel: 1
};
