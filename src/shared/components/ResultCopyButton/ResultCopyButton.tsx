import { CheckCheck, CircleAlert, Copy } from 'lucide-react'

import { HoverTooltip } from '@/shared/components/HoverTooltip/HoverTooltip.tsx'
import { Button } from '@/shared/components/ui/button.tsx'
import { cn } from '@/shared/lib/cn.ts'
import { useCopyResult } from '@/shared/components/ResultCopyButton/logic/useCopyResult.tsx'

export function ResultCopyButton({
  value,
}: {
  value: number | string | null | undefined
}) {
  const { copyState, handleCopyResultClick } = useCopyResult()

  return (
    <HoverTooltip content="Click To Copy">
      <Button
        variant="outline"
        onClick={() => handleCopyResultClick(value)}
        className={cn({
          'border-green-700! dark:border-green-500! text-green-700 dark:text-green-500':
            copyState === 'success',
          'border-red-700! dark:border-red-400! text-red-700 dark:text-red-400':
            copyState === 'fail',
        })}
      >
        {value}
        {copyState === 'success' ? (
          <CheckCheck />
        ) : copyState === 'fail' ? (
          <CircleAlert />
        ) : (
          <Copy />
        )}
      </Button>
    </HoverTooltip>
  )
}
