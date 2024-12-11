"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var React = require("react");
var __1 = require("../../");
var dialog_1 = require("../display/dialog");
var tableFilterDialog_1 = require("./tableFilterDialog");
var tableFilters_1 = require("./tableFilters");
var tableHeader_1 = require("./tableHeader");
var tableItem_1 = require("./tableItem");
var tableItemDropdown_1 = require("./tableItemDropdown");
var tableOptions_1 = require("./tableOptions");
var tablePagingation_1 = require("./tablePagingation");
var tableTitle_1 = require("./tableTitle");
function Table(_a) {
    var data = _a.data, filters = _a.filters, filterList = _a.filterList, columnFormatter = _a.columnFormatter, headerFormatter = _a.headerFormatter, numberOfPages = _a.numberOfPages, onChangeRowsPerPage = _a.onChangeRowsPerPage, onChangePage = _a.onChangePage, onDownload = _a.onDownload, onPrint = _a.onPrint, onSortBy = _a.onSortBy, onUpdateFilter = _a.onUpdateFilter, options = _a.options, PaginationElement = _a.paginationElement, subTitle = _a.subTitle, title = _a.title;
    var ref = React.useRef(null);
    var _b = React.useState(1), currentPage = _b[0], setCurrentPage = _b[1];
    var _c = React.useState(false), filterDialogState = _c[0], setFilterDialogState = _c[1];
    var columnKeys = React.useMemo(function () {
        return Object.keys(headerFormatter);
    }, [headerFormatter]);
    return (React.createElement("div", { className: __1.ClassHelpers.classNames("table-container") },
        React.createElement(tableTitle_1.TableTitle, { title: title, subTitle: subTitle }),
        options && (React.createElement("div", { className: __1.ClassHelpers.classNames("table-options-container") },
            React.createElement(tableFilters_1.TableFilters, { filters: filters, onRemove: function (key, value) {
                    return onUpdateFilter("remove", key, value);
                } }),
            React.createElement(tableOptions_1.TableOptions, tslib_1.__assign({}, options, { onDownload: onDownload, onPrint: function () { return onPrint(ref.current); }, onFilter: function () {
                    setFilterDialogState(true);
                } })))),
        React.createElement("table", { id: title, ref: ref, className: __1.ClassHelpers.classNames("table") },
            options && options.hideHeaders ? null : (React.createElement("thead", { className: __1.ClassHelpers.classNames("table-header") },
                React.createElement("tr", null, headerFormatter &&
                    columnKeys.map(function (header, idx) { return (React.createElement(tableHeader_1.TableHeading, { key: idx, name: header, cell: headerFormatter[header], sortBy: (onSortBy && onSortBy) || null, initSort: options &&
                            options.sort &&
                            options.sort.initialSortBy &&
                            options.sort.initialSortBy.key === header
                            ? options.sort.initialSortBy.direction
                            : null })); })))),
            React.createElement("tbody", { className: __1.ClassHelpers.classNames("table-body") }, data && data.map(function (rows, idx) {
                return (React.createElement(tableItem_1.TableItem, { key: idx, data: rows, columnKeys: columnKeys, columnFormatter: columnFormatter }));
            }))),
        !data || (data.length === 0 && "No Data"),
        onChangePage && numberOfPages && PaginationElement && (React.createElement("div", { className: __1.ClassHelpers.classNames("table-pagination") },
            React.createElement("div", { style: { flex: 0.5 } }),
            React.createElement("div", { className: __1.ClassHelpers.classNames("pagination") },
                React.createElement(tablePagingation_1.TablePagination, { currentPage: currentPage, totalPages: numberOfPages, render: function (r) {
                        return (React.createElement(PaginationElement, { active: currentPage === r.index, index: r.index, onClick: function () {
                                onChangePage(r.index);
                                setCurrentPage(r.index);
                            }, direction: (r.direction && r.direction) || null }));
                    } })),
            React.createElement(tableItemDropdown_1.TableItemDropdown, { values: [5, 10, 20, 0], onSelect: onChangeRowsPerPage }))),
        React.createElement(dialog_1.Dialog, { bodySelector: "body", isOpen: filterDialogState, onClose: function () { return setFilterDialogState(false); } }, filterList && (React.createElement(tableFilterDialog_1.TableFiltersDialog, { onUpdateFilter: onUpdateFilter, filterValues: filterList, onClear: function () { return onUpdateFilter("clear"); } })))));
}
exports.Table = Table;
