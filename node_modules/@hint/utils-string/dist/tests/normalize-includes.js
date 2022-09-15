"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ava_1 = require("ava");
const src_1 = require("../src");
(0, ava_1.default)('normalizeIncludes should return the right value', (t) => {
    const mainString = '    ThIs    is a noT nOrmaLIZed sTRing     ';
    t.true((0, src_1.normalizeIncludes)(mainString, '             this              '));
    t.false((0, src_1.normalizeIncludes)(mainString, 'sttring'));
    t.true((0, src_1.normalizeIncludes)(mainString, 'norma'));
    t.true((0, src_1.normalizeIncludes)(mainString, 'string'));
});
