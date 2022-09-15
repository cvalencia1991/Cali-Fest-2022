"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ava_1 = require("ava");
const src_1 = require("../src");
(0, ava_1.default)('isHTMLDocument retursn blindly true if protocol is "file:"', (t) => {
    const url = 'file://index.html';
    t.true((0, src_1.isHTMLDocument)(url, {}), `isHTMLDocument doesn't return true if URL protocol is "file:"`);
});
(0, ava_1.default)('isHTMLDocument guesses if response is HTML based on the media type', (t) => {
    const url = 'https://someresource.com/index.html';
    const htmlResponse = { 'content-type': 'text/html' };
    const noHtmlResponse = { 'content-type': 'text/javascript' };
    const invalidContentType = { 'content-type': 'asdasdasda' };
    t.true((0, src_1.isHTMLDocument)(url, htmlResponse), `isHTMLDocument doesn't recognize HTML if header is text/html`);
    t.false((0, src_1.isHTMLDocument)(url, noHtmlResponse), `isHTMLDocument doesn't recognize is not HTML if header is text/javascript`);
    t.false((0, src_1.isHTMLDocument)(url, invalidContentType), `isHTMLDocument doesn't recognize invalid content types are not HTML`);
});
