"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const axe_1 = require("./util/axe");
const color_1 = require("./meta/color");
class AxeHint {
    constructor(context) {
        (0, axe_1.register)(context, ['color-contrast', 'color-contrast-enhanced', 'link-in-text-block'], ['link-in-text-block']);
    }
}
exports.default = AxeHint;
AxeHint.meta = color_1.default;
