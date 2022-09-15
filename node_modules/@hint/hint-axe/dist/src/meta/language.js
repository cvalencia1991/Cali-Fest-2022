"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const utils_types_1 = require("@hint/utils-types");
const hint_scope_1 = require("hint/dist/src/lib/enums/hint-scope");
const i18n_import_1 = require("../i18n.import");
const meta = {
    docs: {
        category: utils_types_1.Category.accessibility,
        description: (0, i18n_import_1.getMessage)('language_description', 'en'),
        name: (0, i18n_import_1.getMessage)('language_name', 'en')
    },
    getDescription(language) {
        return (0, i18n_import_1.getMessage)('language_description', language);
    },
    getName(language) {
        return (0, i18n_import_1.getMessage)('language_name', language);
    },
    id: 'axe/language',
    schema: [
        {
            additionalProperties: false,
            properties: {
                'html-has-lang': { enum: ['off', 'information', 'hint', 'warning', 'error', 'default'], type: 'string' },
                'html-lang-valid': { enum: ['off', 'information', 'hint', 'warning', 'error', 'default'], type: 'string' },
                'html-xml-lang-mismatch': { enum: ['off', 'information', 'hint', 'warning', 'error', 'default'], type: 'string' },
                'valid-lang': { enum: ['off', 'information', 'hint', 'warning', 'error', 'default'], type: 'string' }
            }
        },
        {
            items: {
                enum: ['html-has-lang', 'html-lang-valid', 'html-xml-lang-mismatch', 'valid-lang'],
                type: 'string'
            },
            typeof: 'array',
            uniqueItems: true
        }
    ],
    scope: hint_scope_1.HintScope.any
};
exports.default = meta;
