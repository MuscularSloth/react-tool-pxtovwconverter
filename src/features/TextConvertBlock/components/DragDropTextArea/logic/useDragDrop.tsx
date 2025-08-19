import * as React from 'react'
import { useState } from 'react'
import { filesValidation } from './utils.ts'
import { toast } from 'sonner'
import { CircleAlert } from 'lucide-react'

export function useDragDrop(onDropCb?: (text: string) => void) {
  const [isDropAreaActive, setIsDropAreaActive] = useState(false)
  const [isDropError, setIsDropError] = useState(false)

  const handleDrop = (event: React.DragEvent<HTMLTextAreaElement>) => {
    event.stopPropagation()
    event.preventDefault()
    setIsDropError(false)
    setIsDropAreaActive(false)

    if (!onDropCb) return

    if (
      event.dataTransfer.items.length > 1 ||
      !filesValidation(event.dataTransfer.files)
    ) {
      toast(
        'Please upload SINGLE file having extensions .txt/.css/.scss/.sass only.',
        {
          icon: <CircleAlert className="text-red-700 dark:text-red-400" />,
          dismissible: true,
        },
      )
      return
    }

    const file = event.dataTransfer.files[0]
    const reader = new FileReader()

    reader.onload = function (event: any) {
      onDropCb(event.target.result)
    }

    reader.readAsText(file)

    return false
  }

  const handleDragOver = (event: React.DragEvent<HTMLTextAreaElement>) => {
    event.stopPropagation()
    event.preventDefault()
    if (event.dataTransfer.items.length > 1) {
      setIsDropError(true)
    }
  }

  const handleDragEnter = (event: React.DragEvent<HTMLTextAreaElement>) => {
    event.stopPropagation()
    event.preventDefault()
    setIsDropAreaActive(true)
  }

  const handleDragLeave = (event: React.DragEvent<HTMLTextAreaElement>) => {
    event.stopPropagation()
    event.preventDefault()
    setIsDropError(false)
    setIsDropAreaActive(false)
  }

  return {
    handleDrop,
    handleDragOver,
    handleDragEnter,
    handleDragLeave,
    isDropAreaActive,
    isDropError,
  }
}
