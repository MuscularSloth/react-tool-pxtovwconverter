import { colorObjectType } from "../pages/ColorConvertorPage/ColorConvertorPage";

export function HEXToRGBA(hexValue: string): colorObjectType {
	let red = 0,
		green = 0,
		blue = 0,
		opacity = 1;

	if (hexValue[0] === "#") {
		hexValue = hexValue.substring(1);
	}

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

export function RGBAToHEXA(r: number, g: number, b: number, a: number) {
	const opacity = Math.round(Math.min(Math.max(a || 1, 0), 1) * 255).toString(
		16
	);
	return (
		"#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1) + opacity
	);
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

interface HVSTypes {
	computedH: number;
	computedS: number;
	computedV: number;
}
export function RGBToHSV(r: number, g: number, b: number): HVSTypes {
	let computedH = 0;
	let computedS = 0;
	let computedV = 0;

	r = parseInt(("" + r).replace(/\s/g, ""), 10);
	g = parseInt(("" + g).replace(/\s/g, ""), 10);
	b = parseInt(("" + b).replace(/\s/g, ""), 10);

	if (r == null || g == null || b == null || isNaN(r) || isNaN(g) || isNaN(b)) {
		return { computedH, computedS, computedV };
	}
	if (r < 0 || g < 0 || b < 0 || r > 255 || g > 255 || b > 255) {
		return { computedH, computedS, computedV };
	}
	r = r / 255;
	g = g / 255;
	b = b / 255;
	let minRGB = Math.min(r, Math.min(g, b));
	let maxRGB = Math.max(r, Math.max(g, b));

	if (minRGB == maxRGB) {
		computedV = minRGB;
		return { computedH: 0, computedS: 0, computedV };
	}

	let d = r == minRGB ? g - b : b == minRGB ? r - g : b - r;
	let h = r == minRGB ? 3 : b == minRGB ? 1 : 5;
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
