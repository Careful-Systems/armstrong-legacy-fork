"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var icon_1 = require("../display/icon");
function TableHeading(_a) {
    var name = _a.name, cell = _a.cell, sortBy = _a.sortBy, initSort = _a.initSort;
    var _b = React.useState("asc"), sortByState = _b[0], setSortByState = _b[1];
    React.useEffect(function () {
        if (initSort && sortBy) {
            setSortByState(initSort);
        }
    }, []);
    var handleSortBy = function () {
        if (sortBy) {
            sortBy(name, sortByState);
            setSortByState(sortByState === "asc" ? "desc" : "asc");
        }
    };
    return (React.createElement("th", { onClick: handleSortBy },
        cell ? cell(name) : name,
        sortBy && (React.createElement(icon_1.Icon, { icon: sortByState === "asc"
                ? icon_1.Icon.Icomoon.arrowDown5
                : icon_1.Icon.Icomoon.arrowUp5 }))));
}
exports.TableHeading = TableHeading;
