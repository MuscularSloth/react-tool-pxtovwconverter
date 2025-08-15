import { useCallback } from 'react'
import { useLocalStorage } from 'usehooks-ts'
import { DEFAULT_WIDTH } from '@/features/WidthPresets/logic/constants.ts'
import { useCustomWidthPresets } from '@/shared/hooks/use-custom-width-presets.ts'
import { MAX_WIDTH, MIN_WIDTH } from '@/shared/constants/width-settings.ts'

export function usePresenter() {
  const [selectedWidth, setSelectedWidth] = useLocalStorage<number>(
    'selectedWidth',
    DEFAULT_WIDTH,
  )

  const { customPresetWidth, handleRemoveCustomWidth } = useCustomWidthPresets()

  const onWidthChange = useCallback(
    (value: number) => {
      if (
        Number.isFinite(value) &&
        selectedWidth >= MIN_WIDTH &&
        selectedWidth <= MAX_WIDTH
      ) {
        setSelectedWidth(value)
      }
    },
    [setSelectedWidth],
  )

  return {
    selectedWidth,
    onWidthChange,
    customPresetWidth,
    handleRemoveCustomWidth,
  }
}
