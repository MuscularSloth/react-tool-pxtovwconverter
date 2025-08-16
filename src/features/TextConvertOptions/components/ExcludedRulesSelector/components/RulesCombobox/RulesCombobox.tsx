import { Check, ChevronsUpDown } from 'lucide-react'
import * as React from 'react'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/shared/components/ui/popover.tsx'
import { Button } from '@/shared/components/ui/button.tsx'
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/shared/components/ui/command.tsx'
import { ALL_CSS_PROPS_LIST } from '@/features/TextConvertOptions/components/ExcludedRulesSelector/components/RulesCombobox/logic/all-css-properties.en.ts'
import { cn } from '@/shared/lib/cn.ts'
import { useTextConvert } from '@/shared/hooks/use-text-convert-options.ts'

export function RulesCombobox() {
  const { textConvertOptions, addExcludeRule } = useTextConvert()

  const [open, setOpen] = React.useState(false)

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-[200px] justify-between"
        >
          Select rule...
          <ChevronsUpDown className="opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandInput placeholder="Search framework..." className="h-9" />
          <CommandList>
            <CommandEmpty>No framework found.</CommandEmpty>
            <CommandGroup>
              {ALL_CSS_PROPS_LIST.map((rule) => (
                <CommandItem
                  key={rule.title}
                  value={rule.title}
                  onSelect={(currentValue) => {
                    addExcludeRule(currentValue)
                    setOpen(false)
                  }}
                >
                  {rule.title}
                  <Check
                    className={cn(
                      'ml-auto',
                      textConvertOptions.excludeRulesArray.includes(rule.title)
                        ? 'opacity-100'
                        : 'opacity-0',
                    )}
                  />
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}
