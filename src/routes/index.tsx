import { createFileRoute } from '@tanstack/react-router'
import { SingleValueCalculation } from '@/widgets/SingleValueCalculation/SingleValueCalculation.tsx'

export const Route = createFileRoute('/')({
  component: RouteComponent,
})

function RouteComponent() {
  return <SingleValueCalculation />
}
