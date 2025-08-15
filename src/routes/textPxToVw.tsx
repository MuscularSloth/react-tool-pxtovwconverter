import { createFileRoute } from '@tanstack/react-router'
import { PxToVwTextConverter } from '@/widgets/PxToVwTextConverter/PxToVwTextConverter.tsx'

export const Route = createFileRoute('/textPxToVw')({
  component: RouteComponent,
})

function RouteComponent() {
  return <PxToVwTextConverter />
}
