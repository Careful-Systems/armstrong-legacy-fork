"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var React = require("react");
var __1 = require("../../..");
var useCssVariables_1 = require("../../../hooks/useCssVariables");
var icon_1 = require("../../display/icon");
var formCore_1 = require("../formCore");
var SwitchInputRef = function (props, ref) {
    var hoverNudgeAmount = props.hoverNudgeAmount, height = props.height, width = props.width, padding = props.padding, className = props.className, inactiveColour = props.inactiveColour, hoveringColour = props.hoveringColour, activeColour = props.activeColour, inactiveNubbinColour = props.inactiveNubbinColour, hoveringNubbinColour = props.hoveringNubbinColour, activeNubbinColour = props.activeNubbinColour, id = props.id, label = props.label, disabled = props.disabled, activeIcon = props.activeIcon, inactiveIcon = props.inactiveIcon, iconSize = props.iconSize, iconStyle = props.iconStyle, borderedNubbin = props.borderedNubbin, renderShadows = props.renderShadows, style = props.style, attrs = tslib_1.__rest(props, ["hoverNudgeAmount", "height", "width", "padding", "className", "inactiveColour", "hoveringColour", "activeColour", "inactiveNubbinColour", "hoveringNubbinColour", "activeNubbinColour", "id", "label", "disabled", "activeIcon", "inactiveIcon", "iconSize", "iconStyle", "borderedNubbin", "renderShadows", "style"]);
    var inputWrapper = useCssVariables_1.useCSSVariables([
        {
            name: "--armstrong-switch-height",
            value: height + "px",
            enabled: !!height
        },
        { name: "--armstrong-switch-width", value: width + "px", enabled: !!width },
        {
            name: "--armstrong-switch-padding",
            value: padding + "px",
            enabled: !!padding
        },
        {
            name: "--armstrong-switch-hover-nudge-amount",
            value: hoverNudgeAmount + "px",
            enabled: !!hoverNudgeAmount
        },
        {
            name: "--armstrong-switch-inactive-colour",
            value: inactiveColour
        },
        {
            name: "--armstrong-switch-hover-colour",
            value: hoveringColour
        },
        {
            name: "--armstrong-switch-active-colour",
            value: activeColour
        },
        {
            name: "--armstrong-switch-nubbin-inactive-colour",
            value: inactiveNubbinColour
        },
        {
            name: "--armstrong-switch-nubbin-hover-colour",
            value: hoveringNubbinColour
        },
        {
            name: "--armstrong-switch-nubbin-active-colour",
            value: activeNubbinColour
        },
        {
            name: "--armstrong-switch-icon-size",
            value: iconSize
        }
    ]);
    var input = React.useRef(null);
    var refCallback = React.useCallback(function () {
        return {
            focus: function () {
                if (input.current) {
                    input.current.focus();
                }
            },
            blur: function () {
                if (input.current) {
                    input.current.blur();
                }
            }
        };
    }, [input]);
    React.useImperativeHandle(ref, refCallback, [refCallback]);
    var _a = React.useState(false), clicked = _a[0], setClicked = _a[1];
    var validationMessage = formCore_1.DataValidationMessage.get(props);
    var validationMode = formCore_1.DataValidationMode.get(props);
    var classes = React.useMemo(function () {
        return __1.ClassHelpers.classNames("armstrong-input", "switch-input", className, {
            "show-validation": validationMode !== "none" && validationMessage
        });
    }, [className, validationMode, validationMessage]);
    var autoId = React.useMemo(function () { return id || __1.generateUniqueId(function (u) { return "switch_" + u; }); }, [id]);
    var activeIconElement = icon_1.useIconOrJsx(activeIcon, {
        // @ts-ignore
        "data-icon-style": iconStyle,
        className: "active-icon"
    }, function (icon) { return (React.createElement("div", { className: "icon active-icon", "data-icon-style": "icon-style" }, icon)); });
    var inactiveIconElement = icon_1.useIconOrJsx(inactiveIcon, {
        // @ts-ignore
        "data-icon-style": iconStyle,
        className: "inactive-icon"
    }, function (icon) { return (React.createElement("div", { className: "icon inactive-icon", "data-icon-style": "icon-style" }, icon)); });
    return (React.createElement("div", { className: classes, title: validationMessage, ref: inputWrapper, "data-icon-style": iconStyle, "data-bordered-nubbin": borderedNubbin, "data-render-shadows": renderShadows, style: style },
        label && React.createElement("label", { className: "armstrong-label" }, label),
        React.createElement("input", tslib_1.__assign({}, attrs, { ref: input, name: name, type: "checkbox", id: autoId, onClick: function () { return setClicked(true); }, onMouseLeave: function () { return setClicked(false); }, "data-has-clicked": clicked, "data-hover-nudge-enabled": !!hoverNudgeAmount, "data-disabled": disabled })),
        activeIcon && activeIconElement,
        inactiveIcon && inactiveIconElement,
        React.createElement(__1.ValidationLabel, { message: validationMessage, mode: validationMode })));
};
/** Renders a switch which behaves like a checkbox with many visual customisation options. Falls back to a checkbox in older browsers. */
exports.SwitchInput = React.forwardRef(SwitchInputRef);
exports.SwitchInput.defaultProps = {
    iconStyle: "on-nubbin",
};
