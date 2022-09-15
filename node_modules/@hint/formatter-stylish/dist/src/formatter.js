"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const chalk = require("chalk");
const forEach = require("lodash/forEach");
const groupBy = require("lodash/groupBy");
const reduce = require("lodash/reduce");
const sortBy = require("lodash/sortBy");
const table = require("text-table");
const stripAnsi = require('strip-ansi');
const utils_1 = require("@hint/utils");
const utils_string_1 = require("@hint/utils-string");
const utils_fs_1 = require("@hint/utils-fs");
const utils_debug_1 = require("@hint/utils-debug");
const utils_types_1 = require("@hint/utils-types");
const i18n_import_1 = require("./i18n.import");
const _ = {
    forEach,
    groupBy,
    reduce,
    sortBy
};
const debug = (0, utils_debug_1.debug)(__filename);
const printPosition = (position, text) => {
    if (position === -1) {
        return '';
    }
    return `${text} ${position}`;
};
class StylishFormatter {
    async format(messages, options = {}) {
        const language = options.language;
        debug('Formatting results');
        if (messages.length === 0) {
            return;
        }
        const resources = _.groupBy(messages, 'resource');
        const totals = {
            [utils_types_1.Severity.error.toString()]: 0,
            [utils_types_1.Severity.warning.toString()]: 0,
            [utils_types_1.Severity.information.toString()]: 0,
            [utils_types_1.Severity.hint.toString()]: 0
        };
        let result = _.reduce(resources, (total, msgs, resource) => {
            const partials = {
                [utils_types_1.Severity.error.toString()]: 0,
                [utils_types_1.Severity.warning.toString()]: 0,
                [utils_types_1.Severity.information.toString()]: 0,
                [utils_types_1.Severity.hint.toString()]: 0
            };
            const sortedMessages = _.sortBy(msgs, ['location.line', 'location.column']);
            const tableData = [];
            let hasPosition = false;
            let partialResult = `${chalk.cyan((0, utils_string_1.cutString)(resource, 80))}\n`;
            _.forEach(sortedMessages, (msg) => {
                const color = (0, utils_1.severityToColor)(msg.severity);
                const severity = color((0, i18n_import_1.getMessage)(`capitalized${utils_types_1.Severity[msg.severity].toString()}`, language));
                partials[msg.severity.toString()]++;
                const line = printPosition(msg.location.line, (0, i18n_import_1.getMessage)('line', language));
                const column = printPosition(msg.location.column, (0, i18n_import_1.getMessage)('col', language));
                if (line) {
                    hasPosition = true;
                }
                tableData.push([line, column, severity, msg.message, msg.hintId]);
            });
            if (!hasPosition) {
                tableData.forEach((row) => {
                    row.splice(0, 2);
                });
            }
            partialResult += `${table(tableData)}\n`;
            const color = (0, utils_1.occurencesToColor)(partials);
            totals[utils_types_1.Severity.error] += partials[utils_types_1.Severity.error];
            totals[utils_types_1.Severity.warning] += partials[utils_types_1.Severity.warning];
            totals[utils_types_1.Severity.information] += partials[utils_types_1.Severity.information];
            totals[utils_types_1.Severity.hint] += partials[utils_types_1.Severity.hint];
            const foundMessage = (0, i18n_import_1.getMessage)('partialFound', language, [
                partials[utils_types_1.Severity.error].toString(),
                partials[utils_types_1.Severity.error] === 1 ? (0, i18n_import_1.getMessage)('error', language) : (0, i18n_import_1.getMessage)('errors', language),
                partials[utils_types_1.Severity.warning].toString(),
                partials[utils_types_1.Severity.warning] === 1 ? (0, i18n_import_1.getMessage)('warning', language) : (0, i18n_import_1.getMessage)('warnings', language),
                partials[utils_types_1.Severity.hint].toString(),
                partials[utils_types_1.Severity.hint] === 1 ? (0, i18n_import_1.getMessage)('hint', language) : (0, i18n_import_1.getMessage)('hints', language),
                partials[utils_types_1.Severity.information].toString(),
                partials[utils_types_1.Severity.information] === 1 ? (0, i18n_import_1.getMessage)('information', language) : (0, i18n_import_1.getMessage)('informations', language)
            ]);
            partialResult += color.bold(`× ${foundMessage}`);
            partialResult += '\n\n';
            return total + partialResult;
        }, '');
        const color = (0, utils_1.occurencesToColor)(totals);
        const foundTotalMessage = (0, i18n_import_1.getMessage)('totalFound', language, [
            totals[utils_types_1.Severity.error].toString(),
            totals[utils_types_1.Severity.error] === 1 ? (0, i18n_import_1.getMessage)('error', language) : (0, i18n_import_1.getMessage)('errors', language),
            totals[utils_types_1.Severity.warning].toString(),
            totals[utils_types_1.Severity.warning] === 1 ? (0, i18n_import_1.getMessage)('warning', language) : (0, i18n_import_1.getMessage)('warnings', language),
            totals[utils_types_1.Severity.hint].toString(),
            totals[utils_types_1.Severity.hint] === 1 ? (0, i18n_import_1.getMessage)('hint', language) : (0, i18n_import_1.getMessage)('hints', language),
            totals[utils_types_1.Severity.information].toString(),
            totals[utils_types_1.Severity.information] === 1 ? (0, i18n_import_1.getMessage)('information', language) : (0, i18n_import_1.getMessage)('informations', language)
        ]);
        result += color.bold(`× ${foundTotalMessage}`);
        if (!options.output) {
            utils_1.logger.log(result);
            return;
        }
        await (0, utils_fs_1.writeFileAsync)(options.output, stripAnsi(result));
    }
}
exports.default = StylishFormatter;
