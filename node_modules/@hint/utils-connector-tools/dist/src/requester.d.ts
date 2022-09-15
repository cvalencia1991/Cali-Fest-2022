import { NetworkData } from 'hint';
import { IRequestOptions } from './requester-options';
export declare class Requester {
    private static validRedirects;
    private _redirects;
    private _maxRedirects;
    private _options;
    private tryToDecompress;
    private decompressors;
    private decompressResponse;
    constructor(customOptions?: IRequestOptions);
    getRedirects(uri: string): string[];
    private getResourceNetworkDataFromDataUri;
    get(uri: string): Promise<NetworkData>;
}
//# sourceMappingURL=requester.d.ts.map