import { createFileRoute } from '@tanstack/react-router'
import { ColorConverter } from '@/widgets/ColorConverter/ColorConverter.tsx'

export const Route = createFileRoute('/colorConverter')({
  component: RouteComponent,
})

function RouteComponent() {
  return <ColorConverter />
}
