import { cn } from '@/shared/lib/cn.ts'
import * as React from 'react'

export function BlockContainer({
  children,
  className,
}: {
  children: React.ReactNode
  className?: string
}) {
  return (
    <div className={cn('bg-muted/10 rounded-xl border p-4', className)}>
      {children}
    </div>
  )
}
