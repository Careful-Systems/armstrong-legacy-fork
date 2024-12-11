"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var React = require("react");
var form_1 = require("./form");
var formBinders_1 = require("./formBinders");
var propertyPathBuilder_1 = require("./propertyPathBuilder");
function createFormContext() {
    return {
        Form: function (props) {
            var initialData = props.initialData, withoutClone = props.withoutClone, children = props.children;
            var _a = useForm(initialData, withoutClone), DataForm = _a.DataForm, rest = tslib_1.__rest(_a, ["DataForm"]);
            return (React.createElement(DataForm, null, children(rest)));
        },
        ChildForm: function (props) {
            var ctx = React.useContext(form_1.FormContext);
            if (!ctx) {
                return null;
            }
            return (React.createElement(form_1.ParentFormContext, null, props.children({ bind: new formBinders_1.FormBinder(), dataBinder: ctx.dataBinder, notifyChange: ctx.notifyChange })));
        },
    };
}
exports.createFormContext = createFormContext;
var UseFormContext = /** @class */ (function () {
    function UseFormContext() {
    }
    UseFormContext.prototype.useForm = function (dataPath) {
        return { DataForm: form_1.ParentFormContext, bind: new formBinders_1.FormBinder(propertyPathBuilder_1.toDataPath(dataPath)) };
    };
    return UseFormContext;
}());
exports.UseFormContext = UseFormContext;
function useForm(initialData, withoutClone) {
    if (withoutClone === void 0) { withoutClone = false; }
    var _a = React.useReducer(function (state) { return !state; }, false), __ = _a[0], dispatch = _a[1];
    var dataBinder = React.useMemo(function () {
        return withoutClone ? form_1.Form.jsonDataBinder(initialData) : form_1.Form.jsonDataBinderWithClone(initialData);
    }, [initialData, withoutClone]);
    var bind = React.useMemo(function () {
        return new formBinders_1.FormBinder();
    }, []);
    var context = React.useMemo(function () {
        return new UseFormContext();
    }, []);
    var onDataBinderChange = React.useCallback(function () { return dispatch(0); }, [dispatch]);
    var DataForm = React.useCallback(function (p) {
        return React.createElement(form_1.Form, tslib_1.__assign({}, p, { dataBinder: dataBinder, onDataBinderChange: onDataBinderChange }));
    }, [dataBinder, onDataBinderChange]);
    return { dataBinder: dataBinder, bind: bind, DataForm: DataForm, context: context, notifyChange: onDataBinderChange };
}
exports.useForm = useForm;
