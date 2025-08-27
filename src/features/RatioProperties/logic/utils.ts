import type { SliderMark } from '@/shared/components/SliderTooltip/SliderTooltip.tsx'

export const valueAccessor = (value: SliderMark) => value.value
export const labelAccessor = (value: SliderMark) => value.label || ''
