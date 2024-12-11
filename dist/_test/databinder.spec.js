"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var assert = require("assert");
var form_1 = require("../components/form/form");
describe("IDataBinder", function () {
    it("Get and set with key values", function () {
        var db = form_1.Form.jsonDataBinder({ name: "keith", address: { line1: "home" } });
        var setKeyValue = db.setKeyValue;
        var getKeyValue = db.getKeyValue;
        setKeyValue("name", "alan");
        assert.equal(getKeyValue("name"), "alan");
        setKeyValue(function (a) { return a.prop("name"); }, "alan1");
        assert.equal(getKeyValue(function (a) { return a.prop("name"); }), "alan1");
        setKeyValue(function (a) { return a.prop("address").prop("line1"); }, "alan1");
        assert.equal(getKeyValue(function (a) { return a.prop("address").prop("line1"); }), "alan1");
    });
    it("Child Data Binder", function () {
        var db = form_1.Form.jsonDataBinder({ name: "keith", address: { line1: "home" } });
        var getKeyValue = db.getKeyValue;
        // const cdb = db.createChildBinder(b => b.prop("address"))
        var cdb = db.createChildBinder("address");
        var getChildKeyValue = cdb.getKeyValue;
        var setChildKeyValue = cdb.setKeyValue;
        assert.equal(getChildKeyValue("line1"), "home");
        setChildKeyValue("line1", "away");
        assert.equal(getChildKeyValue(function (b) { return b.prop("line1"); }), "away");
        assert.equal(getKeyValue(function (b) { return b.prop("address").prop("line1"); }), "home");
        cdb.sync();
        assert.equal(getKeyValue(function (b) { return b.prop("address").prop("line1"); }), "away");
        setChildKeyValue("line1", "home and away");
        assert.equal(getKeyValue(function (b) { return b.prop("address").prop("line1"); }), "away");
        cdb.sync();
        assert.equal(getKeyValue(function (b) { return b.prop("address").prop("line1"); }), "home and away");
    });
});
