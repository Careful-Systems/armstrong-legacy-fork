"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var React = require("react");
var usePrevious_1 = require("../../../hooks/usePrevious");
var classHelpers_1 = require("../../../utilities/classHelpers");
var keyCodes_1 = require("../../../utilities/keyCodes");
var utils_1 = require("../../../utilities/utils");
var icon_1 = require("../../display/icon");
var button_1 = require("../../interaction/button");
var grid_1 = require("../../layout/grid");
var formCore_1 = require("../formCore");
var validationWrapper_1 = require("../validationWrapper");
exports.AutoCompleteSingleInput = function (props) {
    var filter = props.filter, onFilterChange = props.onFilterChange, options = props.options, value = props.value, onValueChange = props.onValueChange, className = props.className, visibleItems = props.visibleItems, hasGoButton = props.hasGoButton, disabled = props.disabled, placeholder = props.placeholder, canClear = props.canClear, isSearching = props.isSearching, noResultsMessage = props.noResultsMessage, goButtonContent = props.goButtonContent;
    var autocompleteSelectList = React.useRef();
    var input = React.useRef();
    var root = React.useRef();
    var _a = React.useState(false), open = _a[0], setOpen = _a[1];
    var _b = React.useState(false), showOnTop = _b[0], setShowOnTop = _b[1];
    var _c = React.useState(-35), topOffset = _c[0], setTopOffset = _c[1];
    var _d = React.useState(0), selectedIndex = _d[0], setSelectedIndex = _d[1];
    var _e = React.useState(0), offsetIndex = _e[0], setOffsetIndex = _e[1];
    var itemHeight = 52;
    var previousOpen = usePrevious_1.usePrevious(open);
    React.useEffect(function () {
        if (previousOpen !== open) {
            if (open) {
                if (input.current) {
                    input.current.focus();
                }
            }
        }
    }, [open]);
    function focusInput(e) {
        if (!e ||
            (!open && !formCore_1.getEventTargetAs(e).classList.contains("clear-selected"))) {
            setOpen(true);
            setShowOnTop(shouldShowOnTop());
            document.addEventListener("click", handleEvent, false);
        }
    }
    function handleSelection(option) {
        setOpen(false);
        onFilterChange("");
        setOffsetIndex(0);
        if (onValueChange) {
            onValueChange(option);
        }
        document.removeEventListener("click", handleEvent, false);
    }
    function shouldShowOnTop() {
        var height = itemHeight * 3 + 50;
        if (!root.current) {
            return;
        }
        var inputRect = root.current.getBoundingClientRect();
        var remainingSpace = window.innerHeight - inputRect.bottom;
        var onTop = false;
        if (remainingSpace < height) {
            onTop = true;
        }
        else {
            onTop = false;
        }
        var offset = -inputRect.height;
        setTopOffset(onTop ? offset : 0);
        return onTop;
    }
    function handleEvent(e) {
        if (root.current && root.current.contains(e.target)) {
            return;
        }
        setOpen(false);
        onFilterChange("");
        document.removeEventListener("click", handleEvent, false);
    }
    function checkKey(e) {
        if (e.keyCode === keyCodes_1.KeyCodes.escape) {
            setOpen(false);
            onFilterChange("");
        }
        if (e.keyCode === keyCodes_1.KeyCodes.downArrow && options.length !== 0) {
            if (!autocompleteSelectList.current) {
                return;
            }
            var offsetIdx = Math.min((visibleItems || 3) - 1, offsetIndex + 1);
            var selectedIdx = Math.min(selectedIndex + 1, options.length - 1);
            setOffsetIndex(offsetIdx);
            if (offsetIdx >= 2) {
                autocompleteSelectList.current.scrollTop =
                    (selectedIdx - 2) * itemHeight;
            }
            setSelectedIndex(selectedIdx);
            e.preventDefault();
            return false;
        }
        if (e.keyCode === keyCodes_1.KeyCodes.upArrow && options.length !== 0) {
            if (!autocompleteSelectList.current) {
                return;
            }
            var offsetIdx = Math.max(offsetIndex - 1, 0);
            var selectedIdx = Math.max(selectedIndex - 1, 0);
            setOffsetIndex(offsetIdx);
            if (offsetIdx === 0) {
                autocompleteSelectList.current.scrollTop = selectedIdx * itemHeight;
            }
            setSelectedIndex(selectedIdx);
            e.preventDefault();
            return false;
        }
        if (e.keyCode === keyCodes_1.KeyCodes.enter && options.length !== 0) {
            var selectedValue = options[selectedIndex];
            handleSelection(selectedValue);
            e.preventDefault();
            return false;
        }
    }
    function getNoResults(search, message) {
        if (!message) {
            return "No results...";
        }
        if (utils_1.utils.object.isFunction(message)) {
            return message(search);
        }
        return message;
    }
    function checkToFilter(query) {
        if (onFilterChange) {
            onFilterChange(query);
        }
    }
    function buttonClick() {
        if (options.length !== 0) {
            var selectedValue = options[selectedIndex];
            if (selectedValue) {
                handleSelection(selectedValue);
            }
        }
    }
    var validationMessage = formCore_1.DataValidationMessage.get(props);
    var validationMode = formCore_1.DataValidationMode.get(props);
    var classes = classHelpers_1.ClassHelpers.classNames("armstrong-input", "autocomplete-select", className, {
        "has-go-button": hasGoButton,
        disabled: disabled,
        "show-validation": validationMode !== "none" && validationMessage,
        "text-input-icon-left": props.leftIcon !== undefined
    });
    return (React.createElement(grid_1.Grid, { ref: root, title: validationMessage, onClick: function (e) { return focusInput(e); }, className: classes, "data-open": open },
        React.createElement(grid_1.Row, null,
            React.createElement(grid_1.Col, { className: "drop-down-controls" },
                React.createElement("input", tslib_1.__assign({ type: "text", ref: input }, formCore_1.DataValidationMessage.spread(validationMessage), { value: open ? filter : (value ? value.name : ''), onKeyUp: function (e) { return checkKey(e); }, onChange: function (e) {
                        return checkToFilter(formCore_1.getEventTargetAs(e).value);
                    }, placeholder: placeholder })),
                value && canClear && (React.createElement("div", { className: "clear-selected p-right-xsmall", onClick: function () {
                        onValueChange(null);
                        onFilterChange("");
                        setOpen(false);
                    } },
                    React.createElement(icon_1.Icon, { icon: icon_1.Icon.Icomoon.cross }))),
                props.leftIcon &&
                    icon_1.getIconOrJsx(props.leftIcon, { className: "left-icon" }),
                open && (React.createElement("div", { className: classHelpers_1.ClassHelpers.classNames("autocomplete-select-list-wrapper") },
                    isSearching && (React.createElement(icon_1.Icon, { className: "autocomplete-spinner fg-info", icon: icon_1.Icon.Icomoon.spinner2 })),
                    React.createElement("div", { ref: autocompleteSelectList, "data-id": "autocomplete-select-list", className: "autocomplete-select-list" + (showOnTop ? " on-top" : ""), style: {
                            maxHeight: (visibleItems || 3) * itemHeight + "px",
                            marginTop: topOffset + "px"
                        } },
                        options &&
                            options.map(function (o, i) { return (React.createElement("div", { "data-index": i, key: "dd-item-" + i, style: o.style, className: "dd-list-item" + (o.className ? " " + o.className : "") + (i === selectedIndex ? " selected" : ""), onClick: function () { return handleSelection(o); } },
                                o.prefixElement,
                                o.name)); }),
                        options.length === 0 && filter && (React.createElement("div", { className: "dd-list-item-no-select" }, getNoResults(filter, noResultsMessage))))))),
            hasGoButton && (React.createElement(grid_1.Col, { width: "auto" },
                React.createElement(button_1.Button, { className: "bg-positive", onClick: function () { return buttonClick(); } }, goButtonContent || "Go")))),
        React.createElement(validationWrapper_1.ValidationLabel, { message: validationMessage, mode: validationMode, wrapper: function (p) { return (React.createElement(grid_1.Row, { height: "auto" },
                React.createElement(grid_1.Col, tslib_1.__assign({}, p)))); } })));
};
exports.AutoCompleteSingleInput.defaultProps = {
    placeholder: "start typing to filter results..."
};
