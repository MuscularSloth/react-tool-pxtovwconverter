import {
  colorObjectType,
  shadesHSLDataType,
} from '../pages/ColorConvertorPage/ColorConvertorPage';

export function HEXToRGBA(hexValue: string): colorObjectType {
  let red = 0;
  let green = 0;
  let blue = 0;
  let opacity = 1;

  if (hexValue[0] === '#') {
    hexValue = hexValue.substring(1);
  }

  if (hexValue.length === 6) {
    red = Number(`0x${hexValue[0]}${hexValue[1]}`);
    green = Number(`0x${hexValue[2]}${hexValue[3]}`);
    blue = Number(`0x${hexValue[4]}${hexValue[5]}`);
    opacity = 255;
  } else if (hexValue.length === 8) {
    red = Number(`0x${hexValue[0]}${hexValue[1]}`);
    green = Number(`0x${hexValue[2]}${hexValue[3]}`);
    blue = Number(`0x${hexValue[4]}${hexValue[5]}`);
    opacity = Number(`0x${hexValue[6]}${hexValue[7]}`);
  }
  opacity = +(opacity / 255).toFixed(3);

  return {
    red,
    green,
    blue,
    opacity,
  };
}

export function RGBToHEX(r: number, g: number, b: number) {
  // eslint-disable-next-line no-bitwise
  return `#${((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1)}`;
}

export function RGBAToHEXA(r: number, g: number, b: number, a: number) {
  const opacity = Math.round(Math.min(Math.max(a || 1, 0), 1) * 255).toString(16);
  // eslint-disable-next-line no-bitwise
  return `#${((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1)}${opacity}`;
}

export function RGBToHSL(r: number, g: number, b: number) {
  r /= 255;
  g /= 255;
  b /= 255;

  const cmin = Math.min(r, g, b);
  const cmax = Math.max(r, g, b);
  const delta = cmax - cmin;
  let h: number;
  let s: number;
  let l: number;

  if (delta === 0) h = 0;
  else if (cmax === r) h = ((g - b) / delta) % 6;
  else if (cmax === g) h = (b - r) / delta + 2;
  else h = (r - g) / delta + 4;

  h = Math.round(h * 60);

  if (h < 0) h += 360;

  l = (cmax + cmin) / 2;

  s = delta === 0 ? 0 : delta / (1 - Math.abs(2 * l - 1));

  s = +(s * 100).toFixed(1);
  l = +(l * 100).toFixed(1);

  return {
    hue: h,
    saturation: s,
    lightness: l,
  };
}

interface HVSTypes {
  computedH: number;
  computedS: number;
  computedV: number;
}
export function RGBToHSV(r: number, g: number, b: number): HVSTypes {
  let computedH = 0;
  let computedS = 0;
  let computedV = 0;

  r = parseInt(`${r}`.replace(/\s/g, ''), 10);
  g = parseInt(`${g}`.replace(/\s/g, ''), 10);
  b = parseInt(`${b}`.replace(/\s/g, ''), 10);

  if (
    r == null ||
    g == null ||
    b == null ||
    Number.isNaN(r) ||
    Number.isNaN(g) ||
    Number.isNaN(b)
  ) {
    return {computedH, computedS, computedV};
  }
  if (r < 0 || g < 0 || b < 0 || r > 255 || g > 255 || b > 255) {
    return {computedH, computedS, computedV};
  }
  r /= 255;
  g /= 255;
  b /= 255;
  const minRGB = Math.min(r, Math.min(g, b));
  const maxRGB = Math.max(r, Math.max(g, b));

  if (minRGB === maxRGB) {
    computedV = minRGB;
    return {computedH: 0, computedS: 0, computedV};
  }

  // eslint-disable-next-line no-nested-ternary
  const d = r === minRGB ? g - b : b === minRGB ? r - g : b - r;
  // eslint-disable-next-line no-nested-ternary
  const h = r === minRGB ? 3 : b === minRGB ? 1 : 5;
  computedH = 60 * (h - d / (maxRGB - minRGB));
  computedS = (maxRGB - minRGB) / maxRGB;
  computedV = maxRGB;
  return {
    computedH: +computedH.toFixed(1),
    computedS: +computedS.toFixed(4),
    computedV: +computedV.toFixed(2),
  };
}

export function HSLToRGB(h: number, s: number, l: number) {
  // Must be fractions of 1
  s /= 100;
  l /= 100;

  const c = (1 - Math.abs(2 * l - 1)) * s;
  const x = c * (1 - Math.abs(((h / 60) % 2) - 1));
  const m = l - c / 2;
  let r = 0;
  let g = 0;
  let b = 0;

  if (h >= 0 && h < 60) {
    r = c;
    g = x;
    b = 0;
  } else if (h >= 60 && h < 120) {
    r = x;
    g = c;
    b = 0;
  } else if (h >= 120 && h < 180) {
    r = 0;
    g = c;
    b = x;
  } else if (h >= 180 && h < 240) {
    r = 0;
    g = x;
    b = c;
  } else if (h >= 240 && h < 300) {
    r = x;
    g = 0;
    b = c;
  } else if (h >= 300 && h < 360) {
    r = c;
    g = 0;
    b = x;
  }
  r = Math.round((r + m) * 255);
  g = Math.round((g + m) * 255);
  b = Math.round((b + m) * 255);

  return {
    red: r,
    green: g,
    blue: b,
  };
}

export function HSLToHEX(h: number, s: number, l: number) {
  s /= 100;
  l /= 100;

  const c = (1 - Math.abs(2 * l - 1)) * s;
  const x = c * (1 - Math.abs(((h / 60) % 2) - 1));
  const m = l - c / 2;
  let r: number | string = 0;
  let g: number | string = 0;
  let b: number | string = 0;

  if (h >= 0 && h < 60) {
    r = c;
    g = x;
    b = 0;
  } else if (h >= 60 && h < 120) {
    r = x;
    g = c;
    b = 0;
  } else if (h >= 120 && h < 180) {
    r = 0;
    g = c;
    b = x;
  } else if (h >= 180 && h < 240) {
    r = 0;
    g = x;
    b = c;
  } else if (h >= 240 && h < 300) {
    r = x;
    g = 0;
    b = c;
  } else if (h >= 300 && h < 360) {
    r = c;
    g = 0;
    b = x;
  }
  // Having obtained RGB, convert channels to hex
  r = Math.round((r + m) * 255).toString(16);
  g = Math.round((g + m) * 255).toString(16);
  b = Math.round((b + m) * 255).toString(16);

  // Prepend 0s, if necessary
  if (r.length === 1) r = `0${r}`;
  if (g.length === 1) g = `0${g}`;
  if (b.length === 1) b = `0${b}`;

  return `#${r}${g}${b}`;
}

export function getDarkerShades(shadesHSLData: shadesHSLDataType, step = 5): string[] {
  const resultArray = [];

  const {hue} = shadesHSLData;
  const {saturation} = shadesHSLData;
  let {lightness} = shadesHSLData;

  for (let i = 0; i < 3; i += 1) {
    lightness -= step;
    if (lightness >= 0) {
      resultArray.push(HSLToHEX(hue, saturation, lightness));
    }
  }
  return resultArray;
}

export function getLighterShades(shadesHSLData: shadesHSLDataType, step = 5): string[] {
  const resultArray = [];

  const {hue} = shadesHSLData;
  const {saturation} = shadesHSLData;
  let {lightness} = shadesHSLData;

  for (let i = 0; i < 3; i += 1) {
    lightness += step;
    if (lightness + step <= 105) {
      resultArray.push(HSLToHEX(hue, saturation, lightness));
    }
  }
  return resultArray;
}
