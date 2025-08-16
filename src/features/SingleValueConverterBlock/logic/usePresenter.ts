import * as React from 'react'
import { useSelectedWidth } from '@/shared/hooks/use-selected-width.ts'
import { useCustomWidthPresets } from '@/shared/hooks/use-custom-width-presets.ts'
import {
  MAX_WIDTH,
  MIN_WIDTH,
  PRESET_WIDTH_LIST,
} from '@/shared/constants/width-settings.ts'

export function usePresenter() {
  const { selectedWidth } = useSelectedWidth()
  const { customPresetWidth, handleAddNewCustomWidth } = useCustomWidthPresets()

  const [autoCopy, setAutoCopy] = React.useState<boolean>(false)

  const [calculatedValue, setCalculatedValue] = React.useState<number>(0)
  const [error, setError] = React.useState<boolean>(false)
  const [lastResult, setLastResult] = React.useState<number>(0)

  const onCalculateClick = () => {
    if (
      !PRESET_WIDTH_LIST.includes(selectedWidth) &&
      !customPresetWidth.includes(selectedWidth)
    ) {
      handleAddNewCustomWidth(selectedWidth)
    }

    const result = ((calculatedValue / selectedWidth) * 100).toFixed(3)
    setLastResult(+result)
  }

  const handleChangeCalculatedValue: React.ChangeEventHandler<
    HTMLInputElement
  > = (e) => {
    const valueForCheck = parseFloat(e.target.value)

    setCalculatedValue(
      Number.isNaN(valueForCheck)
        ? 0
        : Math.min(Math.max(valueForCheck, MIN_WIDTH), MAX_WIDTH),
    )

    if (error) {
      setError(false)
    }
  }

  return {
    autoCopy,
    setAutoCopy,
    onCalculateClick,
    error,
    setError,
    calculatedValue,
    setCalculatedValue,
    handleChangeCalculatedValue,
    lastResult,
  }
}
