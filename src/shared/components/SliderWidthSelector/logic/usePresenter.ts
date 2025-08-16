import { useCallback } from 'react'
import { useCustomWidthPresets } from '@/shared/hooks/use-custom-width-presets.ts'
import { useSelectedWidth } from '@/shared/hooks/use-selected-width.ts'

export function usePresenter() {
  const { handleAddNewCustomWidth } = useCustomWidthPresets()
  const { selectedWidth, onSelectedWidthChange } = useSelectedWidth()

  const onSelectorChange = useCallback(
    (value: Array<number>) => {
      onSelectedWidthChange(value[0])
    },
    [onSelectedWidthChange],
  )

  return {
    selectedWidth,
    onSelectedWidthChange,
    handleAddNewCustomWidth,
    onSelectorChange,
  }
}
