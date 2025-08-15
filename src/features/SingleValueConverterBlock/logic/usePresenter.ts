import { useCustomWidthPresets } from '@/shared/hooks/use-custom-width-presets.ts'
import { useSelectedWidth } from '@/shared/hooks/use-selected-width.ts'

export function usePresenter() {
  const { handleAddNewCustomWidth } = useCustomWidthPresets()
  const { selectedWidth, onSelectedWidthChange } = useSelectedWidth()

  return {
    selectedWidth,
    onSelectedWidthChange,
    handleAddNewCustomWidth,
  }
}
