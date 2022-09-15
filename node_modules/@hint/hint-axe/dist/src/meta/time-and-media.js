"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const utils_types_1 = require("@hint/utils-types");
const hint_scope_1 = require("hint/dist/src/lib/enums/hint-scope");
const i18n_import_1 = require("../i18n.import");
const meta = {
    docs: {
        category: utils_types_1.Category.accessibility,
        description: (0, i18n_import_1.getMessage)('timeAndMedia_description', 'en'),
        name: (0, i18n_import_1.getMessage)('timeAndMedia_name', 'en')
    },
    getDescription(language) {
        return (0, i18n_import_1.getMessage)('timeAndMedia_description', language);
    },
    getName(language) {
        return (0, i18n_import_1.getMessage)('timeAndMedia_name', language);
    },
    id: 'axe/time-and-media',
    schema: [
        {
            additionalProperties: false,
            properties: {
                'audio-caption': { enum: ['off', 'information', 'hint', 'warning', 'error', 'default'], type: 'string' },
                blink: { enum: ['off', 'information', 'hint', 'warning', 'error', 'default'], type: 'string' },
                'meta-refresh': { enum: ['off', 'information', 'hint', 'warning', 'error', 'default'], type: 'string' },
                'no-autoplay-audio': { enum: ['off', 'information', 'hint', 'warning', 'error', 'default'], type: 'string' }
            }
        },
        {
            items: {
                enum: ['audio-caption', 'blink', 'meta-refresh', 'no-autoplay-audio'],
                type: 'string'
            },
            typeof: 'array',
            uniqueItems: true
        }
    ],
    scope: hint_scope_1.HintScope.any
};
exports.default = meta;
