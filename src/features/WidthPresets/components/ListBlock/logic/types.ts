export type ListBlockProps = {
  title: string
  hint?: string
  listItems: Array<number>
  handleClick: (value: number) => void
  selectedItem?: number
  handleDeleteClick?: (value: number) => void
}
