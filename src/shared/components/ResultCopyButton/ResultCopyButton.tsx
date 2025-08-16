import { CheckCheck, CircleAlert, Copy } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
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
    } catch (error) {
      console.error('Error writing to clipboard:', error)
      setCopyState('fail')
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
          'border-green-700!': copyState === 'success',
          'dark:border-green-500!': copyState === 'success',
          'border-red-700!': copyState === 'fail',
          'dark:border-red-500!': copyState === 'fail',
        })}
      >
        {value}
        {copyState === 'success' ? (
          <CheckCheck className="text-green-700 dark:text-green-500" />
        ) : copyState === 'fail' ? (
          <CircleAlert className="text-red-700 dark:text-red-500" />
        ) : (
          <Copy />
        )}
      </Button>
    </HoverTooltip>
  )
}
