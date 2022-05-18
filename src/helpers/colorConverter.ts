import { colorObjectType } from "../pages/ColorConvertorPage/ColorConvertorPage";

export function HEXToRGBA(hexValue: string): colorObjectType {
	let red = 0,
		green = 0,
		blue = 0,
		opacity = 1;

	console.log("hexValue >> ", hexValue);

	if (hexValue[0] === "#") {
		hexValue = hexValue.substring(1);
		console.log("trimmedhexValue >> ", hexValue);
	}

	console.log("hexValue.length >> ", hexValue.length);
	if (hexValue.length === 6) {
		red = Number("0x" + hexValue[0] + hexValue[1]);
		green = Number("0x" + hexValue[2] + hexValue[3]);
		blue = Number("0x" + hexValue[4] + hexValue[5]);
		opacity = 255;
	} else if (hexValue.length === 8) {
		red = Number("0x" + hexValue[0] + hexValue[1]);
		green = Number("0x" + hexValue[2] + hexValue[3]);
		blue = Number("0x" + hexValue[4] + hexValue[5]);
		opacity = Number("0x" + hexValue[6] + hexValue[7]);
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
	return "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
}

export function RGBToHSL(r: number, g: number, b: number) {
	r /= 255;
	g /= 255;
	b /= 255;

	let cmin = Math.min(r, g, b),
		cmax = Math.max(r, g, b),
		delta = cmax - cmin,
		h = 0,
		s = 0,
		l = 0;

	if (delta == 0) h = 0;
	else if (cmax == r) h = ((g - b) / delta) % 6;
	else if (cmax == g) h = (b - r) / delta + 2;
	else h = (r - g) / delta + 4;

	h = Math.round(h * 60);

	if (h < 0) h += 360;

	l = (cmax + cmin) / 2;

	s = delta == 0 ? 0 : delta / (1 - Math.abs(2 * l - 1));

	s = +(s * 100).toFixed(1);
	l = +(l * 100).toFixed(1);

	return {
		hue: h,
		saturation: s,
		lightness: l,
	};
}

export function HSLToRGB(h: number, s: number, l: number) {
	// Must be fractions of 1
	s /= 100;
	l /= 100;

	let c = (1 - Math.abs(2 * l - 1)) * s,
		x = c * (1 - Math.abs(((h / 60) % 2) - 1)),
		m = l - c / 2,
		r = 0,
		g = 0,
		b = 0;

	if (0 <= h && h < 60) {
		r = c;
		g = x;
		b = 0;
	} else if (60 <= h && h < 120) {
		r = x;
		g = c;
		b = 0;
	} else if (120 <= h && h < 180) {
		r = 0;
		g = c;
		b = x;
	} else if (180 <= h && h < 240) {
		r = 0;
		g = x;
		b = c;
	} else if (240 <= h && h < 300) {
		r = x;
		g = 0;
		b = c;
	} else if (300 <= h && h < 360) {
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
