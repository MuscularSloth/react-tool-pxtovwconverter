import { BlockContainer } from '@/shared/components/BlockContainer/BlockContainer.tsx'
import { ListBlock } from '@/features/WidthPresets/components/ListBlock/ListBlock.tsx'
import { usePresenter } from '@/features/WidthPresets/logic/usePresenter.ts'
import { PRESET_WIDTH_LIST } from '@/shared/constants/width-settings.ts'
import { Button } from '@/shared/components/ui/button.tsx'

export function WidthPresets() {
  const {
    selectedWidth,
    customPresetWidth,
    onSelectedWidthChange,
    handleRemoveCustomWidth,
    onReset,
  } = usePresenter()

  return (
    <BlockContainer>
      <div className="flex flex-col gap-6">
        <ListBlock
          title="Viewport Width Presets:"
          hint="Clicking on a preset sets the width value."
          listItems={PRESET_WIDTH_LIST}
          handleClick={onSelectedWidthChange}
          selectedItem={selectedWidth}
        />
        <ListBlock
          title="Custom Viewport Width Presets:"
          hint="The new viewport width value will be added automatically during the next calculation if it has not been used previously."
          listItems={customPresetWidth}
          handleClick={onSelectedWidthChange}
          selectedItem={selectedWidth}
          handleDeleteClick={
            customPresetWidth.length > 1 ? handleRemoveCustomWidth : undefined
          }
        />
        <Button onClick={onReset}>Reset</Button>
      </div>
    </BlockContainer>
  )
}
