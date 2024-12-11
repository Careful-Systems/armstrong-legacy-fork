"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var arrayUtils_1 = require("./underscore/arrayUtils");
var objectUtils_1 = require("./underscore/objectUtils");
var Utils = /** @class */ (function () {
    function Utils(object, array) {
        this.object = object;
        this.array = array;
    }
    return Utils;
}());
exports.utils = new Utils(new objectUtils_1.UnderscoreObjectUtils(), new arrayUtils_1.UnderscoreArrayUtils());
