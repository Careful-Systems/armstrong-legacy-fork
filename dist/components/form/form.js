"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var React = require("react");
var classHelpers_1 = require("../../utilities/classHelpers");
var utils_1 = require("../../utilities/utils");
var formBinders_1 = require("./formBinders");
var formCore_1 = require("./formCore");
var propertyPathBuilder_1 = require("./propertyPathBuilder");
var propertyPathResolver_1 = require("./propertyPathResolver");
/** The default Json Data Binder - NOTE, the original instance provided is MUTABLE */
var JsonDataBinder = /** @class */ (function () {
    function JsonDataBinder(data) {
        var _this = this;
        this.data = data;
        this.getValue = function (dataPath) {
            return propertyPathResolver_1.PropertyPathResolver.getValue(_this.data, dataPath);
        };
        this.setValue = function (dataPath, value) {
            propertyPathResolver_1.PropertyPathResolver.setValue(_this.data, dataPath, value);
            _this.lastDataPathSet = dataPath;
        };
        this.toJson = function () {
            return _this.data;
        };
        this.getKeyValue = this.getKeyValue.bind(this);
        this.setKeyValue = this.setKeyValue.bind(this);
        this.createChildBinder = this.createChildBinder.bind(this);
    }
    JsonDataBinder.prototype.getKeyValue = function (keyName) {
        if (utils_1.utils.object.isString(keyName)) {
            return this.data[keyName];
        }
        return propertyPathResolver_1.PropertyPathResolver.getValue(this.data, propertyPathBuilder_1.toDataPath(keyName));
    };
    ;
    JsonDataBinder.prototype.setKeyValue = function (keyName, value) {
        if (utils_1.utils.object.isString(keyName)) {
            this.data[keyName] = value;
            this.lastDataPathSet = keyName;
            return;
        }
        var dataPath = propertyPathBuilder_1.toDataPath(keyName);
        propertyPathResolver_1.PropertyPathResolver.setValue(this.data, dataPath, value);
        this.lastDataPathSet = dataPath;
    };
    ;
    JsonDataBinder.prototype.createChildBinder = function (keyName, autoSync) {
        return new JsonChildDataBinder(keyName, this, autoSync);
    };
    return JsonDataBinder;
}());
var JsonChildDataBinder = /** @class */ (function (_super) {
    tslib_1.__extends(JsonChildDataBinder, _super);
    function JsonChildDataBinder(parentKey, parentDataBinder, autoSync) {
        var _this = _super.call(this, autoSync ? parentDataBinder.getKeyValue(parentKey) : FormDataClone.custom(parentDataBinder.getKeyValue(parentKey))) || this;
        _this.parentKey = parentKey;
        _this.parentDataBinder = parentDataBinder;
        _this.autoSync = autoSync;
        _this.sync = function () {
            if (_this.autoSync) {
                return;
            }
            _this.parentDataBinder.setKeyValue(_this.parentKey, FormDataClone.custom(_this.toJson()));
        };
        return _this;
    }
    return JsonChildDataBinder;
}(JsonDataBinder));
var FormDataClone = /** @class */ (function () {
    function FormDataClone() {
    }
    FormDataClone.json = function (source) {
        return JSON.parse(JSON.stringify(source));
    };
    FormDataClone.custom = function (source) {
        var clone = utils_1.utils.object.clone(source);
        utils_1.utils.object.keys(clone).map(function (key) {
            var value = clone[key];
            if (utils_1.utils.object.isObject(value)) {
                clone[key] = FormDataClone.custom(value);
            }
        });
        return clone;
    };
    return FormDataClone;
}());
exports.FormDataClone = FormDataClone;
function generateUniqueId(formatter) {
    var u = "" + Math.random();
    return formatter ? formatter(u) : u;
}
exports.generateUniqueId = generateUniqueId;
function extractChildValidationResults(validationResults, dataPath) {
    var vrs = validationResults && utils_1.utils.array.filter(validationResults, function (vr) { return vr.attribute.indexOf(dataPath + ".") === 0; });
    if (!vrs) {
        return;
    }
    return vrs.map(function (a) { return (tslib_1.__assign(tslib_1.__assign({}, a), { attribute: a.attribute.substring(dataPath.length + 1) })); });
}
exports.extractChildValidationResults = extractChildValidationResults;
exports.FormContext = React.createContext(undefined);
/**
 * A stateless data bindable form - state is held within the 'dataBinder' property
 * NOTE: This is designed to render all elements in the form on every change. This allows other participating elements to react to these changes
 * NOTE: This element provides a react context, this can be used to get access to the Forms dataBinder (or any parent Form dataBinder when nested)
 */
function Form(props) {
    var focusFirstEmptyInput = props.focusFirstEmptyInput, onSubmit = props.onSubmit, onDataBinderChange = props.onDataBinderChange, onDataChanged = props.onDataChanged, dataBinder = props.dataBinder, children = props.children, className = props.className, validationMode = props.validationMode;
    var formDom = React.useRef();
    React.useEffect(function () {
        if (focusFirstEmptyInput) {
            var inputs = formDom.current.querySelectorAll("input[type=text]:not(:disabled), textarea:not(:disabled)");
            if (inputs[0] && !inputs[0].value) {
                inputs[0].focus();
            }
        }
    });
    var preventDefault = React.useCallback(function (e) {
        if (onSubmit) {
            onSubmit();
        }
        e.preventDefault();
        return false;
    }, [onSubmit]);
    var notifyChange = React.useCallback(function () {
        if (onDataBinderChange) {
            onDataBinderChange(dataBinder);
        }
        if (onDataChanged) {
            onDataChanged(dataBinder.toJson());
        }
    }, [onDataBinderChange, onDataChanged, dataBinder]);
    var ch = FormElementProcessor.processChildren(tslib_1.__assign(tslib_1.__assign({}, props), { validationMode: validationMode || "icon" }), children, notifyChange);
    var context = React.useContext(exports.FormContext);
    var hasParentForm = !!context;
    var className1 = React.useMemo(function () { return classHelpers_1.ClassHelpers.classNames("form", hasParentForm && "form-nested", className); }, [hasParentForm, className]);
    return React.createElement(exports.FormContext.Provider, { value: {
            dataBinder: dataBinder,
            coreProps: props,
            parent: context,
            notifyChange: notifyChange,
        } },
        " ",
        hasParentForm ?
            React.createFactory("div")({ className: className1, ref: formDom }, ch) :
            React.createFactory("form")({ className: className1, onSubmit: preventDefault, ref: formDom }, ch));
}
exports.Form = Form;
Form.Bind = new formBinders_1.FormBinder();
// tslint:disable-next-line: only-arrow-functions
Form.jsonDataBinder = function (data) { return new JsonDataBinder(data); };
// tslint:disable-next-line: only-arrow-functions
Form.jsonDataBinderWithClone = function (data) { return new JsonDataBinder(FormDataClone.custom(data)); };
function ParentFormContext(props) {
    var children = props.children;
    var context = React.useContext(exports.FormContext);
    if (!context) {
        // tslint:disable-next-line:no-console
        console.error("A ParentFormBinder should be rendered within the context of a parent Form");
    }
    return context ? FormElementProcessor.processChildren(context.coreProps, children, context.notifyChange) : children;
}
exports.ParentFormContext = ParentFormContext;
var FormElementProcessor = /** @class */ (function () {
    function FormElementProcessor() {
    }
    FormElementProcessor.processChildren = function (formProps, node, notifyChange) {
        var validationResults = formProps.validationResults;
        return React.Children.map(node, function (element) {
            if (!React.isValidElement(element) || !element.props) {
                return element;
            }
            var props = tslib_1.__assign({}, element.props);
            var children = element.props.children;
            var injector = props;
            var formBinder = formCore_1.getFormBinderFromInjector(injector);
            if (formBinder) {
                formCore_1.updateFormBinderInjector(injector, null);
                if (validationResults && validationResults.length) {
                    if (formProps.validationMode && formProps.validationMode !== "none") {
                        formCore_1.DataValidationMode.set(props, formProps.validationMode);
                    }
                    var validationResult = utils_1.utils.array.find(validationResults, function (vr) { return vr.attribute === formBinder.dataPath; });
                    if (validationResult) {
                        formCore_1.DataValidationMessage.set(props, validationResult.message);
                    }
                    else {
                        // use for child form
                        var childValidators = extractChildValidationResults(validationResults, formBinder.dataPath);
                        if (childValidators && childValidators.length) {
                            // tslint:disable-next-line:no-string-literal
                            props["validationResults"] = childValidators;
                        }
                    }
                }
                formBinder.setElementProperty(props, formProps.dataBinder, validationResults);
                formBinder.handleValueChanged(props, formProps.dataBinder, notifyChange);
                if (formBinder.extender) {
                    formBinder.extender(props, formProps.dataBinder, notifyChange);
                }
                if (formBinder.overrideChildren) {
                    var newChildren = formBinder.overrideChildren(props, formProps.dataBinder);
                    if (typeof newChildren !== "undefined") {
                        children = FormElementProcessor.processChildren(formProps, newChildren, notifyChange);
                    }
                }
            }
            else if (children) {
                children = FormElementProcessor.processChildren(formProps, children, notifyChange);
            }
            return React.cloneElement(element, props, children);
        });
    };
    return FormElementProcessor;
}());
