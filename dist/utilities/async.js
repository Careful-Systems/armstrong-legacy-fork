"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.delay = function (ms) { return new Promise(function (res) { return setTimeout(res, ms); }); };
