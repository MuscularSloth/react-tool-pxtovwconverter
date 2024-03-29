import { FormControl, InputAdornment, TextField } from '@mui/material';
import React, { useEffect } from 'react';

interface propTypes {
	enteredRedValue: number;
	setEnteredRedValue: React.Dispatch<React.SetStateAction<number>>;
	enteredGreenValue: number;
	setEnteredGreenValue: React.Dispatch<React.SetStateAction<number>>;
	enteredBlueValue: number;
	setEnteredBlueValue: React.Dispatch<React.SetStateAction<number>>;
	enteredOpacityValue: number;
	setEnteredOpacityValue: React.Dispatch<React.SetStateAction<number>>;
	colorType: string;
	handleKeyPressed: (event: React.KeyboardEvent<HTMLInputElement>) => void;
}

const RGBAInputGroup = ({
	enteredRedValue,
	setEnteredRedValue,
	enteredGreenValue,
	setEnteredGreenValue,
	enteredBlueValue,
	setEnteredBlueValue,
	enteredOpacityValue,
	setEnteredOpacityValue,
	colorType,
	handleKeyPressed,
}: propTypes) => {
	const handleEnteredRedValue = (event: React.ChangeEvent<HTMLInputElement>) => {
		const value: number | typeof NaN = +event.target.value;

		if (!Number.isNaN(value) && value >= 0 && value <= 255) {
			setEnteredRedValue(+event.target.value);
		}
	};

	const handleEnteredGreenValue = (
		event: React.ChangeEvent<HTMLInputElement>,
	) => {
		const value: number | typeof NaN = +event.target.value;

		if (!Number.isNaN(value) && value >= 0 && value <= 255) {
			setEnteredGreenValue(+event.target.value);
		}
	};

	const handleEnteredBlueValue = (
		event: React.ChangeEvent<HTMLInputElement>,
	) => {
		const value: number | typeof NaN = +event.target.value;

		if (!Number.isNaN(value) && value >= 0 && value <= 255) {
			setEnteredBlueValue(+event.target.value);
		}
	};

	const handleEnteredOpacityValue = (
		event: React.ChangeEvent<HTMLInputElement>,
	) => {
		setEnteredOpacityValue(+event.target.value);
	};

	useEffect(() => {
		localStorage.setItem('enteredRedValue', JSON.stringify(enteredRedValue));
	}, [enteredRedValue]);

	useEffect(() => {
		localStorage.setItem('enteredGreenValue', JSON.stringify(enteredGreenValue));
	}, [enteredGreenValue]);

	useEffect(() => {
		localStorage.setItem('enteredBlueValue', JSON.stringify(enteredBlueValue));
	}, [enteredBlueValue]);

	useEffect(() => {
		localStorage.setItem(
			'enteredOpacityValue',
			JSON.stringify(enteredOpacityValue),
		);
	}, [enteredOpacityValue]);

	useEffect(() => {
		if (colorType === 'RGB') {
			setEnteredOpacityValue(1);
		}
	}, [colorType]);

	return (
		<>
			<FormControl sx={{ m: 1, width: { xs: '30%', md: '15%' } }} size="small">
				<TextField
					value={enteredRedValue}
					onChange={handleEnteredRedValue}
					size="small"
					// type="number"
					onKeyPress={handleKeyPressed}
					InputProps={{
						startAdornment: <InputAdornment position="start">R</InputAdornment>,
						inputProps: { min: 0, max: 255 },
					}}
				/>
			</FormControl>
			<FormControl sx={{ m: 1, width: { xs: '30%', md: '15%' } }} size="small">
				<TextField
					value={enteredGreenValue}
					onChange={handleEnteredGreenValue}
					size="small"
					// type="number"
					onKeyPress={handleKeyPressed}
					InputProps={{
						startAdornment: <InputAdornment position="start">G</InputAdornment>,
						inputProps: { min: 0, max: 255 },
					}}
				/>
			</FormControl>
			<FormControl sx={{ m: 1, width: { xs: '30%', md: '15%' } }} size="small">
				<TextField
					value={enteredBlueValue}
					onChange={handleEnteredBlueValue}
					size="small"
					// type="number"
					onKeyPress={handleKeyPressed}
					InputProps={{
						startAdornment: <InputAdornment position="start">B</InputAdornment>,
						inputProps: { min: 0, max: 255 },
					}}
				/>
			</FormControl>
			<FormControl sx={{ m: 1, width: { xs: '30%', md: '15%' } }} size="small">
				<TextField
					value={enteredOpacityValue}
					onChange={handleEnteredOpacityValue}
					size="small"
					type="number"
					onKeyPress={handleKeyPressed}
					disabled={colorType !== 'RGBA'}
					InputProps={{
						startAdornment: <InputAdornment position="start">A</InputAdornment>,
						inputProps: { min: 0, max: 1, step: 0.1 },
					}}
				/>
			</FormControl>
		</>
	);
};

export default RGBAInputGroup;
