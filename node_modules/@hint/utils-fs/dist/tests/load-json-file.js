"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = require("path");
const ava_1 = require("ava");
const src_1 = require("../src");
const resolve = (route) => {
    return (0, path_1.join)(__dirname, route);
};
(0, ava_1.default)('loadJSONFile throws an exception if missing file', (t) => {
    t.throws(() => {
        (0, src_1.loadJSONFile)(resolve('../fixture/dontexists.json'));
    });
});
(0, ava_1.default)('loadJSONFile throws an exception if invalid JSON file', (t) => {
    t.throws(() => {
        (0, src_1.loadJSONFile)(resolve('./fixture/fixture.js'));
    });
});
(0, ava_1.default)('loadJSONFile loads a valid JSON file', (t) => {
    try {
        const a = (0, src_1.loadJSONFile)(resolve('./fixtures/fixture.json'));
        t.is(a.property1, 'value1');
    }
    catch (e) {
        t.fail('Throws unexpected exception');
    }
});
