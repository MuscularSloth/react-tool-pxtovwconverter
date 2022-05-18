import {
	Button,
	FormControl,
	FormHelperText,
	InputAdornment,
	MenuItem,
	Select,
	SelectChangeEvent,
	TextField,
} from "@mui/material";
import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import { HEX_WEBCOLOR_PATTERN } from "../../constants/regex";
import { HEXToRGBA, HSLToRGB } from "../../helpers/colorConverter";
import { colorObjectType } from "../../pages/ColorConvertorPage/ColorConvertorPage";

interface propTypes {
	setCalculatedColor: Dispatch<SetStateAction<colorObjectType>>;
}

function InputColorBlock({ setCalculatedColor }: propTypes) {
	const [colorType, setColorType] = useState<string>("HEX");
	const [enteredHexValue, setEnteredHexValue] = useState<string>(() => {
		const saved: string = localStorage.getItem("enteredHexValue") ?? "";
		if (saved !== "") {
			const initialValue = JSON.parse(saved);
			return initialValue;
		}
		return "";
	});
	const [enteredRedValue, setEnteredRedValue] = useState<number>(() => {
		const saved: string = localStorage.getItem("enteredRedValue") ?? "";
		if (saved !== "") {
			const initialValue = JSON.parse(saved);
			return parseFloat(initialValue);
		}
		return 0;
	});
	const [enteredGreenValue, setEnteredGreenValue] = useState<number>(() => {
		const saved: string = localStorage.getItem("enteredGreenValue") ?? "";
		if (saved !== "") {
			const initialValue = JSON.parse(saved);
			return parseFloat(initialValue);
		}
		return 0;
	});
	const [enteredBlueValue, setEnteredBlueValue] = useState<number>(() => {
		const saved: string = localStorage.getItem("enteredBlueValue") ?? "";
		if (saved !== "") {
			const initialValue = JSON.parse(saved);
			return parseFloat(initialValue);
		}
		return 0;
	});
	const [enteredOpacityValue, setEnteredOpacityValue] = useState<number>(() => {
		const saved: string = localStorage.getItem("enteredOpacityValue") ?? "";
		if (saved !== "") {
			const initialValue = JSON.parse(saved);
			return parseFloat(initialValue);
		}
		return 1;
	});
	const [enteredHueValue, setEnteredHueValue] = useState<number>(() => {
		const saved: string = localStorage.getItem("enteredHueValue") ?? "";
		if (saved !== "") {
			const initialValue = JSON.parse(saved);
			return parseFloat(initialValue);
		}
		return 0;
	});
	const [enteredSaturationValue, setEnteredSaturationValue] = useState<number>(
		() => {
			const saved: string =
				localStorage.getItem("enteredSaturationValue") ?? "";
			if (saved !== "") {
				const initialValue = JSON.parse(saved);
				return parseFloat(initialValue);
			}
			return 0;
		}
	);
	const [enteredLightnessValue, setEnteredLightnessValue] = useState<number>(
		() => {
			const saved: string = localStorage.getItem("enteredLightnessValue") ?? "";
			if (saved !== "") {
				const initialValue = JSON.parse(saved);
				return parseFloat(initialValue);
			}
			return 0;
		}
	);

	const handleChangeColorType = (event: SelectChangeEvent) => {
		setColorType(event.target.value);
	};

	const handleEnteredHexValue = (
		event: React.ChangeEvent<HTMLInputElement>
	) => {
		setEnteredHexValue(event.target.value);
	};

	const handleEnteredRedValue = (
		event: React.ChangeEvent<HTMLInputElement>
	) => {
		const value: number | typeof NaN = +event.target.value;

		if (!isNaN(value) && value >= 0 && value <= 255) {
			setEnteredRedValue(+event.target.value);
		}
	};

	const handleEnteredGreenValue = (
		event: React.ChangeEvent<HTMLInputElement>
	) => {
		const value: number | typeof NaN = +event.target.value;

		if (!isNaN(value) && value >= 0 && value <= 255) {
			setEnteredGreenValue(+event.target.value);
		}
	};

	const handleEnteredBlueValue = (
		event: React.ChangeEvent<HTMLInputElement>
	) => {
		const value: number | typeof NaN = +event.target.value;

		if (!isNaN(value) && value >= 0 && value <= 255) {
			setEnteredBlueValue(+event.target.value);
		}
	};

	const handleEnteredOpacityValue = (
		event: React.ChangeEvent<HTMLInputElement>
	) => {
		const value: number | typeof NaN = +event.target.value;

		// if (!isNaN(value) && value >= 0 && value <= 1) {
		setEnteredOpacityValue(+event.target.value);
		// }
	};

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

	const handleConvertClick = () => {
		let calculatedColor: colorObjectType = {
			red: 0,
			green: 0,
			blue: 0,
			opacity: 1,
		};

		switch (colorType) {
			case "HEX":
				if (enteredHexValue && enteredHexValue.match(HEX_WEBCOLOR_PATTERN)) {
					calculatedColor = HEXToRGBA(enteredHexValue);
					setCalculatedColor(calculatedColor);
				}
				break;
			case "RGB":
			case "RGBA":
				if (
					enteredRedValue >= 0 &&
					enteredRedValue <= 255 &&
					enteredGreenValue >= 0 &&
					enteredGreenValue <= 255 &&
					enteredBlueValue >= 0 &&
					enteredBlueValue <= 255 &&
					enteredOpacityValue >= 0 &&
					enteredOpacityValue <= 1
				) {
					calculatedColor = {
						red: enteredRedValue,
						green: enteredGreenValue,
						blue: enteredBlueValue,
						opacity: enteredOpacityValue,
					};
					setCalculatedColor(calculatedColor);
				}
				break;
			case "HSL":
				if (
					enteredHueValue >= 0 &&
					enteredHueValue <= 360 &&
					enteredSaturationValue >= 0 &&
					enteredSaturationValue <= 100 &&
					enteredLightnessValue >= 0 &&
					enteredLightnessValue <= 100
				) {
					calculatedColor = {
						...HSLToRGB(
							enteredHueValue,
							enteredSaturationValue,
							enteredLightnessValue
						),
						opacity: 1,
					};
					setCalculatedColor(calculatedColor);
				}
				break;
		}
	};

	useEffect(() => {
		if (colorType === "RGB") {
			setEnteredOpacityValue(1);
		}
	}, [colorType]);

	useEffect(() => {
		localStorage.setItem("enteredHexValue", JSON.stringify(enteredHexValue));
	}, [enteredHexValue]);

	useEffect(() => {
		localStorage.setItem("enteredRedValue", JSON.stringify(enteredRedValue));
	}, [enteredRedValue]);

	useEffect(() => {
		localStorage.setItem(
			"enteredGreenValue",
			JSON.stringify(enteredGreenValue)
		);
	}, [enteredGreenValue]);

	useEffect(() => {
		localStorage.setItem("enteredBlueValue", JSON.stringify(enteredBlueValue));
	}, [enteredBlueValue]);

	useEffect(() => {
		localStorage.setItem(
			"enteredOpacityValue",
			JSON.stringify(enteredOpacityValue)
		);
	}, [enteredOpacityValue]);

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
			<div>
				<FormControl sx={{ m: 1, minWidth: 90 }} size="small">
					<Select
						value={colorType}
						onChange={handleChangeColorType}
						defaultValue="HEX"
						inputProps={{ "aria-label": "Color type" }}
					>
						<MenuItem value="HEX">HEX</MenuItem>
						<MenuItem value="RGB">RGB</MenuItem>
						<MenuItem value="RGBA">RGBA</MenuItem>
						<MenuItem value="HSL">HSL</MenuItem>
					</Select>
					<FormHelperText>Color type</FormHelperText>
				</FormControl>
				{colorType === "HEX" && (
					<FormControl sx={{ m: 1 }} size="small">
						<TextField
							value={enteredHexValue}
							onChange={handleEnteredHexValue}
							variant="outlined"
							size="small"
						/>
						<FormHelperText>HEX Color Code</FormHelperText>
					</FormControl>
				)}
				{(colorType === "RGB" || colorType === "RGBA") && (
					<>
						<FormControl sx={{ m: 1, width: "15%" }} size="small">
							<TextField
								value={enteredRedValue}
								onChange={handleEnteredRedValue}
								size="small"
								// type="number"
								InputProps={{
									startAdornment: (
										<InputAdornment position="start">R</InputAdornment>
									),
									inputProps: { min: 0, max: 255 },
								}}
							/>
						</FormControl>
						<FormControl sx={{ m: 1, width: "15%" }} size="small">
							<TextField
								value={enteredGreenValue}
								onChange={handleEnteredGreenValue}
								size="small"
								// type="number"
								InputProps={{
									startAdornment: (
										<InputAdornment position="start">G</InputAdornment>
									),
									inputProps: { min: 0, max: 255 },
								}}
							/>
						</FormControl>
						<FormControl sx={{ m: 1, width: "15%" }} size="small">
							<TextField
								value={enteredBlueValue}
								onChange={handleEnteredBlueValue}
								size="small"
								// type="number"
								InputProps={{
									startAdornment: (
										<InputAdornment position="start">B</InputAdornment>
									),
									inputProps: { min: 0, max: 255 },
								}}
							/>
						</FormControl>
						<FormControl sx={{ m: 1, width: "15%" }} size="small">
							<TextField
								value={enteredOpacityValue}
								onChange={handleEnteredOpacityValue}
								size="small"
								type="number"
								disabled={colorType !== "RGBA"}
								InputProps={{
									startAdornment: (
										<InputAdornment position="start">A</InputAdornment>
									),
									inputProps: { min: 0, max: 1, step: 0.1 },
								}}
							/>
						</FormControl>
					</>
				)}
				{colorType === "HSL" && (
					<>
						<FormControl sx={{ m: 1, width: "20%" }} size="small">
							<TextField
								value={enteredHueValue}
								onChange={handleEnteredHueValue}
								size="small"
								type="number"
								InputProps={{
									startAdornment: (
										<InputAdornment position="start">H</InputAdornment>
									),
									inputProps: { min: 0, max: 100 },
								}}
							/>
						</FormControl>
						<FormControl sx={{ m: 1, width: "20%" }} size="small">
							<TextField
								value={enteredSaturationValue}
								onChange={handleEnteredSaturationValue}
								size="small"
								type="number"
								InputProps={{
									startAdornment: (
										<InputAdornment position="start">L</InputAdornment>
									),
									inputProps: { min: 0, max: 100 },
								}}
							/>
						</FormControl>
						<FormControl sx={{ m: 1, width: "20%" }} size="small">
							<TextField
								value={enteredLightnessValue}
								onChange={handleEnteredLightnessValue}
								size="small"
								type="number"
								InputProps={{
									startAdornment: (
										<InputAdornment position="start">S</InputAdornment>
									),
									inputProps: { min: 0, max: 100 },
								}}
							/>
						</FormControl>
					</>
				)}
				<FormControl sx={{ m: 1 }}>
					<Button variant="outlined" onClick={handleConvertClick}>
						Convert
					</Button>
				</FormControl>
			</div>
		</>
	);
}

export default InputColorBlock;
