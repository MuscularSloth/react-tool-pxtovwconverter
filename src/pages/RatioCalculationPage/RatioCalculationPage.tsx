import React, { useState } from 'react';
import {
	Autocomplete,
	Box,
	Button,
	Grid,
	IconButton,
	InputAdornment,
	Paper,
	TextField,
	Tooltip,
} from '@mui/material';
import AutorenewIcon from '@mui/icons-material/Autorenew';
import LockOpenIcon from '@mui/icons-material/LockOpen';
import LockIcon from '@mui/icons-material/Lock';
import NavigationBar from '../../components/NavigationBar/NavigationBar';
import {
	aspectRatioPresetList,
	aspectRatioPresetListType,
} from '../../constants/aspectRatioPresetList';
import getGreatestCommonDivisor from '../../helpers/getGreatestCommonDivisor';
import AspectRatioResultsBlock from '../../components/AspectRatioResultsBlock/AspectRatioResultsBlock';

const RatioCalculationPage = () => {
	const initialRatioPresetState = aspectRatioPresetList.filter(
		(item) => item.id === 1,
	)[0];

	const [aspectRatioPreset, setAspectRatioPreset] =
		useState<aspectRatioPresetListType | null>(initialRatioPresetState);
	const [aspectRatioInputWidth, setAspectRatioInputWidth] =
		useState<string>('0');
	const [aspectRatioInputHeight, setAspectRatioInputHeight] =
		useState<string>('0');
	const [isAspectRatioLocked, setIsAspectRatioLocked] = useState<boolean>(false);
	const [aspectSizeInputWidth, setAspectSizeInputWidth] = useState<string>('0');
	const [aspectSizeInputHeight, setAspectSizeInputHeight] =
		useState<string>('0');
	const [isSizeWithLocked, setIsSizeWithLocked] = useState<boolean>(true);

	const handleNumberChange = (
		value: string,
		setValueFunction: React.Dispatch<React.SetStateAction<string>>,
	) => {
		if (+value >= 0) {
			setValueFunction(value);
		}
	};

	const handleSwapRatioValues = () => {
		const tempVar = aspectRatioInputWidth;
		setAspectRatioInputWidth(aspectRatioInputHeight);
		setAspectRatioInputHeight(tempVar);
	};

	const handleSwapSizeValues = () => {
		const tempVar = aspectSizeInputWidth;
		setAspectSizeInputWidth(aspectSizeInputHeight);
		setAspectSizeInputHeight(tempVar);
	};

	const calculateRatio = () => {
		const sizeWidth = +aspectSizeInputWidth;
		const sizeHeight = +aspectSizeInputHeight;
		if (typeof sizeWidth !== 'number' || typeof sizeHeight !== 'number') return;
		if (Number.isNaN(sizeWidth) || Number.isNaN(sizeHeight)) return;
		if (sizeWidth <= 0 || sizeHeight <= 0) return;

		const gcd = getGreatestCommonDivisor(sizeWidth, sizeHeight);
		if (gcd) {
			setAspectRatioInputWidth(`${sizeWidth / gcd}`);
			setAspectRatioInputHeight(`${sizeHeight / gcd}`);
		}
	};

	const calculateSize = () => {
		console.log('calculate size!');
	};

	return (
		<>
			<NavigationBar title="Ratio Calculator" />
			<div>
				<Grid container direction="row" justifyContent="center" mt={2}>
					<Grid item xs={12} md={8}>
						<Paper style={{ padding: 8 }}>
							<Autocomplete
								id="ratio-presets-grouped"
								options={aspectRatioPresetList}
								groupBy={(option) => option.group}
								value={aspectRatioPreset}
								onChange={(event: any, newValue: aspectRatioPresetListType | null) => {
									setAspectRatioPreset(newValue);
								}}
								getOptionLabel={(option) =>
									option.name +
									(option.widthRatio && option.heightRatio
										? `(${option.widthRatio}:${option.heightRatio})`
										: '')
								}
								sx={{ width: 300 }}
								renderInput={(params) => (
									<TextField {...params} label="Ratio Presets" />
								)}
							/>
						</Paper>
					</Grid>
					<Grid item xs={12} md={4}>
						<Paper style={{ height: '100%' }}>In Development...</Paper>
					</Grid>
				</Grid>
				<Grid container direction="row" justifyContent="center" mt={2}>
					<Grid item xs={12} md={6}>
						<Paper
							style={{
								padding: 8,
								display: 'flex',
								justifyContent: 'space-between',
								gap: 15,
							}}
						>
							<Box
								style={{
									border: '1px solid #ccc',
									borderRadius: 10,
									padding: '15px 8px 8px 8px',
								}}
							>
								<Box
									style={{
										display: 'flex',
										alignItems: 'center',
									}}
								>
									<Box>
										<Box>
											<TextField
												id="size-width"
												label="Size Width"
												type="number"
												size="small"
												InputLabelProps={{
													shrink: true,
												}}
												value={aspectSizeInputWidth}
												onChange={(e) =>
													handleNumberChange(e.target.value, setAspectSizeInputWidth)
												}
												InputProps={{
													endAdornment: (
														<InputAdornment position="end">
															<IconButton
																aria-label="toggle password visibility"
																onClick={() => setIsSizeWithLocked((prevState) => !prevState)}
																// onMouseDown={}
																edge="end"
															>
																{isSizeWithLocked ? <LockIcon /> : <LockOpenIcon />}
															</IconButton>
														</InputAdornment>
													),
												}}
											/>
										</Box>
										<Box>
											<TextField
												style={{ marginTop: 15 }}
												id="size-height"
												label="Size Height"
												type="number"
												size="small"
												InputLabelProps={{
													shrink: true,
												}}
												value={aspectSizeInputHeight}
												onChange={(e) =>
													handleNumberChange(e.target.value, setAspectSizeInputHeight)
												}
												InputProps={{
													endAdornment: (
														<InputAdornment position="end">
															<IconButton
																aria-label="toggle password visibility"
																onClick={() => setIsSizeWithLocked((prevState) => !prevState)}
																// onMouseDown={}
																edge="end"
															>
																{!isSizeWithLocked ? <LockIcon /> : <LockOpenIcon />}
															</IconButton>
														</InputAdornment>
													),
												}}
											/>
										</Box>
									</Box>
									<Box>
										<Tooltip title="Swap Size Values">
											<IconButton onClick={handleSwapSizeValues}>
												<AutorenewIcon />
											</IconButton>
										</Tooltip>
									</Box>
								</Box>
								<Button
									variant="contained"
									style={{ marginTop: 15 }}
									onClick={calculateRatio}
								>
									Calculate Ratio
								</Button>
							</Box>

							<Box
								style={{
									border: '1px solid #ccc',
									borderRadius: 10,
									padding: '15px 8px 8px 8px',
								}}
							>
								<Box
									style={{
										display: 'flex',
										alignItems: 'center',
									}}
								>
									<Box>
										<Tooltip
											title={
												isAspectRatioLocked ? 'Unlock Aspect Ratio' : 'Lock Aspect Ratio'
											}
										>
											<IconButton
												onClick={() => setIsAspectRatioLocked((prevState) => !prevState)}
											>
												{isAspectRatioLocked ? <LockIcon /> : <LockOpenIcon />}
											</IconButton>
										</Tooltip>
									</Box>
									<Box>
										<Box>
											<TextField
												id="ratio-width"
												label="Ratio Width"
												type="number"
												size="small"
												InputLabelProps={{
													shrink: true,
												}}
												value={aspectRatioInputWidth}
												onChange={(e) =>
													handleNumberChange(e.target.value, setAspectRatioInputWidth)
												}
											/>
										</Box>
										<Box>
											<TextField
												style={{ marginTop: 15 }}
												id="ratio-height"
												label="Ratio Height"
												type="number"
												size="small"
												InputLabelProps={{
													shrink: true,
												}}
												value={aspectRatioInputHeight}
												onChange={(e) =>
													handleNumberChange(e.target.value, setAspectRatioInputHeight)
												}
											/>
										</Box>
									</Box>
									<Box>
										<Tooltip title="Swap Ratio Values">
											<IconButton onClick={handleSwapRatioValues}>
												<AutorenewIcon />
											</IconButton>
										</Tooltip>
									</Box>
								</Box>
								<Button
									variant="contained"
									style={{ marginTop: 15 }}
									onClick={calculateSize}
								>
									Calculate Size
								</Button>
							</Box>
						</Paper>
					</Grid>
					<Grid item xs={12} md={6}>
						<Paper style={{ padding: 8 }}>
							<Box>
								{aspectRatioInputWidth && aspectRatioInputHeight && (
									<AspectRatioResultsBlock
										aspectRatioInputWidth={aspectRatioInputWidth}
										aspectRatioInputHeight={aspectRatioInputHeight}
									/>
								)}
							</Box>
						</Paper>
					</Grid>
				</Grid>
			</div>
		</>
	);
};

export default RatioCalculationPage;
