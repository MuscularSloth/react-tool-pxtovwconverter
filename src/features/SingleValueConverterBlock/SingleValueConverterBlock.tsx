import { BlockContainer } from '@/shared/components/BlockContainer/BlockContainer.tsx'
import { SliderWidthSelector } from '@/shared/components/SliderWidthSelector/SliderWidthSelector.tsx'
import { Input } from '@/shared/components/ui/input.tsx'
import { Button } from '@/shared/components/ui/button.tsx'
import { usePresenter } from '@/features/SingleValueConverterBlock/logic/usePresenter.ts'
import { ResultCopyButton } from '@/shared/components/ResultCopyButton/ResultCopyButton.tsx'
import { CheckboxBlock } from '@/shared/components/CheckboxBlock/CheckboxBlock.tsx'

export function SingleValueConverterBlock() {
  const {
    autoCopy,
    setAutoCopy,
    onCalculateClick,
    calculatedValue,
    handleChangeCalculatedValue,
    handleOnBlurCalculatedValue,
    handleOnKeyPress,
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
            onBlur={handleOnBlurCalculatedValue}
            onKeyDown={handleOnKeyPress}
          />
        </span>
        <Button onClick={onCalculateClick}>Calculate</Button>
        {lastResult ? <ResultCopyButton value={`${lastResult}vw`} /> : null}
      </div>
      <CheckboxBlock
        checked={autoCopy}
        onCheckedChange={(checked) => setAutoCopy(checked === true)}
        label="Copy result to the clipboard automatically"
        className="mt-6"
      />
    </BlockContainer>
  )
}
