"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.requestAsync = void 0;
const node_fetch_1 = require("node-fetch");
const https = require("https");
const requestAsync = async (url, options = {}) => {
    let isHTTPS = false;
    if (url.startsWith('https')) {
        isHTTPS = true;
    }
    if (options.strictSSL || isHTTPS) {
        let httpsAgentOptions;
        if (options.rejectUnauthorized !== undefined) {
            httpsAgentOptions = { rejectUnauthorized: options.rejectUnauthorized };
        }
        const httpsAgent = new https.Agent(httpsAgentOptions);
        options.agent = httpsAgent;
    }
    const response = await (0, node_fetch_1.default)(url, options);
    return await response.text();
};
exports.requestAsync = requestAsync;
