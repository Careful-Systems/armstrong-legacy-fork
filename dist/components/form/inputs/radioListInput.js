"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var React = require("react");
var classHelpers_1 = require("../../../utilities/classHelpers");
var form_1 = require("../form");
var formCore_1 = require("../formCore");
var validationWrapper_1 = require("../validationWrapper");
var RadioListInputRef = function (props, ref) {
    var options = props.options, id = props.id, value = props.value, attrs = tslib_1.__rest(props, ["options", "id", "value"]);
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
    var classes = React.useMemo(function () { return classHelpers_1.ClassHelpers.classNames("armstrong-input", "radio-list", props.className, {
        "show-validation": (validationMode !== "none" && validationMessage),
    }); }, [props.className, validationMode, validationMessage]);
    var autoId = React.useMemo(function () { return id || form_1.generateUniqueId(function (u) { return "radio_" + u; }); }, [id]);
    return (React.createElement("div", { className: classes, title: validationMessage },
        options && options.map(function (o, i) { return React.createElement(RadioOption, tslib_1.__assign({ autoId: autoId + "_" + i, key: o.value, input: i === 0 ? input : undefined, checked: value === o.value, value: o.value, labelContent: o.labelContent }, attrs)); }),
        React.createElement(validationWrapper_1.ValidationLabel, { message: validationMessage, mode: validationMode })));
};
var RadioOption = function (p) {
    var input = p.input, labelContent = p.labelContent, autoId = p.autoId, attrs = tslib_1.__rest(p, ["input", "labelContent", "autoId"]);
    return (React.createElement("div", { className: "radio-option" },
        React.createElement("input", tslib_1.__assign({}, attrs, { id: autoId, ref: input })),
        React.createElement("label", { htmlFor: autoId }),
        React.createElement("label", { className: "radio-label", htmlFor: autoId }, labelContent)));
};
exports.RadioListInput = React.forwardRef(RadioListInputRef);
