import type { CheckedState } from '@radix-ui/react-checkbox'
import { Checkbox } from '@/shared/components/ui/checkbox.tsx'
import { cn } from '@/shared/lib/cn.ts'

export function CheckboxBlock({
  checked,
  onCheckedChange,
  label,
  className,
}: {
  checked?: CheckedState | undefined
  onCheckedChange?: (checked: CheckedState) => void
  label?: string
  className?: string
}) {
  return (
    <label className={cn('flex items-center gap-4 cursor-pointer', className)}>
      <Checkbox
        checked={checked}
        onCheckedChange={onCheckedChange}
        className="cursor-pointer"
      />
      {label && (
        <span className="text-sm text-gray-600 dark:text-gray-200">
          {label}
        </span>
      )}
    </label>
  )
}
