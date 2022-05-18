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

/**
 *
 * TODO 10 Ability to change BG color
 * TODO 20 Save prev value to localstore
 * TODO 30 Save prev calculations to localstore
 * TODO 60 Window with choosen color
 * TODO 70 Links on specific color
 * TODO 80 Lighter Darker variants as buttons
 *
 */
export interface colorObjectType {
	red: number;
	green: number;
	blue: number;
	opacity: number;
}

function ColorConvertorPage() {
	const initialCalculatedColor: colorObjectType = {
		red: 0,
		green: 0,
		blue: 0,
		opacity: 1,
	};

	const [calculatedColor, setCalculatedColor] = useState<colorObjectType>(
		initialCalculatedColor
	);
	const [calculatedHEX, setCalculatedHEX] = useState("");
	const [calculatedRGB, setCalculatedRGB] = useState("");
	const [calculatedRGBA, setCalculatedRGBA] = useState("");
	const [calculatedHSL, setCalculatedHSL] = useState("");

	const [isNotificationOpen, setIsNotificationOpen] = useState(false);

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
	}, [calculatedColor]);

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
							<Box p={2}>
								<Chip
									label="RGBA"
									sx={{ m: 1, backgroundColor: calculatedRGBA }}
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
							<Box p={2}>
								<Chip
									label="RGB"
									sx={{ m: 1, backgroundColor: calculatedRGB }}
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
							<Box p={2}>
								<Chip
									label="HEX"
									sx={{ m: 1, backgroundColor: calculatedHEX }}
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
							<Box p={2}>
								<Chip
									label="HSL"
									sx={{ m: 1, backgroundColor: calculatedHSL }}
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
							<Box p={2}>222</Box>
						</Paper>
					</Grid>
					<Grid item xs={4}>
						<Paper>
							<Box p={2}>333</Box>
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
