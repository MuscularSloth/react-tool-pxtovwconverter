import { WidthPresets } from '@/features/WidthPresets/WidthPresets.tsx'

export function SingleValueCalculation() {
  return (
    <div className="flex flex-1 flex-col gap-4 p-4">
      <div className="grid auto-rows-min gap-4 md:grid-cols-2">
        <div>Width selector Block</div>
        <WidthPresets />
      </div>
      <div>Prev Results Table</div>
    </div>
  )
}
