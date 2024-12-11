"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var React = require("react");
var classHelpers_1 = require("../../../utilities/classHelpers");
var formCore_1 = require("../formCore");
var validationWrapper_1 = require("../validationWrapper");
var icon_1 = require("./../../display/icon");
var TextInputRef = function (props, ref) {
    var className = props.className, componentDidMount = props.componentDidMount, readonly = props.readonly, rightOverlayText = props.rightOverlayText, leftOverlayText = props.leftOverlayText, type = props.type, label = props.label, leftIcon = props.leftIcon, rightIcon = props.rightIcon, multiLine = props.multiLine, placeholder = props.placeholder, children = props.children, attrs = tslib_1.__rest(props, ["className", "componentDidMount", "readonly", "rightOverlayText", "leftOverlayText", "type", "label", "leftIcon", "rightIcon", "multiLine", "placeholder", "children"]);
    var input = React.useRef(undefined);
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
            },
            select: function () {
                if (input.current) {
                    input.current.select();
                }
            }
        };
    }, []);
    React.useImperativeHandle(ref, refCallback, [refCallback]);
    React.useEffect(function () {
        if (componentDidMount) {
            componentDidMount(refCallback());
        }
    }, [componentDidMount, refCallback]);
    var validationMessage = formCore_1.DataValidationMessage.get(props);
    var validationMode = formCore_1.DataValidationMode.get(props);
    var classes = React.useMemo(function () {
        return classHelpers_1.ClassHelpers.classNames("armstrong-input", "text-input", className, {
            "text-input-disabled": props.disabled,
            "has-text-overlay-right": rightOverlayText !== undefined,
            "has-text-overlay-left": leftOverlayText !== undefined,
            "text-input-icon-left": leftIcon !== undefined,
            "text-input-icon-right": rightIcon !== undefined,
            "show-validation": validationMode !== "none" && validationMessage
        });
    }, [
        className,
        props.disabled,
        rightOverlayText,
        leftOverlayText,
        leftIcon,
        rightIcon,
        validationMode,
        validationMessage,
    ]);
    return (React.createElement("div", { className: classes, title: validationMessage },
        label && React.createElement("label", { className: "armstrong-label" }, label),
        leftIcon && icon_1.getIconOrJsx(leftIcon, { className: "left-icon" }),
        leftOverlayText && (React.createElement("div", { className: "input-overlay-text-left" }, leftOverlayText)),
        !multiLine && (React.createElement("input", tslib_1.__assign({}, attrs, { ref: input, type: type || "text", readOnly: readonly, placeholder: placeholder, required: props.required }))),
        multiLine && (React.createElement("textarea", tslib_1.__assign({}, attrs, { ref: input, readOnly: readonly, placeholder: placeholder }))),
        rightOverlayText && (React.createElement("div", { className: "input-overlay-text-right" }, rightOverlayText)),
        rightIcon && icon_1.getIconOrJsx(rightIcon, { className: "right-icon" }),
        children,
        React.createElement(validationWrapper_1.ValidationLabel, { message: validationMessage, mode: validationMode })));
};
exports.TextInput = React.forwardRef(TextInputRef);
