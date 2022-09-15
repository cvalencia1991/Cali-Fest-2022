"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ava_1 = require("ava");
const src_1 = require("../src");
const headers = {
    'header-1': 'value-1',
    'header-2': 'value-2',
    'header-3': 'value-3',
    'header-4': 'value-4'
};
(0, ava_1.default)('includedHeaders - all headers included', (t) => {
    const included = ['header-1', 'header-2'];
    const includedHeaders = (0, src_1.includedHeaders)(headers, included);
    t.deepEqual(includedHeaders, ['header-1', 'header-2']);
});
(0, ava_1.default)('includedHeaders - some headers included', (t) => {
    const included = ['Header-1', 'header-5'];
    const includedHeaders = (0, src_1.includedHeaders)(headers, included);
    t.deepEqual(includedHeaders, ['header-1']);
});
(0, ava_1.default)('includedHeaders - none included', (t) => {
    const included = ['header-5', 'header-6'];
    const includedHeaders = (0, src_1.includedHeaders)(headers, included);
    t.deepEqual(includedHeaders, []);
});
(0, ava_1.default)('includedHeaders - no included headers', (t) => {
    const includedHeaders = (0, src_1.includedHeaders)(headers);
    t.deepEqual(includedHeaders, []);
});
