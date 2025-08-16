import { SliderWidthSelector } from '@/shared/components/SliderWidthSelector/SliderWidthSelector.tsx'
import { BlockContainer } from '@/shared/components/BlockContainer/BlockContainer.tsx'
import { usePresenter } from '@/features/TextConvertOptions/logic/usePresenter.ts'
import { Input } from '@/shared/components/ui/input.tsx'
import { CheckboxBlock } from '@/shared/components/CheckboxBlock/CheckboxBlock.tsx'
import { ExcludedRulesSelector } from '@/features/TextConvertOptions/components/ExcludedRulesSelector/ExcludedRulesSelector.tsx'

export function TextConvertOptions() {
  const {
    textConvertOptions,
    setRemoveRowsWithoutPx,
    setRemoveEmptySelectors,
    setDontCalculateLessThanState,
    setExcludeRulesEnabled,
    handleChangeDontCalculateLessThanValue,
    handleOnBlurDontCalculateLessThanValue,
  } = usePresenter()

  return (
    <BlockContainer>
      <SliderWidthSelector />
      <div className="flex flex-col gap-4 mt-4 flex-wrap">
        <div className="text-sm text-gray-600 dark:text-gray-200 font-bold">
          Options
        </div>
        <div className="flex items-center gap-4">
          <CheckboxBlock
            checked={textConvertOptions.dontCalculateLessThanState}
            onCheckedChange={(value) =>
              setDontCalculateLessThanState(value as boolean)
            }
            label="Don't convert values less (or equal) than"
          />
          <span>
            <Input
              className="w-20"
              type="number"
              min={0}
              value={textConvertOptions.dontCalculateLessThanValue}
              onChange={handleChangeDontCalculateLessThanValue}
              onBlur={handleOnBlurDontCalculateLessThanValue}
            />
          </span>
        </div>
        <CheckboxBlock
          checked={textConvertOptions.removeRowsWithoutPx}
          onCheckedChange={(value) => setRemoveRowsWithoutPx(value as boolean)}
          label="Remove rows without px"
        />
        <CheckboxBlock
          checked={textConvertOptions.removeEmptySelectors}
          onCheckedChange={(value) => setRemoveEmptySelectors(value as boolean)}
          label="Remove Empty Selectors"
        />
        <div className="flex items-center gap-4">
          <CheckboxBlock
            checked={textConvertOptions.excludeRulesEnabled}
            onCheckedChange={(value) =>
              setExcludeRulesEnabled(value as boolean)
            }
            label="Remove Rules From The List:"
          />
          <ExcludedRulesSelector />
        </div>
      </div>
    </BlockContainer>
  )
}
