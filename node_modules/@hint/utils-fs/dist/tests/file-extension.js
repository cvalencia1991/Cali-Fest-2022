"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ava_1 = require("ava");
const src_1 = require("../src");
(0, ava_1.default)('if the path is an url, fileExtension should return the right extension', (t) => {
    const expected = 'js';
    t.is((0, src_1.fileExtension)('https://example.com/script.js'), expected);
});
(0, ava_1.default)('if the path is a local file, fileExtension should return the right extension', (t) => {
    const expected = 'txt';
    t.is((0, src_1.fileExtension)('c:\\test\\text.txt'), expected);
});
(0, ava_1.default)('if the path is a local file (linux), fileExtension should return the right extension', (t) => {
    const expected = 'png';
    t.is((0, src_1.fileExtension)('/mnt/test/image.png'), expected);
});
