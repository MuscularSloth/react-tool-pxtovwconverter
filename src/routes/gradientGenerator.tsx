import { createFileRoute } from '@tanstack/react-router'
import { GradientGenerator } from '@/widgets/GradientGenerator/GradientGenerator.tsx'

export const Route = createFileRoute('/gradientGenerator')({
  component: RouteComponent,
})

function RouteComponent() {
  return <GradientGenerator />
}
