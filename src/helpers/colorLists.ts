import {nearestFrom} from 'nearest-colors';
import namedColors from 'color-name-list/dist/colornames.json';

interface NamedColor {
  name: string;
  hex: string;
}

export const colors = namedColors.reduce(
  (o, {name, hex}: NamedColor) => Object.assign(o, {[name]: hex}),
  {} as NamedColor,
);

export const getColorName = nearestFrom(colors);
