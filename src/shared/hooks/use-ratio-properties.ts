import { useLocalStorage } from 'usehooks-ts'
import { useCallback } from 'react'
import { valueAccessor } from '@/features/RatioProperties/logic/utils.ts'
import { RATIO_SLIDER_MARKS } from '@/shared/constants/ratio-settings.ts'

export function useRatioProperties() {
  const [ratioAccuracy, setRatioAccuracy] = useLocalStorage<number>(
    'ratioAccuracy',
    Math.max(...RATIO_SLIDER_MARKS.map(valueAccessor)),
  )

  const [selectedRatioParams, setSelectedRatioParams] = useLocalStorage<
    | {
        width: number
        height: number
      }
    | undefined
  >('selectedRatioParams', undefined)

  const onRatioAccuracyChange = useCallback(
    (value: number[]) => {
      setRatioAccuracy(value[0])
    },
    [setRatioAccuracy],
  )
  return {
    ratioAccuracy,
    onRatioAccuracyChange,
    selectedRatioParams,
    setSelectedRatioParams,
  }
}
