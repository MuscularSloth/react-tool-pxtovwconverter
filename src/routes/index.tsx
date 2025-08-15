import { createFileRoute } from '@tanstack/react-router'
import { App } from '@/app/components/App/App.tsx'

export const Route = createFileRoute('/')({
  component: App,
})
