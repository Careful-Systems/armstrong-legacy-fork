"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var moment = require("moment");
var utils_1 = require("../utils");
var MomentTimeUtils = /** @class */ (function () {
    function MomentTimeUtils() {
    }
    MomentTimeUtils.prototype.getParts = function (time) {
        var d = moment(time, "HH:mm", false);
        if (!d.isValid()) {
            return;
        }
        return { hours: d.hour(), minutes: d.minute() };
    };
    MomentTimeUtils.prototype.getMinutes = function (minuteStep) {
        if (minuteStep === void 0) { minuteStep = 1; }
        return utils_1.utils.array.range(0, 60, minuteStep);
    };
    MomentTimeUtils.prototype.getHours = function () {
        return utils_1.utils.array.range(0, 24);
    };
    return MomentTimeUtils;
}());
exports.MomentTimeUtils = MomentTimeUtils;
