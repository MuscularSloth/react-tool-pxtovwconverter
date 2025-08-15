import { BlockContainer } from '@/shared/components/BlockContainer/BlockContainer.tsx'
import { ListBlock } from '@/features/WidthPresets/components/ListBlock/ListBlock.tsx'
import { PRESET_WIDTH_LIST } from '@/features/WidthPresets/logic/constants.ts'
import { usePresenter } from '@/features/WidthPresets/logic/usePresenter.ts'

export function WidthPresets() {
  const {
    selectedWidth,
    customPresetWidth,
    onWidthChange,
    handleRemoveCustomWidth,
  } = usePresenter()

  return (
    <BlockContainer>
      <div className="flex flex-col gap-6 p-4">
        <ListBlock
          title="Viewport Width Presets:"
          hint="Clicking on a preset sets the width value."
          listItems={PRESET_WIDTH_LIST}
          handleClick={onWidthChange}
          selectedItem={selectedWidth}
        />
        <ListBlock
          title="Custom Viewport Width Presets:"
          hint="The new viewport width value will be added automatically during the next calculation if it has not been used previously."
          listItems={customPresetWidth}
          handleClick={onWidthChange}
          selectedItem={selectedWidth}
          handleDeleteClick={handleRemoveCustomWidth}
        />
      </div>
    </BlockContainer>
  )
}
