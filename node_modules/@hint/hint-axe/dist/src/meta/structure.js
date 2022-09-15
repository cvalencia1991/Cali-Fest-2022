"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const utils_types_1 = require("@hint/utils-types");
const hint_scope_1 = require("hint/dist/src/lib/enums/hint-scope");
const i18n_import_1 = require("../i18n.import");
const meta = {
    docs: {
        category: utils_types_1.Category.accessibility,
        description: (0, i18n_import_1.getMessage)('structure_description', 'en'),
        name: (0, i18n_import_1.getMessage)('structure_name', 'en')
    },
    getDescription(language) {
        return (0, i18n_import_1.getMessage)('structure_description', language);
    },
    getName(language) {
        return (0, i18n_import_1.getMessage)('structure_name', language);
    },
    id: 'axe/structure',
    schema: [
        {
            additionalProperties: false,
            properties: {
                'avoid-inline-spacing': { enum: ['off', 'information', 'hint', 'warning', 'error', 'default'], type: 'string' },
                'css-orientation-lock': { enum: ['off', 'information', 'hint', 'warning', 'error', 'default'], type: 'string' },
                'definition-list': { enum: ['off', 'information', 'hint', 'warning', 'error', 'default'], type: 'string' },
                dlitem: { enum: ['off', 'information', 'hint', 'warning', 'error', 'default'], type: 'string' },
                'frame-tested': { enum: ['off', 'information', 'hint', 'warning', 'error', 'default'], type: 'string' },
                'hidden-content': { enum: ['off', 'information', 'hint', 'warning', 'error', 'default'], type: 'string' },
                list: { enum: ['off', 'information', 'hint', 'warning', 'error', 'default'], type: 'string' },
                listitem: { enum: ['off', 'information', 'hint', 'warning', 'error', 'default'], type: 'string' }
            }
        },
        {
            items: {
                enum: ['avoid-inline-spacing', 'css-orientation-lock', 'definition-list', 'dlitem', 'frame-tested', 'hidden-content', 'list', 'listitem'],
                type: 'string'
            },
            typeof: 'array',
            uniqueItems: true
        }
    ],
    scope: hint_scope_1.HintScope.any
};
exports.default = meta;
