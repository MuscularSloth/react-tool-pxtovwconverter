import {
  Binary,
  Blend,
  Palette,
  Proportions,
  ReceiptText,
  SquareStack,
} from 'lucide-react'

import { FaGithub, FaLinkedinIn } from 'react-icons/fa'

export const menuItems = [
  {
    title: 'Single PX to VW',
    url: '#',
    icon: Binary,
  },
  {
    title: 'Text PX to VW',
    url: '#',
    icon: ReceiptText,
  },
  {
    title: 'Color Converter',
    url: '#',
    icon: Palette,
  },
  {
    title: 'Ratio Calculator',
    url: '#',
    icon: Proportions,
  },
  {
    title: 'Shadow Generator',
    url: '#',
    icon: SquareStack,
  },
  {
    title: 'Gradient Generator',
    url: '#',
    icon: Blend,
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
