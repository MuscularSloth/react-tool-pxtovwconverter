import { useLocalStorage } from 'usehooks-ts'

export type TextConvertOptions = {
  removeRowsWithoutPx: boolean
  removeEmptySelectors: boolean
  dontCalculateLessThanState: boolean
  dontCalculateLessThanValue: number | ''
  excludeRulesEnabled: boolean
  excludeRulesArray: Array<string>
}

export const DEFAULT_CONVERT_OPTIONS: TextConvertOptions = {
  removeRowsWithoutPx: true,
  removeEmptySelectors: true,
  dontCalculateLessThanState: false,
  dontCalculateLessThanValue: 5,
  excludeRulesEnabled: true,
  excludeRulesArray: ['border', 'box-shadow', 'outline'],
}

export function useTextConvert() {
  const [textConvertOptions, setTextConvertOptions] =
    useLocalStorage<TextConvertOptions>(
      'text-convert-options',
      DEFAULT_CONVERT_OPTIONS,
    )

  const setRemoveRowsWithoutPx = (state: boolean) => {
    setTextConvertOptions({ ...textConvertOptions, removeRowsWithoutPx: state })
  }

  const setRemoveEmptySelectors = (state: boolean) => {
    setTextConvertOptions({
      ...textConvertOptions,
      removeEmptySelectors: state,
    })
  }

  const setDontCalculateLessThanState = (state: boolean) => {
    setTextConvertOptions({
      ...textConvertOptions,
      dontCalculateLessThanState: state,
    })
  }

  const setDontCalculateLessThanValue = (state: number | '') => {
    if (state !== '' && !Number.isFinite(state)) return

    setTextConvertOptions({
      ...textConvertOptions,
      dontCalculateLessThanValue: state,
    })
  }

  const setExcludeRulesEnabled = (state: boolean) => {
    setTextConvertOptions({ ...textConvertOptions, excludeRulesEnabled: state })
  }

  const setExcludeRulesArray = (state: Array<string>) => {
    if (!Array.isArray(state)) return

    setTextConvertOptions({ ...textConvertOptions, excludeRulesArray: state })
  }

  const removeExcludeRuleById = (ruleId: number) => {
    setExcludeRulesArray(
      textConvertOptions.excludeRulesArray.filter((_, idx) => ruleId !== idx),
    )
  }

  const addExcludeRule = (rule: string) => {
    setExcludeRulesArray([...textConvertOptions.excludeRulesArray, rule])
  }

  const resetExcludeArray = () => {
    setExcludeRulesArray(DEFAULT_CONVERT_OPTIONS.excludeRulesArray)
  }

  return {
    textConvertOptions,
    setRemoveRowsWithoutPx,
    setRemoveEmptySelectors,
    setDontCalculateLessThanState,
    setDontCalculateLessThanValue,
    setExcludeRulesEnabled,
    setExcludeRulesArray,
    removeExcludeRuleById,
    addExcludeRule,
    resetExcludeArray,
  }
}
