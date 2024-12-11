"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var _ = require("underscore");
var utils_1 = require("../../utilities/utils");
exports.GO_LEFT_PAGE_INDEX = -1;
exports.GO_RIGHT_PAGE_INDEX = -2;
exports.TablePagination = function (_a) {
    var currentPage = _a.currentPage, _b = _a.pageNeighbours, pageNeighbours = _b === void 0 ? 1 : _b, Render = _a.render, totalPages = _a.totalPages;
    var _c = React.useState([]), pageNumbers = _c[0], setPageNumbers = _c[1];
    var calculatePages = React.useCallback(function (curPage) {
        var totalNumbers = pageNeighbours * 2 + 3;
        var totalBlocks = totalNumbers + 2;
        if (totalPages > totalBlocks) {
            var startPage = Math.max(2, curPage - pageNeighbours);
            var endPage = Math.min(totalPages - 1, curPage + pageNeighbours);
            var pages = utils_1.utils.array.range(startPage, endPage, 1, true);
            var hasLeftNeighbour = startPage > 2;
            var hasRightNeighbour = totalPages - endPage > 1;
            var offset = totalNumbers - (pages.length + 1);
            if (hasLeftNeighbour && !hasRightNeighbour) {
                var extraPages = utils_1.utils.array.range(startPage - offset, startPage - 1, 1, true);
                pages = _.flatten([exports.GO_LEFT_PAGE_INDEX, extraPages, pages]);
            }
            else if (!hasLeftNeighbour && hasRightNeighbour) {
                var extraPages = utils_1.utils.array.range(endPage + 1, endPage + offset, 1, true);
                pages = _.flatten([pages, extraPages, exports.GO_RIGHT_PAGE_INDEX]);
            }
            else {
                pages = _.flatten([exports.GO_LEFT_PAGE_INDEX, pages, exports.GO_RIGHT_PAGE_INDEX]);
            }
            return _.flatten([1, pages, totalPages]);
        }
        return utils_1.utils.array.range(1, totalPages, 1, true);
    }, [currentPage, totalPages]);
    React.useEffect(function () {
        setPageNumbers(calculatePages(currentPage));
    }, [currentPage, totalPages]);
    React.useEffect(function () {
        setPageNumbers(calculatePages(currentPage));
    }, []);
    var goLeft = React.useCallback(function () {
        return Math.max(0, Math.min(currentPage - pageNeighbours * 2 - 1, totalPages));
    }, [currentPage, totalPages, pageNeighbours]);
    var goRight = React.useCallback(function () {
        return Math.max(0, Math.min(currentPage + pageNeighbours * 2 + 1, totalPages));
    }, [currentPage, totalPages, pageNeighbours]);
    return (React.createElement("div", null,
        React.createElement("div", null, pageNumbers.map(function (page, index) {
            if (page === exports.GO_LEFT_PAGE_INDEX) {
                return React.createElement(Render, { key: page, index: goLeft(), direction: "left" });
            }
            else if (page === exports.GO_RIGHT_PAGE_INDEX) {
                return React.createElement(Render, { key: page, index: goRight(), direction: "right" });
            }
            else {
                return React.createElement(Render, { key: page, index: page });
            }
        }))));
};
