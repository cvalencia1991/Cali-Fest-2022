"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const utils_types_1 = require("@hint/utils-types");
const hint_scope_1 = require("hint/dist/src/lib/enums/hint-scope");
const i18n_import_1 = require("../i18n.import");
const meta = {
    docs: {
        category: utils_types_1.Category.accessibility,
        description: (0, i18n_import_1.getMessage)('keyboard_description', 'en'),
        name: (0, i18n_import_1.getMessage)('keyboard_name', 'en')
    },
    getDescription(language) {
        return (0, i18n_import_1.getMessage)('keyboard_description', language);
    },
    getName(language) {
        return (0, i18n_import_1.getMessage)('keyboard_name', language);
    },
    id: 'axe/keyboard',
    schema: [
        {
            additionalProperties: false,
            properties: {
                accesskeys: { enum: ['off', 'information', 'hint', 'warning', 'error', 'default'], type: 'string' },
                bypass: { enum: ['off', 'information', 'hint', 'warning', 'error', 'default'], type: 'string' },
                'focus-order-semantics': { enum: ['off', 'information', 'hint', 'warning', 'error', 'default'], type: 'string' },
                'frame-focusable-content': { enum: ['off', 'information', 'hint', 'warning', 'error', 'default'], type: 'string' },
                'nested-interactive': { enum: ['off', 'information', 'hint', 'warning', 'error', 'default'], type: 'string' },
                region: { enum: ['off', 'information', 'hint', 'warning', 'error', 'default'], type: 'string' },
                'scrollable-region-focusable': { enum: ['off', 'information', 'hint', 'warning', 'error', 'default'], type: 'string' },
                'skip-link': { enum: ['off', 'information', 'hint', 'warning', 'error', 'default'], type: 'string' },
                tabindex: { enum: ['off', 'information', 'hint', 'warning', 'error', 'default'], type: 'string' }
            }
        },
        {
            items: {
                enum: ['accesskeys', 'bypass', 'focus-order-semantics', 'frame-focusable-content', 'nested-interactive', 'region', 'scrollable-region-focusable', 'skip-link', 'tabindex'],
                type: 'string'
            },
            typeof: 'array',
            uniqueItems: true
        }
    ],
    scope: hint_scope_1.HintScope.any
};
exports.default = meta;
