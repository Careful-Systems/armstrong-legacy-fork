"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var React = require("react");
var itemsToDictionary = function (items, key) {
    return (items || []).reduce(function (previousItems, item) {
        var dictionaryKey = typeof key === "function" ? key(item) : item[key];
        previousItems[dictionaryKey] = item;
        return previousItems;
    }, {});
};
var initialState = function (initialItems) { return ({
    items: initialItems,
    nextPageToken: undefined,
    hasFinished: false,
    hasData: false,
    error: undefined
}); };
function useInfinitePaging(settings) {
    var _this = this;
    var _a = React.useState(initialState(itemsToDictionary(settings.initialItems, settings.key))), state = _a[0], setState = _a[1];
    var _b = React.useState(false), isFetching = _b[0], setIsFetching = _b[1];
    var addItems = React.useCallback(function (currentItems, newItems) { return (tslib_1.__assign(tslib_1.__assign({}, currentItems), itemsToDictionary(newItems, settings.key))); }, [settings.key]);
    var fetcher = React.useCallback(function (currentItems, fetchPageToken, isReloading) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
        var isInitial, response, noReturnedItems, responseSmallerThanPageSize, items, error_1;
        return tslib_1.__generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    isInitial = fetchPageToken === settings.firstPageToken;
                    setIsFetching(true);
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, settings.fetch(fetchPageToken)];
                case 2:
                    response = _a.sent();
                    noReturnedItems = !response || !response.data || response.data.length === 0;
                    responseSmallerThanPageSize = settings.pageSize && response.data.length < settings.pageSize;
                    items = noReturnedItems
                        ? currentItems
                        : addItems(isInitial ? (isReloading ? {} : itemsToDictionary(settings.initialItems, settings.key)) : currentItems, response.data);
                    setState({
                        items: items,
                        nextPageToken: response.nextPageToken,
                        hasFinished: noReturnedItems || responseSmallerThanPageSize || !response.nextPageToken,
                        hasData: true,
                        error: undefined
                    });
                    setIsFetching(false);
                    if (settings.onFetched && response) {
                        settings.onFetched(response.data);
                    }
                    return [3 /*break*/, 4];
                case 3:
                    error_1 = _a.sent();
                    // tslint:disable-next-line: no-console
                    console.error(error_1);
                    setState(tslib_1.__assign(tslib_1.__assign({}, state), { error: error_1 }));
                    setIsFetching(false);
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    }); }, [state, settings.firstPageToken, addItems]);
    var loadMore = React.useCallback(function () { return tslib_1.__awaiter(_this, void 0, void 0, function () {
        return tslib_1.__generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (isFetching || state.hasFinished) {
                        return [2 /*return*/];
                    }
                    return [4 /*yield*/, fetcher(state.items, state.nextPageToken)];
                case 1:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    }); }, [fetcher, isFetching]);
    /** reload the state  */
    var reload = React.useCallback(function () { return tslib_1.__awaiter(_this, void 0, void 0, function () {
        return tslib_1.__generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    setState(tslib_1.__assign(tslib_1.__assign({}, initialState(itemsToDictionary(settings.initialItems, settings.key))), { items: state.items }));
                    return [4 /*yield*/, fetcher({}, settings.firstPageToken, true)];
                case 1:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    }); }, [fetcher]);
    /**
     * adds or replaces an array of new items, matched by a specified key
     *
     * @param key the key to check if the item is already in state
     * @param replacements the new items to insert into the array
     */
    var insert = React.useCallback(function (replacements) {
        var newState = tslib_1.__assign({}, state);
        newState.items = addItems(newState.items, replacements);
        setState(newState);
    }, [state]);
    var remove = React.useCallback(function (value) {
        var newState = tslib_1.__assign({}, state);
        delete newState.items[value];
        setState(newState);
    }, [state]);
    React.useEffect(function () {
        fetcher({}, settings.firstPageToken);
    }, []);
    var returnItems = React.useMemo(function () { return Object.keys(state.items).map(function (key) { return state.items[key]; }); }, [state]);
    return {
        items: returnItems,
        isFetching: isFetching,
        fetchError: state.error,
        hasData: state.hasData,
        hasFinished: state.hasFinished,
        loadMore: loadMore,
        reload: reload,
        insert: insert,
        remove: remove
    };
}
exports.useInfinitePaging = useInfinitePaging;
