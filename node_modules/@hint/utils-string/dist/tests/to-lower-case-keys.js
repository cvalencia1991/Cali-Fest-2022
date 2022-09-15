"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ava_1 = require("ava");
const to_lowercase_keys_1 = require("../src/to-lowercase-keys");
(0, ava_1.default)('toLowerCaseKeys lowercases the properties of an object', (t) => {
    const obj = {
        SometHing: true,
        ANOTHER: false
    };
    const expected = [['something', true], ['another', false]];
    const actual = Object.entries((0, to_lowercase_keys_1.toLowerCaseKeys)(obj));
    t.deepEqual(actual, expected, `Entries are not the same.`);
});
