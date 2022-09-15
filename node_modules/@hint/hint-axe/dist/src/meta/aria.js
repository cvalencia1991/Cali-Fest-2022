"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const utils_types_1 = require("@hint/utils-types");
const hint_scope_1 = require("hint/dist/src/lib/enums/hint-scope");
const i18n_import_1 = require("../i18n.import");
const meta = {
    docs: {
        category: utils_types_1.Category.accessibility,
        description: (0, i18n_import_1.getMessage)('aria_description', 'en'),
        name: (0, i18n_import_1.getMessage)('aria_name', 'en')
    },
    getDescription(language) {
        return (0, i18n_import_1.getMessage)('aria_description', language);
    },
    getName(language) {
        return (0, i18n_import_1.getMessage)('aria_name', language);
    },
    id: 'axe/aria',
    schema: [
        {
            additionalProperties: false,
            properties: {
                'aria-allowed-attr': { enum: ['off', 'information', 'hint', 'warning', 'error', 'default'], type: 'string' },
                'aria-allowed-role': { enum: ['off', 'information', 'hint', 'warning', 'error', 'default'], type: 'string' },
                'aria-command-name': { enum: ['off', 'information', 'hint', 'warning', 'error', 'default'], type: 'string' },
                'aria-dialog-name': { enum: ['off', 'information', 'hint', 'warning', 'error', 'default'], type: 'string' },
                'aria-hidden-body': { enum: ['off', 'information', 'hint', 'warning', 'error', 'default'], type: 'string' },
                'aria-input-field-name': { enum: ['off', 'information', 'hint', 'warning', 'error', 'default'], type: 'string' },
                'aria-meter-name': { enum: ['off', 'information', 'hint', 'warning', 'error', 'default'], type: 'string' },
                'aria-progressbar-name': { enum: ['off', 'information', 'hint', 'warning', 'error', 'default'], type: 'string' },
                'aria-required-attr': { enum: ['off', 'information', 'hint', 'warning', 'error', 'default'], type: 'string' },
                'aria-required-children': { enum: ['off', 'information', 'hint', 'warning', 'error', 'default'], type: 'string' },
                'aria-required-parent': { enum: ['off', 'information', 'hint', 'warning', 'error', 'default'], type: 'string' },
                'aria-roledescription': { enum: ['off', 'information', 'hint', 'warning', 'error', 'default'], type: 'string' },
                'aria-roles': { enum: ['off', 'information', 'hint', 'warning', 'error', 'default'], type: 'string' },
                'aria-text': { enum: ['off', 'information', 'hint', 'warning', 'error', 'default'], type: 'string' },
                'aria-toggle-field-name': { enum: ['off', 'information', 'hint', 'warning', 'error', 'default'], type: 'string' },
                'aria-tooltip-name': { enum: ['off', 'information', 'hint', 'warning', 'error', 'default'], type: 'string' },
                'aria-treeitem-name': { enum: ['off', 'information', 'hint', 'warning', 'error', 'default'], type: 'string' },
                'aria-valid-attr': { enum: ['off', 'information', 'hint', 'warning', 'error', 'default'], type: 'string' },
                'aria-valid-attr-value': { enum: ['off', 'information', 'hint', 'warning', 'error', 'default'], type: 'string' },
                'empty-table-header': { enum: ['off', 'information', 'hint', 'warning', 'error', 'default'], type: 'string' },
                'presentation-role-conflict': { enum: ['off', 'information', 'hint', 'warning', 'error', 'default'], type: 'string' }
            }
        },
        {
            items: {
                enum: ['aria-allowed-attr', 'aria-allowed-role', 'aria-command-name', 'aria-dialog-name', 'aria-hidden-body', 'aria-input-field-name', 'aria-meter-name', 'aria-progressbar-name', 'aria-required-attr', 'aria-required-children', 'aria-required-parent', 'aria-roledescription', 'aria-roles', 'aria-text', 'aria-toggle-field-name', 'aria-tooltip-name', 'aria-treeitem-name', 'aria-valid-attr', 'aria-valid-attr-value', 'empty-table-header', 'presentation-role-conflict'],
                type: 'string'
            },
            typeof: 'array',
            uniqueItems: true
        }
    ],
    scope: hint_scope_1.HintScope.any
};
exports.default = meta;
