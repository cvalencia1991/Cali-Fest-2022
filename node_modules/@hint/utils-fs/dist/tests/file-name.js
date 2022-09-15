"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const path = require("path");
const ava_1 = require("ava");
const src_1 = require("../src");
(0, ava_1.default)('fileName has to return the same as path.basename', (t) => {
    const pathString = '/mnt/test/image.png';
    const expected = path.basename(pathString);
    t.is((0, src_1.fileName)(pathString), expected);
});
