"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ava_1 = require("ava");
const src_1 = require("../src");
(0, ava_1.default)('isLocalFile detects local file URLs', (t) => {
    t.true(src_1.rxLocalFile.test('file://C:/users/foo/bar'));
});
(0, ava_1.default)('isLocalFile detects local file URLs in UNIX style', (t) => {
    t.true(src_1.rxLocalFile.test('file:///Users/foo/bar'));
});
(0, ava_1.default)('isLocalFile ignores public URLs', (t) => {
    t.false(src_1.rxLocalFile.test('http://bing.com/foo/bar'));
});
