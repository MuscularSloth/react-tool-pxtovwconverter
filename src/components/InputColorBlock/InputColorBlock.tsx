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
import { getValueFromLocalStorage } from "../../helpers/localStorage";
import { colorObjectType } from "../../pages/ColorConvertorPage/ColorConvertorPage";
import HEXInputGroup from "./HEXInputGroup/HEXInputGroup";
import HSLInputGroup from "./HSLInputGroup/HSLInputGroup";
import RGBAInputGroup from "./RGBAInputGroup/RGBAInputGroup";

interface propTypes {
	setCalculatedColor: Dispatch<SetStateAction<colorObjectType>>;
}

enum colorTypesEnum {
	"HEX",
	"RGB",
	"RGBA",
	"HSL",
}

function InputColorBlock({ setCalculatedColor }: propTypes) {
	const [colorType, setColorType] = useState<string>(
		getValueFromLocalStorage("colorType", "HEX")
	);
	const [enteredHexValue, setEnteredHexValue] = useState<string>(
		getValueFromLocalStorage("enteredHexOpacityValue", "")
	);
	const [enteredHexOpacityValue, setEnteredHexOpacityValue] = useState<number>(
		getValueFromLocalStorage("enteredHexOpacityValue", 1)
	);
	const [enteredRedValue, setEnteredRedValue] = useState<number>(
		getValueFromLocalStorage("enteredRedValue", 0)
	);
	const [enteredGreenValue, setEnteredGreenValue] = useState<number>(
		getValueFromLocalStorage("enteredGreenValue", 0)
	);
	const [enteredBlueValue, setEnteredBlueValue] = useState<number>(
		getValueFromLocalStorage("enteredBlueValue", 0)
	);
	const [enteredOpacityValue, setEnteredOpacityValue] = useState<number>(
		getValueFromLocalStorage("enteredOpacityValue", 1)
	);
	const [enteredHueValue, setEnteredHueValue] = useState<number>(
		getValueFromLocalStorage("enteredHueValue", 0)
	);
	const [enteredSaturationValue, setEnteredSaturationValue] = useState<number>(
		getValueFromLocalStorage("enteredSaturationValue", 0)
	);
	const [enteredLightnessValue, setEnteredLightnessValue] = useState<number>(
		getValueFromLocalStorage("enteredLightnessValue", 0)
	);

	const handleChangeColorType = (event: SelectChangeEvent) => {
		setColorType(event.target.value);
		localStorage.setItem("colorType", JSON.stringify(event.target.value));
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
					if (enteredHexOpacityValue < 1) {
						if (calculatedColor.opacity < 1) {
							calculatedColor.opacity =
								calculatedColor.opacity * enteredHexOpacityValue;
						} else {
							calculatedColor.opacity = enteredHexOpacityValue;
						}
					}
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
					<HEXInputGroup
						enteredHexValue={enteredHexValue}
						setEnteredHexValue={setEnteredHexValue}
						enteredHexOpacityValue={enteredHexOpacityValue}
						setEnteredHexOpacityValue={setEnteredHexOpacityValue}
					/>
				)}
				{(colorType === "RGB" || colorType === "RGBA") && (
					<RGBAInputGroup
						enteredRedValue={enteredRedValue}
						setEnteredRedValue={setEnteredRedValue}
						enteredGreenValue={enteredGreenValue}
						setEnteredGreenValue={setEnteredGreenValue}
						enteredBlueValue={enteredBlueValue}
						setEnteredBlueValue={setEnteredBlueValue}
						enteredOpacityValue={enteredOpacityValue}
						setEnteredOpacityValue={setEnteredOpacityValue}
						colorType={colorType}
					/>
				)}
				{colorType === "HSL" && (
					<HSLInputGroup
						enteredHueValue={enteredHueValue}
						setEnteredHueValue={setEnteredHueValue}
						enteredSaturationValue={enteredSaturationValue}
						setEnteredSaturationValue={setEnteredSaturationValue}
						enteredLightnessValue={enteredLightnessValue}
						setEnteredLightnessValue={setEnteredLightnessValue}
					/>
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
