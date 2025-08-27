import { BlockContainer } from '@/shared/components/BlockContainer/BlockContainer.tsx'
import { usePresenter } from './logic/usePresenter.ts'
import { ResultCopyButton } from '@/shared/components/ResultCopyButton'

export function RatioResults() {
  const {
    width,
    height,
    greatestRateRatio,
    paddingCSSText,
    pseudoElementsCSSText,
  } = usePresenter()

  if (!width || !height) {
    return null
  }

  return (
    <div className="grid auto-rows-min gap-4 md:grid-cols-3">
      <BlockContainer>
        <ResultCopyButton value={`aspect-ratio: ${width}/${height};`} />
        <div className="py-3">or</div>
        <ResultCopyButton
          value={`aspect-ratio: ${
            width < height ? greatestRateRatio.toFixed(2) : 1
          }/${width > height ? greatestRateRatio.toFixed(2) : 1};`}
        />
      </BlockContainer>
      <BlockContainer>{paddingCSSText}</BlockContainer>
      <BlockContainer>{pseudoElementsCSSText}</BlockContainer>
    </div>
  )
}
