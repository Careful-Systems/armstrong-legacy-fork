"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var React = require("react");
var classHelpers_1 = require("../../../utilities/classHelpers");
var formCore_1 = require("../formCore");
var validationWrapper_1 = require("../validationWrapper");
var options_1 = require("./options");
var SelectInputRef = function (props, ref) {
    var options = props.options, onOptionChange = props.onOptionChange, onChange = props.onChange, optionLabel = props.optionLabel, enableOptionLabel = props.enableOptionLabel, className = props.className, placeholder = props.placeholder, label = props.label, attrs = tslib_1.__rest(props, ["options", "onOptionChange", "onChange", "optionLabel", "enableOptionLabel", "className", "placeholder", "label"]);
    var handleChange = React.useCallback(function (e) {
        if (onOptionChange) {
            onOptionChange(options[e.target.selectedIndex - 1]);
        }
        if (onChange) {
            onChange(e);
        }
    }, [onOptionChange, onChange, options]);
    var select = React.useRef(undefined);
    var refCallback = React.useCallback(function () {
        return {
            focus: function () {
                if (select.current) {
                    select.current.focus();
                }
            },
            blur: function () {
                if (select.current) {
                    select.current.blur();
                }
            }
        };
    }, [select]);
    React.useImperativeHandle(ref, refCallback, [refCallback]);
    var validationMessage = formCore_1.DataValidationMessage.get(props);
    var validationMode = formCore_1.DataValidationMode.get(props);
    var classes = classHelpers_1.ClassHelpers.classNames("armstrong-input", "select-input", className, {
        "show-validation": validationMode !== "none" && validationMessage
    });
    return (React.createElement("div", { className: classes, title: validationMessage },
        label && React.createElement("label", { className: "armstrong-label" }, label),
        React.createElement("select", tslib_1.__assign({}, attrs, { ref: select, onChange: handleChange }),
            placeholder && (React.createElement("option", { value: "", disabled: true, selected: true, hidden: true }, placeholder)),
            options_1.buildOptions(optionLabel, options, function (o) { return o.id; }, function (o) { return o.name; }, !!enableOptionLabel)),
        React.createElement(validationWrapper_1.ValidationLabel, { message: validationMessage, mode: validationMode })));
};
exports.SelectInput = React.forwardRef(SelectInputRef);
exports.SelectInput.defaultProps = {
    optionLabel: "[Select]"
};
