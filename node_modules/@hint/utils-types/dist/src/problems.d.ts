import { ProblemDocumentation } from './problem-documentation';
import { ProblemLocation } from './problem-location';
import { Category } from './category';
import { Severity } from './severity';
import { CodeFix } from './fix';
export { ProblemLocation };
export declare type Problem = {
    location: ProblemLocation;
    message: string;
    sourceCode: string;
    resource: string;
    hintId: string;
    category: Category;
    severity: Severity;
    browsers?: string[];
    codeLanguage?: string;
    documentation?: ProblemDocumentation[];
    fixes?: CodeFix[];
};
//# sourceMappingURL=problems.d.ts.map