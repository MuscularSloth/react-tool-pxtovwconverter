import {
  Binary,
  Blend,
  Palette,
  Proportions,
  ReceiptText,
  SquareStack,
} from 'lucide-react'

import { FaGithub, FaLinkedinIn } from 'react-icons/fa'
import { ROUTES } from '@/shared/constants/routes.ts'

export const menuItems = [
  {
    title: 'Single PX to VW',
    url: ROUTES.HOME,
    icon: Binary,
  },
  {
    title: 'Text PX to VW',
    url: ROUTES.TEXT_CONVERT,
    icon: ReceiptText,
  },
  {
    title: 'Color Converter',
    url: ROUTES.COLOR_CONVERTER,
    icon: Palette,
    disabled: true,
  },
  {
    title: 'Ratio Calculator',
    url: ROUTES.RATIO_CALCULATOR,
    icon: Proportions,
    disabled: true,
  },
  {
    title: 'Shadow Generator',
    url: ROUTES.SHADOW_GENERATOR,
    icon: SquareStack,
    disabled: true,
  },
  {
    title: 'Gradient Generator',
    url: ROUTES.GRADIENT_GENERATOR,
    icon: Blend,
    disabled: true,
  },
]

export const authorLinks = [
  {
    title: 'GitHub',
    url: 'https://github.com/MuscularSloth/react-tool-pxtovwconverter',
    icon: FaGithub,
    blank: true,
  },
  {
    title: 'LinkedIn',
    url: 'https://www.linkedin.com/in/konstantin-makar-77b971200/',
    icon: FaLinkedinIn,
    blank: true,
  },
]
