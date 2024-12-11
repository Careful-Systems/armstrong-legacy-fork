"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var assert = require("assert");
var moment = require("moment");
var calendarUtils_1 = require("../utilities/calendarUtils");
var utils_1 = require("../utilities/utils");
describe("calendarUtils.year", function () {
    it("Range", function () {
        var years = calendarUtils_1.calendarUtils.year.generate({ range: 2 });
        var currentYear = moment().year();
        assert(years.length === 5, "Should have 5 years");
        assert(years[0] === currentYear - 2, "Should have min year of currentYear - 2");
        assert(years[4] === currentYear + 2, "Should have min year of currentYear + 2");
    });
    it("Min", function () {
        var currentYear = moment().year();
        var years = calendarUtils_1.calendarUtils.year.generate({ range: 2, minDate: currentYear + "-01-01" });
        assert(years.length === 3, "Should have 3 years");
        assert(years[0] === currentYear, "Should have min year of currentYear");
        assert(years[2] === currentYear + 2, "Should have min year of currentYear + 2");
    });
    it("Max", function () {
        var currentYear = moment().year();
        var years = calendarUtils_1.calendarUtils.year.generate({ range: 2, maxDate: currentYear + "-01-01" });
        assert(years.length === 3, "Should have 3 years");
        assert(years[0] === currentYear - 2, "Should have min year of currentYear - 2");
        assert(years[2] === currentYear, "Should have min year of currentYear");
    });
    it("Min + Max", function () {
        var currentYear = moment().year();
        var years = calendarUtils_1.calendarUtils.year.generate({ range: 2, minDate: currentYear + "-01-01", maxDate: currentYear + "-12-31" });
        assert(years.length === 1, "Should have 1 years");
        assert(years[0] === currentYear, "Should have year of currentYear");
    });
});
describe("calendarUtils.month", function () {
    it("getMonthValue", function () {
        var date = calendarUtils_1.calendarUtils.date.parse("2019-11-30", calendarUtils_1.calendarUtils.date.formats.wireDate);
        var monthValue = calendarUtils_1.calendarUtils.month.getMonthValue(date);
        assert(monthValue.number === 10, "Should have month of 10");
        assert(monthValue.name === "November", "Should have name of November");
        assert(monthValue.shortName === "Nov", "Should have short name of Nov");
    });
    it("getMonthValue - Invalid date", function () {
        var date = calendarUtils_1.calendarUtils.date.parse("xxx", calendarUtils_1.calendarUtils.date.formats.wireDate);
        var monthValue = calendarUtils_1.calendarUtils.month.getMonthValue(date);
        assert(monthValue === undefined, "Should have undefined value");
    });
    it("getMonthValues", function () {
        var monthValues = calendarUtils_1.calendarUtils.month.getMonthValues();
        assert(monthValues.length === 12, "Should have 12 values");
        assert(monthValues[0].number === 0, "Should have first month of 0");
        assert(monthValues[11].number === 11, "Should have last month of 11");
    });
    it("getMonthsInYear", function () {
        var currentYear = moment().year();
        var monthValues = calendarUtils_1.calendarUtils.month.getMonthsInYear(currentYear, undefined, undefined);
        assert(monthValues.length === 12, "Should have 12 values");
    });
    it("getMonthsInYear - Min", function () {
        var currentYear = moment().year();
        var monthValues = calendarUtils_1.calendarUtils.month.getMonthsInYear(currentYear, currentYear + "-03-01", undefined);
        assert(monthValues.length === 10, "Should have 10 values");
        assert(monthValues[0].number === 2, "Should have first month of 2");
        assert(monthValues[9].number === 11, "Should have last month of 11");
    });
    it("getMonthsInYear - Max", function () {
        var currentYear = moment().year();
        var monthValues = calendarUtils_1.calendarUtils.month.getMonthsInYear(currentYear, undefined, currentYear + "-03-01");
        assert(monthValues.length === 3, "Should have 3 values");
        assert(monthValues[0].number === 0, "Should have first month of 0");
        assert(monthValues[2].number === 2, "Should have last month of 2");
    });
});
function assertNovember(days) {
    assert(days.length === 30, "Should have 30 days in Nov");
    assert(days[0] === 1, "Should have day 1 first");
    assert(days[29] === 30, "Should have day 30 last");
}
describe("calendarUtils.day", function () {
    it("getMonthYear", function () {
        var days = calendarUtils_1.calendarUtils.day.getMonthYear(10, 2019);
        assertNovember(days);
    });
    it("getMonthYear - Min In Month", function () {
        var days = calendarUtils_1.calendarUtils.day.getMonthYear(10, 2019, { minDate: "2019-11-30" });
        assert(days.length === 1, "Should have 1 day");
        assert(days[0] === 30, "Should have day 30 first");
    });
    it("getMonthYear - Min After Month", function () {
        var days = calendarUtils_1.calendarUtils.day.getMonthYear(10, 2019, { minDate: "2019-12-30" });
        assert(days.length === 0, "Should have 0 days");
    });
    it("getMonthYear - Min Before Month", function () {
        var days = calendarUtils_1.calendarUtils.day.getMonthYear(10, 2019, { minDate: "2019-10-30" });
        assertNovember(days);
    });
    it("getMonthYear - Max in Month", function () {
        var days = calendarUtils_1.calendarUtils.day.getMonthYear(10, 2019, { maxDate: "2019-11-01" });
        assert(days.length === 1, "Should have 1 day");
        assert(days[0] === 1, "Should have day 1 first");
    });
    it("getMonthYear - Max After Month", function () {
        var days = calendarUtils_1.calendarUtils.day.getMonthYear(10, 2019, { maxDate: "2019-12-30" });
        assertNovember(days);
    });
    it("getMonthYear - Max Before Month", function () {
        var days = calendarUtils_1.calendarUtils.day.getMonthYear(10, 2019, { maxDate: "2019-10-30" });
        assert(days.length === 0, "Should have 0 days");
    });
});
describe("calendarUtils.date", function () {
    it("today", function () {
        var today = calendarUtils_1.calendarUtils.date.today();
        assert(today.isValid(), "Should get today as valid value");
    });
    it("parse/format", function () {
        var parseDate = "2020-03-19";
        var parsed = calendarUtils_1.calendarUtils.date.parse(parseDate, calendarUtils_1.calendarUtils.date.formats.wireDate);
        assert(parsed.isValid(), "Should get a valid value");
        var format = calendarUtils_1.calendarUtils.date.format(parsed, calendarUtils_1.calendarUtils.date.formats.wireDate);
        assert(format === parseDate, "Should get back same value");
    });
    it("parse/format - invalid", function () {
        var parseDate = "202x-03-19";
        var parsed = calendarUtils_1.calendarUtils.date.parse(parseDate, calendarUtils_1.calendarUtils.date.formats.wireDate);
        assert(!parsed.isValid(), "Should get an invalid value");
        var format = calendarUtils_1.calendarUtils.date.format(parsed, calendarUtils_1.calendarUtils.date.formats.wireDate);
        assert(format === "", "Should get back empty value");
    });
    it("parseOrUndefined", function () {
        var parseDate = "2020-03-19";
        var parsed = calendarUtils_1.calendarUtils.date.parseOrUndefined(parseDate, calendarUtils_1.calendarUtils.date.formats.wireDate);
        assert(parsed.isValid(), "Should get back valid value");
    });
    it("parseOrUndefined - invalid", function () {
        var parseDate = "202x-03-19";
        var parsed = calendarUtils_1.calendarUtils.date.parseOrUndefined(parseDate, calendarUtils_1.calendarUtils.date.formats.wireDate);
        assert(parsed === undefined, "Should get back 'undefined'");
    });
    it("parseOrToday", function () {
        var parseDate = "2020-03-19";
        var parsed = calendarUtils_1.calendarUtils.date.parseOrToday(parseDate, calendarUtils_1.calendarUtils.date.formats.wireDate);
        assert(parsed.isValid(), "Should get back valid value");
        var format = calendarUtils_1.calendarUtils.date.format(parsed, calendarUtils_1.calendarUtils.date.formats.wireDate);
        assert(format === parseDate, "Should get back same value");
    });
    it("parseOrToday - invalid", function () {
        var parseDate = "202x-03-19";
        var parsed = calendarUtils_1.calendarUtils.date.parseOrToday(parseDate, calendarUtils_1.calendarUtils.date.formats.wireDate);
        assert(parsed.isValid(), "Should get back valid value");
        var format = calendarUtils_1.calendarUtils.date.format(parsed, calendarUtils_1.calendarUtils.date.formats.wireDate);
        var today = calendarUtils_1.calendarUtils.date.format(calendarUtils_1.calendarUtils.date.today(), calendarUtils_1.calendarUtils.date.formats.wireDate);
        assert(format === today, "Should get back today");
    });
    it("formatOrEmpty", function () {
        var parseDate = "2020-03-19";
        var format = calendarUtils_1.calendarUtils.date.formatOrEmpty(parseDate, calendarUtils_1.calendarUtils.date.formats.wireDate);
        assert(format === parseDate, "Should get back same value");
    });
    it("formatOrEmpty - Invalid date", function () {
        var parseDate = "202x-03-19";
        var format = calendarUtils_1.calendarUtils.date.formatOrEmpty(parseDate, calendarUtils_1.calendarUtils.date.formats.wireDate);
        assert(format === "", "Should get back empty value");
    });
    it("get", function () {
        var parseDate = "2020-03-19";
        var parsed = calendarUtils_1.calendarUtils.date.parse(parseDate, calendarUtils_1.calendarUtils.date.formats.wireDate);
        assert(calendarUtils_1.calendarUtils.date.get(parsed, "day") === 19, "Should get back 19");
        assert(calendarUtils_1.calendarUtils.date.get(parsed, "month") === 2, "Should get back 2");
        assert(calendarUtils_1.calendarUtils.date.get(parsed, "year") === 2020, "Should get back 2020");
    });
    it("get - invalid", function () {
        var parseDate = "202x-03-19";
        var parsed = calendarUtils_1.calendarUtils.date.parse(parseDate, calendarUtils_1.calendarUtils.date.formats.wireDate);
        assert(calendarUtils_1.calendarUtils.date.get(parsed, "day") === undefined, "Should get back undefined");
        assert(calendarUtils_1.calendarUtils.date.get(parsed, "month") === undefined, "Should get back undefined");
        assert(calendarUtils_1.calendarUtils.date.get(parsed, "year") === undefined, "Should get back undefined");
    });
    it("day of week", function () {
        var parseDate = "2019-05-27";
        var parsed = calendarUtils_1.calendarUtils.date.parse(parseDate, calendarUtils_1.calendarUtils.date.formats.wireDate);
        assert(calendarUtils_1.calendarUtils.date.getDayOfWeek(parsed) === "Mon", "Should get back Mon");
        assert(calendarUtils_1.calendarUtils.date.isDayOfWeek(parsed, "Mon"), "Should get back true");
    });
    it("day of week - invalid", function () {
        var parseDate = "201x-05-27";
        var parsed = calendarUtils_1.calendarUtils.date.parse(parseDate, calendarUtils_1.calendarUtils.date.formats.wireDate);
        assert(calendarUtils_1.calendarUtils.date.getDayOfWeek(parsed) === undefined, "Should get back undefined");
    });
    function assertIsAfter(testDate, maxDate, expectedResult) {
        var test = calendarUtils_1.calendarUtils.date.parse(testDate, calendarUtils_1.calendarUtils.date.formats.wireDate);
        var max = calendarUtils_1.calendarUtils.date.parse(maxDate, calendarUtils_1.calendarUtils.date.formats.wireDate);
        assert(calendarUtils_1.calendarUtils.date.isAfter(test, max) === expectedResult, "Should get back " + expectedResult);
    }
    function assertIsBefore(testDate, minDate, expectedResult) {
        var test = calendarUtils_1.calendarUtils.date.parse(testDate, calendarUtils_1.calendarUtils.date.formats.wireDate);
        var min = calendarUtils_1.calendarUtils.date.parse(minDate, calendarUtils_1.calendarUtils.date.formats.wireDate);
        assert(calendarUtils_1.calendarUtils.date.isBefore(test, min) === expectedResult, "Should get back " + expectedResult);
    }
    function assertFallsWithinRange(testDate, minDate, maxDate, expectedResult) {
        var test = calendarUtils_1.calendarUtils.date.parse(testDate, calendarUtils_1.calendarUtils.date.formats.wireDate);
        var min = calendarUtils_1.calendarUtils.date.parse(minDate, calendarUtils_1.calendarUtils.date.formats.wireDate);
        var max = calendarUtils_1.calendarUtils.date.parse(maxDate, calendarUtils_1.calendarUtils.date.formats.wireDate);
        assert(calendarUtils_1.calendarUtils.date.fallsWithinRange(test, min, max) === expectedResult, "Should get back " + expectedResult);
    }
    it("isAfter - after", function () {
        assertIsAfter("2019-05-27", "2019-04-27", true);
    });
    it("isAfter - same day", function () {
        assertIsAfter("2019-05-27", "2019-05-27", false);
    });
    it("isAfter - before", function () {
        assertIsAfter("2019-04-27", "2019-05-27", false);
    });
    it("isBefore - after", function () {
        assertIsBefore("2019-05-27", "2019-04-27", false);
    });
    it("isBefore - same day", function () {
        assertIsBefore("2019-05-27", "2019-05-27", false);
    });
    it("isBefore - before", function () {
        assertIsBefore("2019-04-27", "2019-05-27", true);
    });
    it("fallsWithinRange - after", function () {
        assertFallsWithinRange("2019-06-27", "2019-04-27", "2019-05-27", false);
    });
    it("fallsWithinRange - inside", function () {
        assertFallsWithinRange("2019-04-28", "2019-04-27", "2019-05-27", true);
    });
    it("fallsWithinRange - on max", function () {
        assertFallsWithinRange("2019-05-27", "2019-04-27", "2019-05-27", true);
    });
    it("fallsWithinRange - on min", function () {
        assertFallsWithinRange("2019-04-27", "2019-04-27", "2019-05-27", true);
    });
    it("fallsWithinRange - before", function () {
        assertFallsWithinRange("2019-03-27", "2019-04-27", "2019-05-27", false);
    });
});
describe("calendarUtils.datePart", function () {
    it("parse", function () {
        var parts = calendarUtils_1.calendarUtils.datePart.parse("2019-11-19");
        assert(parts.year === 2019, "Should have year of 2019");
        assert(parts.month === 10, "Should have month of 10");
        assert(parts.day === 19, "Should have month of 19");
    });
    it("parse - invalid", function () {
        var parts = calendarUtils_1.calendarUtils.datePart.parse("xxx");
        assert(parts === undefined, "Should have undefined value");
    });
    it("equals", function () {
        var part = { year: 2019, month: 10, day: 19 };
        var part2 = { year: 2019, month: 10, day: 19 };
        var equals = calendarUtils_1.calendarUtils.datePart.equals(part, part2);
        assert(equals, "Should equals");
    });
    it("equals - year different", function () {
        var part = { year: 2019, month: 10, day: 19 };
        var part2 = { year: 2020, month: 10, day: 19 };
        var equals = calendarUtils_1.calendarUtils.datePart.equals(part, part2);
        assert(!equals, "Should not equals");
    });
    it("equals - month different", function () {
        var part = { year: 2019, month: 10, day: 19 };
        var part2 = { year: 2019, month: 9, day: 19 };
        var equals = calendarUtils_1.calendarUtils.datePart.equals(part, part2);
        assert(!equals, "Should not equals");
    });
    it("equals - day different", function () {
        var part = { year: 2019, month: 10, day: 19 };
        var part2 = { year: 2019, month: 10, day: 18 };
        var equals = calendarUtils_1.calendarUtils.datePart.equals(part, part2);
        assert(!equals, "Should not equals");
    });
    it("format", function () {
        var part = { year: 2019, month: 10, day: 19 };
        var parts = calendarUtils_1.calendarUtils.datePart.format(part);
        assert(parts === "2019-11-19", "Should have format value");
    });
    it("format - no year", function () {
        var part = { month: 10, day: 19 };
        var parts = calendarUtils_1.calendarUtils.datePart.format(part);
        assert(parts === undefined, "Should have undefined value");
    });
    it("format - no month", function () {
        var part = { year: 2019, day: 19 };
        var parts = calendarUtils_1.calendarUtils.datePart.format(part);
        assert(parts === undefined, "Should have undefined value");
    });
    it("format - no day", function () {
        var part = { year: 2019, month: 10 };
        var parts = calendarUtils_1.calendarUtils.datePart.format(part);
        assert(parts === undefined, "Should have undefined value");
    });
});
describe("calendarUtils.time", function () {
    it("getParts", function () {
        var parts = calendarUtils_1.calendarUtils.time.getParts("11:23");
        assert(parts.hours === 11, "Should have hour of 11");
        assert(parts.minutes === 23, "Should have minutes of 23");
    });
    it("getParts - invalid time", function () {
        var parts = calendarUtils_1.calendarUtils.time.getParts("xx");
        assert(parts === undefined, "Should have undefined value");
    });
    it("getHours", function () {
        var parts = calendarUtils_1.calendarUtils.time.getHours();
        assert(parts.length === 24, "Should have 24 hours");
        utils_1.utils.array.range(0, 24).map(function (hour, i) { return assert(parts[i] === hour, "Should have hour of " + hour); });
    });
    it("getMinutes - step 1", function () {
        var parts = calendarUtils_1.calendarUtils.time.getMinutes();
        assert(parts.length === 60, "Should have 60 minutes");
        utils_1.utils.array.range(0, 60).map(function (minute, i) { return assert(parts[i] === minute, "Should have minute of " + minute); });
    });
    it("getMinutes - step 5", function () {
        var parts = calendarUtils_1.calendarUtils.time.getMinutes(5);
        assert(parts.length === 12, "Should have 12 minutes");
        utils_1.utils.array.range(0, 60, 5).map(function (minute, i) { return assert(parts[i] === minute, "Should have minute of " + minute); });
    });
    it("getMinutes - step 15", function () {
        var parts = calendarUtils_1.calendarUtils.time.getMinutes(15);
        assert(parts.length === 4, "Should have 4 minutes");
        utils_1.utils.array.range(0, 60, 15).map(function (minute, i) { return assert(parts[i] === minute, "Should have minute of " + minute); });
    });
    it("getMinutes - step 30", function () {
        var parts = calendarUtils_1.calendarUtils.time.getMinutes(30);
        assert(parts.length === 2, "Should have 2 minutes");
        utils_1.utils.array.range(0, 60, 30).map(function (minute, i) { return assert(parts[i] === minute, "Should have minute of " + minute); });
    });
});
