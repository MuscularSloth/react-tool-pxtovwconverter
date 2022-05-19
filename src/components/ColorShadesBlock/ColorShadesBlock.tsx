import { Box } from "@mui/material";
import React from "react";
import {
	getDarkerShades,
	getLighterShades,
} from "../../helpers/colorConverter";
import { shadesHSLDataType } from "../../pages/ColorConvertorPage/ColorConvertorPage";
import ColorShadeString from "./ColorShadeString/ColorShadeString";

interface propsType {
	shadesHSLData: shadesHSLDataType;
}

function ColorShadesBlock({ shadesHSLData }: propsType) {
	const darkerShadesArray = getDarkerShades(shadesHSLData);
	const lighterShadesArray = getLighterShades(shadesHSLData);
	let textColor = "black";

	if (
		shadesHSLData.saturation + shadesHSLData.lightness < 100 ||
		shadesHSLData.saturation < 80 ||
		shadesHSLData.lightness < 60
	) {
		textColor = "white";
	} else {
		textColor = "black";
	}

	return (
		<>
			<Box>Darker shades</Box>
			<Box>
				{darkerShadesArray.map((shade, idx) => (
					<ColorShadeString key={idx} shade={shade} textColor={textColor} />
				))}
			</Box>
			<Box>Lighter shades</Box>
			<Box>
				{lighterShadesArray.map((shade, idx) => (
					<ColorShadeString key={idx} shade={shade} textColor={textColor} />
				))}
			</Box>
		</>
	);
}

export default ColorShadesBlock;
