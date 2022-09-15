"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ava_1 = require("ava");
const src_1 = require("../src");
(0, ava_1.default)('isLocalFile detects if the URL is local or not', (t) => {
    const noLocalUri = 'https://myresource.com/';
    const localUri = 'file://somethinghere';
    t.false((0, src_1.isLocalFile)(noLocalUri), `isLocalFile doesn't detect correctly ${noLocalUri} is not a file URI`);
    t.true((0, src_1.isLocalFile)(localUri), `isLocalFile doesn't detect correctly ${localUri} is a file URI`);
});
