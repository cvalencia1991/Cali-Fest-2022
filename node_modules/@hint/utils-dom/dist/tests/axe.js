"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ava_1 = require("ava");
const proxyquire = require("proxyquire");
const src_1 = require("../src");
const globals_1 = require("../src/globals");
const runAxe = async (html, rule) => {
    const doc = (0, src_1.createHTMLDocument)(html, 'http://localhost');
    (0, globals_1.populateGlobals)(global, doc);
    proxyquire('axe-core', {});
    const axe = global.axe;
    const results = await axe.run(document, {
        runOnly: {
            type: 'rule',
            values: [rule]
        }
    });
    delete global.axe;
    return results;
};
const testAxe = async (t, { pass, fail }) => {
    const rule = t.title;
    const passTests = Array.isArray(pass) ? pass : [pass];
    const failTests = Array.isArray(fail) ? fail : [fail];
    for (const p of passTests) {
        const results = await runAxe(p, rule);
        const errors = results.incomplete.filter((v) => {
            return v.error;
        });
        if (results.violations.length || errors.length) {
            t.log(results);
        }
        t.is(results.violations.length, 0, 'All rules should pass');
        t.is(errors.length, 0, 'No rules should be incomplete due to an error');
    }
    for (const f of failTests) {
        const results = await runAxe(f, rule);
        const errors = results.incomplete.filter((v) => {
            return v.error;
        });
        if (!results.violations.length || errors.length) {
            t.log(results);
        }
        t.is(results.violations.length, 1, 'One rule should fail');
        t.is(results.violations[0].id, rule, 'The failed rule id should match the test');
        t.is(errors.length, 0, 'No rules should be incomplete due to an error');
    }
};
ava_1.default.serial('aria-hidden-focus', async (t) => {
    await testAxe(t, {
        fail: '<p tabindex="0" aria-hidden="true">test</p>',
        pass: '<p aria-hidden="true">test</p>'
    });
});
ava_1.default.serial('form-field-multiple-labels', async (t) => {
    await testAxe(t, {
        fail: [],
        pass: [
            '<label for="test">One</label><input id="test">',
            '<label for="test">Hi</label><label for="test">Foo</label><input type="text" id="test" />'
        ]
    });
});
ava_1.default.serial('document-title', async (t) => {
    await testAxe(t, {
        fail: '<title></title>',
        pass: '<title>test</title>'
    });
});
ava_1.default.serial('duplicate-id', async (t) => {
    await testAxe(t, {
        fail: '<div id="foo"></div><div id="foo"></div>',
        pass: '<div id="foo"></div><div id="bar"></div>'
    });
});
ava_1.default.serial('frame-title', async (t) => {
    await testAxe(t, {
        fail: '<iframe>',
        pass: '<iframe title="test">'
    });
});
ava_1.default.serial('html-has-lang', async (t) => {
    await testAxe(t, {
        fail: '<html>',
        pass: '<html lang="foo">'
    });
});
ava_1.default.serial('html-lang-valid', async (t) => {
    await testAxe(t, {
        fail: '<html lang="foo">',
        pass: '<html lang="en">'
    });
});
ava_1.default.serial('html-xml-lang-mismatch', async (t) => {
    await testAxe(t, {
        fail: '<html lang="en" xml:lang="fr">',
        pass: '<html lang="en" xml:lang="en">'
    });
});
ava_1.default.serial('image-alt', async (t) => {
    await testAxe(t, {
        fail: '<img src="foo">',
        pass: '<img alt="description" src="foo">'
    });
});
ava_1.default.serial('label', async (t) => {
    await testAxe(t, {
        fail: [
            '<label>Name</label><input id="name">',
            '<input type="search"><label for="test">Test</label><input id="test">'
        ],
        pass: '<label for="name">Name</label><input id="name">'
    });
});
ava_1.default.serial('link-name', async (t) => {
    await testAxe(t, {
        fail: '<a href="#"></a>',
        pass: '<a href="#">Read more</a>'
    });
});
ava_1.default.serial('list', async (t) => {
    await testAxe(t, {
        fail: '<ul>test</ul>',
        pass: '<ul><li>test</li></ul>'
    });
});
ava_1.default.serial('listitem', async (t) => {
    await testAxe(t, {
        fail: '<html><li>test</li></html>',
        pass: '<ul><li>test</li></ul>'
    });
});
