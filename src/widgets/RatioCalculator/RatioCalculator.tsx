import { RatioProperties } from '@/features/RatioProperties/RatioProperties.tsx'
import { RatioResults } from '@/features/RatioResults/RatioResults.tsx'

export function RatioCalculator() {
  return (
    <div className="flex flex-1 flex-col gap-4 p-4">
      <RatioProperties />
      <RatioResults />
    </div>
  )
}
