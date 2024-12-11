"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var React = require("react");
var index_1 = require("../../../index");
var keyCodes_1 = require("../../../utilities/keyCodes");
var utils_1 = require("../../../utilities/utils");
var formCore_1 = require("../formCore");
var formHooks_1 = require("../formHooks");
var validationWrapper_1 = require("../validationWrapper");
function calcTabIndex(tabIndex, fieldIndex) {
    if (tabIndex === undefined || tabIndex === -1) {
        return tabIndex;
    }
    return tabIndex + fieldIndex;
}
function getBindingName(index) {
    return "code_" + index;
}
var formData = {};
/** An input which binds to a single string or numeric value, seperated into multiple inputs, with focus moving automatically between them. */
var CodeInputRef = function (props, ref) {
    var _a = formHooks_1.useForm(formData), DataForm = _a.DataForm, bind = _a.bind, dataBinder = _a.dataBinder, notifyChange = _a.notifyChange;
    var onCodeChange = props.onCodeChange, lengthPerBox = props.lengthPerBox, numeric = props.numeric, hideValue = props.hideValue, className = props.className, tabIndex = props.tabIndex, value = props.value, placeholder = props.placeholder, readonly = props.readonly, autoFocus = props.autoFocus, type = props.type, pattern = props.pattern, label = props.label;
    /** the total length of the code, based on the total of lengthPerBox */
    var codeLength = React.useMemo(function () { return utils_1.utils.array.reduce(lengthPerBox, function (runningTotal, boxLength) { return runningTotal + boxLength; }, 0); }, [
        lengthPerBox
    ]);
    var firstInput = React.useRef(undefined);
    var refCallback = React.useCallback(function () {
        return {
            focus: function () {
                if (firstInput.current) {
                    firstInput.current.focus();
                }
            },
            blur: function () {
                if (firstInput.current) {
                    firstInput.current.blur();
                }
            }
        };
    }, [firstInput]);
    React.useImperativeHandle(ref, refCallback, [refCallback]);
    /** Set values of the inputs */
    var setValues = React.useCallback(function (newValue) {
        /** index of the start of each substring */
        var currentIndex = 0;
        // loop through lengthPerBox array, set substrings to values in binder
        utils_1.utils.array.each(lengthPerBox, function (boxLength, i) {
            var chunk = newValue ? newValue.substr(currentIndex, boxLength) : "";
            currentIndex += boxLength;
            dataBinder.setValue(getBindingName(i), chunk);
        });
        notifyChange();
    }, [lengthPerBox, notifyChange]);
    var _b = React.useState(null), focusIndex = _b[0], setFocusIndex = _b[1];
    var storedKey = React.useRef(null);
    /** Get the current full value from the form inputs */
    var getValue = React.useCallback(function () {
        return lengthPerBox
            .map(function (_, i) {
            var val = dataBinder.getValue(getBindingName(i));
            return val || "";
        })
            .join("");
    }, []);
    /** Run onCodeChange callback with the combined values of each input */
    var buildValue = React.useCallback(function () {
        var codeCandidate = getValue();
        if (numeric) {
            codeCandidate = parseInt(codeCandidate, 10);
        }
        if (onCodeChange) {
            onCodeChange(codeCandidate);
        }
    }, [lengthPerBox, onCodeChange, numeric, codeLength]);
    /** If necessary, move focus to next input element on key up */
    var onKeyUpFocusNext = React.useCallback(function (e) {
        var current = e.target;
        var boxLength = lengthPerBox[focusIndex];
        var currentVal = current.value.trim().slice(0, boxLength);
        var movingBack = e.keyCode === keyCodes_1.KeyCodes.backspace;
        var element;
        var retFromStore = false;
        if (movingBack) {
            if (currentVal.length === 0) {
                element = current.previousSibling;
            }
            else {
                element = current;
            }
        }
        else {
            element = current.nextSibling;
            if (storedKey.current && element && !element.value) {
                element.value = storedKey.current;
                storedKey.current = null;
                retFromStore = true;
            }
        }
        if (currentVal.length < boxLength && !movingBack) {
            return;
        }
        if (element) {
            element.focus();
            if (element.value && !movingBack && !retFromStore) {
                element.select();
                // el.value = "";
            }
        }
        buildValue();
    }, [lengthPerBox, focusIndex, storedKey, buildValue]);
    /** On paste event, paste in value and move focus */
    var handlePaste = React.useCallback(function (e) {
        var pasted = e.clipboardData.getData("text/plain").replace(/\s/g, "");
        pasted = pasted.substr(0, codeLength).toUpperCase();
        if (numeric) {
            var parsed = parseInt(pasted, 10);
            if (isNaN(parsed)) {
                e.preventDefault();
            }
        }
        setValues(pasted);
        buildValue();
    }, [lengthPerBox, buildValue, numeric, codeLength]);
    var handleFocus = React.useCallback(function (index) { return function () {
        setFocusIndex(index);
        storedKey.current = null;
    }; }, [storedKey]);
    var keyDown = React.useCallback(function (e) {
        var boxLength = lengthPerBox[focusIndex];
        var selectionLength = window.getSelection().toString().length;
        if (selectionLength === boxLength) {
            return;
        }
        if (e.currentTarget.value.length === boxLength) {
            if (e.keyCode >= keyCodes_1.KeyCodes.key_0 && e.keyCode <= keyCodes_1.KeyCodes.key_9) {
                storedKey.current = e.key;
            }
            if (e.keyCode >= keyCodes_1.KeyCodes.key_a && e.keyCode <= keyCodes_1.KeyCodes.key_z) {
                storedKey.current = e.key;
            }
        }
    }, [lengthPerBox, focusIndex, storedKey]);
    /** Select contents of input on click */
    var handleClick = React.useCallback(function (e) {
        if (e.currentTarget.value) {
            e.currentTarget.select();
        }
    }, []);
    /** The current value as a string */
    var currentValue = React.useMemo(function () {
        if (typeof value === "string" || !value) {
            return value;
        }
        return value.toString();
    }, [value]);
    /** On changes to value set by prop, update the values of the form */
    React.useEffect(function () {
        if (currentValue !== getValue()) {
            setValues(currentValue);
        }
    }, [currentValue, getValue]);
    var validationMessage = formCore_1.DataValidationMessage.get(props);
    var validationMode = formCore_1.DataValidationMode.get(props);
    var classes = React.useMemo(function () {
        return index_1.ClassHelpers.classNames("armstrong-input", "code-input", className, {
            "show-validation": validationMode !== "none" && validationMessage
        });
    }, [className, validationMode, validationMessage]);
    return (React.createElement("div", { className: classes },
        label && React.createElement("label", { className: "armstrong-label" }, label),
        React.createElement(DataForm, { onDataChanged: buildValue, className: classes }, lengthPerBox.map(function (boxLength, i) { return (React.createElement("input", tslib_1.__assign({ ref: i === 0 ? firstInput : null, autoFocus: i === 0 && autoFocus }, bind.text(getBindingName(i)), { className: "code-input-field", tabIndex: calcTabIndex(tabIndex, i), key: i, type: type || (hideValue ? "password" : "text"), placeholder: placeholder, maxLength: boxLength, readOnly: readonly, onClick: handleClick, onFocus: handleFocus(i), onKeyUp: onKeyUpFocusNext, onKeyDown: keyDown, onPaste: handlePaste, pattern: pattern }))); })),
        React.createElement(validationWrapper_1.ValidationLabel, { message: validationMessage, mode: validationMode })));
};
exports.CodeInput = React.forwardRef(CodeInputRef);
exports.CodeInput.defaultProps = {
    lengthPerBox: [2, 2, 2]
};
