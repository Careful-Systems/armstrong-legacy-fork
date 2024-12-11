"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var dates_1 = require("./moment/dates");
var times_1 = require("./moment/times");
var CalendarUtils = /** @class */ (function () {
    function CalendarUtils(year, month, day, datePart, date, locale, time) {
        this.year = year;
        this.month = month;
        this.day = day;
        this.datePart = datePart;
        this.date = date;
        this.locale = locale;
        this.time = time;
    }
    return CalendarUtils;
}());
exports.calendarUtils = new CalendarUtils(new dates_1.MomentYearUtils(), new dates_1.MomentMonthUtils(), new dates_1.MomentDayUtils(), new dates_1.MomentDatePartUtils(), new dates_1.MomentDateUtils(), new dates_1.MomentLocaleUtils(), new times_1.MomentTimeUtils());
