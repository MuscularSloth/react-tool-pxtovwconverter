import { CheckCheck, CircleAlert } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import { toast } from 'sonner'

export function useCopyResult() {
  const [copyState, setCopyState] = useState<'idle' | 'success' | 'fail'>(
    'idle',
  )
  const timeoutId = useRef<ReturnType<typeof setTimeout>>(null)

  const handleCopyResultClick = async (
    value: number | string | null | undefined,
  ) => {
    if (!value) {
      return
    }

    try {
      await navigator.clipboard.writeText(`${value}`)
      setCopyState('success')

      toast(`${value} copied to clipboard`, {
        icon: <CheckCheck className="text-green-700 dark:text-green-500" />,
        dismissible: true,
      })
    } catch (error) {
      console.error('Error writing to clipboard:', error)
      setCopyState('fail')

      toast('Error writing to clipboard', {
        icon: <CircleAlert className="text-red-700 dark:text-red-400" />,
        dismissible: true,
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

  return { copyState, handleCopyResultClick }
}
