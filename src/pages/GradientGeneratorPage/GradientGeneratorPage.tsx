import { Box, Button, Grid, Paper, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import NavigationBar from "../../components/NavigationBar/NavigationBar";
import ResultColorCopyButton from "../../components/ResultColorCopyButton/ResultColorCopyButton";
import SliderWithInput from "../../components/SliderWithInput/SliderWithInput";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import "./GradientGeneratorPage.css";
import GradientColorsList from "../../components/GradientColorsList/GradientColorsList";
import DropDownSmallSelect from "../../components/DropDownSmallSelect/DropDownSmallSelect";

export interface gradientColorsListTypes {
	color: string;
	stop: number;
}

function GradientGeneratorPage() {
	//background-image: linear-gradient(angle, color-stop1, color-stop2);
	//background-image: repeating-linear-gradient(red, yellow 10%, green 20%);

	const gradientTypesList = {
		linearGradient: "linear-gradient",
		radialGradient: "radial-gradient",
		conicGradient: "conic-gradient",
		repeatinglinearGradient: "repeating-linear-gradient",
		repeatingRadialGradient: "repeating-radial-gradient",
	};

	const gradientTypesArray = [];
	for (let gradType in gradientTypesList) {
		gradientTypesArray.push({
			key: gradType as string,
			value: gradientTypesList[
				gradType as keyof typeof gradientTypesList
			] as string,
		});
	}
	// const gradientTypesArray = Object.values(gradientTypesList);

	const initialCalculatedGradient =
		"linear-gradient(90deg, #1f005c, #6d0061, #a51e5f, #cf4f5c, #ed815e, #ffb56b)";
	const [calculatedGradient, setcalculatedGradient] = useState(
		initialCalculatedGradient
	);

	const initialGradientStyle = {
		display: "flex",
		justifyContent: "center",
		alignItems: "center",
		height: 150,
		background: calculatedGradient,
	};

	const [gradientStyle, setGradientStyle] = useState(initialGradientStyle);

	const [gradientAngle, setGradientAngle] = useState(90);

	const initialCirclePosition = {
		x: 50,
		y: 50,
	};
	const [circlePosition, setCirclePosition] = useState(initialCirclePosition);

	const initialGradientType = {
		key: "linearGradient",
		value: "linear-gradient",
	};
	const [gradientType, setGradientType] = useState(initialGradientType);

	const initialGradientColorSet = [
		{
			color: "#409a4a",
			stop: 0,
		},
		{
			color: "#211c79",
			stop: 25,
		},
		{
			color: "#a01989",
			stop: 50,
		},
		{
			color: "#c7c72c",
			stop: 75,
		},
		{
			color: "#e01313",
			stop: 100,
		},
	];
	const [gradientColorsSet, setGradientColorsSet] = useState<
		gradientColorsListTypes[]
	>(initialGradientColorSet);

	const handleAddNewColorRow = () => {
		const newGradientColorSet = [...gradientColorsSet];
		newGradientColorSet.push({
			color: "#FFFFFF",
			stop: 50,
		});

		setGradientColorsSet(newGradientColorSet);
	};

	const handleSetCirclePosition = (value: number, axios: string) => {
		if (axios === "x") {
			setCirclePosition({ ...circlePosition, x: value });
		} else if (axios === "y") {
			setCirclePosition({ ...circlePosition, y: value });
		}
	};

	const calculateGradient = () => {
		let gradientString = "";
		gradientString += gradientType.value + "(";

		switch (gradientType.key) {
			case "linearGradient":
			case "repeatinglinearGradient":
				gradientString += gradientAngle + "deg";
				break;
			case "radialGradient":
			case "repeatingRadialGradient":
				gradientString +=
					"circle at " + circlePosition.x + "% " + circlePosition.y + "%";
				break;
			case "conicGradient":
				gradientString +=
					"from " +
					gradientAngle +
					"deg" +
					" at " +
					circlePosition.x +
					"% " +
					circlePosition.y +
					"%";
				break;
		}

		gradientColorsSet &&
			gradientColorsSet.map(
				(colorRow) =>
					(gradientString += ", " + colorRow.color + " " + colorRow.stop + "%")
			);
		gradientString += ")";
		setcalculatedGradient(gradientString);
	};

	useEffect(() => {
		calculateGradient();
	}, [gradientAngle, gradientColorsSet, gradientType]);

	useEffect(() => {
		setGradientStyle({ ...gradientStyle, background: calculatedGradient });
	}, [calculatedGradient]);

	useEffect(() => {
		calculateGradient();
	}, []);

	return (
		<>
			<NavigationBar title="Color Converter" />
			<div>
				<Grid container direction="row" justifyContent="center">
					<Grid item xs={12}>
						<Paper>
							<Box p={2} style={gradientStyle}></Box>
						</Paper>
						<Paper>
							<ResultColorCopyButton
								value={"background: " + calculatedGradient + ";"}
							/>
						</Paper>
					</Grid>
				</Grid>
				<Grid container direction="row" justifyContent="center">
					<Grid item xs={12} md={6} lg={4}>
						<Paper>
							<Box p={2}>
								<DropDownSmallSelect
									title="Gradient Type"
									value={gradientType}
									setValue={setGradientType}
									valuesList={gradientTypesArray}
								/>
							</Box>
							<Box p={2}>
								<GradientColorsList
									gradientColorsSet={gradientColorsSet}
									setGradientColorsSet={setGradientColorsSet}
								/>
								<Button
									variant="outlined"
									size="small"
									startIcon={<AddCircleOutlineIcon />}
									onClick={handleAddNewColorRow}
								>
									Add New Color
								</Button>
							</Box>
						</Paper>
					</Grid>
					<Grid item xs={12} md={6} lg={8}>
						<Paper>
							<Box p={2}>
								{gradientType &&
									(gradientType.key === "linearGradient" ||
										gradientType.key === "conicGradient") && (
										<SliderWithInput
											value={gradientAngle}
											setValue={setGradientAngle}
											title="Gradient Angle"
											minValue={0}
											maxValue={360}
											step={1}
											resetValue={90}
										/>
									)}
								{gradientType &&
									(gradientType.key === "radialGradient" ||
										gradientType.key === "conicGradient") && (
										<>
											<SliderWithInput
												value={circlePosition.x}
												setValue={(val: number) =>
													handleSetCirclePosition(val, "x")
												}
												title="Position X"
												minValue={-20}
												maxValue={120}
												step={10}
												resetValue={50}
											/>
											<SliderWithInput
												value={circlePosition.y}
												setValue={(val: number) =>
													handleSetCirclePosition(val, "y")
												}
												title="Position Y"
												minValue={-20}
												maxValue={120}
												step={10}
												resetValue={50}
											/>
										</>
									)}
							</Box>
						</Paper>
					</Grid>
				</Grid>
			</div>
		</>
	);
}

export default GradientGeneratorPage;
