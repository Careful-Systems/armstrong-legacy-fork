"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Formatting = /** @class */ (function () {
    function Formatting() {
    }
    Formatting.twoDigitNumber = function (value) {
        return value > 9 ? value.toString() : "0" + value;
    };
    return Formatting;
}());
exports.Formatting = Formatting;
