import { useLocalStorage } from 'usehooks-ts'
import { v4 as uuidv4 } from 'uuid'

export type PreviousCalcValuesType = {
  id: string
  selectedWidth: number
  calculatedValue: number
  result: number
}

export function usePrevCalcValues() {
  const [previousCalcValues, setPreviousCalcValues] = useLocalStorage<
    Array<PreviousCalcValuesType>
  >('previousCalcValues', [])

  const addPreviousValue = (
    selectedWidth: number,
    calculatedValue: number,
    result: number,
  ) => {
    const existingValueIndex = previousCalcValues.findIndex(
      (prev) =>
        prev.selectedWidth === selectedWidth &&
        prev.calculatedValue === calculatedValue,
    )

    if (existingValueIndex >= 0) return

    setPreviousCalcValues([
      ...previousCalcValues,
      { id: uuidv4(), selectedWidth, calculatedValue, result },
    ])
  }

  const removePrevValueById = (rowId: string) => {
    setPreviousCalcValues(previousCalcValues.filter((row) => rowId !== row.id))
  }

  return {
    previousCalcValues,
    removePrevValueById,
    addPreviousValue,
    setPreviousCalcValues,
  }
}
