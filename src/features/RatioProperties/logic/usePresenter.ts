import { RATIO_SLIDER_MARKS } from '@/shared/constants/ratio-settings.ts'
import { useRatioProperties } from '@/shared/hooks/use-ratio-properties.ts'
import { useState } from 'react'

export function usePresenter() {
  const {
    ratioAccuracy,
    onRatioAccuracyChange,
    selectedRatioParams,
    setSelectedRatioParams,
  } = useRatioProperties()

  const [width, setWidth] = useState<number | ''>(
    selectedRatioParams?.width ?? 0,
  )
  const [height, setHeight] = useState<number | ''>(
    selectedRatioParams?.height ?? 0,
  )

  const onWidthChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setWidth(e.target.value === '' ? '' : parseInt(e.target.value, 10))
  }

  const onWidthBlur = () => {
    if (!width || !Number.isFinite(width)) {
      setWidth(0)
    }
  }

  const onHeightChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setHeight(e.target.value === '' ? '' : parseInt(e.target.value, 10))
  }

  const onHeightBlur = () => {
    if (!height || !Number.isFinite(height)) {
      setHeight(0)
    }
  }

  const getLabelByValue = (value: number) => {
    return (
      RATIO_SLIDER_MARKS.find((mark) => mark.value === value)?.label || value
    )
  }

  const onCalculationClick = () => {
    if (!width || !height) {
      return
    }
    setSelectedRatioParams({ width, height })
  }

  return {
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
  }
}
