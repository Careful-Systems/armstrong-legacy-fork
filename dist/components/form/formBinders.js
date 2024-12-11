"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var keyCodes_1 = require("../../utilities/keyCodes");
var utils_1 = require("../../utilities/utils");
var formBinderBase_1 = require("./formBinderBase");
var formCore_1 = require("./formCore");
var formValueConverters_1 = require("./formValueConverters");
var propertyPathBuilder_1 = require("./propertyPathBuilder");
/** An input FormBinder that sets native 'value' and 'onChange: (e) => void' properties */
var InputFormBinder = /** @class */ (function (_super) {
    tslib_1.__extends(InputFormBinder, _super);
    function InputFormBinder() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    InputFormBinder.prototype.setElementProperty = function (props, dataBinder) {
        _super.prototype.setElementProperty.call(this, props, dataBinder);
        var v = props[this.propertySet];
        if (utils_1.utils.object.isNullOrUndefined(v)) {
            props[this.propertySet] = this.getDefaultInputValue();
        }
    };
    InputFormBinder.prototype.getDefaultInputValue = function () {
        return "";
    };
    InputFormBinder.prototype.handleValueChanged = function (props, dataBinder, notifyChanged) {
        var _this = this;
        props.onChange = function (e) {
            _this.onChanged(dataBinder, e.currentTarget[_this.propertyGet], notifyChanged);
        };
    };
    return InputFormBinder;
}(formBinderBase_1.FormBinderBase));
exports.InputFormBinder = InputFormBinder;
var SelectMultipleFormBinder = /** @class */ (function (_super) {
    tslib_1.__extends(SelectMultipleFormBinder, _super);
    function SelectMultipleFormBinder(dataPath, valueConverter) {
        return _super.call(this, dataPath, "value", valueConverter) || this;
    }
    SelectMultipleFormBinder.prototype.setElementProperty = function (props, dataBinder) {
        _super.prototype.setElementProperty.call(this, props, dataBinder);
        // tslint:disable-next-line:no-string-literal
        props["multiple"] = true;
    };
    SelectMultipleFormBinder.prototype.handleValueChanged = function (props, dataBinder, notifyChanged) {
        var _this = this;
        props.onChange = function (e) {
            _this.onChanged(dataBinder, _this.getSelectValues(e.currentTarget), notifyChanged);
        };
    };
    SelectMultipleFormBinder.prototype.getSelectValues = function (select) {
        var result = [];
        var options = select && select.options;
        if (!options) {
            return result;
        }
        for (var _i = 0, options_1 = options; _i < options_1.length; _i++) {
            var opt = options_1[_i];
            if (opt.selected) {
                result.push(opt.value);
            }
        }
        return result;
    };
    return SelectMultipleFormBinder;
}(InputFormBinder));
exports.SelectMultipleFormBinder = SelectMultipleFormBinder;
var CheckboxFormBinder = /** @class */ (function (_super) {
    tslib_1.__extends(CheckboxFormBinder, _super);
    function CheckboxFormBinder(dataPath, valueConverter) {
        return _super.call(this, dataPath, "checked", valueConverter) || this;
    }
    CheckboxFormBinder.prototype.getDefaultInputValue = function () {
        return false;
    };
    return CheckboxFormBinder;
}(InputFormBinder));
exports.CheckboxFormBinder = CheckboxFormBinder;
/** A radio input FormBinder */
var RadioFormBinder = /** @class */ (function (_super) {
    tslib_1.__extends(RadioFormBinder, _super);
    function RadioFormBinder() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    RadioFormBinder.prototype.setElementProperty = function (props, dataBinder) {
        // tslint:disable-next-line:no-string-literal
        props["name"] = this.dataPath;
        props[this.propertySet] = this.convert(dataBinder.getValue(this.dataPath)) === props[this.propertyGet];
    };
    return RadioFormBinder;
}(InputFormBinder));
exports.RadioFormBinder = RadioFormBinder;
var RadioListFormBinder = /** @class */ (function (_super) {
    tslib_1.__extends(RadioListFormBinder, _super);
    function RadioListFormBinder() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    RadioListFormBinder.prototype.setElementProperty = function (props, dataBinder) {
        // tslint:disable-next-line:no-string-literal
        props["name"] = this.dataPath;
        props[this.propertySet] = this.convert(dataBinder.getValue(this.dataPath));
    };
    return RadioListFormBinder;
}(InputFormBinder));
exports.RadioListFormBinder = RadioListFormBinder;
var DateInputFormBinder = /** @class */ (function (_super) {
    tslib_1.__extends(DateInputFormBinder, _super);
    function DateInputFormBinder(dataPath) {
        return _super.call(this, dataPath, "date") || this;
    }
    DateInputFormBinder.prototype.handleValueChanged = function (props, dataBinder, notifyChanged) {
        var _this = this;
        props.onChange = function (e) {
            _this.onChanged(dataBinder, e, notifyChanged);
        };
    };
    return DateInputFormBinder;
}(formBinderBase_1.FormBinderBase));
exports.DateInputFormBinder = DateInputFormBinder;
var TimeInputFormBinder = /** @class */ (function (_super) {
    tslib_1.__extends(TimeInputFormBinder, _super);
    function TimeInputFormBinder(dataPath) {
        return _super.call(this, dataPath, "time") || this;
    }
    TimeInputFormBinder.customValue = function (dataName) {
        return new TimeInputFormBinder(dataName);
    };
    TimeInputFormBinder.prototype.handleValueChanged = function (props, dataBinder, notifyChanged) {
        var _this = this;
        props.onChange = function (e) {
            _this.onChanged(dataBinder, e, notifyChanged);
        };
    };
    return TimeInputFormBinder;
}(formBinderBase_1.FormBinderBase));
exports.TimeInputFormBinder = TimeInputFormBinder;
var CalendarInputFormBinder = /** @class */ (function (_super) {
    tslib_1.__extends(CalendarInputFormBinder, _super);
    function CalendarInputFormBinder(dataPath) {
        return _super.call(this, dataPath, "date") || this;
    }
    CalendarInputFormBinder.customValue = function (dataName) {
        return new CalendarInputFormBinder(dataName);
    };
    CalendarInputFormBinder.prototype.handleValueChanged = function (props, dataBinder, notifyChanged) {
        var _this = this;
        props.onDateChanged = function (e) { return _this.onChanged(dataBinder, e, notifyChanged); };
    };
    return CalendarInputFormBinder;
}(formBinderBase_1.FormBinderBase));
exports.CalendarInputFormBinder = CalendarInputFormBinder;
var AutoCompleteMultiFormBinder = /** @class */ (function () {
    function AutoCompleteMultiFormBinder(dataPath, getItemFromId) {
        this.dataPath = dataPath;
        this.getItemFromId = getItemFromId;
    }
    AutoCompleteMultiFormBinder.prototype.setElementProperty = function (props, dataBinder) {
        var _this = this;
        var value = dataBinder.getValue(this.dataPath);
        if (this.getItemFromId) {
            props.value = value.map(function (v) { return _this.getItemFromId(v); });
            return;
        }
        props.value = props.options ? utils_1.utils.array.filter(props.options, function (o) { return value.indexOf(o.id) > -1; }) : [];
        return;
    };
    AutoCompleteMultiFormBinder.prototype.handleValueChanged = function (props, dataBinder, notifyChanged) {
        var _this = this;
        props.onValueChange = function (c) {
            dataBinder.setValue(_this.dataPath, c.map(function (cc) { return cc.id; }));
            notifyChanged();
        };
    };
    return AutoCompleteMultiFormBinder;
}());
exports.AutoCompleteMultiFormBinder = AutoCompleteMultiFormBinder;
var AutoCompleteSingleFormBinder = /** @class */ (function () {
    function AutoCompleteSingleFormBinder(dataPath, getItemFromId) {
        this.dataPath = dataPath;
        this.getItemFromId = getItemFromId;
    }
    AutoCompleteSingleFormBinder.prototype.setElementProperty = function (props, dataBinder) {
        var value = dataBinder.getValue(this.dataPath);
        if (this.getItemFromId) {
            props.value = this.getItemFromId(value);
            return;
        }
        props.value = props.options && utils_1.utils.array.filter(props.options, function (o) { return value === o.id; })[0];
    };
    AutoCompleteSingleFormBinder.prototype.handleValueChanged = function (props, dataBinder, notifyChanged) {
        var _this = this;
        props.onValueChange = function (c) {
            dataBinder.setValue(_this.dataPath, c.id);
            notifyChanged();
        };
    };
    return AutoCompleteSingleFormBinder;
}());
exports.AutoCompleteSingleFormBinder = AutoCompleteSingleFormBinder;
// export class AutoCompleteLegacyFormBinder implements IFormBinder<IAutoCompleteInputProps, any> {
//   constructor(public dataPath: string, private getItemFromId?: (id: string) => IAutoCompleteOption) { }
//   setElementProperty(props: IAutoCompleteInputProps, dataBinder: IDataBinder<any>): void {
//     const value = dataBinder.getValue(this.dataPath);
//     if (utils.object.isArray(value)) {
//       if (this.getItemFromId) {
//         props.value = value.map(v => this.getItemFromId(v));
//         return;
//       }
//       props.value = props.options ? utils.array.filter(props.options, o => value.indexOf(o.id) > -1) : [];
//       return;
//     }
//     if (this.getItemFromId) {
//       props.value = this.getItemFromId(value);
//       return;
//     }
//     props.value = props.options && utils.array.filter(props.options, o => value === o.id)[0];
//   }
//   handleValueChanged(props: IAutoCompleteInputProps, dataBinder: IDataBinder<any>, notifyChanged: () => void): void {
//     props.onSelected = c => {
//       if (utils.object.isArray(c)) {
//         dataBinder.setValue(this.dataPath, c.map(cc => cc.id));
//       } else {
//         dataBinder.setValue(this.dataPath, c.id);
//       }
//       notifyChanged();
//     };
//   }
// }
var TagInputFormBinder = /** @class */ (function () {
    function TagInputFormBinder(dataPath) {
        this.dataPath = dataPath;
    }
    TagInputFormBinder.prototype.setElementProperty = function (props, dataBinder) {
        var value = dataBinder.getValue(this.dataPath);
        props.value = value;
    };
    TagInputFormBinder.prototype.handleValueChanged = function (props, dataBinder, notifyChanged) {
        var _this = this;
        props.onTagsChange = function (tags) {
            dataBinder.setValue(_this.dataPath, tags);
            notifyChanged();
        };
    };
    return TagInputFormBinder;
}());
exports.TagInputFormBinder = TagInputFormBinder;
var CodeInputFormBinder = /** @class */ (function () {
    function CodeInputFormBinder(dataPath) {
        this.dataPath = dataPath;
    }
    // set the value property of the `SelectInput`
    CodeInputFormBinder.prototype.setElementProperty = function (props, dataBinder) {
        props.value = dataBinder.getValue(this.dataPath);
    };
    // handle the change property of the `SelectInput` - setting the dataBinder value and notifying on change
    CodeInputFormBinder.prototype.handleValueChanged = function (props, dataBinder, notifyChanged) {
        var _this = this;
        props.onCodeChange = function (c) {
            dataBinder.setValue(_this.dataPath, c);
            notifyChanged();
        };
    };
    return CodeInputFormBinder;
}());
exports.CodeInputFormBinder = CodeInputFormBinder;
var ChildrenBinder = /** @class */ (function () {
    function ChildrenBinder(dataPath, childrenFactory) {
        this.dataPath = dataPath;
        this.childrenFactory = childrenFactory;
    }
    ChildrenBinder.prototype.setElementProperty = function (props, dataBinder) {
        // Do nothing
    };
    ChildrenBinder.prototype.handleValueChanged = function (props, dataBinder, notifyChanged) {
        // Do nothing
    };
    ChildrenBinder.prototype.overrideChildren = function (props, dataBinder) {
        return this.childrenFactory(dataBinder.getValue(this.dataPath), props, dataBinder);
    };
    return ChildrenBinder;
}());
/** Form Binder helpers */
var FormBinder = /** @class */ (function () {
    function FormBinder(parentPath) {
        this.parentPath = parentPath;
    }
    FormBinder.prototype.createChildBinder = function (dataName) {
        return new FormBinder(propertyPathBuilder_1.toDataPath(dataName, this.parentPath));
    };
    /** bind a custom form binder */
    FormBinder.prototype.custom = function (formBinder) {
        return formCore_1.updateFormBinderInjector({}, formBinder);
    };
    /** Override the children of the React element - used for label binding */
    FormBinder.prototype.children = function (dataName, childrenFactory) {
        return this.custom(new ChildrenBinder(propertyPathBuilder_1.toDataPath(dataName, this.parentPath), childrenFactory));
    };
    /** bind to a 'hidden' input */
    FormBinder.prototype.hidden = function (dataName, valueConverter) {
        return this.defaultInputFormBinder(dataName, "hidden", valueConverter);
    };
    /** bind a string property to a 'password' input */
    FormBinder.prototype.password = function (dataName, valueConverter) {
        return this.defaultInputFormBinder(dataName, "password", valueConverter);
    };
    /** bind a string property to a 'text' input */
    FormBinder.prototype.text = function (dataName, valueConverter) {
        return this.defaultInputFormBinder(dataName, "text", valueConverter);
    };
    /** bind a string property to a 'email' input */
    FormBinder.prototype.textEmail = function (dataName, valueConverter) {
        return this.defaultInputFormBinder(dataName, "email", valueConverter);
    };
    // autoCompleteInputLegacy(dataName: FormBinderKey<TDataBinder>, getItemFromId?: (id: string) => IAutoCompleteOption) {
    //   return this.custom(new AutoCompleteLegacyFormBinder(toDataPath(dataName, this.parentPath), getItemFromId));
    // }
    FormBinder.prototype.autoCompleteSingleInput = function (dataName, getItemFromId) {
        return this.custom(new AutoCompleteSingleFormBinder(propertyPathBuilder_1.toDataPath(dataName, this.parentPath), getItemFromId));
    };
    FormBinder.prototype.autoCompleteMultiInput = function (dataName, getItemFromId) {
        return this.custom(new AutoCompleteMultiFormBinder(propertyPathBuilder_1.toDataPath(dataName, this.parentPath), getItemFromId));
    };
    /** bind a 'value' string array property to a TagInput (e.g. ["cool", "guys", "only"]) */
    FormBinder.prototype.tagInput = function (dataName) {
        return this.custom(new TagInputFormBinder(propertyPathBuilder_1.toDataPath(dataName, this.parentPath)));
    };
    FormBinder.prototype.codeInput = function (dataName) {
        return this.custom(new CodeInputFormBinder(propertyPathBuilder_1.toDataPath(dataName, this.parentPath)));
    };
    /** bind a 'date' string property to a CalendarInput (e.g. YYYY-MM-DD) */
    FormBinder.prototype.calendarInput = function (dataName) {
        return this.custom(new CalendarInputFormBinder(propertyPathBuilder_1.toDataPath(dataName, this.parentPath)));
    };
    /** bind a 'date' string property to a DateInput (e.g. YYYY-MM-DD) */
    FormBinder.prototype.dateInput = function (dataName) {
        return this.custom(new DateInputFormBinder(propertyPathBuilder_1.toDataPath(dataName, this.parentPath)));
    };
    /** bind a 'time' string property to a TimeInput (e.g. HH:MM) */
    FormBinder.prototype.timeInput = function (dataName) {
        return this.custom(new TimeInputFormBinder(propertyPathBuilder_1.toDataPath(dataName, this.parentPath)));
    };
    FormBinder.prototype.defaultInputFormBinder = function (dataName, type, valueConverter, propertySet) {
        if (propertySet === void 0) { propertySet = "value"; }
        var adaptorInjector = this.custom(new InputFormBinder(propertyPathBuilder_1.toDataPath(dataName, this.parentPath), propertySet, valueConverter));
        // tslint:disable-next-line:no-string-literal
        adaptorInjector["type"] = type;
        return adaptorInjector;
    };
    /** bind a number property to a range */
    FormBinder.prototype.range = function (dataName, options) {
        var adaptorInjector = this.custom(new InputFormBinder(propertyPathBuilder_1.toDataPath(dataName, this.parentPath), "value"));
        if (options) {
            // tslint:disable-next-line:no-string-literal
            adaptorInjector["min"] = options.min;
            // tslint:disable-next-line:no-string-literal
            adaptorInjector["max"] = options.max;
            // tslint:disable-next-line:no-string-literal
            adaptorInjector["step"] = options.step || 1;
        }
        return adaptorInjector;
    };
    /** uncontrolled text input */
    FormBinder.prototype.defaultText = function (dataName, valueConverter) {
        return this.custom(new InputFormBinder(propertyPathBuilder_1.toDataPath(dataName, this.parentPath), "defaultValue", valueConverter, "value"));
    };
    /** bind a number property to a 'text' input */
    FormBinder.prototype.textNumeric = function (dataName, options) {
        var converter = options ? new formValueConverters_1.NumericValueConverter(options) : formValueConverters_1.NumericValueConverter.instance;
        var adaptorInjector = this.custom(new InputFormBinder(propertyPathBuilder_1.toDataPath(dataName, this.parentPath), "defaultValue", converter, "value"));
        // tslint:disable-next-line:no-string-literal
        adaptorInjector["type"] = "number";
        // tslint:disable-next-line:no-string-literal
        adaptorInjector["onKeyDown"] = function (e) { return KeyboardHelper.numericKeyPress(e, options); };
        if (options) {
            // tslint:disable-next-line:no-string-literal
            adaptorInjector["min"] = options.min;
            // tslint:disable-next-line:no-string-literal
            adaptorInjector["max"] = options.max;
        }
        return adaptorInjector;
    };
    /** bind a TDataPropValue property to a select */
    FormBinder.prototype.selectCustom = function (dataName, valueConverter) {
        return this.custom(new InputFormBinder(propertyPathBuilder_1.toDataPath(dataName, this.parentPath), "value", valueConverter));
    };
    /** bind a string property to a select */
    FormBinder.prototype.select = function (dataName) {
        return this.selectCustom(dataName, formValueConverters_1.DefaultValueConverter.instance);
    };
    /** bind a number property to a select */
    FormBinder.prototype.selectNumeric = function (dataName) {
        return this.selectCustom(dataName, formValueConverters_1.NumericValueConverter.instance);
    };
    /** bind a TDataPropValue[] property to a multi select */
    FormBinder.prototype.selectMultipleCustom = function (dataName, valueConverter) {
        return this.custom(new SelectMultipleFormBinder(propertyPathBuilder_1.toDataPath(dataName, this.parentPath), valueConverter));
    };
    /** bind a string[] property to a multi select */
    FormBinder.prototype.selectMultiple = function (dataName) {
        return this.selectMultipleCustom(dataName);
    };
    /** bind a number[] property to a multi select */
    FormBinder.prototype.selectMultipleNumeric = function (dataName) {
        return this.selectMultipleCustom(dataName, formValueConverters_1.MultipleNumericValueConverter.instance);
    };
    /** bind a TDataPropValue property to a 'checkbox' input */
    FormBinder.prototype.checkboxCustom = function (dataName, valueConverter) {
        var adaptorInjector = this.custom(new CheckboxFormBinder(propertyPathBuilder_1.toDataPath(dataName, this.parentPath), valueConverter));
        // tslint:disable-next-line:no-string-literal
        adaptorInjector["type"] = "checkbox";
        return adaptorInjector;
        // return this.defaultInputFormBinder(dataName, "checkbox", valueConverter, "checked")
    };
    /** bind a boolean property to a 'checkbox' input */
    FormBinder.prototype.checkbox = function (dataName) {
        return this.checkboxCustom(dataName);
    };
    /** bind a TDataPropValue property to a 'radio' input, using trueValue and falseValue equality testing */
    FormBinder.prototype.checkboxConvert = function (dataName, trueValue, falseValue) {
        return this.checkboxCustom(dataName, new formValueConverters_1.CheckboxValueConverter(trueValue, falseValue));
    };
    /** bind a TDataPropValue property to a 'radio' input */
    FormBinder.prototype.radioCustom = function (dataName, value, valueConverter) {
        var adaptorInjector = this.custom(new RadioFormBinder(propertyPathBuilder_1.toDataPath(dataName, this.parentPath), "checked", valueConverter, "value"));
        // tslint:disable-next-line:no-string-literal
        adaptorInjector["type"] = "radio";
        // tslint:disable-next-line:no-string-literal
        adaptorInjector["value"] = value;
        return adaptorInjector;
    };
    /** bind a string property to a 'radio' input */
    FormBinder.prototype.radio = function (dataName, value) {
        return this.radioCustom(dataName, value, formValueConverters_1.DefaultValueConverter.instance);
    };
    /** bind a number property to a 'radio' input */
    FormBinder.prototype.radioNumeric = function (dataName, value) {
        return this.radioCustom(dataName, value.toString(), formValueConverters_1.NumericValueConverter.instance);
    };
    /** bind a TDataPropValue property to a 'radio' input */
    FormBinder.prototype.radioListCustom = function (dataName, valueConverter) {
        var adaptorInjector = this.custom(new RadioListFormBinder(propertyPathBuilder_1.toDataPath(dataName, this.parentPath), "value", valueConverter));
        // tslint:disable-next-line:no-string-literal
        adaptorInjector["type"] = "radio";
        return adaptorInjector;
    };
    /** bind a string property to a 'radio' input */
    FormBinder.prototype.radioList = function (dataName) {
        return this.radioListCustom(dataName, formValueConverters_1.DefaultValueConverter.instance);
    };
    /** bind a number property to a 'radio' input */
    FormBinder.prototype.radioListNumeric = function (dataName) {
        return this.radioListCustom(dataName, formValueConverters_1.NumericValueConverter.instance);
    };
    return FormBinder;
}());
exports.FormBinder = FormBinder;
var KeyboardHelper = /** @class */ (function () {
    function KeyboardHelper() {
    }
    KeyboardHelper.numericKeyPress = function (e, options) {
        var element = e.currentTarget;
        var value = element.value;
        if (e.keyCode === keyCodes_1.KeyCodes.dash && value.indexOf("-") !== -1) {
            e.preventDefault();
            return;
        }
        if (e.keyCode === keyCodes_1.KeyCodes.period && value.indexOf(".") !== -1) {
            e.preventDefault();
            return;
        }
    };
    return KeyboardHelper;
}());
