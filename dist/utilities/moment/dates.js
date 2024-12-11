"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var moment = require("moment");
var utils_1 = require("../utils");
function createDateType(native) {
    return native;
}
function getNativeDate(dateType) {
    return dateType;
}
function getNativeDateClone(dateType) {
    return dateType.clone();
}
var DateFormats;
(function (DateFormats) {
    DateFormats.DateWireFormat = "YYYY-MM-DD";
})(DateFormats || (DateFormats = {}));
var MomentLocaleUtils = /** @class */ (function () {
    function MomentLocaleUtils() {
        this.localeSet = false;
    }
    MomentLocaleUtils.prototype.setLocale = function (locale) {
        if (this.localeSet) {
            var previousLocal = moment.locale();
            // tslint:disable-next-line:no-console
            console.warn("Armstrong locale has already been set to " + previousLocal + ", you probably only want to set it once!");
        }
        moment.locale(locale);
        this.localeSet = true;
    };
    MomentLocaleUtils.prototype.isLocaleSet = function () { return this.localeSet; };
    ;
    return MomentLocaleUtils;
}());
exports.MomentLocaleUtils = MomentLocaleUtils;
var MomentYearUtils = /** @class */ (function () {
    function MomentYearUtils() {
    }
    MomentYearUtils.prototype.generate = function (settings) {
        var range = settings && settings.range || 110;
        var format = settings && settings.dateFormat || DateFormats.DateWireFormat;
        var currentYear = moment().year();
        var start = settings && settings.minDate ? getNativeDate(MomentDateUtils.parse(settings.minDate, format)).year() : currentYear - range;
        var stop = settings && settings.maxDate ? getNativeDate(MomentDateUtils.parse(settings.maxDate, format)).year() : currentYear + range;
        return utils_1.utils.array.range(start, stop + 1);
    };
    return MomentYearUtils;
}());
exports.MomentYearUtils = MomentYearUtils;
function monthYearCompare(month, year) {
    return (year * 100) + month;
}
var MomentDayUtils = /** @class */ (function () {
    function MomentDayUtils() {
    }
    MomentDayUtils.prototype.getMonthYear = function (month, year, settings) {
        var format = settings && settings.dateFormat || DateFormats.DateWireFormat;
        var days = MomentDayUtils.dayInMonth(month, year);
        if (settings && settings.minDate) {
            var min = MomentDateUtils.parse(settings.minDate, format);
            if (min.isValid()) {
                var mom_1 = getNativeDate(min);
                var minValue = monthYearCompare(mom_1.month(), mom_1.year());
                var value = monthYearCompare(month, year);
                if (value < minValue) {
                    days = [];
                }
                else if (minValue === value) {
                    days = utils_1.utils.array.filter(days, function (d) { return d >= mom_1.date(); });
                }
            }
        }
        if (settings && settings.maxDate) {
            var max = MomentDateUtils.parse(settings.maxDate, format);
            if (max.isValid()) {
                var mom_2 = getNativeDate(max);
                var maxValue = monthYearCompare(mom_2.month(), mom_2.year());
                var value = monthYearCompare(month, year);
                if (value > maxValue) {
                    days = [];
                }
                else if (maxValue === value) {
                    days = utils_1.utils.array.filter(days, function (d) { return d <= mom_2.date(); });
                }
            }
        }
        return days;
    };
    MomentDayUtils.range1to = function (to) {
        return utils_1.utils.array.range(1, to + 1);
    };
    MomentDayUtils.dayInMonth = function (month, year) {
        if (utils_1.utils.object.isNullOrUndefined(month)) {
            return MomentDayUtils.range1to(31);
        }
        var activeMoment = moment([utils_1.utils.object.isNullOrUndefined(year) ? 2000 : year, month, 1]);
        if (!activeMoment.isValid()) {
            return MomentDayUtils.range1to(31);
        }
        return MomentDayUtils.range1to(activeMoment.daysInMonth());
    };
    return MomentDayUtils;
}());
exports.MomentDayUtils = MomentDayUtils;
var MomentDatePartUtils = /** @class */ (function () {
    function MomentDatePartUtils() {
    }
    MomentDatePartUtils.prototype.equals = function (original, newValue) {
        return original.day === newValue.day && original.month === newValue.month && original.year === newValue.year;
    };
    MomentDatePartUtils.prototype.parse = function (date, settings) {
        var dateFormat = settings && settings.dateFormat || DateFormats.DateWireFormat;
        var d = MomentDateUtils.parse(date, dateFormat);
        if (!d.isValid()) {
            return;
        }
        var mom = getNativeDate(d);
        var parts = { day: mom.date(), month: mom.month(), year: mom.year() };
        if (settings && settings.includeDate) {
            parts.date = date;
        }
        return parts;
    };
    MomentDatePartUtils.prototype.format = function (dateParts, dateFormat) {
        if (!utils_1.utils.object.isNullOrUndefined(dateParts.day) && !utils_1.utils.object.isNullOrUndefined(dateParts.month) && !utils_1.utils.object.isNullOrUndefined(dateParts.year)) {
            var mom = moment([dateParts.year, dateParts.month, dateParts.day]);
            if (mom.isValid()) {
                return mom.format(dateFormat || DateFormats.DateWireFormat);
            }
        }
    };
    return MomentDatePartUtils;
}());
exports.MomentDatePartUtils = MomentDatePartUtils;
var MomentMonthUtils = /** @class */ (function () {
    function MomentMonthUtils() {
    }
    MomentMonthUtils.prototype.getMonthsInYear = function (year, minDate, maxDate, dateFormat) {
        var format = dateFormat || DateFormats.DateWireFormat;
        var monthValues = this.getMonthValues();
        if (minDate) {
            var min = MomentDateUtils.parse(minDate, format);
            var mom_3 = getNativeDate(min);
            if (mom_3.year() === year) {
                monthValues = utils_1.utils.array.filter(monthValues, function (d) { return d.number >= mom_3.month(); });
            }
        }
        if (maxDate) {
            var max = MomentDateUtils.parse(maxDate, format);
            var mom_4 = getNativeDate(max);
            if (mom_4.year() === year) {
                monthValues = utils_1.utils.array.filter(monthValues, function (d) { return d.number <= mom_4.month(); });
            }
        }
        return monthValues;
    };
    MomentMonthUtils.prototype.getMonthValue = function (dateType) {
        if (!dateType || !dateType.isValid()) {
            return;
        }
        return MomentMonthUtils.getMonthValueNative(getNativeDate(dateType));
    };
    MomentMonthUtils.prototype.getMonthValues = function () {
        return utils_1.utils.array.range(0, 12).map(function (i) {
            return MomentMonthUtils.getMonthValueNative(moment().month(i));
        });
    };
    MomentMonthUtils.getMonthValueNative = function (mom) {
        return { number: mom.month(), name: mom.format("MMMM"), shortName: mom.format("MMM") };
    };
    return MomentMonthUtils;
}());
exports.MomentMonthUtils = MomentMonthUtils;
var MomentDateUtils = /** @class */ (function () {
    function MomentDateUtils() {
        this.formats = {
            wireDate: DateFormats.DateWireFormat,
        };
    }
    MomentDateUtils.prototype.today = function () {
        return createDateType(moment().startOf("day"));
    };
    MomentDateUtils.prototype.startOf = function (dateType, unitOfTime) {
        return createDateType(getNativeDateClone(dateType).startOf(unitOfTime));
    };
    MomentDateUtils.prototype.isBefore = function (dateType, minDate, unitOfTime) {
        if (unitOfTime === void 0) { unitOfTime = "day"; }
        var mom = getNativeDate(dateType);
        return mom.isBefore(getNativeDate(minDate), unitOfTime);
    };
    MomentDateUtils.prototype.isAfter = function (dateType, maxDate, unitOfTime) {
        if (unitOfTime === void 0) { unitOfTime = "day"; }
        var mom = getNativeDate(dateType);
        return mom.isAfter(getNativeDate(maxDate), unitOfTime);
    };
    MomentDateUtils.prototype.fallsWithinRange = function (dateType, minDate, maxDate) {
        var mom = getNativeDate(dateType);
        if (minDate && minDate.isValid() && mom.isBefore(getNativeDate(minDate), "day")) {
            return false;
        }
        if (maxDate && maxDate.isValid() && mom.isAfter(getNativeDate(maxDate), "day")) {
            return false;
        }
        return true;
    };
    MomentDateUtils.prototype.parse = function (date, dateFormat) {
        return MomentDateUtils.parse(date, dateFormat);
    };
    MomentDateUtils.parse = function (date, dateFormat) {
        return createDateType(moment(date, dateFormat, true));
    };
    MomentDateUtils.prototype.parseOrToday = function (date, formatString) {
        var dateType = moment(date, formatString, true);
        if (!dateType.isValid()) {
            dateType = moment();
        }
        return createDateType(dateType);
    };
    MomentDateUtils.prototype.parseOrUndefined = function (date, formatString) {
        var dateType = moment(date, formatString, true);
        if (!dateType.isValid()) {
            return;
        }
        return createDateType(dateType);
    };
    MomentDateUtils.prototype.get = function (dateType, unitOfTime) {
        if (!dateType.isValid()) {
            return;
        }
        var mom = getNativeDate(dateType);
        switch (unitOfTime) {
            case "year":
                return mom.year();
            case "month":
                return mom.month();
            case "day":
                return mom.date();
            default:
                throw new Error("Unsupported unit of time");
        }
    };
    MomentDateUtils.prototype.format = function (dateType, formatString) {
        if (!dateType.isValid()) {
            return "";
        }
        return getNativeDate(dateType).format(formatString);
    };
    MomentDateUtils.prototype.formatOrEmpty = function (date, formatString) {
        var mom = moment(date, formatString, true);
        if (!mom.isValid()) {
            return "";
        }
        return mom.format(formatString);
    };
    MomentDateUtils.prototype.add = function (dateType, increment, unitOfTime) {
        return createDateType(getNativeDateClone(dateType).add(increment, unitOfTime));
    };
    MomentDateUtils.prototype.subtract = function (dateType, increment, unitOfTime) {
        return createDateType(getNativeDateClone(dateType).subtract(increment, unitOfTime));
    };
    MomentDateUtils.prototype.getDayOfWeek = function (dateType) {
        if (!dateType.isValid()) {
            return;
        }
        return this.format(dateType, "ddd");
    };
    MomentDateUtils.prototype.isDayOfWeek = function (dateType, dayOfWeek) {
        return this.getDayOfWeek(dateType) === dayOfWeek;
    };
    return MomentDateUtils;
}());
exports.MomentDateUtils = MomentDateUtils;
