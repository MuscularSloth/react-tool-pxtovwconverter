import { Info, X } from 'lucide-react'
import type { ListBlockProps } from '@/features/WidthPresets/components/ListBlock/logic/types.ts'
import { HoverTooltip } from '@/shared/components/HoverTooltip/HoverTooltip.tsx'
import { Badge } from '@/shared/components/ui/badge.tsx'
import { Button } from '@/shared/components/ui/button.tsx'

export function ListBlock({
  title,
  hint,
  listItems,
  handleClick,
  selectedItem,
  handleDeleteClick,
}: ListBlockProps) {
  return (
    <div>
      <div className="flex align-items-center gap-2 font-medium text-sm/6">
        {title}
        {hint && (
          <HoverTooltip content={hint}>
            <Info className="w-4" />
          </HoverTooltip>
        )}
      </div>
      <div className="flex flex-wrap gap-2 pt-2">
        {Array.isArray(listItems)
          ? listItems.map((value, idx) => (
              <Badge
                key={idx}
                variant={selectedItem === value ? 'destructive' : 'default'}
                onClick={() => handleClick(value)}
                className="cursor-pointer"
              >
                {value}
                {handleDeleteClick ? (
                  <Button
                    variant="secondary"
                    size="icon"
                    className="size-3"
                    onClick={(e) => {
                      e.stopPropagation()
                      handleDeleteClick(value)
                    }}
                  >
                    <X className="w-3!" />
                  </Button>
                ) : null}
              </Badge>
            ))
          : null}
      </div>
    </div>
  )
}
