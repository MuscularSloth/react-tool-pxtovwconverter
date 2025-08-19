import { FileUp } from 'lucide-react'
import { BlockContainer } from '@/shared/components/BlockContainer/BlockContainer.tsx'
import { Textarea } from '@/shared/components/ui/textarea.tsx'
import type { DragDropTextAreaProps } from './logic/types.ts'
import { useDragDrop } from './logic/useDragDrop.tsx'

export function DragDropTextArea({ text, setText }: DragDropTextAreaProps) {
  const { handleDrop, handleDragOver, handleDragEnter, handleDragLeave } =
    useDragDrop(setText)

  return (
    <BlockContainer className="h-full">
      <div className="relative">
        {!text && (
          <FileUp className="absolute z-10 top-[50%] left-[50%] transform-[translate(-50%,-50%)] stroke-gray-500 opacity-80" />
        )}
        <Textarea
          value={text}
          onChange={(e) => setText?.(e.target.value)}
          placeholder="Enter text to convert or drop a single file here..."
          rows={30}
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onDragEnter={handleDragEnter}
          onDragLeave={handleDragLeave}
          className="resize-none h-[550px] text-sm"
          spellCheck={false}
          autoCapitalize="off"
          autoCorrect="off"
          autoComplete="off"
        />
      </div>
    </BlockContainer>
  )
}
