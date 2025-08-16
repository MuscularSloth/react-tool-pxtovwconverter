import { WidthPresets } from '@/features/WidthPresets/WidthPresets.tsx'
import { TextConvertOptions } from '@/features/TextConvertOptions/TextConvertOptions.tsx'

export function PxToVwTextConverter() {
  return (
    <div className="flex flex-1 flex-col gap-4 p-4">
      <div className="grid auto-rows-min gap-4 md:grid-cols-2">
        <TextConvertOptions />
        <WidthPresets />
      </div>
      <div>Text block</div>
    </div>
  )
}
