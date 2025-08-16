import * as React from 'react'
import { useLocalStorage } from 'usehooks-ts'
import { useSelectedWidth } from '@/shared/hooks/use-selected-width.ts'
import { useCustomWidthPresets } from '@/shared/hooks/use-custom-width-presets.ts'
import {
  MAX_WIDTH,
  MIN_WIDTH,
  PRESET_WIDTH_LIST,
} from '@/shared/constants/width-settings.ts'
import { useCopyResult } from '@/shared/components/ResultCopyButton'

export function usePresenter() {
  const { handleCopyResultClick } = useCopyResult()
  const { selectedWidth } = useSelectedWidth()
  const { customPresetWidth, handleAddNewCustomWidth } = useCustomWidthPresets()

  const [autoCopy, setAutoCopy] = useLocalStorage<boolean>(
    'wt-auto-copy',
    false,
  )

  const [calculatedValue, setCalculatedValue] = React.useState<number | ''>(0)
  const [error, setError] = React.useState<boolean>(false)
  const [lastResult, setLastResult] = React.useState<number>(0)

  const onCalculateClick = async () => {
    if (!calculatedValue) {
      return
    }

    if (
      !PRESET_WIDTH_LIST.includes(selectedWidth) &&
      !customPresetWidth.includes(selectedWidth)
    ) {
      handleAddNewCustomWidth(selectedWidth)
    }

    const result = ((calculatedValue / selectedWidth) * 100).toFixed(3)
    setLastResult(+result)

    if (autoCopy) {
      await handleCopyResultClick(`${result}vw`)
    }
  }

  const handleChangeCalculatedValue: React.ChangeEventHandler<
    HTMLInputElement
  > = (e) => {
    if (e.target.value === '') {
      setCalculatedValue('')
      return
    }

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

  const handleOnBlurCalculatedValue: React.FocusEventHandler<
    HTMLInputElement
  > = (e) => {
    if (e.target.value === '' || Number.isNaN(parseFloat(e.target.value))) {
      setCalculatedValue(0)
    }
  }

  const handleOnKeyPress: React.KeyboardEventHandler<HTMLInputElement> = async (
    e,
  ) => {
    if (e.key === 'Enter') {
      await onCalculateClick()
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
    handleOnBlurCalculatedValue,
    handleOnKeyPress,
    lastResult,
  }
}
