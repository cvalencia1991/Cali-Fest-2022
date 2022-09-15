"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ava_1 = require("ava");
const src_1 = require("../src");
(0, ava_1.default)('cwd has to return the same as process.cwd', (t) => {
    const expected = process.cwd();
    t.is((0, src_1.cwd)(), expected);
});
