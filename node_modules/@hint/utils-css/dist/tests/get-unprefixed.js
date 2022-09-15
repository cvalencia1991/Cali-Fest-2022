"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const get_unprefixed_1 = require("../src/get-unprefixed");
const ava_1 = require("ava");
(0, ava_1.default)(`Returns vendor prefix`, (t) => {
    const expected = 'animation';
    t.is((0, get_unprefixed_1.getUnprefixed)('-moz-animation'), expected);
});
