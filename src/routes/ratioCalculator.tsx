import { createFileRoute } from '@tanstack/react-router'
import { RatioCalculator } from '@/widgets/RatioCalculator/RatioCalculator.tsx'

export const Route = createFileRoute('/ratioCalculator')({
  component: RouteComponent,
})

function RouteComponent() {
  return <RatioCalculator />
}
