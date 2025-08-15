import { useLocalStorage } from 'usehooks-ts'
import { useCallback } from 'react'
import {
  DEFAULT_WIDTH,
  MAX_WIDTH,
  MIN_WIDTH,
} from '@/shared/constants/width-settings.ts'

export function useSelectedWidth() {
  const [selectedWidth, setSelectedWidth] = useLocalStorage<number>(
    'selectedWidth',
    DEFAULT_WIDTH,
  )

  const onSelectedWidthChange = useCallback(
    (value: number) => {
      if (
        Number.isFinite(value) &&
        selectedWidth >= MIN_WIDTH &&
        selectedWidth <= MAX_WIDTH
      ) {
        setSelectedWidth(value)
      }
    },
    [setSelectedWidth],
  )
  return { selectedWidth, onSelectedWidthChange }
}
