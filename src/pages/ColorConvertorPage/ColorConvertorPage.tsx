import React, { useEffect, useState } from "react";
import {
	Box,
	Chip,
	Grid,
	IconButton,
	Paper,
	Snackbar,
	Typography,
} from "@mui/material";
import {
	RGBAToHEXA,
	RGBToHEX,
	RGBToHSL,
	RGBToHSV,
} from "../../helpers/colorConverter";
import { getValueFromLocalStorage } from "../../helpers/localStorage";
import NavigationBar from "../../components/NavigationBar/NavigationBar";
import InputColorBlock from "../../components/InputColorBlock/InputColorBlock";
import PreviousColorCalcTable from "../../components/PreviousColorCalcTable/PreviousColorCalcTable";
import ColorStringBlock from "../../components/ColorStringBlock/ColorStringBlock";
import ColorShadesBlock from "../../components/ColorShadesBlock/ColorShadesBlock";
import ColorNameBlock from "../../components/ColorNameBlock/ColorNameBlock";

/**
 *
 * TODO 10 Ability to change BG color
 * TODO 40 Name this color
 * TODO 70 External links on specific color
 * TODO 90 Add CMYK
 *
 * TODO 1000 Refactor with chrome.js
 *
 */
export interface colorObjectType {
	red: number;
	green: number;
	blue: number;
	opacity: number;
}

export interface prevCalculatedColorsType {
	calculatedHEX: string;
	calculatedHEXA: string;
	calculatedRGB: string;
	calculatedRGBA: string;
	calculatedHSL: string;
	calculatedHSV: string;
}
export interface shadesHSLDataType {
	hue: number;
	saturation: number;
	lightness: number;
}

function ColorConvertorPage() {
	const initialCalculatedColor: colorObjectType = {
		red: 0,
		green: 0,
		blue: 0,
		opacity: 1,
	};

	const initialShadesHSLData: shadesHSLDataType = {
		hue: 0,
		saturation: 0,
		lightness: 0,
	};

	const [calculatedColor, setCalculatedColor] = useState<colorObjectType>(
		getValueFromLocalStorage("calculatedColor", initialCalculatedColor)
	);

	const [calculatedHEX, setCalculatedHEX] = useState("");
	const [calculatedHEXA, setCalculatedHEXA] = useState("");
	const [calculatedRGB, setCalculatedRGB] = useState("");
	const [calculatedRGBA, setCalculatedRGBA] = useState("");
	const [calculatedHSL, setCalculatedHSL] = useState("");
	const [calculatedHSV, setCalculatedHSV] = useState("");
	const [prevCalculatedColors, setPrevCalculatedColors] = useState<
		prevCalculatedColorsType[] | []
	>(getValueFromLocalStorage("prevCalculatedColors", []));

	const [isNotificationOpen, setIsNotificationOpen] = useState(false);
	const [isWhiteText, setIsWhiteText] = useState(false);

	const [shadesHSLData, setShadesHSLData] =
		useState<shadesHSLDataType>(initialShadesHSLData);

	const handleCopyRBGAValue = () => {
		navigator.clipboard.writeText(calculatedRGBA);
		setIsNotificationOpen(true);
	};
	const handleCopyRBGValue = () => {
		navigator.clipboard.writeText(calculatedRGB);
		setIsNotificationOpen(true);
	};
	const handleCopyHEXValue = () => {
		navigator.clipboard.writeText(calculatedHEX);
		setIsNotificationOpen(true);
	};
	const handleCopyHEXAValue = () => {
		navigator.clipboard.writeText(calculatedHEXA);
		setIsNotificationOpen(true);
	};
	const handleCopyHSLValue = () => {
		navigator.clipboard.writeText(calculatedHSL);
		setIsNotificationOpen(true);
	};
	const handleCopyHSVValue = () => {
		navigator.clipboard.writeText(calculatedHSV);
		setIsNotificationOpen(true);
	};

	const chipsStyle = {
		color: isWhiteText ? "white" : "black",
	};

	useEffect(() => {
		let clearRed = calculatedColor.red;
		let clearGreen = calculatedColor.green;
		let clearBlue = calculatedColor.blue;

		if (calculatedColor.opacity < 1) {
			const bg = {
				red: 255,
				green: 255,
				blue: 255,
			};
			const alpha = 1 - calculatedColor.opacity;
			clearRed = Math.round(
				(calculatedColor.opacity * (calculatedColor.red / 255) +
					alpha * (bg.red / 255)) *
					255
			);
			clearGreen = Math.round(
				(calculatedColor.opacity * (calculatedColor.green / 255) +
					alpha * (bg.green / 255)) *
					255
			);
			clearBlue = Math.round(
				(calculatedColor.opacity * (calculatedColor.blue / 255) +
					alpha * (bg.blue / 255)) *
					255
			);
		}

		const rgbText =
			"rgb( " + clearRed + ", " + clearGreen + ", " + clearBlue + ")";

		const rgbaText =
			"rgba( " +
			calculatedColor.red +
			", " +
			calculatedColor.green +
			", " +
			calculatedColor.blue +
			", " +
			calculatedColor.opacity +
			")";

		const { hue, saturation, lightness } = RGBToHSL(
			clearRed,
			clearGreen,
			clearBlue
		);

		const hslText = "hsl(" + hue + ", " + saturation + "%, " + lightness + "%)";

		const hexText = RGBToHEX(clearRed, clearGreen, clearBlue);

		const hexaText = RGBAToHEXA(
			calculatedColor.red,
			calculatedColor.green,
			calculatedColor.blue,
			calculatedColor.opacity
		);

		const { computedH, computedS, computedV } = RGBToHSV(
			clearRed,
			clearGreen,
			clearBlue
		);
		const hsvText =
			"hsv(" + computedH + ", " + computedS + ", " + computedV + ")";

		setCalculatedRGBA(rgbaText);
		setCalculatedRGB(rgbText);
		setCalculatedHEX(hexText);
		setCalculatedHEXA(hexaText);
		setCalculatedHSL(hslText);
		setCalculatedHSV(hsvText);

		if (saturation + lightness < 100 || saturation < 80 || lightness < 60) {
			setIsWhiteText(true);
		} else {
			setIsWhiteText(false);
		}

		setShadesHSLData({ hue, saturation, lightness });

		localStorage.setItem("calculatedColor", JSON.stringify(calculatedColor));
	}, [calculatedColor]);

	useEffect(() => {
		if (
			!prevCalculatedColors.some(
				(valueObject) => valueObject.calculatedHEX === calculatedHEX
			) &&
			calculatedHEX
		) {
			setPrevCalculatedColors([
				...prevCalculatedColors,
				{
					calculatedHEX,
					calculatedHEXA,
					calculatedRGB,
					calculatedRGBA,
					calculatedHSL,
					calculatedHSV,
				},
			]);
		}
	}, [calculatedHEX]);

	useEffect(() => {
		localStorage.setItem(
			"prevCalculatedColors",
			JSON.stringify(prevCalculatedColors)
		);
	}, [prevCalculatedColors]);

	return (
		<>
			<NavigationBar title="Color Converter" />
			<div>
				<Grid container direction="row" justifyContent="center">
					<Grid item xs={8}>
						<Paper>
							<Box p={2}>
								<InputColorBlock setCalculatedColor={setCalculatedColor} />
							</Box>
						</Paper>
					</Grid>
					<Grid item xs={4}>
						<Paper>
							<ColorNameBlock
								calculatedHEX={calculatedHEX}
								isWhiteText={isWhiteText}
							/>
						</Paper>
					</Grid>
				</Grid>
				<Grid container direction="row" justifyContent="center">
					<Grid item xs={4}>
						<Paper>
							<Typography sx={{ p: 1 }}>Colors with opacity:</Typography>
							<ColorStringBlock
								label="RGBA"
								calculatedColor={calculatedRGBA}
								chipsStyle={chipsStyle}
								handleCopyFunction={handleCopyRBGAValue}
							/>
							<ColorStringBlock
								label="HEXA"
								calculatedColor={calculatedHEXA}
								chipsStyle={chipsStyle}
								handleCopyFunction={handleCopyHEXAValue}
							/>
						</Paper>
					</Grid>
					<Grid item xs={4}>
						<Paper>
							<Typography sx={{ p: 1 }}>Clear Colors:</Typography>
							<ColorStringBlock
								label="RGB"
								calculatedColor={calculatedRGB}
								chipsStyle={chipsStyle}
								handleCopyFunction={handleCopyRBGValue}
							/>
							<ColorStringBlock
								label="HEX"
								calculatedColor={calculatedHEX}
								chipsStyle={chipsStyle}
								handleCopyFunction={handleCopyHEXValue}
							/>
							<ColorStringBlock
								label="HSL"
								calculatedColor={calculatedHSL}
								chipsStyle={chipsStyle}
								handleCopyFunction={handleCopyHSLValue}
							/>
							<ColorStringBlock
								label="HSV"
								calculatedColor={calculatedHSV}
								chipsStyle={chipsStyle}
								handleCopyFunction={handleCopyHSVValue}
							/>
						</Paper>
					</Grid>
					<Grid item xs={4}>
						<Paper>
							<ColorShadesBlock shadesHSLData={shadesHSLData} />
						</Paper>
					</Grid>
				</Grid>
				<Grid container direction="row" justifyContent="center">
					<Grid item xs={12}>
						<Paper>
							<PreviousColorCalcTable
								prevCalculatedColors={prevCalculatedColors}
								setPrevCalculatedColors={setPrevCalculatedColors}
								setCalculatedColor={setCalculatedColor}
							/>
						</Paper>
					</Grid>
				</Grid>
			</div>
			<Snackbar
				autoHideDuration={2000}
				anchorOrigin={{ vertical: "top", horizontal: "center" }}
				open={isNotificationOpen}
				onClose={() => setIsNotificationOpen(false)}
				message={`Result has been copied!`}
				key="color-copy-notification"
			/>
		</>
	);
}

export default ColorConvertorPage;
