import type { TextConvertOptions } from '@/shared/hooks/use-text-convert-options.ts'

export const clearCSSRulesWithoutVW = (match: string): string => {
  // console.log({ match })

  if (match.includes('vw')) {
    return match
  }
  return ''
}

export const replacePXToVW = (
  match: string,
  value: number,
  convertationOptions: TextConvertOptions,
  selectedWidth: number,
): string => {
  if (
    convertationOptions.dontCalculateLessThanState &&
    value <= Number(convertationOptions.dontCalculateLessThanValue)
  ) {
    return match
  }
  return `${((value / selectedWidth) * 100).toFixed(3)}vw`
}
