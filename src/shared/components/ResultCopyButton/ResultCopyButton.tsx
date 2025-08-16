import { CheckCheck, CircleAlert, Copy } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import { toast } from 'sonner'
import { HoverTooltip } from '@/shared/components/HoverTooltip/HoverTooltip.tsx'
import { Button } from '@/shared/components/ui/button.tsx'
import { cn } from '@/shared/lib/cn.ts'

export function ResultCopyButton({
  value,
}: {
  value: number | string | null | undefined
}) {
  const [copyState, setCopyState] = useState<'idle' | 'success' | 'fail'>(
    'idle',
  )
  const timeoutId = useRef<ReturnType<typeof setTimeout>>(null)

  const handleCopyResultClick = async () => {
    try {
      await navigator.clipboard.writeText(`${value}`)
      setCopyState('success')

      toast(`${value} copied to clipboard`, {
        icon: <CheckCheck className="text-green-700 dark:text-green-500" />,
      })
    } catch (error) {
      console.error('Error writing to clipboard:', error)
      setCopyState('fail')

      toast('Error writing to clipboard', {
        icon: <CircleAlert className="text-red-700 dark:text-red-400" />,
      })
    } finally {
      timeoutId.current = setTimeout(() => setCopyState('idle'), 1500)
    }
  }

  useEffect(() => {
    return () => {
      if (timeoutId.current) {
        clearTimeout(timeoutId.current)
      }
    }
  }, [])

  return (
    <HoverTooltip content="Click To Copy">
      <Button
        variant="outline"
        onClick={handleCopyResultClick}
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
