"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var __1 = require("../..");
var icon_1 = require("../display/icon");
function TableFilters(_a) {
    var filters = _a.filters, onRemove = _a.onRemove;
    return (React.createElement("div", null, filters && filters.map(function (filter, index) {
        return (React.createElement(__1.Button, { key: "filter-button-" + index, leftIcon: icon_1.Icon.Icomoon.cross, rounded: true, onClick: function () { return onRemove(filter.key, filter.value); } },
            filter.key,
            " ",
            filter.value));
    })));
}
exports.TableFilters = TableFilters;
