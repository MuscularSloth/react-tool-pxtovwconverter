import type * as React from 'react'
import { useTextConvert } from '@/shared/hooks/use-text-convert-options.ts'
import { MAX_WIDTH, MIN_WIDTH } from '@/shared/constants/width-settings.ts'

export function usePresenter() {
  const {
    textConvertOptions,
    setRemoveRowsWithoutPx,
    setRemoveEmptySelectors,
    setDontCalculateLessThanState,
    setDontCalculateLessThanValue,
    setExcludeRulesEnabled,
    setExcludeRulesArray,
  } = useTextConvert()

  const handleChangeDontCalculateLessThanValue: React.ChangeEventHandler<
    HTMLInputElement
  > = (e) => {
    if (e.target.value === '') {
      setDontCalculateLessThanValue('')
      return
    }

    const valueForCheck = parseFloat(e.target.value)

    setDontCalculateLessThanValue(
      Number.isNaN(valueForCheck)
        ? 0
        : Math.min(Math.max(valueForCheck, MIN_WIDTH), MAX_WIDTH),
    )
  }

  const handleOnBlurDontCalculateLessThanValue: React.FocusEventHandler<
    HTMLInputElement
  > = (e) => {
    if (e.target.value === '' || Number.isNaN(parseFloat(e.target.value))) {
      setDontCalculateLessThanValue(0)
    }
  }

  return {
    textConvertOptions,
    setRemoveRowsWithoutPx,
    setRemoveEmptySelectors,
    setDontCalculateLessThanState,
    setDontCalculateLessThanValue,
    setExcludeRulesEnabled,
    setExcludeRulesArray,
    handleChangeDontCalculateLessThanValue,
    handleOnBlurDontCalculateLessThanValue,
  }
}
