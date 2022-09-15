"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ava_1 = require("ava");
const src_1 = require("../src");
(0, ava_1.default)(`prettyPrintArray returns an empty string if the array is empty`, (t) => {
    const expectedString = '';
    const result = (0, src_1.prettyPrintArray)([]);
    t.is(result, expectedString);
});
(0, ava_1.default)(`prettyPrintArray returns the expected string`, (t) => {
    t.is((0, src_1.prettyPrintArray)(['1']), `'1'`);
    t.is((0, src_1.prettyPrintArray)(['1', '2']), `'1' and '2'`);
    t.is((0, src_1.prettyPrintArray)(['1', '2', '3']), `'1', '2', and '3'`);
});
