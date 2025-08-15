import { BlockContainer } from '@/shared/components/BlockContainer/BlockContainer.tsx'
import { usePresenter } from '@/features/SingleValueConverterBlock/logic/usePresenter.ts'

export function SingleValueConverterBlock() {
  const { selectedWidth } = usePresenter()

  return (
    <BlockContainer>
      <div className="flex flex-col gap-6">
        <div className="font-medium text-sm/6">
          Selected Viewport Width:{' '}
          <span className="font-bold text-md text-neutral-600 dark:text-neutral-400">
            {selectedWidth}
          </span>
        </div>
        <div>selector</div>
      </div>
    </BlockContainer>
  )
}
