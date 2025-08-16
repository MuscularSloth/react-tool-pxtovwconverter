import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@radix-ui/react-popover'
import { Trash2 } from 'lucide-react'
import { RulesCombobox } from '@/features/TextConvertOptions/components/ExcludedRulesSelector/components/RulesCombobox/RulesCombobox.tsx'
import { useTextConvert } from '@/shared/hooks/use-text-convert-options.ts'
import { Button } from '@/shared/components/ui/button'
import { ScrollArea } from '@/shared/components/ui/scroll-area.tsx'

export function ExcludedRulesSelector() {
  const { textConvertOptions, removeExcludeRuleById, resetExcludeArray } =
    useTextConvert()

  return (
    <>
      <Popover>
        <PopoverTrigger>
          <Button size="sm">{`${textConvertOptions.excludeRulesArray.length} rules excluded`}</Button>
        </PopoverTrigger>
        <PopoverContent className="bg-background p-4 rounded-md border">
          <ScrollArea className="h-[350px] w-[280px] mb-4 border-b-1 border-b-indigo-500 [&_[data-slot=scroll-area-viewport]>div]:block!">
            {Array.isArray(textConvertOptions.excludeRulesArray)
              ? textConvertOptions.excludeRulesArray.map((rule, id) => (
                  <div className="flex items-center py-2">
                    <div className="flex-auto overflow-hidden mr-2">
                      <div className="truncate">{rule}</div>
                    </div>
                    <Button
                      size="icon"
                      className="size-7 shrink-0"
                      variant="ghost"
                      onClick={() => removeExcludeRuleById(id)}
                    >
                      <Trash2 />
                    </Button>
                  </div>
                ))
              : null}
          </ScrollArea>
          <span className="flex gap-4">
            <RulesCombobox />
            <Button onClick={resetExcludeArray}>Reset</Button>
          </span>
        </PopoverContent>
      </Popover>
    </>
  )
}
