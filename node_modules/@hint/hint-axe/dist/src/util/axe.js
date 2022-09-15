"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.register = void 0;
const axe_core_1 = require("axe-core");
const utils_types_1 = require("@hint/utils-types");
const utils_network_1 = require("@hint/utils-network");
const i18n_import_1 = require("../i18n.import");
const registrationMap = new Map();
const getElement = (context, node) => {
    var _a;
    let selector = node.target[0];
    if (Array.isArray(selector)) {
        selector = selector[0];
    }
    return (_a = context.pageDOM) === null || _a === void 0 ? void 0 : _a.querySelector(selector);
};
const hasCheckData = (result) => {
    return !!result.data;
};
const toCheckMessage = (result) => {
    return result.message;
};
const getSummary = (node) => {
    const summary = [...node.all, ...node.any, ...node.none]
        .filter(hasCheckData)
        .map(toCheckMessage)
        .join(' ');
    return summary;
};
const queueRegistration = (registration, map) => {
    const engineKey = registration.context.engineKey;
    const resource = registration.event.resource;
    const registrationsByResource = map.get(engineKey) || new Map();
    const registrations = registrationsByResource.get(resource) || [];
    registrations.push(registration);
    registrationsByResource.set(resource, registrations);
    map.set(engineKey, registrationsByResource);
};
const useRegistrations = (engineKey, resource, map) => {
    const registrationsByResource = map.get(engineKey);
    if (!registrationsByResource) {
        return null;
    }
    const registrations = registrationsByResource.get(resource);
    if (!registrations) {
        return null;
    }
    registrationsByResource.delete(resource);
    if (!registrationsByResource.size) {
        map.delete(engineKey);
    }
    return registrations;
};
const toSeverity = (impact) => {
    if (impact === 'minor') {
        return utils_types_1.Severity.hint;
    }
    if (impact === 'moderate' || impact === 'serious') {
        return utils_types_1.Severity.warning;
    }
    if (impact === 'critical') {
        return utils_types_1.Severity.error;
    }
    return utils_types_1.Severity.warning;
};
const withQuotes = (ruleId) => {
    return `'${ruleId}'`;
};
const evaluateAxe = async (context, event, rules) => {
    const { document, resource } = event;
    const uri = (0, utils_network_1.getAsUri)(resource);
    const shouldScanIframes = !(uri && uri.protocol.includes('file'));
    try {
        const target = document.isFragment ?
            'document.body' :
            'document';
        return await context.evaluate(`(function(module) {
            ${axe_core_1.source}
            var target = ${target};
            return window.axe.run(target, {
                iframes: ${shouldScanIframes},
                runOnly: {
                    type: 'rule',
                    values: [${rules.map(withQuotes).join(',')}]
                }
            });
        })()`);
    }
    catch (e) {
        const err = e;
        let message;
        console.error(`Running axe-core failed: ${err.message}\n${err.stack}`);
        if (err.message.includes('evaluation exceeded')) {
            message = (0, i18n_import_1.getMessage)('notFastEnough', context.language);
        }
        else {
            message = (0, i18n_import_1.getMessage)('errorExecuting', context.language, err.message);
        }
        message = (0, i18n_import_1.getMessage)('tryAgainLater', context.language, message);
        context.report(resource, message, { severity: utils_types_1.Severity.warning });
        return null;
    }
};
const normalizeOptions = (options) => {
    if (Array.isArray(options)) {
        const normalizedOptions = options.reduce((newOptions, axeRuleId) => {
            newOptions[axeRuleId] = 'default';
            return newOptions;
        }, {});
        return normalizedOptions;
    }
    return options || {};
};
const register = (context, rules, disabled) => {
    const options = normalizeOptions(context.hintOptions);
    const { engineKey } = context;
    const enabledRules = rules.filter((rule) => {
        if (options[rule]) {
            return options[rule] !== 'off';
        }
        return !disabled.includes(rule);
    });
    context.on('traverse::end', (event) => {
        queueRegistration({ context, enabledRules, event, options }, registrationMap);
    });
    context.on('scan::end', async ({ resource }) => {
        var _a;
        const registrations = useRegistrations(engineKey, resource, registrationMap);
        if (!registrations) {
            return;
        }
        const ruleToRegistration = new Map();
        for (const registration of registrations) {
            for (const rule of registration.enabledRules) {
                ruleToRegistration.set(rule, registration);
            }
        }
        const document = registrations[0].event.document;
        const rules = Array.from(ruleToRegistration.keys());
        let result = null;
        if (document.defaultView) {
            const target = document.isFragment ? document.body : document.documentElement;
            result = await (0, axe_core_1.run)(target, {
                runOnly: {
                    type: 'rule',
                    values: rules
                }
            });
        }
        else {
            result = await evaluateAxe(context, { document, resource }, rules);
        }
        if (!result || !Array.isArray(result.violations)) {
            throw new Error(`Unable to parse axe results ${result}`);
        }
        for (const violation of result.violations) {
            for (const node of violation.nodes) {
                const summary = getSummary(node);
                const message = summary ? `${violation.help}: ${summary}` : violation.help;
                const registration = ruleToRegistration.get(violation.id);
                const element = getElement(context, node);
                const ruleSeverity = (_a = utils_types_1.Severity[registration.options[violation.id]]) !== null && _a !== void 0 ? _a : utils_types_1.Severity.default;
                const forceSeverity = ruleSeverity !== utils_types_1.Severity.default;
                const severity = !forceSeverity ?
                    toSeverity(violation.impact) :
                    ruleSeverity;
                registration.context.report(resource, message, {
                    documentation: [{
                            link: violation.helpUrl,
                            text: (0, i18n_import_1.getMessage)('learnMore', context.language)
                        }],
                    element,
                    forceSeverity,
                    severity
                });
            }
        }
    });
};
exports.register = register;
