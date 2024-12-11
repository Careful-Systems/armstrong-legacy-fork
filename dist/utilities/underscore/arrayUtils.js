"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var _ = require("underscore");
var UnderscoreArrayUtils = /** @class */ (function () {
    function UnderscoreArrayUtils() {
    }
    UnderscoreArrayUtils.prototype.first = function (items, n) {
        return _.first(items, n);
    };
    UnderscoreArrayUtils.prototype.find = function (items, func) {
        return _.find(items, func);
    };
    UnderscoreArrayUtils.prototype.each = function (items, func) {
        _.each(items, func);
    };
    UnderscoreArrayUtils.prototype.every = function (items, func) {
        return _.every(items, func);
    };
    UnderscoreArrayUtils.prototype.some = function (items, func) {
        return _.some(items, func);
    };
    UnderscoreArrayUtils.prototype.filterByArray = function (items, filterItems, filterKey) {
        return _.filter(items, function (item, index) {
            return filterItems.indexOf(item[filterKey]) !== -1;
        });
    };
    UnderscoreArrayUtils.prototype.reduce = function (items, func, memo) {
        return _.reduce(items, func, memo);
    };
    UnderscoreArrayUtils.prototype.reject = function (items, func) {
        return _.reject(items, func);
    };
    UnderscoreArrayUtils.prototype.filter = function (items, func) {
        return _.filter(items, func);
    };
    UnderscoreArrayUtils.prototype.range = function (start, stop, step, fill) {
        if (step === void 0) { step = 1; }
        return _.range(start, fill ? stop + 1 : stop, step);
    };
    UnderscoreArrayUtils.prototype.getPage = function (items, pageNumber, pageSize) {
        var startIndex = (pageNumber - 1) * pageSize;
        var endIndex = startIndex + pageSize;
        return this.filter(items, function (__, i) { return i >= startIndex && i < endIndex; });
    };
    return UnderscoreArrayUtils;
}());
exports.UnderscoreArrayUtils = UnderscoreArrayUtils;
