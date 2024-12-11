"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var React = require("react");
var classHelpers_1 = require("../../utilities/classHelpers");
var utils_1 = require("../../utilities/utils");
var icon_1 = require("./../display/icon");
exports.TabControl = function (props) {
    var _a = React.useState(0), selectedTabIndex = _a[0], setSelectedTabIndex = _a[1];
    var className = props.className, children = props.children, onTabChanged = props.onTabChanged, defaultSelectedIndex = props.defaultSelectedIndex, forceSelectedIndex = props.forceSelectedIndex, attrs = tslib_1.__rest(props, ["className", "children", "onTabChanged", "defaultSelectedIndex", "forceSelectedIndex"]);
    var changeTab = React.useCallback(function (newIndex) { return function () {
        var tabChanged = function () {
            if (onTabChanged) {
                onTabChanged(newIndex);
            }
        };
        if (forceSelectedIndex === undefined) {
            setSelectedTabIndex(newIndex);
            tabChanged();
        }
        else {
            tabChanged();
        }
    }; }, [onTabChanged, forceSelectedIndex, setSelectedTabIndex]);
    React.useEffect(function () {
        if (defaultSelectedIndex !== undefined && forceSelectedIndex === undefined) {
            setSelectedTabIndex(defaultSelectedIndex);
        }
    }, []);
    var getSelectedIndex = React.useCallback(function () {
        if (forceSelectedIndex !== undefined) {
            return forceSelectedIndex;
        }
        return selectedTabIndex;
    }, [forceSelectedIndex, selectedTabIndex]);
    var tabAlignment = props.tabAlignment;
    if (!tabAlignment) {
        tabAlignment = "left";
    }
    var classes = React.useMemo(function () { return classHelpers_1.ClassHelpers.classNames(className, "tab-control", {
        "tabs-right": tabAlignment === "right",
        "tabs-left": tabAlignment === "left",
    }); }, [className, tabAlignment]);
    var filteredChildren = utils_1.utils.array.filter(React.Children.toArray(children), function (c) { return !!c; });
    var selectedIndex = getSelectedIndex();
    return (React.createElement("div", tslib_1.__assign({}, attrs, { className: classes }),
        React.createElement("div", { className: "tab-control-header" }, filteredChildren.map(function (c, i) { return (React.createElement("button", { key: i, className: "tab-item-header" + (selectedIndex === i ? " selected" : ""), onClick: changeTab(i) },
            c.props.icon ? React.createElement(icon_1.Icon, { className: "m-right-xsmall", icon: c.props.icon }) : null,
            c.props.title)); })),
        filteredChildren[selectedIndex]));
};
exports.TabItem = function (props) {
    var className = props.className, children = props.children, attrs = tslib_1.__rest(props, ["className", "children"]);
    return React.createElement("div", tslib_1.__assign({}, attrs, { className: "tab-content" + (className ? " " + className : "") }), children);
};
