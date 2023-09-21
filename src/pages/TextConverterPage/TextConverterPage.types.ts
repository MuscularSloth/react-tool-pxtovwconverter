export interface ConvertationOptions {
  removeRowsWithoutVw: boolean;
  removeEmptySelectors: boolean;
  dontCalculateLessThanState: boolean;
  dontCalculateLessThanValue: number;
  excludeRulesEnabled: boolean;
  excludeRulesArray: string[];
}
