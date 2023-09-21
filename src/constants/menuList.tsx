import React from 'react';
import AutorenewIcon from '@mui/icons-material/Autorenew';
import ArticleIcon from '@mui/icons-material/Article';
import ColorLensIcon from '@mui/icons-material/ColorLens';
import BlurOnIcon from '@mui/icons-material/BlurOn';
import GradientIcon from '@mui/icons-material/Gradient';
import FlipIcon from '@mui/icons-material/Flip';
import AspectRatioIcon from '@mui/icons-material/AspectRatio';
import AutoFixHighIcon from '@mui/icons-material/AutoFixHigh';
import PATH from '../constants/path';

interface IMenu {
  id: number;
  name: string;
  url: string;
  icon: any;
  disabled: boolean;
}

const menuArray: IMenu[] = [
  {
    id: 1,
    name: 'Single PX to VW',
    url: PATH.home,
    icon: <AutorenewIcon />,
    disabled: false,
  },
  {
    id: 2,
    name: 'Text PX to VW',
    url: PATH.textConverter,
    icon: <ArticleIcon />,
    disabled: false,
  },
  {
    id: 3,
    name: 'Color Converter',
    url: PATH.colorConverter,
    icon: <ColorLensIcon />,
    disabled: false,
  },
  {
    id: 4,
    name: 'Shadow Generator',
    url: PATH.shadowGenerator,
    icon: <BlurOnIcon />,
    disabled: false,
  },
  {
    id: 5,
    name: 'Gradient Generator',
    url: PATH.gradientGenerator,
    icon: <GradientIcon />,
    disabled: false,
  },
  {
    id: 6,
    name: 'LTR/RTL Convertor',
    url: PATH.ltrRtlConvertor,
    icon: <FlipIcon />,
    disabled: true,
  },
  {
    id: 7,
    name: 'Ratio Calculator',
    url: PATH.ratioCalculator,
    icon: <AspectRatioIcon />,
    disabled: false,
  },
  {
    id: 8,
    name: 'Regex Builder',
    url: PATH.regexBuilder,
    icon: <AutoFixHighIcon />,
    disabled: true,
  },
];

export default menuArray;
