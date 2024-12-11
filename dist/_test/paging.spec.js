"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var assert = require("assert");
var react_hooks_testing_library_1 = require("react-hooks-testing-library");
var usePaging_1 = require("../hooks/usePaging");
var utils_1 = require("../utilities/utils");
function getFetcher(totalRecords) {
    var _this = this;
    var results = utils_1.utils.array.range(0, totalRecords).map(function (i) { return "item_" + i; });
    return function (page, pageSize) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
        return tslib_1.__generator(this, function (_a) {
            return [2 /*return*/, { data: utils_1.utils.array.getPage(results, page, pageSize), totalRecords: results.length }];
        });
    }); };
}
describe("usePaging", function () {
    it("Basic", function () { return tslib_1.__awaiter(void 0, void 0, void 0, function () {
        var pageSize, totalRecords, totalPages, _a, result, waitForNextUpdate;
        return tslib_1.__generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    pageSize = 5;
                    totalRecords = 29;
                    totalPages = 6;
                    _a = react_hooks_testing_library_1.renderHook(function () { return usePaging_1.usePaging({ fetch: getFetcher(totalRecords), pageSize: pageSize }); }), result = _a.result, waitForNextUpdate = _a.waitForNextUpdate;
                    assert(result.current.items.length === 0, "Should have an empty items array on first render");
                    assert(result.current.isFetching, "Should indicate isFetching on first render");
                    assert(!result.current.hasData, "Should indicate no data on first render");
                    assert(result.current.totalPages === undefined, "Should indicate undefined total paged on first render");
                    assert(result.current.totalRecords === undefined, "Should indicate undefined total records on first render");
                    assert(result.current.currentPage === undefined, "Should indicate undefined current page on first render");
                    return [4 /*yield*/, waitForNextUpdate()];
                case 1:
                    _b.sent();
                    assert(result.current.items.length === pageSize, "Should have an items array on first update");
                    assert(!result.current.isFetching, "Should indicate not isFetching on first update");
                    assert(result.current.hasData, "Should indicate has data on first update");
                    assert(result.current.totalPages === totalPages, "Should indicate total paged on first update");
                    assert(result.current.totalRecords === totalRecords, "Should indicate total records on first update");
                    assert(result.current.currentPage === 1, "Should indicate current page 1 on first update");
                    react_hooks_testing_library_1.act(function () { return result.current.gotoPage(6); });
                    assert(result.current.items.length === pageSize, "Should have an items array on goto page");
                    assert(result.current.isFetching, "Should indicate isFetching on goto page");
                    assert(result.current.hasData, "Should indicate has data on goto page");
                    assert(result.current.totalPages === totalPages, "Should indicate total paged on goto page");
                    assert(result.current.totalRecords === totalRecords, "Should indicate total records on goto page");
                    assert(result.current.currentPage === 1, "Should indicate current page 1 on goto page");
                    return [4 /*yield*/, waitForNextUpdate()];
                case 2:
                    _b.sent();
                    assert(result.current.items.length === 4, "Should have an items array on last page");
                    assert(!result.current.isFetching, "Should indicate not isFetching on last page");
                    assert(result.current.hasData, "Should indicate has data on last page");
                    assert(result.current.totalPages === totalPages, "Should indicate total paged on last page");
                    assert(result.current.totalRecords === totalRecords, "Should indicate total records on last page");
                    assert(result.current.currentPage === 6, "Should indicate current page 6 on last page");
                    return [2 /*return*/];
            }
        });
    }); });
});
