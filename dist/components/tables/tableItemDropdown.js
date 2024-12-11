"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var __1 = require("../..");
exports.TableItemDropdown = function (_a) {
    var values = _a.values, onSelect = _a.onSelect;
    return (React.createElement("div", { className: __1.ClassHelpers.classNames("table-item-dropdown") },
        React.createElement("div", null, "Rows per Page"),
        React.createElement("select", { onChange: function (e) { return onSelect(Number(e.target.value)); } }, values.map(function (value) { return (React.createElement("option", { key: value, value: Number(value), label: value !== 0 ? value.toString() : "all" })); }))));
};
