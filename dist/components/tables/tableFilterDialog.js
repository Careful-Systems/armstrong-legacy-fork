"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var __1 = require("../..");
function TableFiltersDialog(_a) {
    var filterValues = _a.filterValues, onClear = _a.onClear, onUpdateFilter = _a.onUpdateFilter;
    return (React.createElement("div", null,
        React.createElement("div", { className: __1.ClassHelpers.classNames("table-filters") },
            React.createElement("div", { className: __1.ClassHelpers.classNames("title") }, "Filters"),
            React.createElement(__1.Button, { className: __1.ClassHelpers.classNames("table-reset-filter-btn"), onClick: onClear }, "Clear")),
        filterValues.map(function (f, index) {
            return (React.createElement("div", { key: index },
                f.name,
                React.createElement("select", { onChange: function (e) { return onUpdateFilter("add", f.name, e.target.value); } },
                    f.values.map(function (ff, idx) {
                        switch (typeof ff) {
                            case "boolean": {
                                var val = ff ? "true" : "false";
                                return React.createElement("option", { key: idx, label: val, value: val });
                            }
                            default: {
                                var val = ff;
                                return React.createElement("option", { key: idx, label: val, value: val });
                            }
                        }
                    }),
                    "}")));
        })));
}
exports.TableFiltersDialog = TableFiltersDialog;
