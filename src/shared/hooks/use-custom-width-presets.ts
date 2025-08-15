import { useLocalStorage } from 'usehooks-ts'
import { useCallback } from 'react'
import { MAX_WIDTH, MIN_WIDTH } from '@/shared/constants/width-settings.ts'

export const DEFAULT_CUSTOM_PRESET = [720]

export function useCustomWidthPresets() {
  const [customPresetWidth, setCustomPresetWidth] = useLocalStorage<
    Array<number>
  >('customPresetWidth', DEFAULT_CUSTOM_PRESET)

  const handleAddNewCustomWidth = useCallback(
    (value: number) => {
      if (Number.isFinite(value) && value >= MIN_WIDTH && value <= MAX_WIDTH) {
        setCustomPresetWidth(
          [...customPresetWidth, value].sort((a, b) => a - b),
        )
      }
    },
    [setCustomPresetWidth],
  )

  const handleRemoveCustomWidth = useCallback(
    (value: number) => {
      setCustomPresetWidth(customPresetWidth.filter((x) => x !== value))
    },
    [setCustomPresetWidth],
  )

  const handleResetCustomWidth = useCallback(() => {
    setCustomPresetWidth(DEFAULT_CUSTOM_PRESET)
  }, [setCustomPresetWidth])

  return {
    customPresetWidth,
    handleAddNewCustomWidth,
    handleRemoveCustomWidth,
    handleResetCustomWidth,
  }
}
