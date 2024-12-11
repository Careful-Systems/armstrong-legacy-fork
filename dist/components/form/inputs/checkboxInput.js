"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var React = require("react");
var classHelpers_1 = require("../../../utilities/classHelpers");
var form_1 = require("../form");
var formCore_1 = require("../formCore");
var validationWrapper_1 = require("../validationWrapper");
var CheckboxInputRef = function (props, ref) {
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
        };
    }, [input]);
    React.useImperativeHandle(ref, refCallback, [refCallback]);
    var validationMessage = formCore_1.DataValidationMessage.get(props);
    var validationMode = formCore_1.DataValidationMode.get(props);
    var labelContent = props.labelContent, id = props.id, label = props.label, attrs = tslib_1.__rest(props, ["labelContent", "id", "label"]);
    var autoId = React.useMemo(function () { return id || form_1.generateUniqueId(function (u) { return "checkbox_" + u; }); }, [id]);
    var classes = React.useMemo(function () { return classHelpers_1.ClassHelpers.classNames("armstrong-input", "checkbox", props.className, {
        "show-validation": (validationMode !== "none" && validationMessage),
    }); }, [props.className, validationMode, validationMessage]);
    return (React.createElement("div", { className: classes, title: validationMessage },
        label && React.createElement("label", { className: "armstrong-label" }, label),
        React.createElement("div", { className: "armstrong-checkbox" },
            React.createElement("input", tslib_1.__assign({}, attrs, { ref: input, id: autoId, type: "checkbox" })),
            React.createElement("label", { className: "armstrong-checkmark", htmlFor: autoId }),
            React.createElement("label", { className: "checkbox-label", htmlFor: autoId }, labelContent)),
        React.createElement(validationWrapper_1.ValidationLabel, { message: validationMessage, mode: validationMode })));
};
exports.CheckboxInput = React.forwardRef(CheckboxInputRef);
