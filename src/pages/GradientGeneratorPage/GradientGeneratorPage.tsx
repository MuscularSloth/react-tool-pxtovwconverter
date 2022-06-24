import { Box, Button, Grid, Paper, TextField } from "@mui/material";
import { useState } from "react";
import NavigationBar from "../../components/NavigationBar/NavigationBar";
import ResultColorCopyButton from "../../components/ResultColorCopyButton/ResultColorCopyButton";
import SliderWithInput from "../../components/SliderWithInput/SliderWithInput";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import "./GradientGeneratorPage.css";
import GradientColorsList from "../../components/GradientColorsList/GradientColorsList";

export interface gradientColorsListTypes {
	color: string;
	stop: number;
}

function GradientGeneratorPage() {
	const initialGradientStyle = {
		display: "flex",
		justifyContent: "center",
		alignItems: "center",
		height: 100,
		background:
			"linear-gradient(90deg, #1f005c, #6d0061, #a51e5f, #cf4f5c, #ed815e, #ffb56b)",
	};

	const [gradientStyle, setGradientStyle] = useState(initialGradientStyle);

	const [gradientAngle, setGradientAngle] = useState(90);

	const initialGradientColorSet = [
		{
			color: "#000000",
			stop: 0,
		},
		{
			color: "#FFFFFF",
			stop: 100,
		},
	];
	const [gradientColorsSet, setGradientColorsSet] = useState<
		gradientColorsListTypes[]
	>(initialGradientColorSet);

	return (
		<>
			<NavigationBar title="Color Converter" />
			<div>
				<Grid container direction="row" justifyContent="center">
					<Grid item xs={12}>
						<Paper>
							<Box p={2} style={gradientStyle}>
								<span style={{ background: "white" }}>
									<ResultColorCopyButton value={"gradient value"} />
								</span>
							</Box>
						</Paper>
					</Grid>
				</Grid>
				<Grid container direction="row" justifyContent="center">
					<Grid item xs={6} lg={4}>
						<Paper>
							<Box p={2}>
								<GradientColorsList
									gradientColorsSet={gradientColorsSet}
									setGradientColorsSet={setGradientColorsSet}
								/>
								<Button
									variant="outlined"
									size="small"
									startIcon={<AddCircleOutlineIcon />}
								>
									Add New Color
								</Button>
							</Box>
						</Paper>
					</Grid>
					<Grid item xs={6} lg={8}>
						<Paper>
							<Box p={2}>
								<SliderWithInput
									value={gradientAngle}
									setValue={setGradientAngle}
									title="Gradient Angle"
									minValue={0}
									maxValue={360}
									step={1}
									resetValue={90}
								/>
							</Box>
						</Paper>
					</Grid>
				</Grid>
			</div>
		</>
	);
}

export default GradientGeneratorPage;
