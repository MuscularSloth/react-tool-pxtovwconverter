import { useRatioProperties } from '@/shared/hooks/use-ratio-properties.ts'

export function usePresenter() {
  const { selectedRatioParams } = useRatioProperties()
  const { width, height } = selectedRatioParams || {}

  const rateRatio = width && height ? +(width / height).toFixed(2) : 0

  const paddingCalculated = Number.isNaN(rateRatio)
    ? 0
    : (+rateRatio * 100).toFixed(2)

  const greatestRateRatio =
    width && height ? (+height > +width ? rateRatio : +width / +height) : 0

  const paddingCSSText = `.parent{
    height: 0;
    overflow: hidden;
    position: relative;
    padding-top: ${paddingCalculated}%;
}

.child{
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
}`

  const pseudoElementsCSSText = `.element {
    background: white;
}
.element::before {
    content: "";
    width: 1px;
    margin-left: -1px;
    float: left;
    height: 0;
    padding-top: ${paddingCalculated}%;
}
.element::after { 
    content: "";
    display: table;
    clear: both;
}`

  return {
    width,
    height,
    rateRatio,
    greatestRateRatio,
    paddingCSSText,
    pseudoElementsCSSText,
  }
}
