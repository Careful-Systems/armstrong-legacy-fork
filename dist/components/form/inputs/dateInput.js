"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var React = require("react");
var useDidUpdateEffect_1 = require("../../../hooks/lifecycle/useDidUpdateEffect");
var calendarUtils_1 = require("../../../utilities/calendarUtils");
var classHelpers_1 = require("../../../utilities/classHelpers");
var formatting_1 = require("../../../utilities/formatting");
var formCore_1 = require("../formCore");
var formHooks_1 = require("../formHooks");
var validationWrapper_1 = require("../validationWrapper");
var options_1 = require("./options");
exports.DateInput = function (props) {
    var dayLabel = props.dayLabel, monthLabel = props.monthLabel, yearLabel = props.yearLabel, yearsFromNow = props.yearsFromNow, className = props.className, disabled = props.disabled, datePartOrder = props.datePartOrder, tabIndex = props.tabIndex, date = props.date, minDate = props.minDate, maxDate = props.maxDate, onChange = props.onChange, label = props.label;
    var _a = React.useState({ day: null, month: null, year: null, date: null }), dateState = _a[0], setDateState = _a[1];
    React.useEffect(function () {
        validateProps();
        if (date) {
            setDateState(calendarUtils_1.calendarUtils.datePart.parse(date));
        }
    }, []);
    var validateProps = React.useCallback(function () {
        if (datePartOrder.indexOf("month") === -1) {
            // tslint:disable-next-line:no-console
            console.error("A DateInput must include `month` in the datePartOrder");
        }
    }, [datePartOrder]);
    useDidUpdateEffect_1.useDidUpdateEffect(function () {
        var newState = date ? calendarUtils_1.calendarUtils.datePart.parse(date, { includeDate: true }) : { day: null, month: null, year: null, date: null };
        if (calendarUtils_1.calendarUtils.datePart.equals(newState, dateState)) {
            return;
        }
        setDateState(newState);
        onChange(newState.date);
    }, [date]);
    var hasDayPart = React.useMemo(function () {
        return datePartOrder.indexOf("day") > -1;
    }, [datePartOrder]);
    var hasYearPart = React.useMemo(function () {
        return datePartOrder.indexOf("year") > -1;
    }, [datePartOrder]);
    var validationMessage = formCore_1.DataValidationMessage.get(props);
    var validationMode = formCore_1.DataValidationMode.get(props);
    var dayArray = React.useMemo(function () {
        return calendarUtils_1.calendarUtils.day.getMonthYear(dateState.month, dateState.year, { minDate: minDate, maxDate: maxDate });
    }, [dateState.month, dateState.year, minDate, maxDate]);
    var monthArray = React.useMemo(function () {
        return calendarUtils_1.calendarUtils.month.getMonthsInYear(dateState.year, minDate, maxDate);
    }, [dateState.year, minDate, maxDate]);
    var yearArray = React.useMemo(function () {
        return calendarUtils_1.calendarUtils.year.generate({ minDate: minDate, maxDate: maxDate, range: yearsFromNow });
    }, [minDate, maxDate, yearsFromNow]);
    var handleDataChanged = React.useCallback(function (d) {
        var newState = {};
        newState.year = !hasYearPart ? 2000 : d.year;
        newState.day = !hasDayPart ? 1 : d.day;
        if (d.day) {
            var days = calendarUtils_1.calendarUtils.day.getMonthYear(d.month, d.year, { minDate: minDate, maxDate: maxDate });
            if (days.indexOf(newState.day) === -1) {
                delete newState.day;
            }
        }
        newState.month = d.month;
        if (d.month) {
            var monthsInYear = calendarUtils_1.calendarUtils.month.getMonthsInYear(d.year, minDate, maxDate);
            if (monthsInYear.map(function (a) { return a.number; }).indexOf(newState.month) === -1) {
                delete newState.month;
            }
        }
        newState.date = calendarUtils_1.calendarUtils.datePart.format(newState);
        setDateState(newState);
        if (onChange && newState.date) {
            onChange(newState.date);
        }
    }, [hasDayPart, hasYearPart, onChange, minDate, maxDate]);
    var options = React.useMemo(function () {
        return {
            day: options_1.buildOptions(dayLabel, dayArray, function (v) { return v; }, function (v) { return formatting_1.Formatting.twoDigitNumber(v); }),
            month: options_1.buildOptions(monthLabel, monthArray, function (v) { return v.number; }, function (v) { return v.name; }),
            year: options_1.buildOptions(yearLabel, yearArray, function (v) { return v; }, function (v) { return v.toString(); }),
        };
    }, [dayLabel, monthLabel, yearLabel, dayArray, monthArray, yearArray]);
    var classes = React.useMemo(function () { return classHelpers_1.ClassHelpers.classNames("armstrong-input", "date-input", className, {
        "show-validation": (validationMode !== "none" && validationMessage),
        "input-disabled": disabled,
    }); }, [className, validationMessage, validationMode, disabled]);
    var _b = formHooks_1.useForm(dateState), DataForm = _b.DataForm, bind = _b.bind;
    return (React.createElement(DataForm, { className: classes, title: validationMessage, onDataChanged: handleDataChanged },
        label && React.createElement("label", { className: "armstrong-label" }, label),
        React.createElement("div", null, datePartOrder.map(function (key, idx) {
            return (React.createElement("select", tslib_1.__assign({ key: idx, tabIndex: tabIndex }, bind.selectNumeric(key), { disabled: disabled }), options[key]));
        })),
        React.createElement(validationWrapper_1.ValidationLabel, { message: validationMessage, mode: validationMode })));
};
exports.DateInput.defaultProps = {
    yearLabel: "Year",
    monthLabel: "Month",
    dayLabel: "Day",
    datePartOrder: ["day", "month", "year"],
};
