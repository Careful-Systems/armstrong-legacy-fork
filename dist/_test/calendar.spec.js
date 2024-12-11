"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var assert = require("assert");
var moment = require("moment");
var react_hooks_testing_library_1 = require("react-hooks-testing-library");
var useCalendar_1 = require("../hooks/useCalendar");
function assertResult(result, expected) {
    assert.equal(result.month.number, expected.month);
    assert.equal(result.month.year, expected.year);
    assert.equal(result.selectedDate, expected.date);
    assert.equal(result.isSelectedDateValid, !expected.dateInvalid);
    assert.equal(result.month.weeks.length, 6);
    for (var week = 0; week < 6; week++) {
        assert.equal(result.month.weeks[week].days.length, 7);
    }
}
// function printMonth(month: IMonth) {
//   // tslint:disable-next-line: no-console
//   console.log(`${month.name} - ${month.year} (${month.shortName} : ${month.number})`);
//   for (let week = 0; week < 6; week++) {
//     let weekDisplay = ""
//     for (let day = 0; day < 7; day++) {
//       const d = month.weeks[week].days[day]
//       weekDisplay += (d.outOfRange ? "x" : "") + (d.isCurrentDate ? "+" : "") + (!d.isCurrentMonth ? "(" + d.dayNumber + ")" : d.dayNumber) + (d.isToday ? "*" : "") + "|"
//     }
//     // tslint:disable-next-line: no-console
//     console.log(weekDisplay);
//   }
//   // tslint:disable-next-line: no-console
//   console.log()
// }
var noDateExpected = { date: "", dateInvalid: true };
function currentYearMonth() {
    return { month: moment().month(), year: moment().year() };
}
describe("useCalendar", function () {
    it("Default Settings", function () {
        var result = react_hooks_testing_library_1.renderHook(function () { return useCalendar_1.useCalendar({}); }).result;
        assertResult(result.current, tslib_1.__assign(tslib_1.__assign({}, currentYearMonth()), noDateExpected));
    });
    it("Default Settings - Min", function () {
        var result = react_hooks_testing_library_1.renderHook(function () { return useCalendar_1.useCalendar({ seedDate: "2019-04-14", minDate: "2019-04-02" }); }).result;
        var expected = tslib_1.__assign({ month: 3, year: 2019 }, noDateExpected);
        assertResult(result.current, expected);
        // printMonth(result.current.month)
        react_hooks_testing_library_1.act(function () { return result.current.previousMonth(); });
        assertResult(result.current, expected);
    });
    it("Default Settings - Max", function () {
        var result = react_hooks_testing_library_1.renderHook(function () { return useCalendar_1.useCalendar({ seedDate: "2019-04-14", maxDate: "2019-04-22" }); }).result;
        var expected = tslib_1.__assign({ month: 3, year: 2019 }, noDateExpected);
        assertResult(result.current, expected);
        // printMonth(result.current.month)
        react_hooks_testing_library_1.act(function () { return result.current.nextMonth(); });
        assertResult(result.current, expected);
    });
    it("Goto Invalid Date", function () {
        var result = react_hooks_testing_library_1.renderHook(function () { return useCalendar_1.useCalendar({}); }).result;
        react_hooks_testing_library_1.act(function () { return result.current.gotoDate("x"); });
        assertResult(result.current, tslib_1.__assign(tslib_1.__assign({}, currentYearMonth()), noDateExpected));
    });
    it("Set Invalid Date", function () {
        var result = react_hooks_testing_library_1.renderHook(function () { return useCalendar_1.useCalendar({}); }).result;
        react_hooks_testing_library_1.act(function () { return result.current.selectDate("x"); });
        assertResult(result.current, tslib_1.__assign(tslib_1.__assign({}, currentYearMonth()), noDateExpected));
    });
    it("Invalid Selected Date Settings", function () {
        var result = react_hooks_testing_library_1.renderHook(function () { return useCalendar_1.useCalendar({ selectedDate: "xxxxxx" }); }).result;
        assertResult(result.current, tslib_1.__assign(tslib_1.__assign({}, currentYearMonth()), noDateExpected));
    });
    it("Invalid Seed Date Settings", function () {
        var result = react_hooks_testing_library_1.renderHook(function () { return useCalendar_1.useCalendar({ seedDate: "xxxxxx" }); }).result;
        assertResult(result.current, tslib_1.__assign(tslib_1.__assign({}, currentYearMonth()), noDateExpected));
    });
    it("Alternative format Settings", function () {
        var result = react_hooks_testing_library_1.renderHook(function () { return useCalendar_1.useCalendar({ selectedDate: "31-03-19", format: "DD-MM-YY" }); }).result;
        assertResult(result.current, { month: 2, year: 2019, date: "31-03-19" });
    });
    it("Alternative format Settings - Next Month", function () {
        var result = react_hooks_testing_library_1.renderHook(function () { return useCalendar_1.useCalendar({ selectedDate: "31-03-19", format: "DD-MM-YY" }); }).result;
        react_hooks_testing_library_1.act(function () { return result.current.nextMonth(); });
        assertResult(result.current, { month: 3, year: 2019, date: "31-03-19" });
    });
    it("Alternative format Settings - Previous Month", function () {
        var result = react_hooks_testing_library_1.renderHook(function () { return useCalendar_1.useCalendar({ selectedDate: "31-03-19", format: "DD-MM-YY" }); }).result;
        react_hooks_testing_library_1.act(function () { return result.current.previousMonth(); });
        assertResult(result.current, { month: 1, year: 2019, date: "31-03-19" });
    });
    it("Alternative format Settings - Goto Date", function () {
        var result = react_hooks_testing_library_1.renderHook(function () { return useCalendar_1.useCalendar({ selectedDate: "31-03-19", format: "DD-MM-YY" }); }).result;
        react_hooks_testing_library_1.act(function () { return result.current.gotoDate("07-11-19"); });
        assertResult(result.current, { month: 10, year: 2019, date: "31-03-19" });
    });
    it("Alternative format Settings - Set Date", function () {
        var result = react_hooks_testing_library_1.renderHook(function () { return useCalendar_1.useCalendar({ selectedDate: "31-03-19", format: "DD-MM-YY" }); }).result;
        react_hooks_testing_library_1.act(function () { return result.current.selectDate("07-09-19"); });
        assertResult(result.current, { month: 8, year: 2019, date: "07-09-19" });
    });
    it("Selected Date Settings out of Min Range", function () {
        var result = react_hooks_testing_library_1.renderHook(function () { return useCalendar_1.useCalendar({ selectedDate: "2019-03-31", minDate: "2019-04-01" }); }).result;
        assertResult(result.current, { month: 2, year: 2019, date: "2019-03-31", dateInvalid: true });
    });
    it("Selected Date Settings out of Min Range - Previous Month", function () {
        var result = react_hooks_testing_library_1.renderHook(function () { return useCalendar_1.useCalendar({ selectedDate: "2019-03-31", minDate: "2019-04-01" }); }).result;
        react_hooks_testing_library_1.act(function () { return result.current.previousMonth(); });
        assertResult(result.current, { month: 2, year: 2019, date: "2019-03-31", dateInvalid: true });
    });
    it("Selected Date Settings out of Min Range - Next Month", function () {
        var result = react_hooks_testing_library_1.renderHook(function () { return useCalendar_1.useCalendar({ selectedDate: "2019-03-31", minDate: "2019-04-01" }); }).result;
        react_hooks_testing_library_1.act(function () { return result.current.nextMonth(); });
        assertResult(result.current, { month: 3, year: 2019, date: "2019-03-31", dateInvalid: true });
    });
    it("Selected Date Settings out of Min Range - Set Date before min", function () {
        var result = react_hooks_testing_library_1.renderHook(function () { return useCalendar_1.useCalendar({ selectedDate: "2019-03-31", minDate: "2019-04-01" }); }).result;
        react_hooks_testing_library_1.act(function () { return result.current.selectDate("2019-03-01"); });
        assertResult(result.current, { month: 2, year: 2019, date: "2019-03-31", dateInvalid: true });
    });
    it("Selected Date Settings out of Min Range - Set Date OK", function () {
        var result = react_hooks_testing_library_1.renderHook(function () { return useCalendar_1.useCalendar({ selectedDate: "2019-03-31", minDate: "2019-04-01" }); }).result;
        react_hooks_testing_library_1.act(function () { return result.current.selectDate("2019-04-01"); });
        assertResult(result.current, { month: 3, year: 2019, date: "2019-04-01" });
    });
    it("Selected Date Settings out of Max Range", function () {
        var result = react_hooks_testing_library_1.renderHook(function () { return useCalendar_1.useCalendar({ selectedDate: "2019-03-31", maxDate: "2019-03-30" }); }).result;
        assertResult(result.current, { month: 2, year: 2019, date: "2019-03-31", dateInvalid: true });
    });
    it("Selected Date Settings out of Max Range - Next Month", function () {
        var result = react_hooks_testing_library_1.renderHook(function () { return useCalendar_1.useCalendar({ selectedDate: "2019-03-31", maxDate: "2019-03-30" }); }).result;
        react_hooks_testing_library_1.act(function () { return result.current.nextMonth(); });
        assertResult(result.current, { month: 2, year: 2019, date: "2019-03-31", dateInvalid: true });
    });
    it("Selected Date Settings out of Max Range - Previous Month", function () {
        var result = react_hooks_testing_library_1.renderHook(function () { return useCalendar_1.useCalendar({ selectedDate: "2019-03-31", maxDate: "2019-03-30" }); }).result;
        react_hooks_testing_library_1.act(function () { return result.current.previousMonth(); });
        assertResult(result.current, { month: 1, year: 2019, date: "2019-03-31", dateInvalid: true });
    });
    it("Selected Date Settings out of Max Range - Set Date After max", function () {
        var result = react_hooks_testing_library_1.renderHook(function () { return useCalendar_1.useCalendar({ selectedDate: "2019-03-31", maxDate: "2019-03-30" }); }).result;
        react_hooks_testing_library_1.act(function () { return result.current.selectDate("2019-04-01"); });
        assertResult(result.current, { month: 2, year: 2019, date: "2019-03-31", dateInvalid: true });
    });
    it("Selected Date Settings out of Max Range - Set Date OK", function () {
        var result = react_hooks_testing_library_1.renderHook(function () { return useCalendar_1.useCalendar({ selectedDate: "2019-01-31", maxDate: "2019-03-30" }); }).result;
        react_hooks_testing_library_1.act(function () { return result.current.selectDate("2019-03-30"); });
        assertResult(result.current, { month: 2, year: 2019, date: "2019-03-30" });
    });
    it("Selected Date Settings", function () {
        var result = react_hooks_testing_library_1.renderHook(function () { return useCalendar_1.useCalendar({ selectedDate: "2019-03-31" }); }).result;
        assertResult(result.current, { month: 2, year: 2019, date: "2019-03-31" });
    });
    it("Selected Date Settings - Next Month", function () {
        var result = react_hooks_testing_library_1.renderHook(function () { return useCalendar_1.useCalendar({ selectedDate: "2019-03-31" }); }).result;
        react_hooks_testing_library_1.act(function () { return result.current.nextMonth(); });
        assertResult(result.current, { month: 3, year: 2019, date: "2019-03-31" });
    });
    it("Selected Date Settings - Previous Month", function () {
        var result = react_hooks_testing_library_1.renderHook(function () { return useCalendar_1.useCalendar({ selectedDate: "2019-03-31" }); }).result;
        react_hooks_testing_library_1.act(function () { return result.current.previousMonth(); });
        assertResult(result.current, { month: 1, year: 2019, date: "2019-03-31" });
    });
    it("Selected Date Settings - Goto Date", function () {
        var result = react_hooks_testing_library_1.renderHook(function () { return useCalendar_1.useCalendar({ selectedDate: "2019-03-31" }); }).result;
        react_hooks_testing_library_1.act(function () { return result.current.gotoDate("2019-11-07"); });
        assertResult(result.current, { month: 10, year: 2019, date: "2019-03-31" });
    });
    it("Selected Date Settings - Set Date", function () {
        var result = react_hooks_testing_library_1.renderHook(function () { return useCalendar_1.useCalendar({ selectedDate: "2019-03-31" }); }).result;
        react_hooks_testing_library_1.act(function () { return result.current.selectDate("2019-09-07"); });
        assertResult(result.current, { month: 8, year: 2019, date: "2019-09-07" });
    });
    it("Selected Date Settings - Next Year", function () {
        var result = react_hooks_testing_library_1.renderHook(function () { return useCalendar_1.useCalendar({ selectedDate: "2019-03-31" }); }).result;
        react_hooks_testing_library_1.act(function () { return result.current.nextYear(); });
        assertResult(result.current, { month: 2, year: 2020, date: "2019-03-31" });
    });
    it("Selected Date Settings - Previous Year", function () {
        var result = react_hooks_testing_library_1.renderHook(function () { return useCalendar_1.useCalendar({ selectedDate: "2019-03-31" }); }).result;
        react_hooks_testing_library_1.act(function () { return result.current.previousYear(); });
        assertResult(result.current, { month: 2, year: 2018, date: "2019-03-31" });
    });
});
