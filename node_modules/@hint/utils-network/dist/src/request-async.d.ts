import { RequestInit } from 'node-fetch';
interface IRequestOptions extends RequestInit {
    rejectUnauthorized?: boolean;
    strictSSL?: boolean;
}
export declare const requestAsync: (url: string, options?: IRequestOptions) => Promise<any>;
export {};
//# sourceMappingURL=request-async.d.ts.map