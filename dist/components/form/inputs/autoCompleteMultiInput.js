"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var React = require("react");
var usePrevious_1 = require("../../../hooks/usePrevious");
var classHelpers_1 = require("../../../utilities/classHelpers");
var keyCodes_1 = require("../../../utilities/keyCodes");
var utils_1 = require("../../../utilities/utils");
var icon_1 = require("../../display/icon");
var grid_1 = require("../../layout/grid");
var formCore_1 = require("../formCore");
var validationWrapper_1 = require("../validationWrapper");
// export interface IAutoCompleteOption {
//   id: number | string;
//   name: string;
//   data?: any;
//   className?: string;
//   style?: React.CSSProperties;
//   prefixElement?: React.ReactNode;
// }
exports.AutoCompleteMultiInput = function (props) {
    var filter = props.filter, onFilterChange = props.onFilterChange, options = props.options, value = props.value, onValueChange = props.onValueChange, visibleItems = props.visibleItems, className = props.className, hasGoButton = props.hasGoButton, disabled = props.disabled, placeholder = props.placeholder, canClear = props.canClear, isSearching = props.isSearching, noResultsMessage = props.noResultsMessage;
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
        if (!e) {
            handleFocus();
        }
        else if (!open && !formCore_1.getEventTargetAs(e).classList.contains("clear-selected")) {
            handleFocus();
        }
    }
    function shouldShowOnTop() {
        var height = (itemHeight * 3) + 50;
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
        var offset = -inputRect.height * 2;
        setTopOffset(onTop ? offset : inputRect.height);
        return onTop;
    }
    function handleFocus() {
        setOpen(true);
        setShowOnTop(shouldShowOnTop());
        document.addEventListener("click", handleEvent, false);
    }
    function handleEvent(e) {
        if (e.target.classList.contains("multi-select-item-part")) {
            return;
        }
        if (root.current && root.current.contains(e.target)) {
            return;
        }
        setOpen(false);
        onFilterChange("");
        document.removeEventListener("click", handleEvent, false);
    }
    function handleSelection(selected) {
        if (onValueChange) {
            if (utils_1.utils.array.some(value, function (ddo) { return ddo.id === selected.id; })) {
                onValueChange(utils_1.utils.array.reject(value, function (ddo) { return ddo.id === selected.id; }), selected, 'remove');
            }
            else {
                onValueChange(tslib_1.__spreadArrays(value, [selected]), selected, 'add');
            }
        }
        if (input.current) {
            input.current.focus();
        }
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
                autocompleteSelectList.current.scrollTop = (selectedIdx - 2) * itemHeight;
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
                autocompleteSelectList.current.scrollTop = (selectedIdx) * itemHeight;
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
    function checkToFilter(query) {
        if (onFilterChange) {
            onFilterChange(query);
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
    var validationMessage = formCore_1.DataValidationMessage.get(props);
    var validationMode = formCore_1.DataValidationMode.get(props);
    var classes = classHelpers_1.ClassHelpers.classNames("armstrong-input", "autocomplete-select", className, {
        "has-multiple-options": value.length !== 0,
        "has-go-button": hasGoButton,
        "disabled": disabled,
        "show-validation": (validationMode !== "none" && validationMessage),
        "text-input-icon-left": props.leftIcon !== undefined
    });
    return (React.createElement(grid_1.Grid, { ref: root, title: validationMessage, onClick: function (e) { return focusInput(e); }, className: classes, "data-open": open },
        React.createElement(grid_1.Row, null,
            React.createElement(grid_1.Col, { className: "drop-down-controls" },
                props.leftIcon &&
                    icon_1.getIconOrJsx(props.leftIcon, { className: "left-icon" }),
                React.createElement(grid_1.Grid, { className: "autocomplete-value-display" },
                    React.createElement(grid_1.Row, null,
                        React.createElement(grid_1.Col, null,
                            value &&
                                React.createElement("div", { className: "selected-value-wrapper" }, value.map(function (ddo) { return React.createElement("div", { key: "multi-select-item-" + ddo.id, className: "multi-select-item multi-select-item-part" + (ddo.className ? " " + ddo.className : ""), onClick: function () { return handleSelection(ddo); } },
                                    ddo.name,
                                    React.createElement(icon_1.Icon, { className: "multi-select-item-part", icon: icon_1.Icon.Icomoon.cross })); })),
                            value.length === 0 &&
                                React.createElement("div", { className: "placeholder" },
                                    "\u00A0",
                                    React.createElement("div", { className: "placeholder-value" }, !open && placeholder))),
                        value.length !== 0 && canClear &&
                            React.createElement(grid_1.Col, { width: "auto", className: "clear-selected p-right-xsmall", onClick: function () {
                                    onValueChange([], null, null);
                                    onFilterChange("");
                                    setOpen(false);
                                } },
                                React.createElement(icon_1.Icon, { icon: icon_1.Icon.Icomoon.cross })))),
                open &&
                    React.createElement("div", { className: classHelpers_1.ClassHelpers.classNames("autocomplete-select-list-wrapper", "multi-select") },
                        React.createElement("input", tslib_1.__assign({ type: "text" }, formCore_1.DataValidationMessage.spread(validationMessage), { ref: input, style: { marginTop: "" + (showOnTop && topOffset + "px") }, value: filter, onKeyUp: function (e) { return checkKey(e); }, onChange: function (e) { return checkToFilter(formCore_1.getEventTargetAs(e).value); }, placeholder: placeholder })),
                        isSearching && React.createElement(icon_1.Icon, { className: "autocomplete-spinner fg-info", icon: icon_1.Icon.Icomoon.spinner2 }),
                        React.createElement("div", { "data-id": "autocomplete-select-list", className: "autocomplete-select-list" + (showOnTop ? " on-top" : ""), style: { maxHeight: (visibleItems || 3) * itemHeight + "px", marginTop: topOffset + "px" } },
                            options && options.map(function (o, i) {
                                return React.createElement("div", { "data-index": i, key: "dd-item-" + i, style: o.style, className: "dd-list-item" + (o.className ? " " + o.className : "") + (i === selectedIndex ? " selected" : "") + ((utils_1.utils.array.some(value, function (ddo) { return ddo.id === o.id; })) ? " in-selected-list" : ""), onClick: function () { return handleSelection(o); } },
                                    o.prefixElement,
                                    o.name);
                            }),
                            options.length === 0 && filter && React.createElement("div", { className: "dd-list-item-no-select" }, getNoResults(filter, noResultsMessage)))))),
        React.createElement(validationWrapper_1.ValidationLabel, { message: validationMessage, mode: validationMode, wrapper: function (p) { return React.createElement(grid_1.Row, { height: "auto" },
                React.createElement(grid_1.Col, tslib_1.__assign({}, p))); } })));
};
exports.AutoCompleteMultiInput.defaultProps = {
    placeholder: "start typing to filter results...",
};
