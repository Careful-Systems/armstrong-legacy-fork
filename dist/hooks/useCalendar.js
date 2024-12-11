"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var React = require("react");
var calendarUtils_1 = require("../utilities/calendarUtils");
function useCalendar(settings) {
    var format = React.useMemo(function () { return settings.format || calendarUtils_1.calendarUtils.date.formats.wireDate; }, [settings.format]);
    var startDay = React.useMemo(function () { return settings.beginOnDay || "Sun"; }, [settings.beginOnDay]);
    var displayFormat = React.useMemo(function () { return settings.displayFormat || calendarUtils_1.calendarUtils.date.formats.wireDate; }, [settings.displayFormat]);
    var seedDate = React.useMemo(function () { return calendarUtils_1.calendarUtils.date.parseOrToday(settings.selectedDate || settings.seedDate, format); }, []);
    var minDate = React.useMemo(function () { return calendarUtils_1.calendarUtils.date.parseOrUndefined(settings.minDate, format); }, [settings.minDate]);
    var maxDate = React.useMemo(function () { return calendarUtils_1.calendarUtils.date.parseOrUndefined(settings.maxDate, format); }, [settings.maxDate]);
    var _a = React.useState(settings.selectedDate ? calendarUtils_1.calendarUtils.date.formatOrEmpty(settings.selectedDate, format) : ""), date = _a[0], setCurrentDate = _a[1];
    var isSelectedDateValid = React.useMemo(function () {
        var dateType = calendarUtils_1.calendarUtils.date.parseOrUndefined(date, format);
        if (!dateType) {
            return false;
        }
        return calendarUtils_1.calendarUtils.date.fallsWithinRange(dateType, minDate, maxDate);
    }, [date, minDate, maxDate, format]);
    var selectedDateDisplay = React.useMemo(function () {
        var dateType = calendarUtils_1.calendarUtils.date.parseOrUndefined(date, format);
        if (!dateType) {
            return "";
        }
        return calendarUtils_1.calendarUtils.date.format(dateType, displayFormat);
    }, [date, isSelectedDateValid]);
    var today = calendarUtils_1.calendarUtils.date.format(calendarUtils_1.calendarUtils.date.today(), format);
    var _b = React.useState(buildWeeks(seedDate, format, startDay, displayFormat, today, date, minDate, maxDate)), state = _b[0], setState = _b[1];
    var nextMonth = React.useCallback(function () {
        if (!calendarUtils_1.calendarUtils.date.fallsWithinRange(state.nextSeed, undefined, maxDate)) {
            return;
        }
        setState(buildWeeks(state.nextSeed, format, startDay, displayFormat, today, date, minDate, maxDate));
    }, [state.nextSeed, format, startDay, displayFormat, today, date, maxDate]);
    var previousMonth = React.useCallback(function () {
        if (minDate && !calendarUtils_1.calendarUtils.date.fallsWithinRange(state.previousSeed, calendarUtils_1.calendarUtils.date.startOf(minDate, "month"), undefined)) {
            return;
        }
        setState(buildWeeks(state.previousSeed, format, startDay, displayFormat, today, date, minDate, maxDate));
    }, [state.previousSeed, format, startDay, displayFormat, today, date, minDate]);
    var nextYear = React.useCallback(function () {
        var nextSeed = calendarUtils_1.calendarUtils.date.add(state.seed, 1, "year");
        if (!calendarUtils_1.calendarUtils.date.fallsWithinRange(nextSeed, undefined, maxDate)) {
            return;
        }
        setState(buildWeeks(nextSeed, format, startDay, displayFormat, today, date, minDate, maxDate));
    }, [state.seed, format, startDay, displayFormat, today, date, maxDate]);
    var previousYear = React.useCallback(function () {
        var previousSeed = calendarUtils_1.calendarUtils.date.add(state.seed, -1, "year");
        if (!calendarUtils_1.calendarUtils.date.fallsWithinRange(previousSeed, minDate, undefined)) {
            return;
        }
        setState(buildWeeks(previousSeed, format, startDay, displayFormat, today, date, minDate, maxDate));
    }, [state.seed, format, startDay, displayFormat, today, date, minDate]);
    var gotoDate = React.useCallback(function (newDate) {
        var dateType = calendarUtils_1.calendarUtils.date.parseOrToday(newDate, format);
        if (!calendarUtils_1.calendarUtils.date.fallsWithinRange(dateType, minDate, maxDate)) {
            return;
        }
        setState(buildWeeks(dateType, format, startDay, displayFormat, today, date, minDate, maxDate));
    }, [format, startDay, displayFormat, today, date, minDate, maxDate]);
    var setDate = React.useCallback(function (newDate) {
        newDate = calendarUtils_1.calendarUtils.date.formatOrEmpty(newDate, format);
        if (!newDate) {
            return;
        }
        var dateType = calendarUtils_1.calendarUtils.date.parseOrToday(newDate, format);
        if (!calendarUtils_1.calendarUtils.date.fallsWithinRange(dateType, minDate, maxDate)) {
            return;
        }
        setCurrentDate(newDate);
        setState(buildWeeks(dateType, format, startDay, displayFormat, today, newDate, minDate, maxDate));
        if (settings.onDateChanged) {
            settings.onDateChanged(newDate);
        }
    }, [format, startDay, displayFormat, today, minDate, maxDate, settings.onDateChanged, setCurrentDate]);
    var clearSelectedDate = React.useCallback(function () {
        var newDate = "";
        setCurrentDate(newDate);
        setState(buildWeeks(state.seed, format, startDay, displayFormat, today, newDate, minDate, maxDate));
        if (settings.onDateChanged) {
            settings.onDateChanged(newDate);
        }
    }, [settings.onDateChanged, setCurrentDate, state.seed, format, startDay, displayFormat, today, minDate, maxDate]);
    return { month: state.month, nextMonth: nextMonth, nextYear: nextYear, previousMonth: previousMonth, previousYear: previousYear, selectedDateDisplay: selectedDateDisplay, selectedDate: date, selectDate: setDate, gotoDate: gotoDate, isSelectedDateValid: isSelectedDateValid, clearSelectedDate: clearSelectedDate };
}
exports.useCalendar = useCalendar;
function buildWeeks(seed, format, startDay, displayFormat, today, selectedDate, minDate, maxDate) {
    var start = calendarUtils_1.calendarUtils.date.startOf(seed, "month");
    var monthValue = calendarUtils_1.calendarUtils.month.getMonthValue(start);
    var year = calendarUtils_1.calendarUtils.date.get(start, "year");
    var previousSeed = calendarUtils_1.calendarUtils.date.add(start, -1, "month");
    var nextSeed = calendarUtils_1.calendarUtils.date.add(start, 1, "month");
    while (!calendarUtils_1.calendarUtils.date.isDayOfWeek(start, startDay)) {
        start = calendarUtils_1.calendarUtils.date.add(start, -1, "day");
    }
    var weeks = [];
    for (var weekNo = 0; weekNo < 6; weekNo++) {
        var week = { days: [] };
        weeks.push(week);
        for (var dayNo = 0; dayNo < 7; dayNo++) {
            var day = { date: calendarUtils_1.calendarUtils.date.format(start, format), dayOfWeek: calendarUtils_1.calendarUtils.date.getDayOfWeek(start), display: calendarUtils_1.calendarUtils.date.format(start, displayFormat), dayNumber: calendarUtils_1.calendarUtils.date.get(start, "day") };
            if (day.date === today) {
                day.isToday = true;
            }
            if (!calendarUtils_1.calendarUtils.date.fallsWithinRange(start, minDate, maxDate)) {
                day.outOfRange = true;
            }
            if (day.date === selectedDate) {
                day.isCurrentDate = true;
            }
            if (calendarUtils_1.calendarUtils.date.get(start, "month") === monthValue.number) {
                day.isCurrentMonth = true;
            }
            week.days.push(day);
            start = calendarUtils_1.calendarUtils.date.add(start, 1, "day");
        }
    }
    var month = tslib_1.__assign(tslib_1.__assign({ daysOfWeek: weeks[0].days.map(function (d) { return d.dayOfWeek; }), weeks: weeks }, monthValue), { year: year });
    return { month: month, seed: seed, previousSeed: previousSeed, nextSeed: nextSeed };
}
