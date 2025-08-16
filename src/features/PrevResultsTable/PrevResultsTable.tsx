import { DndContext, DragOverlay } from '@dnd-kit/core'
import { SortableContext } from '@dnd-kit/sortable'
import { createPortal } from 'react-dom'
import { BlockContainer } from '@/shared/components/BlockContainer/BlockContainer.tsx'
import {
  Table,
  TableBody,
  TableCaption,
  TableHead,
  TableHeader,
  TableRow,
} from '@/shared/components/ui/table'
import { DraggableRow } from '@/features/PrevResultsTable/components/DraggableRow/DraggableRow.tsx'
import { usePresenter } from '@/features/PrevResultsTable/logic/usePresenter.ts'

export function PrevResultsTable() {
  const {
    handleDragEnd,
    handleDragStart,
    sensors,
    modifiers,
    collisionDetection,
    activeRow,
    rowsIds,
    previousCalcValues,
  } = usePresenter()

  return (
    <BlockContainer>
      <DndContext
        collisionDetection={collisionDetection}
        modifiers={modifiers}
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
        sensors={sensors}
      >
        <Table>
          <TableCaption>
            {!Array.isArray(previousCalcValues) || previousCalcValues.length < 1
              ? 'No calculated results yet'
              : 'A list of your latest calculations.'}
          </TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[50px]"></TableHead>
              <TableHead>Viewport Width</TableHead>
              <TableHead>Calculated Value</TableHead>
              <TableHead>Result</TableHead>
              <TableHead className="w-[50px]"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <SortableContext items={rowsIds}>
              {Array.isArray(previousCalcValues)
                ? previousCalcValues.map((row, id) => (
                    <DraggableRow key={id} row={row} />
                  ))
                : null}
            </SortableContext>
          </TableBody>
        </Table>
        {'document' in window &&
          createPortal(
            <DragOverlay adjustScale>{activeRow && <></>}</DragOverlay>,
            document.body,
          )}
      </DndContext>
    </BlockContainer>
  )
}
