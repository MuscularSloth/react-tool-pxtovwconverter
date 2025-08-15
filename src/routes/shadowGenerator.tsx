import { createFileRoute } from '@tanstack/react-router'
import { ShadowGenerator } from '@/widgets/ShadowGenerator/ShadowGenerator.tsx'

export const Route = createFileRoute('/shadowGenerator')({
  component: RouteComponent,
})

function RouteComponent() {
  return <ShadowGenerator />
}
