import React, { useEffect, useState } from "react";
import Grid from "@mui/material/Grid";
import {
	Button,
	Checkbox,
	FormControlLabel,
	Paper,
	Box,
	Snackbar,
	TextField,
	Divider,
	Switch,
} from "@mui/material";
import NavigationBar from "../../components/NavigationBar/NavigationBar";
import SliderWithInput from "../../components/SliderWithInput/SliderWithInput";
import ColorPickerWithInput from "../../components/ColorPickerWithInput/ColorPickerWithInput";
import { HEXToRGBA } from "../../helpers/colorConverter";

function ShadowGeneratorPage() {
	const [bgBoxColor, setBgBoxColor] = useState<string>("#ffffff");
	const [bgWrapperColor, setBgWrapperColor] = useState<string>("#ffffff");
	const [borderBoxColor, setBorderBoxColor] = useState<string>("#dddddd");
	const [shadowXOffset, setShadowXOffset] = useState<number>(5);
	const [shadowYOffset, setShadowYOffset] = useState<number>(5);
	const [shadowBlur, setShadowBlur] = useState<number>(10);
	const [shadowSpread, setShadowSpread] = useState<number>(5);
	const [shadowColor, setShadowColor] = useState<string>("#a1a1a1");
	const [shadowOpacity, setShadowOpacity] = useState<number>(1);
	const [shadowInset, setShadowInset] = useState<boolean>(false);

	const [calculatedShadow, setCalculatedShadow] = useState("");

	const initialShadowBoxStyles = {
		display: "flex",
		justifyContent: "center",
		alignItems: "center",
		aspectRatio: "16/9",
		margin: 100,
		borderWidth: 1,
		borderStyle: "solid",
		borderRadius: 5,
		borderColor: borderBoxColor,
		backgroundColor: bgBoxColor,
		boxShadow: calculatedShadow ? calculatedShadow : "none",
	};
	const [shadowBoxStyles, setShadowBoxStyles] = useState(
		initialShadowBoxStyles
	);

	const handleInsetChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setShadowInset(event.target.checked);
	};

	const calculateShadow = () => {
		let shadowString =
			shadowXOffset +
			"px " +
			shadowYOffset +
			"px " +
			shadowBlur +
			"px " +
			shadowSpread +
			"px ";

		let calculatedColor = HEXToRGBA(shadowColor);
		shadowString += ` rgba(${calculatedColor.red}, ${calculatedColor.green}, ${calculatedColor.blue}, ${shadowOpacity})`;

		if (shadowInset === true) {
			shadowString += " inset";
		}

		setCalculatedShadow(shadowString);
	};

	useEffect(() => {
		calculateShadow();
	}, [
		shadowXOffset,
		shadowYOffset,
		shadowBlur,
		shadowSpread,
		shadowColor,
		shadowOpacity,
		shadowInset,
	]);

	useEffect(() => {
		setShadowBoxStyles({ ...shadowBoxStyles, boxShadow: calculatedShadow });
	}, [calculatedShadow]);

	useEffect(() => {
		calculateShadow();
	}, []);

	return (
		<div>
			<NavigationBar title="Shadow Generator" />
			<div>
				<Grid container direction="row" justifyContent="center">
					<Grid item xs={4}>
						<Paper>
							<Box p={2}>
								<SliderWithInput
									value={shadowXOffset}
									setValue={setShadowXOffset}
									title="X Offset"
									minValue={-200}
									maxValue={200}
									step={1}
								/>
								<SliderWithInput
									value={shadowYOffset}
									setValue={setShadowYOffset}
									title="Y Offset"
									minValue={-200}
									maxValue={200}
									step={1}
								/>
								<SliderWithInput
									value={shadowBlur}
									setValue={setShadowBlur}
									title="Blur Radius"
									minValue={0}
									maxValue={300}
									step={1}
								/>
								<SliderWithInput
									value={shadowSpread}
									setValue={setShadowSpread}
									title="Spread"
									minValue={-200}
									maxValue={200}
									step={1}
								/>
							</Box>
							<Divider variant="middle" />
							<Box p={2}>
								<ColorPickerWithInput
									color={shadowColor}
									setColor={setShadowColor}
									title="Shadow color"
								/>
								<ColorPickerWithInput
									color={bgWrapperColor}
									setColor={setBgWrapperColor}
									title="Background color"
								/>
								<ColorPickerWithInput
									color={bgBoxColor}
									setColor={setBgBoxColor}
									title="Box color"
								/>
							</Box>
							<Divider variant="middle" />
							<Box p={2}>
								<SliderWithInput
									value={shadowOpacity}
									setValue={setShadowOpacity}
									title="Opacity"
									minValue={0}
									maxValue={1}
									step={0.01}
								/>
							</Box>
							<Divider variant="middle" />
							<Box p={2}>
								<FormControlLabel
									control={
										<Switch
											checked={shadowInset}
											onChange={handleInsetChange}
										/>
									}
									label="Shadow Inset"
								/>
							</Box>
						</Paper>
					</Grid>
					<Grid item xs={8}>
						<Paper>
							<Box p={2} style={{}}>
								<div style={shadowBoxStyles}>Shadow Example Box</div>
							</Box>
						</Paper>
					</Grid>
				</Grid>
			</div>
		</div>
	);
}

export default ShadowGeneratorPage;
