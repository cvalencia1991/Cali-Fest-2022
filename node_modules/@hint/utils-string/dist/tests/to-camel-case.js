"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ava_1 = require("ava");
const src_1 = require("../src");
(0, ava_1.default)('toCamelCase transforms a - separated string to camelCase', (t) => {
    const source = 'this-is-a-string';
    const expected = 'thisIsAString';
    const transformed = (0, src_1.toCamelCase)(source);
    t.is(transformed, expected, `${transformed} !== ${expected}`);
});
