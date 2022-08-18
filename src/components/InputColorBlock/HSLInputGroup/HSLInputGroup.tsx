import { FormControl, InputAdornment, TextField } from "@mui/material";
import React, { useEffect } from "react";

interface propTypes {
	enteredHueValue: number;
	setEnteredHueValue: React.Dispatch<React.SetStateAction<number>>;
	enteredSaturationValue: number;
	setEnteredSaturationValue: React.Dispatch<React.SetStateAction<number>>;
	enteredLightnessValue: number;
	setEnteredLightnessValue: React.Dispatch<React.SetStateAction<number>>;
	handleKeyPressed: (event: React.KeyboardEvent<HTMLInputElement>) => void;
}

function HSLInputGroup({
	enteredHueValue,
	setEnteredHueValue,
	enteredSaturationValue,
	setEnteredSaturationValue,
	enteredLightnessValue,
	setEnteredLightnessValue,
	handleKeyPressed,
}: propTypes) {
	const handleEnteredHueValue = (
		event: React.ChangeEvent<HTMLInputElement>
	) => {
		const value: number | typeof NaN = +event.target.value;

		if (!isNaN(value) && value >= 0 && value <= 360) {
			setEnteredHueValue(+event.target.value);
		}
	};

	const handleEnteredSaturationValue = (
		event: React.ChangeEvent<HTMLInputElement>
	) => {
		const value: number | typeof NaN = +event.target.value;

		if (!isNaN(value) && value >= 0 && value <= 100) {
			setEnteredSaturationValue(+event.target.value);
		}
	};

	const handleEnteredLightnessValue = (
		event: React.ChangeEvent<HTMLInputElement>
	) => {
		const value: number | typeof NaN = +event.target.value;

		if (!isNaN(value) && value >= 0 && value <= 100) {
			setEnteredLightnessValue(+event.target.value);
		}
	};

	useEffect(() => {
		localStorage.setItem("enteredHueValue", JSON.stringify(enteredHueValue));
	}, [enteredHueValue]);
	useEffect(() => {
		localStorage.setItem(
			"enteredSaturationValue",
			JSON.stringify(enteredSaturationValue)
		);
	}, [enteredSaturationValue]);
	useEffect(() => {
		localStorage.setItem(
			"enteredLightnessValue",
			JSON.stringify(enteredLightnessValue)
		);
	}, [enteredLightnessValue]);

	return (
		<>
			<FormControl sx={{ m: 1, width:{xs: "30%", md: "20%"} }} size="small">
				<TextField
					value={enteredHueValue}
					onChange={handleEnteredHueValue}
					size="small"
					type="number"
					onKeyPress={handleKeyPressed}
					InputProps={{
						startAdornment: <InputAdornment position="start">H</InputAdornment>,
						inputProps: { min: 0, max: 360 },
					}}
				/>
			</FormControl>
			<FormControl sx={{ m: 1, width:{xs: "30%", md: "20%"} }} size="small">
				<TextField
					value={enteredSaturationValue}
					onChange={handleEnteredSaturationValue}
					size="small"
					type="number"
					onKeyPress={handleKeyPressed}
					InputProps={{
						startAdornment: <InputAdornment position="start">S</InputAdornment>,
						inputProps: { min: 0, max: 100 },
					}}
				/>
			</FormControl>
			<FormControl sx={{ m: 1, width:{xs: "30%", md: "20%"} }} size="small">
				<TextField
					value={enteredLightnessValue}
					onChange={handleEnteredLightnessValue}
					size="small"
					type="number"
					onKeyPress={handleKeyPressed}
					InputProps={{
						startAdornment: <InputAdornment position="start">L</InputAdornment>,
						inputProps: { min: 0, max: 100 },
					}}
				/>
			</FormControl>
		</>
	);
}

export default HSLInputGroup;
