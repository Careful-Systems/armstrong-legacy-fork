"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var calendarUtils_1 = require("../utilities/calendarUtils");
exports.setLocale = function (locale) {
    calendarUtils_1.calendarUtils.locale.setLocale(locale);
};
exports.isLocaleSet = function () { return calendarUtils_1.calendarUtils.locale.isLocaleSet(); };
