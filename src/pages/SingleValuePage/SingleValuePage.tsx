//Vendor
import React, { ChangeEvent, HTMLInputTypeAttribute, useState } from 'react';
import { useLocalStorage } from 'usehooks-ts';
import { Box, Button, Checkbox, FormControlLabel, Paper, Snackbar, TextField } from '@mui/material';
import Grid from '@mui/material/Grid';
//Components
import InputSlider from '../../components/InputSlider/InputSlider';
import ResultCopyButton from '../../components/ResultCopyButton/ResultCopyButton';
import WidthPresetsBlock from '../../components/WidthPresets/WidthPresetsBlock';
import PreviousCalcTable from '../../components/PreviousCalcTable/PreviousCalcTable';
import NavigationBar from '../../components/NavigationBar/NavigationBar';
//Constants
import presetViewportWidth from '../../constants/presetedViewportWidth';

export interface PreviousCalcValuesType {
	selectedWidth: number;
	calculatedValue: HTMLInputTypeAttribute;
	result: number;
}

const SingleValuePage = () => {
	const initialCustomPresetWidth: number[] = [720];
	const initialSelectedWidthValue: number = 1920;

	const [selectedWidth, setSelectedWidth] = useLocalStorage<number>('selectedWidth', initialSelectedWidthValue);
	const [customPresetWidth, setCustomPresetWidth] = useLocalStorage<number[]>('customPresetWidth', initialCustomPresetWidth);
	const [isAutoCopyOn, setIsAutoCopyOn] = useLocalStorage<boolean>('isAutoCopyOn', false);
	const [previousCalcValues, setPreviousCalcValues] = useLocalStorage<PreviousCalcValuesType[]>('previousCalcValues', []);

	const [calculatedValue, setCalculatedValue] =
		useState<HTMLInputTypeAttribute>('');

	const [currentResult, setCurrentResult] = useState<number | null>();

	const [isCalculatedValueError, setIsCalculatedValueError] =
		useState<boolean>(false);

	const [presetWidth, setPresetWidth] = useState<number[]>(
		presetViewportWidth,
	);

	const [isNotificationOpen, setIsNotificationOpen] = useState(false);

	const handlePresetClick = (e: React.MouseEvent) => {
		const targetEl = e.target as HTMLElement;
		const newSelectedWidth: number = parseFloat(targetEl.innerText);
		if (newSelectedWidth > 1 && newSelectedWidth <= 2160) {
			setSelectedWidth(newSelectedWidth);
		}
	};

	const handlePresetDelete = (customWidthToDelete: number) => {
		setCustomPresetWidth((prevCustomPresetWidth: number[]) =>
			prevCustomPresetWidth.filter((width) => width !== customWidthToDelete),
		);
	};

	const handleChangeCalculatedValue = (e: ChangeEvent<HTMLInputElement>) => {
		const valueForCheck = parseFloat(e.target.value);
		let newValue: number;

		if (isNaN(valueForCheck)) {
			newValue = 0;
		} else {
			newValue = Math.min(Math.max(valueForCheck, 0), 2160);
		}

		setCalculatedValue(newValue.toString());

		if (isCalculatedValueError) {
			setIsCalculatedValueError(false);
		}
	};

	const handleCalculateClick = async () => {
		const calculatedValueAsFloat = parseFloat(calculatedValue);

		if (calculatedValueAsFloat <= 0 || isNaN(calculatedValueAsFloat)) {
			setCurrentResult(null);
			setIsCalculatedValueError(true);
			return;
		}

		if (
			!presetWidth.includes(selectedWidth) &&
			!customPresetWidth.includes(selectedWidth)
		) {
			setCustomPresetWidth([...customPresetWidth, selectedWidth]);
		}

		const result = ((calculatedValueAsFloat / selectedWidth) * 100).toFixed(3);
		setCurrentResult(+result);

		if (isAutoCopyOn) {
			try {
				await navigator.clipboard.writeText(`${result}vw`);
				setIsNotificationOpen(true);
			} catch (error) {
				console.error('Error writing to clipboard:', error);
			}
		}

		const isNewCalculation = !previousCalcValues.some(
			(valueObject) =>
				valueObject.selectedWidth === selectedWidth &&
				valueObject.calculatedValue === calculatedValue
		);

		if (isNewCalculation) {
			setPreviousCalcValues([
				...previousCalcValues,
				{ selectedWidth, calculatedValue, result: +result },
			]);
		}
	};

	const handleCalculatedValueKeyPress = async (
		e: React.KeyboardEvent<HTMLInputElement>,
	) => {
		if (e.key === 'Enter') {
			await handleCalculateClick();
		}

		/**
			* Listen for Backspace and clear input if it has only one char
			*/
		if (e.key === 'Backspace') {
			if (calculatedValue.length === 1) {
				setCalculatedValue('');
			}
		}
	};

	const handleResetDataClick = () => {
		setPresetWidth(presetViewportWidth);
		setSelectedWidth(initialSelectedWidthValue);
		setCustomPresetWidth(initialCustomPresetWidth);
		setPreviousCalcValues([]);
	};

	return (
		<>
			<NavigationBar title='PX to VW Convert Single Value' />
			<div>
				<Grid container direction='row' justifyContent='center'>
					<Grid item xs={12} md={7}>
						<Paper style={{ height: '100%' }}>
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
									label='Calculated Value'
									type='number'
									size='small'
									InputLabelProps={{
										shrink: true,
									}}
									onKeyDown={handleCalculatedValueKeyPress}
									value={calculatedValue}
									onChange={handleChangeCalculatedValue}
									error={isCalculatedValueError}
								/>
								<Button
									variant='outlined'
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
									value='end'
									control={<Checkbox size='small' checked={isAutoCopyOn} />}
									label='Copy result to the clipboard automatically'
									labelPlacement='end'
									onChange={() => setIsAutoCopyOn(!isAutoCopyOn)}
								/>
								<Snackbar
									autoHideDuration={2000}
									anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
									open={isNotificationOpen}
									onClose={() => setIsNotificationOpen(false)}
									message={`Result has been copied! - ${currentResult}vw`}
									key='autocopynotification'
								/>
							</Box>
						</Paper>
					</Grid>
					<Grid item xs={12} md={5}>
						<Paper style={{ height: '100%' }}>
							<Box p={2}>
								<WidthPresetsBlock
									title='Viewport Width Presets:'
									hintText='Clicking on a preset sets the width value.'
									widthList={presetWidth}
									canDelete={false}
									handlePresetClick={handlePresetClick}
									handlePresetDelete={handlePresetDelete}
								/>

								<WidthPresetsBlock
									title='Custom Viewport Width Presets:'
									hintText='The new value of viewport width will be added automatically on a new calculation if it has not been used previously.'
									widthList={customPresetWidth}
									canDelete
									handlePresetClick={handlePresetClick}
									handlePresetDelete={handlePresetDelete}
								/>
							</Box>
							<Box p={2}>
								<Button
									variant='outlined'
									style={{ marginRight: 15 }}
									onClick={handleResetDataClick}
								>
									Reset Data
								</Button>
							</Box>
						</Paper>
					</Grid>
				</Grid>

				<Grid container direction='row' justifyContent='center' mt={2}>
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
