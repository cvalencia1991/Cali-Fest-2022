"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const utils_types_1 = require("@hint/utils-types");
const hint_scope_1 = require("hint/dist/src/lib/enums/hint-scope");
const i18n_import_1 = require("../i18n.import");
const meta = {
    docs: {
        category: utils_types_1.Category.accessibility,
        description: (0, i18n_import_1.getMessage)('color_description', 'en'),
        name: (0, i18n_import_1.getMessage)('color_name', 'en')
    },
    getDescription(language) {
        return (0, i18n_import_1.getMessage)('color_description', language);
    },
    getName(language) {
        return (0, i18n_import_1.getMessage)('color_name', language);
    },
    id: 'axe/color',
    schema: [
        {
            additionalProperties: false,
            properties: {
                'color-contrast': { enum: ['off', 'information', 'hint', 'warning', 'error', 'default'], type: 'string' },
                'color-contrast-enhanced': { enum: ['off', 'information', 'hint', 'warning', 'error', 'default'], type: 'string' },
                'link-in-text-block': { enum: ['off', 'information', 'hint', 'warning', 'error', 'default'], type: 'string' }
            }
        },
        {
            items: {
                enum: ['color-contrast', 'color-contrast-enhanced', 'link-in-text-block'],
                type: 'string'
            },
            typeof: 'array',
            uniqueItems: true
        }
    ],
    scope: hint_scope_1.HintScope.any
};
exports.default = meta;
