"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var _ = require("underscore");
var UnderscoreObjectUtils = /** @class */ (function () {
    function UnderscoreObjectUtils() {
    }
    UnderscoreObjectUtils.prototype.keys = function (object) {
        return _.keys(object);
    };
    UnderscoreObjectUtils.prototype.isArray = function (object) {
        return _.isArray(object);
    };
    UnderscoreObjectUtils.prototype.isString = function (object) {
        return _.isString(object);
    };
    UnderscoreObjectUtils.prototype.isFunction = function (object) {
        return _.isFunction(object);
    };
    UnderscoreObjectUtils.prototype.isObject = function (object) {
        return _.isObject(object);
    };
    UnderscoreObjectUtils.prototype.isEqual = function (object, other) {
        return _.isEqual(object, other);
    };
    UnderscoreObjectUtils.prototype.clone = function (object) {
        return _.clone(object);
    };
    UnderscoreObjectUtils.prototype.isNullOrUndefined = function (value) {
        return _.isNull(value) || _.isUndefined(value);
    };
    UnderscoreObjectUtils.prototype.isUndefined = function (value) {
        return _.isUndefined(value);
    };
    UnderscoreObjectUtils.prototype.isNull = function (value) {
        return _.isNull(value);
    };
    return UnderscoreObjectUtils;
}());
exports.UnderscoreObjectUtils = UnderscoreObjectUtils;
