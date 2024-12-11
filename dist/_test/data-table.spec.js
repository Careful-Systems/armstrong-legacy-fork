"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var assert = require("assert");
var react_hooks_testing_library_1 = require("react-hooks-testing-library");
var useDataTable_1 = require("../hooks/useDataTable");
var localData = [
    {
        userId: 1,
        id: 1,
        title: "delectus aut autem",
        completed: false,
    },
    {
        userId: 2,
        id: 2,
        title: "quis ut nam facilis et officia qui",
        completed: false,
    },
    {
        userId: 3,
        id: 3,
        title: "fugiat veniam minus",
        completed: false,
    },
    {
        userId: 4,
        id: 4,
        title: "et porro tempora",
        completed: true,
    },
    {
        userId: 5,
        id: 5,
        title: "et porro tempora",
        completed: true,
    },
    {
        userId: 6,
        id: 6,
        title: "delectus aut autem",
        completed: false,
    },
    {
        userId: 7,
        id: 7,
        title: "quis ut nam facilis et officia qui",
        completed: false,
    },
    {
        userId: 8,
        id: 8,
        title: "fugiat veniam minus",
        completed: false,
    },
    {
        userId: 9,
        id: 9,
        title: "et porro tempora",
        completed: true,
    },
    {
        userId: 10,
        id: 10,
        title: "et porro tempora",
        completed: true,
    },
];
// async function loadTodoData() {
//   return async (): Promise<IUseDataTableResult<ITodos>> => {
//     return { data: localData };
//   };
// }
describe("useDataTable", function () {
    /**
     * Simple Test
     */
    // ------------------------------------------------------------------------
    it("Simple", function () { return tslib_1.__awaiter(void 0, void 0, void 0, function () {
        var rowsPerPage, result;
        return tslib_1.__generator(this, function (_a) {
            rowsPerPage = 5;
            result = react_hooks_testing_library_1.renderHook(function () {
                return useDataTable_1.useDataTable({ data: localData, options: { rowsPerPage: rowsPerPage } });
            }).result;
            assert(result.current.data.length === localData.length, "Should have an data on first render");
            react_hooks_testing_library_1.act(function () { return result.current.setRowsPerPage(5); });
            assert(result.current.options.rowsPerPage === rowsPerPage, "Rows should equal " + rowsPerPage);
            assert(result.current.data.length === rowsPerPage, "Items in table should equal " + rowsPerPage);
            return [2 /*return*/];
        });
    }); });
    /**
     * Pagination Tests
     */
    // ------------------------------------------------------------------------
    it("Pagination", function () { return tslib_1.__awaiter(void 0, void 0, void 0, function () {
        var rowsPerPage, totalPages, result;
        return tslib_1.__generator(this, function (_a) {
            rowsPerPage = 5;
            totalPages = localData.length / rowsPerPage;
            result = react_hooks_testing_library_1.renderHook(function () {
                return useDataTable_1.useDataTable({
                    data: localData,
                    options: { rowsPerPage: rowsPerPage, paginate: true },
                });
            }).result;
            assert(result.current.data.length === localData.length, "Should have an data on first render");
            assert(result.current.options.rowsPerPage === rowsPerPage, "Rows should equal " + rowsPerPage);
            assert(result.current.totalPages === totalPages, "Should have " + totalPages);
            assert(result.current.currentPage === 1, "Should be on page 1");
            react_hooks_testing_library_1.act(function () { return result.current.setPage(2); });
            assert(result.current.currentPage === 2, "Should be on page 2");
            return [2 /*return*/];
        });
    }); });
    it("Pagination set rows", function () { return tslib_1.__awaiter(void 0, void 0, void 0, function () {
        var defaultRowsPerPage, newRowsPerPage, defaultTotalPages, result;
        return tslib_1.__generator(this, function (_a) {
            defaultRowsPerPage = 5;
            newRowsPerPage = 10;
            defaultTotalPages = localData.length / defaultRowsPerPage;
            result = react_hooks_testing_library_1.renderHook(function () {
                return useDataTable_1.useDataTable({
                    data: localData,
                    options: { rowsPerPage: defaultRowsPerPage, paginate: true },
                });
            }).result;
            assert(result.current.data.length === localData.length, "Should have an data on first render");
            assert(result.current.options.rowsPerPage === defaultRowsPerPage, "Rows should equal " + defaultRowsPerPage);
            assert(result.current.totalPages === defaultTotalPages, "Should have " + defaultTotalPages);
            assert(result.current.currentPage === 1, "Should be on page 1");
            react_hooks_testing_library_1.act(function () { return result.current.setRowsPerPage(newRowsPerPage); });
            assert(result.current.data.length === 10, "Should have 10 items in the table");
            return [2 /*return*/];
        });
    }); });
    /**
     * Sort Tests
     */
    // ------------------------------------------------------------------------
    it("Sort", function () { return tslib_1.__awaiter(void 0, void 0, void 0, function () {
        var result;
        return tslib_1.__generator(this, function (_a) {
            result = react_hooks_testing_library_1.renderHook(function () {
                return useDataTable_1.useDataTable({
                    data: localData,
                    options: {
                        sort: { initialSortBy: { key: "id", direction: "desc" } },
                    },
                });
            }).result;
            assert(result.current.data.length === localData.length, "Should have an data on first render");
            react_hooks_testing_library_1.act(function () { return result.current.sortDataBy("id", "desc"); });
            assert(result.current.data[0].id === 1, "Data should begin with id 1");
            react_hooks_testing_library_1.act(function () { return result.current.sortDataBy("id", "asc"); });
            assert(result.current.data[0].id === 10, "Data should begin with id 10");
            return [2 /*return*/];
        });
    }); });
    /**
     * Filter Tests
     */
    // ------------------------------------------------------------------------
    it("Filter (Additive)", function () { return tslib_1.__awaiter(void 0, void 0, void 0, function () {
        var result;
        return tslib_1.__generator(this, function (_a) {
            result = react_hooks_testing_library_1.renderHook(function () {
                return useDataTable_1.useDataTable({
                    data: localData,
                    options: {
                        filter: { filterBy: ["userId"], filtering: "additive" },
                    },
                });
            }).result;
            assert(result.current.data.length === localData.length, "Should have an data on first render");
            react_hooks_testing_library_1.act(function () { return result.current.updateFilter("add", "userId", "1"); });
            assert(result.current.data[0].userId === 1, "Should have data for userId 1");
            assert(result.current.data[0].userId !== 2, "Should not have data for userId 2");
            react_hooks_testing_library_1.act(function () { return result.current.updateFilter("add", "userId", "2"); });
            assert(result.current.data[0].userId === 1, "Should have data for userId 1");
            assert(result.current.data[1].userId === 2, "Should have data for userId 2");
            return [2 /*return*/];
        });
    }); });
    it("Filter (Subtractive)", function () { return tslib_1.__awaiter(void 0, void 0, void 0, function () {
        var result;
        return tslib_1.__generator(this, function (_a) {
            result = react_hooks_testing_library_1.renderHook(function () {
                return useDataTable_1.useDataTable({
                    data: localData,
                    options: {
                        filter: {
                            filterBy: ["userId", "completed"],
                            filtering: "subtractive",
                        },
                    },
                });
            }).result;
            assert(result.current.data.length === localData.length, "Should have an data on first render");
            react_hooks_testing_library_1.act(function () { return result.current.updateFilter("add", "completed", "true"); });
            assert(result.current.data.length === 4, "Should have 4 items");
            assert(result.current.data[0].completed && result.current.data[1].completed, "Should just have data for completed items");
            react_hooks_testing_library_1.act(function () { return result.current.updateFilter("add", "userId", "4"); });
            assert(result.current.data.length === 1, "Should have 1 items");
            return [2 /*return*/];
        });
    }); });
});
