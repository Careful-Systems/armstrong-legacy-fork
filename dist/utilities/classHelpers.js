"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ClassHelpers = /** @class */ (function () {
    function ClassHelpers() {
    }
    ClassHelpers.classNames = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        var classes = [];
        for (var _a = 0, args_1 = args; _a < args_1.length; _a++) {
            var arg = args_1[_a];
            if (!arg) {
                continue;
            }
            var argType = typeof arg;
            if (argType === "string" || argType === "number") {
                classes.push(arg);
            }
            else if (Array.isArray(arg)) {
                classes.push(this.classNames.apply(null, arg));
            }
            else if (argType === "object") {
                for (var key in arg) {
                    if (this.hasOwn.call(arg, key) && arg[key]) {
                        classes.push(key);
                    }
                }
            }
        }
        return classes.join(" ");
    };
    ClassHelpers.hasOwn = {}.hasOwnProperty;
    return ClassHelpers;
}());
exports.ClassHelpers = ClassHelpers;
