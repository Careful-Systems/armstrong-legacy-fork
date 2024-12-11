"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var React = require("react");
var config_1 = require("../../../config/config");
var useCalendar_1 = require("../../../hooks/useCalendar");
var useDidUpdateEffect_1 = require("../../../hooks/lifecycle/useDidUpdateEffect");
var classHelpers_1 = require("../../../utilities/classHelpers");
var utils_1 = require("../../../utilities/utils");
var icon_1 = require("../../display/icon");
var grid_1 = require("../../layout/grid");
var formCore_1 = require("../formCore");
var validationWrapper_1 = require("../validationWrapper");
exports.CalendarInput = function (props) {
    var icon = props.icon, placeholder = props.placeholder, alwaysShowCalendar = props.alwaysShowCalendar, disableClear = props.disableClear, className = props.className, disabled = props.disabled, min = props.min, max = props.max, date = props.date, label = props.label;
    var mouseWheelDispose = React.useRef(undefined);
    var inputElement = React.useRef();
    var bodyElement = React.useRef();
    var rootElement = React.useRef();
    var _a = React.useState(false), pickerBodyVisible = _a[0], setPickerBodyVisible = _a[1];
    var _b = React.useState(false), showOnTop = _b[0], setShowOnTop = _b[1];
    var _c = React.useState(0), calendarOffset = _c[0], setCalendarOffset = _c[1];
    var onDateChanged = React.useCallback(function (d) {
        setPickerBodyVisible(false);
        if (props.onDateChanged) {
            props.onDateChanged(d);
        }
    }, [props.onDateChanged, setPickerBodyVisible]);
    var _d = useCalendar_1.useCalendar({
        format: props.format,
        displayFormat: props.displayFormat,
        minDate: min,
        maxDate: max,
        selectedDate: date,
        onDateChanged: onDateChanged
    }), month = _d.month, clearSelectedDate = _d.clearSelectedDate, nextMonth = _d.nextMonth, previousMonth = _d.previousMonth, selectDate = _d.selectDate, selectedDate = _d.selectedDate, selectedDateDisplay = _d.selectedDateDisplay;
    var calcTop = React.useCallback(function () {
        if (inputElement.current) {
            var bounds = inputElement.current.getBoundingClientRect();
            setCalendarOffset(bounds.bottom);
        }
    }, [inputElement]);
    var disposal = React.useCallback(function (newCurrent) {
        if (newCurrent === void 0) { newCurrent = undefined; }
        if (mouseWheelDispose.current) {
            try {
                mouseWheelDispose.current();
            }
            catch (error) {
                // noop
            }
            mouseWheelDispose.current = newCurrent;
        }
    }, []);
    React.useEffect(function () {
        if (!config_1.isLocaleSet()) {
            // tslint:disable-next-line:no-console
            console.warn("Using CalendarInput without setting the global Armstrong locale is not recommended. See https://github.com/Rocketmakers/armstrong-react#form---calendar--datepickers");
        }
        window.removeEventListener("mousedown", handleEvent);
        return function () {
            window.addEventListener("mousedown", handleEvent);
            disposal();
        };
    }, []);
    useDidUpdateEffect_1.useDidUpdateEffect(function () {
        selectDate(date);
    }, [date]);
    var handleEvent = React.useCallback(function (e) {
        var domNode = rootElement.current;
        if (!domNode) {
            return;
        }
        if (domNode.contains(e.target) && e.type !== "mousewheel" && e.type !== "keydown") {
            return;
        }
        // tslint:disable-next-line:no-string-literal
        if (e.type === "keydown" && e["keyCode"] !== 9) {
            return;
        }
        disposal();
        if (document.activeElement instanceof HTMLElement) {
            document.activeElement.blur();
        }
        setPickerBodyVisible(false);
    }, [rootElement, setPickerBodyVisible]);
    var shouldShowOnTop = React.useCallback(function () {
        if (!inputElement.current) {
            return;
        }
        var height = bodyElement.current.clientHeight + 50;
        var inputRect = inputElement.current.getBoundingClientRect();
        var remainingSpace = window.innerHeight - inputRect.bottom;
        if (remainingSpace < height) {
            setShowOnTop(true);
            return true;
        }
        setShowOnTop(false);
        return false;
    }, [inputElement, bodyElement, setShowOnTop]);
    var onInputFocus = React.useCallback(function () {
        disposal(function () { return document.removeEventListener("wheel", handleEvent, false); });
        disposal(function () { return document.removeEventListener("mousedown", handleEvent, false); });
        document.addEventListener("wheel", handleEvent, false);
        document.addEventListener("mousedown", handleEvent, false);
        calcTop();
        setPickerBodyVisible(true);
        shouldShowOnTop();
    }, [calcTop, shouldShowOnTop]);
    var validationMessage = formCore_1.DataValidationMessage.get(props);
    var validationMode = formCore_1.DataValidationMode.get(props);
    var weekdays = React.useMemo(function () {
        return month.daysOfWeek.map(function (n) { return (React.createElement("div", { className: "date-picker-week-day", key: "day_name_" + n }, n)); });
    }, [month.daysOfWeek]);
    var currentDisplayDate = month.shortName + " - " + month.year;
    var classes = React.useMemo(function () {
        return classHelpers_1.ClassHelpers.classNames("date-picker-body", {
            "date-picker-body-visible": pickerBodyVisible && !alwaysShowCalendar,
            "date-picker-top": showOnTop,
            "always-show-calendar": alwaysShowCalendar
        });
    }, [pickerBodyVisible, alwaysShowCalendar, showOnTop, alwaysShowCalendar]);
    var rootClasses = React.useMemo(function () {
        return classHelpers_1.ClassHelpers.classNames("date-picker", "armstrong-input", className, {
            "has-icon": icon !== null,
            disabled: disabled,
            "show-validation": validationMode !== "none" && validationMessage
        });
    }, [className, icon, disabled, validationMode, validationMessage]);
    var days = utils_1.utils.array.reduce(month.weeks, function (w, c) {
        w.push.apply(w, c.days);
        return w;
    }, []);
    return (React.createElement("div", { ref: rootElement, className: rootClasses },
        label && React.createElement("label", { className: "armstrong-label" }, label),
        !alwaysShowCalendar && icon_1.getIconOrJsx(icon),
        !alwaysShowCalendar && (React.createElement("input", tslib_1.__assign({ className: "cal-input", ref: inputElement }, formCore_1.DataValidationMessage.spread(validationMessage), { disabled: disabled, type: "text", value: selectedDateDisplay, onKeyDown: function (e) { return handleEvent(e.nativeEvent); }, onFocus: onInputFocus, onChange: function (e) {
                /* This noop handler is here to stop react complaining! */
            }, placeholder: placeholder }))),
        !alwaysShowCalendar && selectedDate && !disableClear && (React.createElement("div", { className: "clear-date-button", onClick: clearSelectedDate },
            React.createElement(icon_1.Icon, { icon: icon_1.Icon.Icomoon.cross }))),
        React.createElement("div", { ref: bodyElement, className: classes, style: { top: calendarOffset + "px" } },
            React.createElement("div", { className: "date-picker-body-wrapper" },
                React.createElement(grid_1.Grid, { className: "date-picker-header" },
                    React.createElement(grid_1.Row, null,
                        React.createElement(grid_1.Col, { tagName: "button", onClick: previousMonth, width: "auto" }, "<"),
                        React.createElement(grid_1.Col, null, currentDisplayDate),
                        React.createElement(grid_1.Col, { tagName: "button", onClick: nextMonth, width: "auto" }, ">"))),
                React.createElement("div", { className: "date-picker-days" },
                    weekdays,
                    days.map(function (day) { return (React.createElement(CalendarDay, { key: day.date, day: day, dayClicked: selectDate })); })))),
        React.createElement(validationWrapper_1.ValidationLabel, { className: !!selectedDateDisplay && !disableClear && 'with-clear', message: validationMessage, mode: validationMode })));
};
exports.CalendarInput.defaultProps = {
    displayFormat: "L",
    icon: icon_1.getIconProps("Icomoon", "calendar")
};
var CalendarDay = function (props) {
    var day = props.day, dayClicked = props.dayClicked;
    var classes = React.useMemo(function () {
        return classHelpers_1.ClassHelpers.classNames({
            "not-in-month": !day.isCurrentMonth,
            "selected-day": day.isCurrentDate,
            "is-today": day.isToday,
            "day-disabled": day.outOfRange
        });
    }, [day.isCurrentMonth, day.isCurrentDate, day.isToday, day.outOfRange]);
    var onClick = React.useCallback(function () { return dayClicked(day.date); }, [day]);
    return (React.createElement("button", { className: classes, disabled: day.outOfRange, onClick: onClick }, day.dayNumber));
};
