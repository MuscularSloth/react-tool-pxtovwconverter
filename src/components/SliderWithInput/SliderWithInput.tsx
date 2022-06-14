import * as React from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Slider from "@mui/material/Slider";
import MuiInput from "@mui/material/Input";
import { IconButton, Tooltip } from "@mui/material";
import AutoFixNormalIcon from "@mui/icons-material/AutoFixNormal";

const Input = styled(MuiInput)`
	width: 42px;
`;

interface propsTypes {
	title: string;
	value: number;
	setValue: React.Dispatch<React.SetStateAction<number>>;
	maxValue?: number;
	minValue?: number;
	step?: number;
	resetValue?: number;
}

export default function SliderWithInput({
	title,
	value,
	setValue,
	maxValue = 100,
	minValue = 0,
	step = 1,
	resetValue = 0,
}: propsTypes) {
	const handleSliderChange = (event: Event, newValue: number | number[]) => {
		const valueToSet = typeof newValue === "number" ? newValue : 0;
		setValue(valueToSet);
	};

	const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setValue(event.target.value === "" ? 0 : Number(event.target.value));
	};

	const resetInputHandler = () => {
		setValue(resetValue);
	};

	const handleBlur = () => {
		if (value < minValue) {
			setValue(minValue);
		} else if (value > maxValue) {
			setValue(maxValue);
		}
	};

	return (
		<Box sx={{ width: 250 }}>
			<Typography id="input-slider" gutterBottom>
				{title}
			</Typography>
			<Grid container spacing={2} alignItems="center">
				<Grid item xs>
					<Tooltip placement="top" title={"Reset to " + resetValue}>
						<IconButton
							size="small"
							color="primary"
							aria-label="add to shopping cart"
							onClick={resetInputHandler}
						>
							<AutoFixNormalIcon />
						</IconButton>
					</Tooltip>
					<Slider
						value={typeof value === "number" ? value : 0}
						onChange={handleSliderChange}
						aria-labelledby="input-slider"
						step={step}
						min={minValue}
						max={maxValue}
						size="small"
					/>
				</Grid>
				<Grid item>
					<Input
						value={value}
						size="small"
						onChange={handleInputChange}
						onBlur={handleBlur}
						inputProps={{
							step: step,
							min: minValue,
							max: maxValue,
							type: "number",
							"aria-labelledby": "input-slider",
						}}
					/>
				</Grid>
			</Grid>
		</Box>
	);
}
