import {ConvertationOptions} from './TextConverterPage.types';

export const replacePXToVW = (
  match: string,
  value: number,
  convertationOptions: ConvertationOptions,
  selectedWidth: number,
): string => {
  if (
    convertationOptions.dontCalculateLessThanState &&
    value <= convertationOptions.dontCalculateLessThanValue
  ) {
    return match;
  }
  return `${((value / selectedWidth) * 100).toFixed(3)}vw`;
};
