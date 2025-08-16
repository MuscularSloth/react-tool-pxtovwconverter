import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/shared/components/ui/tooltip.tsx'

export function HoverTooltip({
  content,
  children,
}: {
  content: React.ReactNode
  children: React.ReactElement
}) {
  return (
    <Tooltip>
      <TooltipTrigger asChild>{children}</TooltipTrigger>
      <TooltipContent className="max-w-sm">{content}</TooltipContent>
    </Tooltip>
  )
}
