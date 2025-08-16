import {
  KeyboardSensor,
  MouseSensor,
  TouchSensor,
  closestCenter,
  useSensor,
  useSensors,
} from '@dnd-kit/core'
import { restrictToVerticalAxis } from '@dnd-kit/modifiers'
import { arrayMove } from '@dnd-kit/sortable'
import { useMemo, useState } from 'react'
import type { DragEndEvent, DragStartEvent } from '@dnd-kit/core'
import type { PreviousCalcValuesType } from '@/shared/hooks/use-prev-calculations.ts'
import { usePrevCalcValues } from '@/shared/hooks/use-prev-calculations.ts'

export function usePresenter() {
  const { previousCalcValues, setPreviousCalcValues } = usePrevCalcValues()

  const rowsIds = useMemo(() => {
    return previousCalcValues.map((row) => row.id)
  }, [previousCalcValues])

  const [activeRow, setActiveRow] = useState<PreviousCalcValuesType | null>(
    null,
  )

  function handleDragStart(event: DragStartEvent) {
    const data = event.active.data.current
    if (data?.type === 'Row') {
      setActiveRow(data.row)
      return
    }
  }

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event

    setActiveRow(null)

    // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
    if (active && over && active.id !== over.id) {
      console.log({ active, over })

      setPreviousCalcValues((rows) => {
        const oldIndex = rows.findIndex((row) => row.id === active.id)
        const newIndex = rows.findIndex((row) => row.id === over.id)
        return arrayMove(rows, oldIndex, newIndex)
      })
    }
  }

  const sensors = useSensors(
    useSensor(MouseSensor, {
      activationConstraint: {
        distance: 5,
      },
    }),
    useSensor(TouchSensor, { activationConstraint: { distance: 5 } }),
    useSensor(KeyboardSensor, {}),
  )

  const modifiers = [restrictToVerticalAxis]

  const collisionDetection = closestCenter

  return {
    handleDragEnd,
    handleDragStart,
    sensors,
    modifiers,
    collisionDetection,
    activeRow,
    rowsIds,
    previousCalcValues,
  }
}
