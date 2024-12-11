"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var utils_1 = require("../../../utilities/utils");
function addValue(values, item) {
    if (!values) {
        return [item];
    }
    return tslib_1.__spreadArrays(values, [item]).sort();
}
function removeValue(values, item) {
    if (!values) {
        return [];
    }
    return utils_1.utils.array.filter(values, function (i) { return i !== item; });
}
function arrayIncludesValue(values, item) {
    return !!values && values.indexOf && values.indexOf(item) > -1;
}
exports.arrayIncludesValue = arrayIncludesValue;
function arrayToggleItem(values, item) {
    if (!arrayIncludesValue(values, item)) {
        return addValue(values, item);
    }
    return removeValue(values, item);
}
exports.arrayToggleItem = arrayToggleItem;
