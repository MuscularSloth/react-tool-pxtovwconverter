import { useCustomWidthPresets } from '@/shared/hooks/use-custom-width-presets.ts'
import { useSelectedWidth } from '@/shared/hooks/use-selected-width.ts'
import { DEFAULT_WIDTH } from '@/shared/constants/width-settings.ts'

export function usePresenter() {
  const { customPresetWidth, handleRemoveCustomWidth, handleResetCustomWidth } =
    useCustomWidthPresets()
  const { selectedWidth, onSelectedWidthChange } = useSelectedWidth()

  const onReset = () => {
    handleResetCustomWidth()
    onSelectedWidthChange(DEFAULT_WIDTH)
  }

  return {
    selectedWidth,
    onSelectedWidthChange,
    customPresetWidth,
    handleRemoveCustomWidth,
    handleResetCustomWidth,
    onReset,
  }
}
