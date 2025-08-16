import { BlockContainer } from '@/shared/components/BlockContainer/BlockContainer.tsx'
import { SliderWidthSelector } from '@/shared/components/SliderWidthSelector/SliderWidthSelector.tsx'
import { Input } from '@/shared/components/ui/input.tsx'
import { Button } from '@/shared/components/ui/button.tsx'
import { Checkbox } from '@/shared/components/ui/checkbox.tsx'
import { usePresenter } from '@/features/SingleValueConverterBlock/logic/usePresenter.ts'
import { ResultCopyButton } from '@/shared/components/ResultCopyButton/ResultCopyButton.tsx'

export function SingleValueConverterBlock() {
  const {
    autoCopy,
    setAutoCopy,
    onCalculateClick,
    calculatedValue,
    handleChangeCalculatedValue,
    lastResult,
  } = usePresenter()

  return (
    <BlockContainer>
      <SliderWidthSelector />
      <div className="flex items-center gap-4 mt-4 flex-wrap">
        <span className="grow min-w-2">
          <Input
            type="number"
            min={0}
            value={calculatedValue}
            onChange={handleChangeCalculatedValue}
          />
        </span>
        <Button onClick={onCalculateClick}>Calculate</Button>
        {lastResult ? <ResultCopyButton value={`${lastResult}vw`} /> : null}
      </div>
      <label className="flex items-center gap-4 mt-6 cursor-pointer">
        <Checkbox
          checked={autoCopy}
          onCheckedChange={(checked) => setAutoCopy(checked === true)}
        />
        <span className="text-sm text-gray-600 dark:text-gray-200">
          Copy result to the clipboard automatically
        </span>
      </label>
    </BlockContainer>
  )
}
