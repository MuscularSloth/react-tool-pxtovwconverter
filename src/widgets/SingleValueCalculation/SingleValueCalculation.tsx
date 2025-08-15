import { WidthPresets } from '@/features/WidthPresets/WidthPresets.tsx'
import { SingleValueConverterBlock } from '@/features/SingleValueConverterBlock/SingleValueConverterBlock.tsx'

export function SingleValueCalculation() {
  return (
    <div className="flex flex-1 flex-col gap-4 p-4">
      <div className="grid auto-rows-min gap-4 md:grid-cols-2">
        <SingleValueConverterBlock />
        <WidthPresets />
      </div>
      <div>Prev Results Table</div>
    </div>
  )
}
