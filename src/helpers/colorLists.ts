import namedColors from "color-name-list/dist/colornames.json";
import { nearestFrom } from "nearest-colors";

export const colors = namedColors.reduce(
	(o, { name, hex }) => Object.assign(o, { [name]: hex }),
	{}
);

export const getColorName = nearestFrom(colors);
