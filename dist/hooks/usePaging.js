"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var utils_1 = require("../utilities/utils");
var initialState = function () { return ({
    items: [],
    currentPage: undefined,
    totalRecords: undefined,
    totalPages: undefined,
    hasData: false,
    error: undefined,
}); };
function usePaging(settings) {
    var _a = React.useState(initialState()), state = _a[0], setState = _a[1];
    var _b = React.useState(false), isFetching = _b[0], setIsFetching = _b[1];
    var fetcher = React.useCallback(function (page) {
        if (page < 1 ||
            (!utils_1.utils.object.isUndefined(state.totalPages) && page > state.totalPages)) {
            return;
        }
        setIsFetching(true);
        settings
            .fetch(page, settings.pageSize)
            .then(function (v) {
            // const noReturnedItems = !v.data || v.data.length === 0
            setState({
                items: v.data,
                currentPage: page,
                totalRecords: v.totalRecords,
                totalPages: Math.ceil(v.totalRecords / settings.pageSize),
                hasData: true,
                error: undefined,
            });
            setIsFetching(false);
        })
            .catch(function (error) {
            setState({
                items: [],
                currentPage: page,
                totalRecords: state.totalRecords,
                totalPages: state.totalPages,
                hasData: false,
                error: error,
            });
            setIsFetching(false);
        });
    }, [state]);
    var gotoPage = React.useCallback(function (page) {
        if (isFetching) {
            return;
        }
        fetcher(page);
    }, [fetcher, isFetching]);
    var reload = React.useCallback(function () {
        setState(initialState());
        fetcher(1);
    }, [fetcher]);
    React.useEffect(function () {
        fetcher(1);
    }, []);
    return {
        items: state.items,
        totalPages: state.totalPages,
        totalRecords: state.totalRecords,
        currentPage: state.currentPage,
        isFetching: isFetching,
        fetchError: state.error,
        hasData: state.hasData,
        gotoPage: gotoPage,
        reload: reload,
    };
}
exports.usePaging = usePaging;
