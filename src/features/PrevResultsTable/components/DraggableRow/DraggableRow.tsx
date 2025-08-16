import { CSS } from '@dnd-kit/utilities'
import { useSortable } from '@dnd-kit/sortable'
import { GripHorizontal, Trash2 } from 'lucide-react'
import { cva } from 'class-variance-authority'
import type { PreviousCalcValuesType } from '@/shared/hooks/use-prev-calculations.ts'
import { usePrevCalcValues } from '@/shared/hooks/use-prev-calculations.ts'
import { TableCell, TableRow } from '@/shared/components/ui/table.tsx'
import { HoverTooltip } from '@/shared/components/HoverTooltip/HoverTooltip.tsx'
import { Button } from '@/shared/components/ui/button.tsx'
import { ResultCopyButton } from '@/shared/components/ResultCopyButton'

export type RowType = 'Row'

export interface RowDragData {
  type: RowType
  row: PreviousCalcValuesType
}

export function DraggableRow({
  row,
  isOverlay,
}: {
  row: PreviousCalcValuesType
  isOverlay?: boolean
}) {
  const { removePrevValueById } = usePrevCalcValues()

  const {
    setNodeRef,
    attributes,
    listeners,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: row.id,
    data: {
      type: 'Row',
      row,
    } satisfies RowDragData,
    attributes: {
      roleDescription: `Row: ${row.selectedWidth} - ${row.calculatedValue}`,
    },
  })

  const style = {
    transition,
    transform: CSS.Translate.toString(transform),
  }

  const variants = cva('', {
    variants: {
      dragging: {
        over: 'ring-2 opacity-30',
        overlay: 'ring-2 ring-primary w-full',
      },
    },
  })

  return (
    <TableRow
      ref={setNodeRef}
      style={style}
      className={variants({
        dragging: isOverlay ? 'overlay' : isDragging ? 'over' : undefined,
      })}
    >
      <TableCell className="font-medium">
        <HoverTooltip content="Hold to drag">
          <Button
            variant="ghost"
            size="icon"
            className="size-7 cursor-grab"
            {...attributes}
            {...listeners}
          >
            <GripHorizontal />
          </Button>
        </HoverTooltip>
      </TableCell>
      <TableCell>{row.selectedWidth}</TableCell>
      <TableCell>{row.calculatedValue}</TableCell>
      <TableCell>
        <ResultCopyButton value={`${row.result}vw`} />
      </TableCell>
      <TableCell>
        <HoverTooltip content="Delete result">
          <Button
            variant="ghost"
            size="icon"
            className="size-7"
            onClick={() => removePrevValueById(row.id)}
          >
            <Trash2 />
          </Button>
        </HoverTooltip>
      </TableCell>
    </TableRow>
  )
}
