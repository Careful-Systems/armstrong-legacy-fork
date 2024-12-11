"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var PropertyNameProvider = /** @class */ (function () {
    function PropertyNameProvider() {
        this.parts = [];
    }
    PropertyNameProvider.prototype.prop = function (key) {
        this.parts.push(key);
        return this;
    };
    PropertyNameProvider.prototype.index = function (index) {
        this.parts.push("" + index);
        return this;
    };
    PropertyNameProvider.prototype.resolve = function () {
        return this.parts.join(".");
    };
    return PropertyNameProvider;
}());
var PropertyPath = /** @class */ (function () {
    function PropertyPath() {
    }
    PropertyPath.for = function (b) {
        var a = b(new PropertyNameProvider());
        return a.resolve();
    };
    return PropertyPath;
}());
exports.PropertyPath = PropertyPath;
function toString(param) {
    if (typeof param === "string") {
        return param;
    }
    return PropertyPath.for(param);
}
function toDataPath(param, parentPath) {
    if (param === undefined) {
        return;
    }
    return parentPath ? parentPath + "." + toString(param) : toString(param);
}
exports.toDataPath = toDataPath;
