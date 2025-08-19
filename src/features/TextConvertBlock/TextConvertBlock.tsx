import { DragDropTextArea } from '@/features/TextConvertBlock/components/DragDropTextArea/DragDropTextArea.tsx'
import { Button } from '@/shared/components/ui/button.tsx'
import { TextAreaWithCopyButton } from '@/features/TextConvertBlock/components/TextAreaWithCopyButton/TextAreaWithCopyButton.tsx'
import { RefreshCw, X } from 'lucide-react'
import { BlockContainer } from '@/shared/components/BlockContainer/BlockContainer.tsx'
import { usePresenter } from '@/features/TextConvertBlock/logic/usePresenter.ts'

export function TextConvertBlock() {
  const { text, setText, convertedText, onClearAll, onConvertText } =
    usePresenter()

  return (
    <div className="grid auto-rows-min gap-4 md:grid-cols-5">
      <div className="col-span-2">
        <DragDropTextArea text={text} setText={setText} />
      </div>
      <div className="col-span-1">
        <BlockContainer className="h-full">
          <div className="flex flex-col justify-center gap-8 h-full">
            <Button onClick={onConvertText} variant="secondary">
              <RefreshCw /> Convert
            </Button>
            <Button variant="destructive" onClick={onClearAll}>
              <X /> Clear All
            </Button>
          </div>
        </BlockContainer>
      </div>
      <div className="col-span-2">
        <TextAreaWithCopyButton text={convertedText} />
      </div>
    </div>
  )
}
