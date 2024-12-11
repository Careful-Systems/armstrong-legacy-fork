"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var assert = require("assert");
var react_hooks_testing_library_1 = require("react-hooks-testing-library");
var useInfinitePaging_1 = require("../hooks/useInfinitePaging");
var utils_1 = require("../utilities/utils");
function getFetcher(totalRecords, pageSize) {
    var _this = this;
    var results = utils_1.utils.array.range(0, totalRecords).map(function (i) { return "item_" + i; });
    var maxPage = Math.ceil(totalRecords / pageSize);
    return function (page) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
        var nextPageToken;
        return tslib_1.__generator(this, function (_a) {
            nextPageToken = page + 1;
            if (nextPageToken > maxPage) {
                nextPageToken = undefined;
            }
            return [2 /*return*/, { data: utils_1.utils.array.getPage(results, page, pageSize), nextPageToken: nextPageToken }];
        });
    }); };
}
describe("useInfinitePaging", function () {
    it("Basic", function () { return tslib_1.__awaiter(void 0, void 0, void 0, function () {
        var pageSize, totalRecords, _a, result, waitForNextUpdate;
        return tslib_1.__generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    pageSize = 5;
                    totalRecords = 9;
                    _a = react_hooks_testing_library_1.renderHook(function () { return useInfinitePaging_1.useInfinitePaging({ fetch: getFetcher(totalRecords, pageSize), firstPageToken: 1, key: function (item) { return item[0]; } }); }), result = _a.result, waitForNextUpdate = _a.waitForNextUpdate;
                    assert(result.current.items.length === 0, "Should have an empty items array on first render");
                    assert(result.current.isFetching, "Should indicate isFetching on first render");
                    assert(!result.current.hasData, "Should indicate no data on first render");
                    assert(result.current.fetchError === undefined, "Should indicate no fetch error on first render");
                    assert(!result.current.hasFinished, "Should indicate not finished on first render");
                    return [4 /*yield*/, waitForNextUpdate()];
                case 1:
                    _b.sent();
                    assert(result.current.items.length === pageSize, "Should have an items array on first update");
                    assert(!result.current.isFetching, "Should indicate not isFetching on first update");
                    assert(result.current.hasData, "Should indicate has data on first update");
                    assert(result.current.fetchError === undefined, "Should indicate no fetch error on first update");
                    assert(!result.current.hasFinished, "Should indicate not finished on first update");
                    react_hooks_testing_library_1.act(function () { return result.current.loadMore(); });
                    assert(result.current.items.length === pageSize, "Should have an items array on load more");
                    assert(result.current.isFetching, "Should indicate isFetching on load more");
                    assert(result.current.hasData, "Should indicate has data on load more");
                    assert(result.current.fetchError === undefined, "Should indicate no fetch error on load more");
                    assert(!result.current.hasFinished, "Should indicate not finished on load more");
                    return [4 /*yield*/, waitForNextUpdate()];
                case 2:
                    _b.sent();
                    assert(result.current.items.length === totalRecords, "Should have an items array on loading more");
                    assert(!result.current.isFetching, "Should indicate not isFetching on loading more");
                    assert(result.current.hasData, "Should indicate has data on loading more");
                    assert(result.current.fetchError === undefined, "Should indicate no fetch error on loading more");
                    assert(result.current.hasFinished, "Should indicate finished on loading more");
                    return [2 /*return*/];
            }
        });
    }); });
});
