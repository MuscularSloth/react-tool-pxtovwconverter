import {
	FormControl,
	FormHelperText,
	InputAdornment,
	TextField,
} from "@mui/material";
import React, { useEffect } from "react";

interface propTypes {
	enteredHexValue: string;
	setEnteredHexValue: React.Dispatch<React.SetStateAction<string>>;
	enteredHexOpacityValue: number;
	setEnteredHexOpacityValue: React.Dispatch<React.SetStateAction<number>>;
}

function HEXInputGroup({
	enteredHexValue,
	setEnteredHexValue,
	enteredHexOpacityValue,
	setEnteredHexOpacityValue,
}: propTypes) {
	const handleEnteredHexValue = (
		event: React.ChangeEvent<HTMLInputElement>
	) => {
		setEnteredHexValue(event.target.value);
	};

	const handleEnteredHexOpacityValue = (
		event: React.ChangeEvent<HTMLInputElement>
	) => {
		const value: number | typeof NaN = +event.target.value;

		// if (!isNaN(value) && value >= 0 && value <= 1) {
		setEnteredHexOpacityValue(+event.target.value);
		// }
	};

	useEffect(() => {
		localStorage.setItem("enteredHexValue", JSON.stringify(enteredHexValue));
	}, [enteredHexValue]);

	useEffect(() => {
		localStorage.setItem(
			"enteredHexOpacityValue",
			JSON.stringify(enteredHexOpacityValue)
		);
	}, [enteredHexOpacityValue]);

	return (
		<>
			<FormControl sx={{ m: 1 }} size="small">
				<TextField
					value={enteredHexValue}
					onChange={handleEnteredHexValue}
					variant="outlined"
					size="small"
				/>
				<FormHelperText>HEX Color Code</FormHelperText>
			</FormControl>
			<FormControl sx={{ m: 1, width: "15%" }} size="small">
				<TextField
					value={enteredHexOpacityValue}
					onChange={handleEnteredHexOpacityValue}
					size="small"
					type="number"
					InputProps={{
						startAdornment: <InputAdornment position="start">A</InputAdornment>,
						inputProps: { min: 0, max: 1, step: 0.1 },
					}}
				/>
			</FormControl>
		</>
	);
}

export default HEXInputGroup;
