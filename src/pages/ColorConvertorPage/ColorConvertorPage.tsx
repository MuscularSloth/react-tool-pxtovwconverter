import {
	Box,
	Chip,
	Grid,
	IconButton,
	Paper,
	Snackbar,
	Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import InputColorBlock from "../../components/InputColorBlock/InputColorBlock";
import NavigationBar from "../../components/NavigationBar/NavigationBar";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import { RGBToHEX, RGBToHSL } from "../../helpers/colorConverter";
import PreviousColorCalcTable from "../../components/PreviousColorCalcTable/PreviousColorCalcTable";

/**
 *
 * TODO 10 Ability to change BG color
 * TODO 20 handle pressing  enter
 * TODO 60 Window with choosen color
 * TODO 70 External links on specific color
 * TODO 80 Lighter Darker variants as buttons
 *
 * FIX: render actual prev list data
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
	calculatedRGB: string;
	calculatedRGBA: string;
	calculatedHSL: string;
}

function ColorConvertorPage() {
	const initialCalculatedColor: colorObjectType = {
		red: 0,
		green: 0,
		blue: 0,
		opacity: 1,
	};

	const [calculatedColor, setCalculatedColor] = useState<colorObjectType>(
		() => {
			const saved: string = localStorage.getItem("calculatedColor") ?? "";
			if (saved !== "") {
				const initialValue = JSON.parse(saved);
				return initialValue;
			}
			return initialCalculatedColor;
		}
	);

	const [calculatedHEX, setCalculatedHEX] = useState("");
	const [calculatedRGB, setCalculatedRGB] = useState("");
	const [calculatedRGBA, setCalculatedRGBA] = useState("");
	const [calculatedHSL, setCalculatedHSL] = useState("");
	const [prevCalculatedColors, setPrevCalculatedColors] = useState<
		prevCalculatedColorsType[] | []
	>(() => {
		const saved: string = localStorage.getItem("prevCalculatedColors") ?? "";
		if (saved !== "") {
			const initialValue: prevCalculatedColorsType[] | [] = JSON.parse(saved);
			return initialValue;
		}
		return [];
	});

	const [isNotificationOpen, setIsNotificationOpen] = useState(false);
	const [isWhiteText, setIsWhiteText] = useState(false);

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

	const chipsStyle = {
		color: isWhiteText ? "black" : "white",
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

		setCalculatedRGBA(rgbaText);
		setCalculatedRGB(rgbText);
		setCalculatedHEX(hexText);
		setCalculatedHSL(hslText);

		setIsWhiteText(saturation + lightness > 100);

		localStorage.setItem("calculatedColor", JSON.stringify(calculatedColor));

		if (
			!prevCalculatedColors.some(
				(valueObject) => valueObject.calculatedHEX === calculatedHEX
			) &&
			calculatedHEX
		) {
			setPrevCalculatedColors([
				...prevCalculatedColors,
				{ calculatedHEX, calculatedRGB, calculatedRGBA, calculatedHSL },
			]);
		}
	}, [calculatedColor]);

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
							<Box p={2} sx={{ backgroundColor: "" }}></Box>
						</Paper>
					</Grid>
				</Grid>
				<Grid container direction="row" justifyContent="center">
					<Grid item xs={5}>
						<Paper>
							<Box>
								<Chip
									label="RGBA"
									sx={{ m: 1, backgroundColor: calculatedRGBA, ...chipsStyle }}
								/>
								<Typography component="span">{calculatedRGBA}</Typography>
								<IconButton
									onClick={handleCopyRBGAValue}
									aria-label="copy"
									sx={{ m: 1 }}
								>
									<ContentCopyIcon />
								</IconButton>
							</Box>
							<Box>
								<Chip
									label="RGB"
									sx={{ m: 1, backgroundColor: calculatedRGB, ...chipsStyle }}
								/>
								<Typography component="span">{calculatedRGB}</Typography>
								<IconButton
									onClick={handleCopyRBGValue}
									aria-label="copy"
									sx={{ m: 1 }}
								>
									<ContentCopyIcon />
								</IconButton>
							</Box>
							<Box>
								<Chip
									label="HEX"
									sx={{
										m: 1,
										backgroundColor: calculatedHEX,
										...chipsStyle,
									}}
								/>
								<Typography component="span">{calculatedHEX}</Typography>
								<IconButton
									onClick={handleCopyHEXValue}
									aria-label="copy"
									sx={{ m: 1 }}
								>
									<ContentCopyIcon />
								</IconButton>
							</Box>
							<Box>
								<Chip
									label="HSL"
									sx={{ m: 1, backgroundColor: calculatedHSL, ...chipsStyle }}
								/>
								<Typography component="span">{calculatedHSL}</Typography>
								<IconButton
									onClick={handleCopyHEXValue}
									aria-label="copy"
									sx={{ m: 1 }}
								>
									<ContentCopyIcon />
								</IconButton>
							</Box>
						</Paper>
					</Grid>
					<Grid item xs={3}>
						<Paper>
							<Box p={2}>Color Name: [name] </Box>
						</Paper>
					</Grid>
					<Grid item xs={4}>
						<Paper>
							<Box p={2}>Similiar Colors Block</Box>
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
