import { CompatStatement } from '@mdn/browser-compat-data/types';
export interface IMatchesCompatStatement extends CompatStatement {
    matches?: IMatchesBlock;
}
export interface IMatchesBlock {
    keywords?: string[];
    regex_token?: string;
    regex_value?: string;
}
//# sourceMappingURL=matches.d.ts.map