"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var React = require("react");
var useDidUpdateEffect_1 = require("../../../hooks/lifecycle/useDidUpdateEffect");
var calendarUtils_1 = require("../../../utilities/calendarUtils");
var classHelpers_1 = require("../../../utilities/classHelpers");
var formatting_1 = require("../../../utilities/formatting");
var utils_1 = require("../../../utilities/utils");
var formCore_1 = require("../formCore");
var formHooks_1 = require("../formHooks");
var validationWrapper_1 = require("../validationWrapper");
var options_1 = require("./options");
exports.TimeInput = function (props) {
    var className = props.className, disabled = props.disabled, hourLabel = props.hourLabel, minuteLabel = props.minuteLabel, minuteFilter = props.minuteFilter, hourFilter = props.hourFilter, minuteStep = props.minuteStep, onChange = props.onChange, tabIndex = props.tabIndex, time = props.time, zeroMinutesOnHourSelected = props.zeroMinutesOnHourSelected, label = props.label;
    var _a = React.useState({}), timeState = _a[0], setTimeState = _a[1];
    var formatTime = React.useCallback(function (hour, minute) { return formatting_1.Formatting.twoDigitNumber(hour) + ":" + formatting_1.Formatting.twoDigitNumber(minute); }, []);
    React.useEffect(function () {
        if (time) {
            var newTime = calendarUtils_1.calendarUtils.time.getParts(time);
            setTimeState({ hours: newTime.hours, minutes: newTime.minutes });
        }
    }, []);
    var handleDataChanged = React.useCallback(function (d) {
        setTimeState(d);
        if (!onChange || utils_1.utils.object.isNullOrUndefined(d.hours)) {
            return;
        }
        if (utils_1.utils.object.isNullOrUndefined(d.minutes)) {
            if (zeroMinutesOnHourSelected) {
                setTimeState({ hours: timeState.hours, minutes: 0 });
                onChange(formatTime(d.hours, 0));
            }
        }
        else {
            onChange(formatTime(d.hours, d.minutes));
        }
    }, [onChange]);
    useDidUpdateEffect_1.useDidUpdateEffect(function () {
        if (time) {
            var newTime = calendarUtils_1.calendarUtils.time.getParts(time);
            var needsUpdate = void 0;
            var hours = timeState.hours, minutes = timeState.minutes;
            if (newTime.hours !== hours) {
                hours = newTime.hours;
                needsUpdate = true;
            }
            if (newTime.minutes !== minutes) {
                minutes = newTime.minutes;
                needsUpdate = true;
            }
            if (needsUpdate) {
                var newState = { hours: hours, minutes: minutes };
                handleDataChanged(newState);
            }
        }
        else {
            setTimeState({ hours: null, minutes: null });
            onChange("");
        }
    }, [time]);
    var validationMessage = formCore_1.DataValidationMessage.get(props);
    var validationMode = formCore_1.DataValidationMode.get(props);
    var hourOptions = React.useMemo(function () {
        var hoursRange = calendarUtils_1.calendarUtils.time.getHours();
        return options_1.buildOptions(hourLabel, hourFilter ? hourFilter(hoursRange) : hoursRange, function (v) { return v; }, function (v) { return formatting_1.Formatting.twoDigitNumber(v); });
    }, [hourLabel, hourFilter]);
    var minuteOptions = React.useMemo(function () {
        var minuteRange = calendarUtils_1.calendarUtils.time.getMinutes(minuteStep || 1);
        return options_1.buildOptions(minuteLabel, minuteFilter ? minuteFilter(minuteRange) : minuteRange, function (v) { return v; }, function (v) { return formatting_1.Formatting.twoDigitNumber(v); });
    }, [minuteLabel, minuteStep, minuteFilter]);
    var _b = formHooks_1.useForm(timeState), DataForm = _b.DataForm, bind = _b.bind;
    return (React.createElement(DataForm, { className: classHelpers_1.ClassHelpers.classNames("time-input", "armstrong-input", className, disabled ? "input-disabled" : null, { "show-validation": validationMode !== "none" && validationMessage }), onDataChanged: handleDataChanged, title: validationMessage },
        label && React.createElement("label", { className: "armstrong-label" }, label),
        React.createElement("div", null,
            React.createElement("select", tslib_1.__assign({ tabIndex: tabIndex }, bind.selectNumeric("hours"), { disabled: disabled }, formCore_1.DataValidationMessage.spread(validationMessage)), hourOptions),
            React.createElement("select", tslib_1.__assign({ tabIndex: tabIndex }, bind.selectNumeric("minutes"), { disabled: disabled }, formCore_1.DataValidationMessage.spread(validationMessage)), minuteOptions)),
        React.createElement(validationWrapper_1.ValidationLabel, { message: validationMessage, mode: validationMode })));
};
exports.TimeInput.defaultProps = {
    time: "",
    hourLabel: "HH",
    minuteLabel: "MM",
};
