"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const utils_types_1 = require("@hint/utils-types");
const hint_scope_1 = require("hint/dist/src/lib/enums/hint-scope");
const i18n_import_1 = require("../i18n.import");
const meta = {
    docs: {
        category: utils_types_1.Category.accessibility,
        description: (0, i18n_import_1.getMessage)('nameRoleValue_description', 'en'),
        name: (0, i18n_import_1.getMessage)('nameRoleValue_name', 'en')
    },
    getDescription(language) {
        return (0, i18n_import_1.getMessage)('nameRoleValue_description', language);
    },
    getName(language) {
        return (0, i18n_import_1.getMessage)('nameRoleValue_name', language);
    },
    id: 'axe/name-role-value',
    schema: [
        {
            additionalProperties: false,
            properties: {
                'aria-hidden-focus': { enum: ['off', 'information', 'hint', 'warning', 'error', 'default'], type: 'string' },
                'button-name': { enum: ['off', 'information', 'hint', 'warning', 'error', 'default'], type: 'string' },
                'empty-heading': { enum: ['off', 'information', 'hint', 'warning', 'error', 'default'], type: 'string' },
                'input-button-name': { enum: ['off', 'information', 'hint', 'warning', 'error', 'default'], type: 'string' },
                'link-name': { enum: ['off', 'information', 'hint', 'warning', 'error', 'default'], type: 'string' }
            }
        },
        {
            items: {
                enum: ['aria-hidden-focus', 'button-name', 'empty-heading', 'input-button-name', 'link-name'],
                type: 'string'
            },
            typeof: 'array',
            uniqueItems: true
        }
    ],
    scope: hint_scope_1.HintScope.any
};
exports.default = meta;
