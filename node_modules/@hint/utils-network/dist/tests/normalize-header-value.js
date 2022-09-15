"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ava_1 = require("ava");
const src_1 = require("../src");
(0, ava_1.default)('getHeaderValueNormalized returns the normalized value of a given header', (t) => {
    const headers = {
        'my-header': '  Something  ',
        'my-other-header': ' Another'
    };
    const myHeader = (0, src_1.normalizeHeaderValue)(headers, 'My-Header');
    t.is(myHeader, 'something', `getHeaderValueNormalized doesn't trim and lowerCase the value`);
});
(0, ava_1.default)('getHeaderValueNormalized returns the default value if no header found', (t) => {
    const headers = {
        'my-header': '  Something  ',
        'my-other-header': ' Another'
    };
    const myHeader = (0, src_1.normalizeHeaderValue)(headers, 'my-header2', 'missing');
    t.is(myHeader, 'missing', `getHeaderValueNormalized doesn't trim and lowerCase the value`);
});
