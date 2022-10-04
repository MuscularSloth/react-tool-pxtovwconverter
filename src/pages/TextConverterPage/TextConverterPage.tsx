import React, { useState } from 'react';
import { Button, Box, Grid, Input, Paper, Typography } from '@mui/material';
import AutorenewIcon from '@mui/icons-material/Autorenew';
import ClearIcon from '@mui/icons-material/Clear';
import WidthPresetsBlock from '../../components/WidthPresets/WidthPresetsBlock';
import InputSlider from '../../components/InputSlider/InputSlider';
import DragDropTextArea from '../../components/DragDropTextArea/DragDropTextArea';
import NavigationBar from '../../components/NavigationBar/NavigationBar';
import './TextConverterPage.css';
import {
	REGEX_IS_CSS_RULE,
	REGEX_IS_EMPTY_SELECTOR,
	REGEX_IS_PX_VALUE,
	REGEX_IS_EXACTLY_RULE_FN,
} from '../../constants/regex';
import { clearCSSRulesWithoutVW } from '../../helpers/cssHelpersFunctions';
import { IConvertationOptions } from './IConvertationOptions';
import CheckBoxOption from '../../components/CheckBoxOption/CheckBoxOption';
import DropdownItemsTextListWithControls from '../../components/DropdownItemsTextListWithControls/DropdownItemsTextListWithControls';
import TextAreaWithCopyButton from '../../components/TextAreaWithCopyButton/TextAreaWithCopyButton';

const TextConverterPage = () => {
	const presetedWidth = [1920, 2160, 1440, 1280];
	const [selectedWidth, setSelectedWidth] = useState<number>(1920);
	const [customPresetedWidth, setCustomPresetedWidth] = useState<number[]>([
		720,
	]);
	const [textToConvert, setTextToConvert] = useState<string>('');
	const [textConverted, setTextConverted] = useState<string>('');

	const initialConvertationOptions: IConvertationOptions = {
		removeRowsWithoutVw: true,
		removeEmptySelectors: true,
		dontCalculateLessThanState: false,
		dontCalculateLessThanValue: 5,
		excludeRulesEnabled: true,
		excludeRulesArray: ['border', 'box-shadow', 'outline'],
	};
	const [convertationOptions, setConvertationOptions] =
		useState<IConvertationOptions>(initialConvertationOptions);

	const handlePresetClick = (e: React.MouseEvent) => {
		const targetEl = e.target as HTMLElement;
		const newSelectedWidth = +targetEl.innerText;
		if (newSelectedWidth > 1 && newSelectedWidth <= 2160) {
			setSelectedWidth(newSelectedWidth);
		}
	};

	const handlePresetDelete = (customWidthToDelete: number) => {
		setCustomPresetedWidth((prevCustomPresetedWidth) =>
			prevCustomPresetedWidth.filter((width) => width !== customWidthToDelete),
		);
	};

	const replacePXToVW = (match: string, value: number): string => {
		if (
			convertationOptions.dontCalculateLessThanState &&
			value <= convertationOptions.dontCalculateLessThanValue
		) {
			return match;
		}
		return `${((value / selectedWidth) * 100).toFixed(3)}vw`;
	};

	const handleConvertClick = () => {
		let convertedText = textToConvert;

		if (
			convertationOptions.excludeRulesEnabled &&
			convertationOptions.excludeRulesArray.length > 0
		) {
			convertationOptions.excludeRulesArray.forEach((excludedRule) => {
				convertedText = convertedText.replace(
					REGEX_IS_EXACTLY_RULE_FN(excludedRule),
					'',
				);
			});
		}

		convertedText = convertedText.replace(REGEX_IS_PX_VALUE, replacePXToVW);

		if (convertationOptions.removeRowsWithoutVw) {
			convertedText = convertedText.replace(
				REGEX_IS_CSS_RULE,
				clearCSSRulesWithoutVW,
			);
		}

		if (convertationOptions.removeEmptySelectors) {
			do {
				convertedText = convertedText.replace(
					REGEX_IS_EMPTY_SELECTOR,
					clearCSSRulesWithoutVW,
				);
			} while (REGEX_IS_EMPTY_SELECTOR.test(convertedText));
		}

		const rowsSplitted = convertedText.split(/\r?\n/);
		const emptyRowsCleared = rowsSplitted.filter((row) => row !== '');
		convertedText = emptyRowsCleared.join('\n');
		setTextConverted(convertedText);
	};

	const handleClearAllClick = () => {
		setTextToConvert('');
		setTextConverted('');
	};

	return (
		<>
			<NavigationBar title="PX to VW Convert Text" />
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
							<Box p={2}>
								<Typography gutterBottom>Options</Typography>
								<CheckBoxOption
									label="Don't convert values less (or equal) than"
									state={convertationOptions.dontCalculateLessThanState}
									setStateFn={() =>
										setConvertationOptions({
											...convertationOptions,
											dontCalculateLessThanState:
												!convertationOptions.dontCalculateLessThanState,
										})
									}
								>
									<Input
										style={{ width: '35px', marginRight: '5px' }}
										value={convertationOptions.dontCalculateLessThanValue}
										size="small"
										onChange={(e) =>
											setConvertationOptions({
												...convertationOptions,
												dontCalculateLessThanValue: +e.target.value,
											})
										}
										inputProps={{
											step: 1,
											min: 1,
											max: 2160,
											type: 'number',
											'aria-labelledby': 'input-slider',
										}}
									/>
									px
								</CheckBoxOption>
								<CheckBoxOption
									label="Remove rows without px"
									state={convertationOptions.removeRowsWithoutVw}
									setStateFn={() =>
										setConvertationOptions({
											...convertationOptions,
											removeRowsWithoutVw: !convertationOptions.removeRowsWithoutVw,
										})
									}
								/>
								<CheckBoxOption
									label="Remove Empty Selectors"
									state={convertationOptions.removeEmptySelectors}
									setStateFn={() =>
										setConvertationOptions({
											...convertationOptions,
											removeEmptySelectors: !convertationOptions.removeEmptySelectors,
										})
									}
								/>
								<CheckBoxOption
									label="Remove Rules From The List:"
									state={convertationOptions.excludeRulesEnabled}
									setStateFn={() =>
										setConvertationOptions({
											...convertationOptions,
											excludeRulesEnabled: !convertationOptions.excludeRulesEnabled,
										})
									}
								>
									<DropdownItemsTextListWithControls
										itemsArray={convertationOptions.excludeRulesArray}
										saveDataFn={(newExcludedRulesArray) => {
											setConvertationOptions({
												...convertationOptions,
												excludeRulesArray: [...newExcludedRulesArray],
											});
										}}
									/>
								</CheckBoxOption>
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
						</Paper>
					</Grid>
				</Grid>

				<Grid
					container
					direction="row"
					justifyContent="center"
					alignItems="stretch"
					mt={2}
				>
					<Grid item xs={12} md={5}>
						<Paper>
							<DragDropTextArea
								text={textToConvert}
								setText={setTextToConvert}
								placeholder="Enter text to convert or drop single file here..."
							/>
						</Paper>
					</Grid>
					<Grid
						container
						item
						xs={12}
						md={2}
						direction="column"
						justifyContent="center"
					>
						<Paper
							style={{
								height: '100%',
								display: 'flex',
								flexDirection: 'column',
								justifyContent: 'center',
								alignItems: 'center',
							}}
						>
							<Button
								onClick={handleConvertClick}
								startIcon={<AutorenewIcon />}
								disabled={!textToConvert}
							>
								Convert
							</Button>

							<Button
								onClick={handleClearAllClick}
								startIcon={<ClearIcon />}
								color="warning"
								disabled={!textToConvert}
							>
								Clear All
							</Button>
						</Paper>
					</Grid>
					<Grid item xs={12} md={5}>
						<Paper>
							<TextAreaWithCopyButton content={textConverted} rows={30} />
						</Paper>
					</Grid>
				</Grid>
			</div>
		</>
	);
};

export default TextConverterPage;
