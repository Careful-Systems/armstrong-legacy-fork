"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var __1 = require("../..");
function TableItem(_a) {
    var data = _a.data, columnFormatter = _a.columnFormatter, columnKeys = _a.columnKeys, onClick = _a.onClick;
    return (React.createElement("tr", { 
        // onClick={() => onClick(data)}
        className: __1.ClassHelpers.classNames("table-row") }, columnKeys.map(function (col, index) {
        return (React.createElement("td", { key: index }, columnFormatter && columnFormatter[col]
            ? columnFormatter[col](data[col], data)
            : data[col]));
    })));
}
exports.TableItem = TableItem;
