"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.requestJSONAsync = void 0;
const request_async_1 = require("./request-async");
const requestJSONAsync = (uri, options) => {
    const params = Object.assign({ headers: { 'Content-Type': 'application/json' } }, options);
    return (0, request_async_1.requestAsync)(uri, params);
};
exports.requestJSONAsync = requestJSONAsync;
