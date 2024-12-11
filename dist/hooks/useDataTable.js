"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var React = require("react");
var _ = require("underscore");
var filterReducer = function (state, action) {
    switch (action.type) {
        case "add": {
            if (state.findIndex(function (f) { return f.key === action.key && f.value === action.value; }) === -1) {
                return _.flatten([state, { key: action.key, value: action.value }]);
            }
            else {
                return state;
            }
        }
        case "remove":
            return state.filter(function (f) { return f.key !== action.key && f.value !== action.value; });
        case "clear":
            return [];
        default:
            return state;
    }
};
var initialState = function () { return ({
    currentPage: 1,
    data: [],
    error: undefined,
    rowsPerPage: undefined,
    sortParameters: { key: undefined, direction: "desc" },
    totalRows: undefined,
    totalPages: undefined,
}); };
function useDataTable(_a) {
    var _this = this;
    var data = _a.data, fetch = _a.fetch, options = _a.options;
    var _b = React.useState(initialState()), state = _b[0], setState = _b[1];
    var storedData = React.useRef([]);
    var _c = React.useState(true), isLoading = _c[0], setIsLoading = _c[1];
    var _d = React.useState([]), filterList = _d[0], setFilterList = _d[1];
    var _e = React.useReducer(filterReducer, []), filters = _e[0], dispatchFilterAction = _e[1];
    /**
     * Initialize
     */
    // ---------------------------------------------------------
    React.useMemo(function () {
        if (!options) {
            return null;
        }
        var rowsPerPage = options.rowsPerPage || 5;
        var sortParameters = (options.sort &&
            options.sort.initialSortBy &&
            options.sort.initialSortBy) ||
            null;
        setState(function (oldState) { return (tslib_1.__assign(tslib_1.__assign({}, oldState), { rowsPerPage: rowsPerPage,
            sortParameters: sortParameters })); });
    }, []);
    /**
     * On Mount Hook
     */
    // ---------------------------------------------------------
    React.useEffect(function () {
        storedData.current = data || [];
        var totalPages = calculatePagination(storedData.current.length, state.rowsPerPage, 1).totalPages;
        var newData = storedData.current.slice(0, state.rowsPerPage);
        setState(function (oldState) { return (tslib_1.__assign(tslib_1.__assign({}, oldState), { data: newData, rowsPerPage: state.rowsPerPage, totalPages: totalPages, currentPage: 1 })); });
    }, [data]);
    /**
     * On Mount Hook with fetch
     */
    // ---------------------------------------------------------
    React.useEffect(function () {
        if (fetch) {
            setIsLoading(true);
            fetch()
                .then(function (newData) {
                storedData.current = newData.data || [];
                var totalPages = calculatePagination(storedData.current.length, state.rowsPerPage, 1).totalPages;
                var sortParameters = (options.sort &&
                    options.sort.initialSortBy &&
                    options.sort.initialSortBy) ||
                    null;
                setState(function (oldState) { return (tslib_1.__assign(tslib_1.__assign({}, oldState), { sortParameters: sortParameters,
                    totalPages: totalPages, totalRows: storedData.current.length, data: (sortParameters &&
                        sort(storedData.current, sortParameters.key, "asc")) ||
                        storedData.current.slice(0, state.rowsPerPage) })); });
                setIsLoading(false);
            })
                .catch(function (error) {
                setState(function (oldState) { return (tslib_1.__assign(tslib_1.__assign({}, oldState), { error: error })); });
                setIsLoading(false);
            });
        }
    }, [fetch]);
    /**
     * Retrive all the Filterable Data
     */
    // ---------------------------------------------------------
    React.useEffect(function () {
        if (storedData.current.length > 0 &&
            options.filter &&
            options.filter.filterBy) {
            var keys = Object.keys(storedData.current[0]);
            if (options.filter.filterBy.length > 0) {
                var newFilterList = keys
                    .filter(function (f) { return options.filter.filterBy.includes(f); })
                    .map(function (m) {
                    return {
                        name: m,
                        values: _.uniq(storedData.current, m).map(function (s) { return s[m]; }),
                    };
                });
                setFilterList(newFilterList);
            }
            else {
                var newFilterList = keys.map(function (m) {
                    return {
                        name: m,
                        values: _.uniq(storedData.current, m).map(function (s) { return s[m]; }),
                    };
                });
                setFilterList(newFilterList);
            }
        }
    }, [storedData.current]);
    /**
     * Print the Table
     */
    // ---------------------------------------------------------
    var printTable = React.useCallback(function (ref) {
        var printWindow = window.open();
        printWindow.document.write(ref.outerHTML);
        printWindow.print();
        printWindow.close();
    }, [state.data]);
    /**
     * Download the Table as CSV
     */
    // ---------------------------------------------------------
    var downloadTableAsCSV = React.useCallback(function (allData) {
        if (state.data.length > 0) {
            var items = allData ? storedData.current : state.data;
            var replacer_1 = function (key, value) { return (value === null ? "" : value); };
            var header_1 = Object.keys(items[0]);
            var csv = items.map(function (row) {
                return header_1
                    .map(function (fieldName) { return JSON.stringify(row[fieldName], replacer_1); })
                    .join(",");
            });
            csv.unshift(header_1.join(","));
            var csvString = csv.join("\r\n");
            var csvFile = new Blob([csvString], { type: "text/csv" });
            var url_1 = URL.createObjectURL(csvFile);
            var clickHandler_1 = function () {
                setTimeout(function () {
                    URL.revokeObjectURL(url_1);
                    _this.removeEventListener("click", clickHandler_1);
                }, 150);
            };
            var link = document.createElement("a");
            link.addEventListener("click", clickHandler_1, false);
            link.download = "table.csv";
            link.href = url_1;
            link.click();
        }
    }, [state.data]);
    /**
     * Filters
     *
     *
     * Add filter parameter
     */
    // ---------------------------------------------------------
    var updateFilter = React.useCallback(function (action, key, value) {
        dispatchFilterAction({ type: action, key: key, value: value });
    }, [
        state.rowsPerPage,
        state.totalRows,
        options && options.rowsPerPage,
        data,
        fetch,
        filters,
    ]);
    // Filter functions
    var additiveFilter = function (item, tFilters) {
        return tFilters.some(function (f) { return item[f.key].toString() === f.value; });
    };
    var subtractiveFilter = function (item, tFilters) {
        return tFilters.every(function (f) { return item[f.key].toString() === f.value; });
    };
    /**
     * Update the filters
     */
    // ---------------------------------------------------------
    React.useEffect(function () {
        if (filters.length > 0) {
            var filteredData_1 = storedData.current.filter(function (item) {
                return options.filter.filtering === "additive"
                    ? additiveFilter(item, filters)
                    : subtractiveFilter(item, filters);
            });
            setState(function (oldState) { return (tslib_1.__assign(tslib_1.__assign({}, oldState), { data: filteredData_1 })); });
        }
        else {
            setState(function (oldState) { return (tslib_1.__assign(tslib_1.__assign({}, oldState), { data: storedData.current })); });
        }
    }, [filters]);
    /**
     * Calculate the pagination parameters
     * @param totalRows : total length of the data array
     * @param rowsPerPage : max number of rows per page
     * @param currentPage : current page number
     */
    // ---------------------------------------------------------
    var calculatePagination = React.useCallback(function (totalRows, rowsPerPage, currentPage) {
        var startIndex = Math.ceil((currentPage - 1) * rowsPerPage);
        var endIndex = startIndex + rowsPerPage;
        var totalPages = Math.ceil(totalRows / rowsPerPage);
        return {
            totalPages: totalPages,
            startIndex: startIndex,
            endIndex: endIndex,
        };
    }, [options && options.rowsPerPage, state.rowsPerPage, state.totalRows, data, fetch]);
    /**
     * Sort the Data dependent on the criteria
     * @param key : which key to sort by
     * @param direction : which direction
     * @param currentPage : (optional) current page
     */
    // ---------------------------------------------------------
    var sort = React.useCallback(function (d, key, direction) {
        var _a = calculatePagination(d.length, state.rowsPerPage, state.currentPage), startIndex = _a.startIndex, endIndex = _a.endIndex;
        var da = direction === "asc"
            ? _.sortBy(d, key.toString())
                .reverse()
                .slice(startIndex, endIndex)
            : _.sortBy(d, key.toString()).slice(startIndex, endIndex);
        return da;
    }, [options && options.sort, state]);
    /**
     * Sort by Callback
     * @param key : which key to sort by
     * @param direction : which direction
     */
    // ---------------------------------------------------------
    var sortDataBy = React.useCallback(function (key, direction) {
        setState(function (oldState) { return (tslib_1.__assign(tslib_1.__assign({}, oldState), { data: sort(storedData.current, key, direction), sortParameters: { key: key, direction: direction } })); });
    }, [state, storedData.current]);
    /**
     * Set max rows Callback
     * @param rowsPerPage : max rows per page
     */
    // ---------------------------------------------------------
    var setRowsPerPage = React.useCallback(function (newRowsPerPage) {
        var rowsPerPage = newRowsPerPage !== 0 ? newRowsPerPage : storedData.current.length;
        var _a = calculatePagination(storedData.current.length, rowsPerPage, state.currentPage), totalPages = _a.totalPages, startIndex = _a.startIndex, endIndex = _a.endIndex;
        setState(function (oldState) { return (tslib_1.__assign(tslib_1.__assign({}, oldState), { data: storedData.current.slice(startIndex, endIndex), rowsPerPage: rowsPerPage,
            totalPages: totalPages, currentPage: state.currentPage })); });
    }, [state.totalPages, state.totalRows, state.currentPage, state.rowsPerPage]);
    /**
     * Set the desired page Callback
     * @param currentPage : desired page
     */
    // ---------------------------------------------------------
    var setPage = React.useCallback(function (currentPage) {
        var _a = calculatePagination(storedData.current.length, state.rowsPerPage, currentPage), startIndex = _a.startIndex, endIndex = _a.endIndex;
        var newData = state.sortParameters
            ? sort(storedData.current, state.sortParameters.key, state.sortParameters.direction)
            : storedData.current.slice(startIndex, endIndex);
        setState(function (oldState) { return (tslib_1.__assign(tslib_1.__assign({}, oldState), { data: newData, currentPage: currentPage })); });
    }, [state, state.currentPage, state.rowsPerPage]);
    /**
     * Update the Data Source
     * @param newData : new Data
     */
    // ---------------------------------------------------------
    var updateData = React.useCallback(function (nData) {
        storedData.current = nData || [];
        var totalPages = calculatePagination(storedData.current.length, state.rowsPerPage, 1).totalPages;
        var newData = storedData.current.slice(0, state.rowsPerPage);
        setState(function (oldState) { return (tslib_1.__assign(tslib_1.__assign({}, oldState), { data: newData, rowsPerPage: state.rowsPerPage, totalPages: totalPages, currentPage: 1 })); });
    }, [state, state.currentPage, state.rowsPerPage]);
    return {
        currentPage: state.currentPage,
        data: state.data,
        downloadTableAsCSV: downloadTableAsCSV,
        filters: filters,
        filterList: filterList,
        isLoading: isLoading,
        options: options,
        printTable: printTable,
        setRowsPerPage: setRowsPerPage,
        setPage: setPage,
        sortDataBy: sortDataBy,
        sortParameters: state.sortParameters,
        totalRows: state.totalRows,
        totalPages: state.totalPages,
        updateData: updateData,
        updateFilter: updateFilter,
    };
}
exports.useDataTable = useDataTable;
