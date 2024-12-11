"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var React = require("react");
var useDidUpdateEffect_1 = require("../../../hooks/lifecycle/useDidUpdateEffect");
var classHelpers_1 = require("../../../utilities/classHelpers");
var utils_1 = require("../../../utilities/utils");
var formCore_1 = require("../formCore");
var validationWrapper_1 = require("../validationWrapper");
var icon_1 = require("./../../display/icon");
;
function makeComparison(value) {
    return value ? value.trim().toLowerCase() : "";
}
var TagInputRef = function (props, ref) {
    var value = props.value, className = props.className, onTagsChange = props.onTagsChange, label = props.label;
    var _a = React.useState(-1), suggestionIndex = _a[0], setSuggestionIndex = _a[1];
    var _b = React.useState(value || []), tags = _b[0], setTags = _b[1];
    var _c = React.useState([]), suggestions = _c[0], setSuggestions = _c[1];
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
            },
        };
    }, [input.current]);
    React.useImperativeHandle(ref, refCallback, [refCallback]);
    useDidUpdateEffect_1.useDidUpdateEffect(function () {
        var newTags = value || [];
        if (utils_1.utils.object.isEqual(tags, newTags)) {
            return;
        }
        notifyTagsChange(newTags, "", "set");
    }, [value]);
    var filterSuggestions = React.useCallback(function (newValue) {
        newValue = makeComparison(newValue);
        if (!newValue) {
            return [];
        }
        var filteredSuggestions = utils_1.utils.array.filter(props.suggestions, function (s) { return makeComparison(s).lastIndexOf(newValue, 0) === 0; });
        return utils_1.utils.array.filter(filteredSuggestions, function (s) { return tags.indexOf(s) === -1; });
    }, [props.suggestions, tags]);
    var notifyTagsChange = React.useCallback(function (newTags, newTag, change) {
        setTags(newTags);
        setSuggestions([]);
        if (onTagsChange) {
            onTagsChange(newTags, newTag, change);
        }
    }, [onTagsChange]);
    var notifySuggestionsChange = React.useCallback(function (newSuggestions) {
        if (newSuggestions === void 0) { newSuggestions = []; }
        setSuggestions(newSuggestions);
        setSuggestionIndex(-1);
    }, []);
    var addTag = React.useCallback(function (tag) {
        notifyTagsChange(tslib_1.__spreadArrays(tags, [tag]), tag, "add");
        input.current.value = "";
        input.current.focus();
    }, [tags, notifyTagsChange, input]);
    var addTagCallback = React.useCallback(function (tag) { return function () { return addTag(tag); }; }, [addTag]);
    var removeTag = React.useCallback(function (index) { return function () {
        var tagToRemove = tags[index];
        notifyTagsChange(utils_1.utils.array.filter(tags, function (__, idx) { return idx !== index; }), tagToRemove, "remove");
        input.current.focus();
    }; }, [tags, notifyTagsChange, input]);
    var onKeyUp = React.useCallback(function (e) {
        var target = e.target;
        // tslint:disable-next-line:no-string-literal
        var targetValue = target["value"];
        switch (e.keyCode) {
            case 40: // ArrowDown
            case 38: // ArrowUp}
                return;
            case 9:
            case 13:
                if (targetValue) {
                    if (tags.indexOf(targetValue) === -1) {
                        var newTags = tslib_1.__spreadArrays(tags, [targetValue]);
                        notifyTagsChange(newTags, targetValue, "add");
                    }
                    // tslint:disable-next-line:no-string-literal
                    target["value"] = "";
                    return;
                }
                break;
        }
        if (targetValue) {
            notifySuggestionsChange(filterSuggestions(targetValue));
        }
        else {
            notifySuggestionsChange();
        }
    }, [tags, filterSuggestions, notifySuggestionsChange]);
    var addSuggestion = React.useCallback(function () {
        var suggestion = suggestions[suggestionIndex];
        if (suggestion) {
            addTag(suggestion);
        }
    }, [addTag, suggestionIndex, suggestions]);
    var onKeyDown = React.useCallback(function (e) {
        // tslint:disable-next-line:no-string-literal
        var targetValue = e.target["value"];
        switch (e.keyCode) {
            case 8: // delete
                if (tags.length !== 0 && !targetValue) {
                    var newTags = tslib_1.__spreadArrays(tags);
                    var deletedTag = newTags.pop();
                    //newTags.splice(-1, 1);
                    notifyTagsChange(newTags, deletedTag, "remove");
                }
                break;
            case 40: // ArrowDown
                if (suggestionIndex < suggestions.length - 1) {
                    setSuggestionIndex(suggestionIndex + 1);
                }
                e.preventDefault();
                break;
            case 38: // ArrowUp}
                if (suggestionIndex > -1) {
                    setSuggestionIndex(suggestionIndex - 1);
                }
                e.preventDefault();
                break;
            case 9:
                if (targetValue) {
                    e.preventDefault();
                }
                addSuggestion();
                break;
            case 13:
                addSuggestion();
                break;
        }
    }, [tags, suggestionIndex, suggestions, notifyTagsChange, addTag, addSuggestion]);
    var renderSuggestions = React.useCallback(function (newSuggestions) {
        if (!newSuggestions || !newSuggestions.length) {
            return null;
        }
        return React.createElement("div", { className: "suggestions" }, newSuggestions.map(function (s, i) { return React.createElement("div", { key: s, className: classHelpers_1.ClassHelpers.classNames({ selected: i === suggestionIndex }), onClick: addTagCallback(s) }, s); }));
    }, [addTag, suggestionIndex]);
    var validationMessage = formCore_1.DataValidationMessage.get(props);
    var validationMode = formCore_1.DataValidationMode.get(props);
    var classes = React.useMemo(function () {
        return classHelpers_1.ClassHelpers.classNames("armstrong-input", "tag-input", className, {
            "show-validation": validationMode !== "none" && validationMessage,
        });
    }, [className, validationMode, validationMessage]);
    return (React.createElement("div", { className: classes },
        label && React.createElement("label", { className: "armstrong-label" }, label),
        React.createElement("div", { className: "armstrong-tags" },
            tags.map(function (t, i) { return (React.createElement("div", { key: t, className: "tag" },
                t,
                React.createElement(icon_1.Icon, { icon: icon_1.Icon.Icomoon.cross, onClick: removeTag(i) }))); }),
            React.createElement("input", { onKeyDown: onKeyDown, ref: input, onKeyUp: onKeyUp, type: "text" }),
            renderSuggestions(suggestions)),
        React.createElement(validationWrapper_1.ValidationLabel, { message: validationMessage, mode: validationMode })));
};
exports.TagInput = React.forwardRef(TagInputRef);
