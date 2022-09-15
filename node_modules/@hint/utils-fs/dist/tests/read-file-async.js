"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const path = require("path");
const ava_1 = require("ava");
const src_1 = require("../src");
const testContext = [
    {
        name: 'Strips bom',
        file: 'bom.txt',
        content: ''
    },
    {
        name: 'Empty content',
        file: 'empty.txt',
        content: ''
    },
    {
        name: 'Dummy content',
        file: 'dummy.txt',
        content: 'dummy'
    }
];
const test = ava_1.default;
const readFileAsyncMacro = test.macro(async (t, context) => {
    const location = path.join(__dirname, `./fixtures/${context.file}`);
    const content = await (0, src_1.readFileAsync)(location);
    t.is(content, context.content);
});
testContext.forEach((context) => {
    test(`${context.name} - async`, readFileAsyncMacro, context);
});
test('readFileAsync throws exception if not found', async (t) => {
    await t.throwsAsync((0, src_1.readFileAsync)('idontexist'));
});
