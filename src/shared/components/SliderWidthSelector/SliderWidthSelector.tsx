import { usePresenter } from './logic/usePresenter.ts'
import { Slider } from '@/shared/components/ui/slider.tsx'
import {
  DEFAULT_WIDTH,
  MAX_WIDTH,
  MIN_WIDTH,
} from '@/shared/constants/width-settings.ts'
import { Input } from '@/shared/components/ui/input.tsx'

export function SliderWidthSelector() {
  const { selectedWidth, onSelectorChange, onSelectedWidthChange } =
    usePresenter()

  return (
    <div className="flex flex-col gap-6">
      <div className="font-medium text-sm/6">
        Selected Viewport Width:{' '}
        <span className="font-bold text-md text-neutral-600 dark:text-neutral-400">
          {selectedWidth}
        </span>
      </div>
      <div className="flex gap-6">
        <Slider
          defaultValue={[DEFAULT_WIDTH]}
          value={[selectedWidth]}
          min={MIN_WIDTH}
          max={MAX_WIDTH}
          step={1}
          onValueChange={onSelectorChange}
          className="grow"
        />
        <Input
          className="shrink-0 w-20"
          value={selectedWidth}
          type="number"
          min={MIN_WIDTH}
          max={MAX_WIDTH}
          step={1}
          onChange={(event) => onSelectedWidthChange(+event.target.value)}
        />
      </div>
    </div>
  )
}
