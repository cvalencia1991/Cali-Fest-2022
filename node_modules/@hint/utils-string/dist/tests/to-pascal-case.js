"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ava_1 = require("ava");
const src_1 = require("../src");
(0, ava_1.default)(`toPascalCase returns a string in Pascal Case`, (t) => {
    const expected = 'ThisIsAString';
    const pascalCased = (0, src_1.toPascalCase)('this-is-a-string');
    t.is(pascalCased, expected);
});
(0, ava_1.default)(`toPascalCase returns a string in Pascal Case even if the input doesn't have delimiter`, (t) => {
    const expected = 'Test';
    const pascalCased = (0, src_1.toPascalCase)('test');
    t.is(pascalCased, expected);
});
(0, ava_1.default)(`toPascalCase returns an empty sting if passed`, (t) => {
    const expected = '';
    const pascalCased = (0, src_1.toPascalCase)('');
    t.is(pascalCased, expected);
});
