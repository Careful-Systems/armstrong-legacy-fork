"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var classHelpers_1 = require("./classHelpers");
var LayoutHelpers = /** @class */ (function () {
    function LayoutHelpers() {
    }
    LayoutHelpers.GetAlignmentClasses = function (vertical, horizontal) {
        var classes = [];
        if (vertical) {
            classes.push("align-con-v-" + vertical);
        }
        if (horizontal) {
            classes.push("align-con-h-" + horizontal);
        }
        return classHelpers_1.ClassHelpers.classNames(classes);
    };
    return LayoutHelpers;
}());
exports.LayoutHelpers = LayoutHelpers;
