import { BlockContainer } from '@/shared/components/BlockContainer/BlockContainer.tsx'
import { Textarea } from '@/shared/components/ui/textarea.tsx'

export function TextAreaWithCopyButton({ text = '' }: { text?: string }) {
  return (
    <BlockContainer className="h-full">
      <Textarea
        value={text}
        readOnly
        rows={30}
        className="resize-none h-[550px] text-sm"
        spellCheck={false}
        autoCapitalize="off"
        autoCorrect="off"
        autoComplete="off"
      />
    </BlockContainer>
  )
}
