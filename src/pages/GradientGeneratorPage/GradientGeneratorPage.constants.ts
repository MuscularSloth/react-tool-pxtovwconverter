export const initialGradientColorSet = [
  {
    color: '#409a4a',
    stop: 0,
    isColorPickerOpened: false,
  },
  {
    color: '#211c79',
    stop: 25,
    isColorPickerOpened: false,
  },
  {
    color: '#a01989',
    stop: 50,
    isColorPickerOpened: false,
  },
  {
    color: '#c7c72c',
    stop: 75,
    isColorPickerOpened: false,
  },
  {
    color: '#e01313',
    stop: 100,
    isColorPickerOpened: false,
  },
];

export const initialGradientType = {
  key: 'linearGradient',
  value: 'linear-gradient',
};

export const initialCirclePosition = {
  x: 50,
  y: 50,
};

export const initialCalculatedGradient =
  'linear-gradient(90deg, #1f005c, #6d0061, #a51e5f, #cf4f5c, #ed815e, #ffb56b)';

export const initialGradientStyle = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  height: 150,
  background: initialCalculatedGradient,
};

export const gradientTypesList = {
  linearGradient: 'linear-gradient',
  radialGradient: 'radial-gradient',
  conicGradient: 'conic-gradient',
  repeatingLinearGradient: 'repeating-linear-gradient',
  repeatingRadialGradient: 'repeating-radial-gradient',
};
