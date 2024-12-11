"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var React = require("react");
var classHelpers_1 = require("../../utilities/classHelpers");
var icon_1 = require("../display/icon");
var DropdownButtonRef = function (props, ref) {
    var leftIcon = props.leftIcon, rightIcon = props.rightIcon, className = props.className, rounded = props.rounded, pending = props.pending, disabled = props.disabled, type = props.type, children = props.children, dangerLevel = props.dangerLevel, options = props.options, attrs = tslib_1.__rest(props, ["leftIcon", "rightIcon", "className", "rounded", "pending", "disabled", "type", "children", "dangerLevel", "options"]);
    var _a = React.useState(false), isOpen = _a[0], setIsOpen = _a[1];
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
    var classes = classHelpers_1.ClassHelpers.classNames("btn", "dd-btn", className, {
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
    var handleOptionClick = React.useCallback(function (handler) {
        setIsOpen(false);
        handler();
    }, [props.options]);
    var handleClick = React.useCallback(function (e) {
        if (buttonRef.current && !buttonRef.current.contains(e.target)) {
            setIsOpen(false);
        }
    }, [buttonRef]);
    React.useEffect(function () {
        document.addEventListener('mousedown', function (e) { return handleClick(e); }, false);
        return document.removeEventListener('mousedown', function (e) { return handleClick(e); }, false);
    }, []);
    return (React.createElement(React.Fragment, null,
        React.createElement("button", tslib_1.__assign({ ref: buttonRef, "data-is-icon-button": isIconButton, "data-danger-level": dangerLevel, disabled: pending || disabled, type: type || "button" }, attrs, { className: classes, onClick: function () { return setIsOpen(!isOpen); } }),
            leftIcon && icon_1.getIconOrJsx(leftIcon, { className: "left-icon" }, function (icon) { return React.createElement("div", { className: "left-icon" }, icon); }),
            children,
            rightIcon && icon_1.getIconOrJsx(rightIcon, { className: "right-icon" }, function (icon) { return React.createElement("div", { className: "right-icon" }, icon); }),
            isOpen &&
                React.createElement("div", { className: "dd-btn-list", "data-align": props.alignment }, props.options.map(function (op) {
                    return React.createElement("div", { onClick: function () { return handleOptionClick(op.onClick); } }, op.label);
                })))));
};
exports.DropdownButton = React.forwardRef(DropdownButtonRef);
exports.DropdownButton.defaultProps = {
    dangerLevel: 1,
    alignment: "left"
};
