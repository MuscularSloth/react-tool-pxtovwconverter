import { usePresenter } from './logic/usePresenter.ts'
import { Label } from '@/shared/components/ui/label.tsx'
import { Input } from '@/shared/components/ui/input.tsx'
import SliderTooltip from '@/shared/components/SliderTooltip/SliderTooltip.tsx'
import { valueAccessor } from './logic/utils.ts'
import { BlockContainer } from '@/shared/components/BlockContainer/BlockContainer.tsx'
import { RATIO_SLIDER_MARKS } from '@/shared/constants/ratio-settings.ts'
import { Button } from '@/shared/components/ui/button.tsx'

export function RatioProperties() {
  const {
    ratioAccuracy,
    onRatioAccuracyChange,
    getLabelByValue,
    width,
    onWidthChange,
    onWidthBlur,
    height,
    onHeightChange,
    onHeightBlur,
    onCalculationClick,
  } = usePresenter()

  return (
    <div className="grid auto-rows-min gap-4 md:grid-cols-2">
      <BlockContainer>
        <div className="grid w-full max-w-sm items-center gap-3 mb-5">
          <Label htmlFor="sizeWidth">Size Width</Label>
          <Input
            id="sizeWidth"
            type="number"
            value={width}
            onChange={onWidthChange}
            onBlur={onWidthBlur}
          />
        </div>
        <div className="grid w-full max-w-sm items-center gap-3 mb-5">
          <Label htmlFor="sizeHeight">Size Height</Label>
          <Input
            id="sizeHeight"
            type="number"
            value={height}
            onChange={onHeightChange}
            onBlur={onHeightBlur}
          />
        </div>
        <Button onClick={onCalculationClick}>Calculate</Button>
      </BlockContainer>

      <BlockContainer className="px-10 pb-12">
        <SliderTooltip
          defaultValue={[
            Number.isFinite(ratioAccuracy)
              ? ratioAccuracy
              : valueAccessor(RATIO_SLIDER_MARKS[0]),
          ]}
          min={Math.min(...RATIO_SLIDER_MARKS.map(valueAccessor))}
          max={Math.max(...RATIO_SLIDER_MARKS.map(valueAccessor))}
          step={1}
          onValueCommit={onRatioAccuracyChange}
          className="grow"
          hasMarks={true}
          marks={RATIO_SLIDER_MARKS}
          showTooltip={true}
          tooltipFormatter={getLabelByValue}
          labelFor="MesurementAccuracy"
          labelTitle="Accuracy:"
          labelValue={getLabelByValue}
        />
      </BlockContainer>
    </div>
  )
}
