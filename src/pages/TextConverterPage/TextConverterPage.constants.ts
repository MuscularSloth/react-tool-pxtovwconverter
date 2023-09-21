import {ConvertationOptions} from './TextConverterPage.types';

export const initialConvertationOptions: ConvertationOptions = {
  removeRowsWithoutVw: true,
  removeEmptySelectors: true,
  dontCalculateLessThanState: false,
  dontCalculateLessThanValue: 5,
  excludeRulesEnabled: true,
  excludeRulesArray: ['border', 'box-shadow', 'outline'],
};
