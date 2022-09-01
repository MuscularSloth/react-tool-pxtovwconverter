import React, {
	ChangeEvent,
	HTMLInputTypeAttribute,
	useEffect,
	useState,
} from 'react';

import Grid from '@mui/material/Grid';
import {
	Button,
	Checkbox,
	FormControlLabel,
	Paper,
	Snackbar,
	TextField,
	Box,
} from '@mui/material';
import InputSlider from '../../components/InputSlider/InputSlider';
import ResultCopyButton from '../../components/ResultCopyButton/ResultCopyButton';
import WidthPresetsBlock from '../../components/WidthPresets/WidthPresetsBlock';
import PreviousCalcTable from '../../components/PreviousCalcTable/PreviousCalcTable';
import NavigationBar from '../../components/NavigationBar/NavigationBar';

export interface previousCalcValuesType {
	selectedWidth: number;
	calculatedValue: HTMLInputTypeAttribute;
	result: number;
}

const SingleValuePage = () => {
	const initialPresetedWidthValue: number[] = [1920, 2160, 1440, 1280];
	const initialCustomPresetedWidth: number[] = [720];
	const initialSelectedWidthValue: number = 1920;

	const [selectedWidth, setSelectedWidth] = useState<number>(() => {
		const saved: string = localStorage.getItem('selectedWidth') ?? '';
		if (saved !== '') {
			const initialValue = JSON.parse(saved);
			return parseFloat(initialValue);
		}
		return initialSelectedWidthValue;
	});

	const [presetedWidth, setPresetedWidth] = useState<number[]>(
		initialPresetedWidthValue,
	);

	const [customPresetedWidth, setCustomPresetedWidth] = useState<number[]>(
		() => {
			const saved: string = localStorage.getItem('customPresetedWidth') ?? '';
			if (saved !== '') {
				const initialValue: number[] = JSON.parse(saved);
				return initialValue;
			}
			return initialCustomPresetedWidth;
		},
	);

	const [calculatedValue, setCalculatedValue] =
		useState<HTMLInputTypeAttribute>('');

	const [currentResult, setCurrentResult] = useState<number | null>();

	const [previousCalcValues, setPreviousCalcValues] = useState<
		previousCalcValuesType[] | []
	>(() => {
		const saved: string = localStorage.getItem('previousCalcValues') ?? '';
		if (saved !== '') {
			const initialValue: previousCalcValuesType[] | [] = JSON.parse(saved);
			return initialValue;
		}
		return [];
	});

	const [isCalculatedValueError, setIsCalculatedValueError] =
		useState<boolean>(false);

	const [isAutoCopyOn, setIsAutoCopyOn] = useState<boolean>(() => {
		const saved: string = localStorage.getItem('isAutoCopyOn') ?? '';
		if (saved !== '') {
			const initialValue: string | null = JSON.parse(saved);
			return initialValue === 'true';
		}
		return false;
	});

	const [isNotificationOpen, setIsNotificationOpen] = useState(false);

	useEffect(() => {
		localStorage.setItem('selectedWidth', JSON.stringify(selectedWidth));
	}, [selectedWidth]);

	useEffect(() => {
		localStorage.setItem(
			'customPresetedWidth',
			JSON.stringify(customPresetedWidth),
		);
	}, [customPresetedWidth]);

	useEffect(() => {
		localStorage.setItem(
			'previousCalcValues',
			JSON.stringify(previousCalcValues),
		);
	}, [previousCalcValues]);

	useEffect(() => {
		localStorage.setItem('isAutoCopyOn', JSON.stringify(isAutoCopyOn));
	}, [isAutoCopyOn]);

	const handlePresetClick = (e: React.MouseEvent) => {
		const targetEl = e.target as HTMLElement;
		const newSelectedWidth: number = parseFloat(targetEl.innerText);
		if (newSelectedWidth > 1 && newSelectedWidth <= 2160) {
			setSelectedWidth(newSelectedWidth);
		}
	};

	const handlePresetDelete = (customWidthToDelete: number) => {
		setCustomPresetedWidth((prevCustomPresetedWidth: number[]) =>
			prevCustomPresetedWidth.filter((width) => width !== customWidthToDelete),
		);
	};

	const handleChangeCalculatedValue = (e: ChangeEvent<HTMLInputElement>) => {
		const valueForCheck: number = parseFloat(e.target.value);

		if (valueForCheck && valueForCheck >= 0 && valueForCheck <= 2160) {
			setCalculatedValue(e.target.value);
		} else if (valueForCheck < 0) {
			setCalculatedValue('0');
		} else if (valueForCheck > 2160) {
			setCalculatedValue('2160');
		}

		if (isCalculatedValueError) {
			setIsCalculatedValueError(false);
		}
	};

	const handleCalculateClick = () => {
		if (parseFloat(calculatedValue) <= 0 || !calculatedValue) {
			setCurrentResult(null);
			setIsCalculatedValueError(true); // Turn on Error state
			return;
		}

		/**
		 * Adding selected width to custom viewport array if it's new one
		 */
		if (
			!presetedWidth.includes(selectedWidth) &&
			!customPresetedWidth.includes(selectedWidth)
		) {
			setCustomPresetedWidth([...customPresetedWidth, selectedWidth]);
		}

		/**
		 * Calculating VW and set up result
		 */
		const result: number = +(
			(parseFloat(calculatedValue) / selectedWidth) *
			100
		).toFixed(3);
		setCurrentResult(result);

		if (isAutoCopyOn) {
			navigator.clipboard.writeText(`${result}vw`);
			setIsNotificationOpen(true);
		}

		if (
			!previousCalcValues.some(
				(valueObject) =>
					valueObject.selectedWidth === selectedWidth &&
					valueObject.calculatedValue === calculatedValue,
			)
		) {
			setPreviousCalcValues([
				...previousCalcValues,
				{ selectedWidth, calculatedValue, result },
			]);
		}
	};

	const handleCalculatedValueKeyPress = (
		e: React.KeyboardEvent<HTMLInputElement>,
	) => {
		if (e.key === 'Enter') {
			handleCalculateClick();
		}

		/**
		 * Listen for Backspace and clear input if it has only one char
		 */
		if (e.keyCode === 8) {
			if (calculatedValue.length === 1) {
				setCalculatedValue('');
			}
		}
	};

	const handleReserDataClick = () => {
		setPresetedWidth(initialPresetedWidthValue);
		setSelectedWidth(initialSelectedWidthValue);
		setCustomPresetedWidth(initialCustomPresetedWidth);
		setPreviousCalcValues([]);
	};

	return (
		<>
			<NavigationBar title="PX to VW Convert Single Value" />
			<div>
				<Grid container direction="row" justifyContent="center">
					<Grid item xs={12} md={7}>
						<Paper>
							<Box p={2}>
								<InputSlider
									selectedWidth={selectedWidth}
									setSelectedWidth={setSelectedWidth}
								/>
							</Box>
							<Box
								p={2}
								sx={{
									display: 'flex',
									alignItems: 'center',
									flexWrap: { xs: 'wrap', md: 'nowrap' },
								}}
							>
								<TextField
									sx={{
										marginRight: { xs: 0, md: 15 },
										width: 150,
										flex: { xs: '0 0 50%', md: '1 1 auto' },
									}}
									id="outlined-number"
									label="Calculated Value"
									type="number"
									size="small"
									InputLabelProps={{
										shrink: true,
									}}
									onKeyDown={handleCalculatedValueKeyPress}
									value={calculatedValue}
									onChange={handleChangeCalculatedValue}
									error={isCalculatedValueError === true}
								/>
								<Button
									variant="outlined"
									sx={{
										marginRight: { xs: 0, md: 15 },
										flex: { xs: '0 0 50%', md: '1 1 auto' },
									}}
									onClick={handleCalculateClick}
								>
									Calculate
								</Button>
								{currentResult && (
									<Box
										sx={{
											marginTop: { xs: '15px', md: 0 },
											marginLeft: { xs: 0, md: 'auto' },
											flex: { xs: '0 0 100%', md: '1 1 auto' },
											textAlign: { xs: 'center', md: 'left' },
										}}
									>
										<ResultCopyButton value={currentResult} />
									</Box>
								)}
							</Box>
							<Box p={2}>
								<FormControlLabel
									value="end"
									control={<Checkbox size="small" checked={isAutoCopyOn} />}
									label="Copy result to the clipboard automatically"
									labelPlacement="end"
									onChange={() => setIsAutoCopyOn(!isAutoCopyOn)}
								/>
								<Snackbar
									autoHideDuration={2000}
									anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
									open={isNotificationOpen}
									onClose={() => setIsNotificationOpen(false)}
									message={`Result has been copied! - ${currentResult}vw`}
									key="autocopynotification"
								/>
							</Box>
						</Paper>
					</Grid>
					<Grid item xs={12} md={5}>
						<Paper>
							<Box p={2}>
								<WidthPresetsBlock
									title="Viewport Width Presets:"
									hintText="Clicking on a preset sets the width value."
									widthList={presetedWidth}
									canDelete={false}
									handlePresetClick={handlePresetClick}
									handlePresetDelete={handlePresetDelete}
								/>

								<WidthPresetsBlock
									title="Custom Viewport Width Presets:"
									hintText="The new value of viewport width will be added automatically on a new calculation if it has not been used previously."
									widthList={customPresetedWidth}
									canDelete
									handlePresetClick={handlePresetClick}
									handlePresetDelete={handlePresetDelete}
								/>
							</Box>
							<Box p={2}>
								<Button
									variant="outlined"
									style={{ marginRight: 15 }}
									onClick={handleReserDataClick}
								>
									Reset Data
								</Button>
							</Box>
						</Paper>
					</Grid>
				</Grid>

				<Grid container direction="row" justifyContent="center" mt={2}>
					{/* <Grid item xs={4} mt={2}>
                  <Paper>
                  <Box p={2} textAlign="center">
                      <p>Placeholder xs=4</p>
                  </Box>
                  </Paper>
              </Grid> */}
					<Grid item xs={12}>
						<Paper>
							<PreviousCalcTable
								previousCalcValues={previousCalcValues}
								setPreviousCalcValues={setPreviousCalcValues}
							/>
						</Paper>
					</Grid>
				</Grid>
			</div>
		</>
	);
};

export default SingleValuePage;
