"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var React = require("react");
var classHelpers_1 = require("../../../utilities/classHelpers");
var form_1 = require("../form");
var formCore_1 = require("../formCore");
var RadioInputRef = function (props, ref) {
    var labelContent = props.labelContent, id = props.id, attrs = tslib_1.__rest(props, ["labelContent", "id"]);
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
            }
        };
    }, [input]);
    React.useImperativeHandle(ref, refCallback, [refCallback]);
    var validationMessage = formCore_1.DataValidationMessage.get(props);
    var validationMode = formCore_1.DataValidationMode.get(props);
    var autoId = React.useMemo(function () { return id || form_1.generateUniqueId(function (u) { return "radio_" + u; }); }, [id]);
    var classes = React.useMemo(function () {
        return classHelpers_1.ClassHelpers.classNames("armstrong-input", "radio", props.className, {
            "show-validation": validationMode !== "none" && validationMessage
        });
    }, [props.className, validationMode, validationMessage]);
    return (React.createElement("div", { className: classes, title: validationMessage },
        React.createElement("input", tslib_1.__assign({ id: autoId }, attrs, { ref: input, type: "radio" }, formCore_1.DataValidationMessage.spread(validationMessage))),
        React.createElement("label", { htmlFor: autoId }),
        React.createElement("label", { className: "radio-label", htmlFor: autoId }, labelContent)));
};
exports.RadioInput = React.forwardRef(RadioInputRef);
