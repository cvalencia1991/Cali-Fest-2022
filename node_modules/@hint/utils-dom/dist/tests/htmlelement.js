"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ava_1 = require("ava");
const src_1 = require("../src");
(0, ava_1.default)('id', (t) => {
    const doc = (0, src_1.createHTMLDocument)('<div></div><div id="test"></div>', 'http://localhost/');
    t.is(doc.body.id, '');
    t.is(doc.body.children[0].id, '');
    t.is(doc.body.children[1].id, 'test');
});
(0, ava_1.default)('name', (t) => {
    const doc = (0, src_1.createHTMLDocument)('<input/><input name="test"/>', 'http://localhost/');
    t.is(doc.body.name, '');
    t.is(doc.body.children[0].name, '');
    t.is(doc.body.children[1].name, 'test');
});
(0, ava_1.default)('style', (t) => {
    const doc = (0, src_1.createHTMLDocument)('<body style="color: #000"></body>', 'http://localhost/');
    t.truthy(doc.body.style.getPropertyValue);
});
(0, ava_1.default)('type', (t) => {
    const doc = (0, src_1.createHTMLDocument)(`
        <body>
            <input>
            <input type="checkbox">
            <input type="radio">
            <button>
            <button type="button">
        </body>
    `, 'http://localhost/');
    t.is(doc.body.type, '');
    t.is(doc.body.children[0].type, 'text');
    t.is(doc.body.children[1].type, 'checkbox');
    t.is(doc.body.children[2].type, 'radio');
    t.is(doc.body.children[3].type, 'submit');
    t.is(doc.body.children[4].type, 'button');
});
(0, ava_1.default)('getAttribute', (t) => {
    const doc = (0, src_1.createHTMLDocument)('<div id="foo">test</div>', 'http://localhost/');
    t.is(doc.body.children[0].getAttribute('id'), 'foo');
    t.is(doc.body.children[0].getAttribute('class'), null);
});
(0, ava_1.default)('getAttributeLocation', (t) => {
    const doc = (0, src_1.createHTMLDocument)('<div>\n<button type="button">\nTest\n</button>\n</div>', 'http://localhost');
    const button = doc.body.children[0].children[0];
    const typeAttributeLocation = button.getAttributeLocation('type');
    t.is(typeAttributeLocation.line, 1, 'Start line');
    t.is(typeAttributeLocation.column, 8, 'Start column');
    t.is(typeAttributeLocation.endLine, 1, 'End line');
    t.is(typeAttributeLocation.endColumn, 21, 'End column');
    t.is(typeAttributeLocation.startOffset, 14, 'Start offset');
    t.is(typeAttributeLocation.endOffset, 27, 'End offset');
});
(0, ava_1.default)('getAttributeLocation (not found)', (t) => {
    const baseDoc = (0, src_1.createHTMLDocument)('<div>Test</div>', 'http://localhost');
    const doc = (0, src_1.createHTMLDocument)('<div>\n<button type="button">\nTest\n</button>\n</div>', 'http://localhost', baseDoc);
    const button = doc.body.children[0].children[0];
    const typeAttributeLocation = button.getAttributeLocation('type');
    t.is(typeAttributeLocation.line, -1, 'Start line');
    t.is(typeAttributeLocation.column, -1, 'Start column');
    t.is(typeAttributeLocation.endLine, -1, 'End line');
    t.is(typeAttributeLocation.endColumn, -1, 'End column');
    t.is(typeAttributeLocation.startOffset, -1, 'Start offset');
    t.is(typeAttributeLocation.endOffset, -1, 'End offset');
});
(0, ava_1.default)('getLocation', (t) => {
    const doc = (0, src_1.createHTMLDocument)('<div>\n<span>\nTest\n</span>\n</div>', 'http://localhost');
    const span = doc.body.children[0].children[0];
    const location = span.getLocation();
    t.is(location.line, 1, 'Start line');
    t.is(location.column, 0, 'Start column');
    t.is(location.endLine, 3, 'End line');
    t.is(location.endColumn, 7, 'End column');
    t.is(location.startOffset, 6, 'Start offset');
    t.is(location.endOffset, 25, 'End offset');
});
(0, ava_1.default)('getLocation (not found)', (t) => {
    const baseDoc = (0, src_1.createHTMLDocument)('<div>Test</div>', 'http://localhost');
    const doc = (0, src_1.createHTMLDocument)('<div>\n<span>\nTest\n</span>\n</div>', 'http://localhost', baseDoc);
    const span = doc.body.children[0].children[0];
    const location = span.getLocation();
    t.is(location.line, -1, 'Start line');
    t.is(location.column, -1, 'Start column');
    t.is(location.endLine, -1, 'End line');
    t.is(location.endColumn, -1, 'End column');
    t.is(location.startOffset, -1, 'Start offset');
    t.is(location.endOffset, -1, 'End offset');
});
(0, ava_1.default)('hasAttribute', (t) => {
    const doc = (0, src_1.createHTMLDocument)('<div id="foo">test</div>', 'http://localhost/');
    t.true(doc.body.children[0].hasAttribute('id'));
    t.false(doc.body.children[0].hasAttribute('class'));
});
(0, ava_1.default)('hasAttributes', (t) => {
    const doc = (0, src_1.createHTMLDocument)('<div id="foo">test</div>', 'http://localhost/');
    t.true(doc.body.children[0].hasAttributes());
    t.false(doc.body.hasAttributes());
});
(0, ava_1.default)('hasAttributeSpread', (t) => {
    const doc = (0, src_1.createHTMLDocument)('<input {...spread}/><input type="text"/>', 'http://localhost/');
    t.true(doc.body.children[0].hasAttributeSpread());
    t.false(doc.body.children[1].hasAttributeSpread());
});
(0, ava_1.default)('isAttributeAnExpression', (t) => {
    const doc = (0, src_1.createHTMLDocument)('<div id={id} class="foo">{value}</div>', 'http://localhost/');
    t.true(doc.body.children[0].isAttributeAnExpression('id'));
    t.false(doc.body.children[0].isAttributeAnExpression('class'));
});
(0, ava_1.default)('matches', (t) => {
    const doc = (0, src_1.createHTMLDocument)('<div id="match-me"></div>', 'http://localhost/');
    t.true(doc.body.children[0].matches('#match-me'));
});
(0, ava_1.default)('getChildIndent (one line)', (t) => {
    const doc = (0, src_1.createHTMLDocument)('<div id="match-me"></div>', 'http://localhost/');
    const matchElement = doc.body.children[0];
    const indentObj = matchElement.getChildIndent();
    t.is(indentObj.indent, '');
    t.is(indentObj.newlineType, '');
});
(0, ava_1.default)('getChildIndent (two line)', (t) => {
    const doc = (0, src_1.createHTMLDocument)('<div id="match-me">\n</div>', 'http://localhost/');
    const matchElement = doc.body.children[0];
    const indentObj = matchElement.getChildIndent();
    t.is(indentObj.indent, '  ');
    t.is(indentObj.newlineType, '\n');
});
(0, ava_1.default)('getChildIndent (three line)', (t) => {
    const doc = (0, src_1.createHTMLDocument)('<div id="match-me">\n    <div></div>\r\n</div>', 'http://localhost/');
    const matchElement = doc.body.children[0];
    const indentObj = matchElement.getChildIndent();
    t.is(indentObj.indent, '    ');
    t.is(indentObj.newlineType, '\n');
});
(0, ava_1.default)('prependChildOuterHtml (one line)', (t) => {
    const doc = (0, src_1.createHTMLDocument)('<div id="match-me"></div>', 'http://localhost/');
    const matchElement = doc.body.children[0];
    const newOuterHTML = matchElement.prependChildOuterHtml('<span></span>');
    t.is(newOuterHTML, '<div id="match-me"><span></span></div>');
});
(0, ava_1.default)('prependChildOuterHtml (two lines)', (t) => {
    const doc = (0, src_1.createHTMLDocument)('<div id="match-me">\n</div>', 'http://localhost/');
    const matchElement = doc.body.children[0];
    const newOuterHTML = matchElement.prependChildOuterHtml('<span></span>');
    t.is(newOuterHTML, '<div id="match-me">\n  <span></span>\n</div>');
});
(0, ava_1.default)('prependChildOuterHtml (three lines)', (t) => {
    const doc = (0, src_1.createHTMLDocument)('<div id="match-me">\n  <div></div>\n</div>', 'http://localhost/');
    const matchElement = doc.body.children[0];
    const newOuterHTML = matchElement.prependChildOuterHtml('<span></span>');
    t.is(newOuterHTML, '<div id="match-me">\n  <span></span>\n  <div></div>\n</div>');
});
