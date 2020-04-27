interface MethodSpec {
    name: string;
    args: string;
    returnsArray?: boolean;
}
export declare function getMethods(obj: any, isRuleContext: boolean): MethodSpec[];
export declare function grammar(config: any): string;
export declare function capitalizeFirstLetter(val: string): string;
export {};
