import React, { useState } from "react";
import {
	Button,
	Checkbox,
	FormControlLabel,
	Grid,
	Input,
	Paper,
	Snackbar,
	TextField,
	Tooltip,
	Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import InputSlider from "../../components/InputSlider/InputSlider";
import WidthPresetsBlock from "../../components/WidthPresets/WidthPresetsBlock";
import AutorenewIcon from "@mui/icons-material/Autorenew";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import ClearIcon from "@mui/icons-material/Clear";
import DragDropTextArea from "../../components/DragDropTextArea/DragDropTextArea";
import NavigationBar from "../../components/NavigationBar/NavigationBar";
import "./TextConverterPage.css";

export default function TextConverterPage() {
	const regexRule = /([0-9]+)px/g;

	const [selectedWidth, setSelectedWidth] = useState<number>(1920);
	const [presetedWidth, setPresetedWidth] = useState<number[]>([
		1920, 2160, 1440, 1280,
	]);
	const [customPresetedWidth, setCustomPresetedWidth] = useState<number[]>([
		720,
	]);
	const [textToConvert, setTextToConvert] = useState<string>("");
	const [textConverted, setTextConverted] = useState<string>("");
	const [isNotificationOpen, setIsNotificationOpen] = useState<boolean>(false);
	const [dontCalculateLessThan, setDontCalculateLessThan] =
		useState<boolean>(false);
	const [dontCalculateValue, setDontCalculateValue] = useState<number>(5);

	const handlePresetClick = (e: React.MouseEvent) => {
		const targetEl = e.target as HTMLElement;
		const selectedWidth = +targetEl.innerText;
		if (selectedWidth > 1 && selectedWidth <= 2160) {
			setSelectedWidth(selectedWidth);
		}
	};

	const handlePresetDelete = (customWidthToDelete: number) => {
		setCustomPresetedWidth((customPresetedWidth) =>
			customPresetedWidth.filter((width) => width !== customWidthToDelete)
		);
	};

	const replaceFunction = (match: string, value: number): string => {
		if (dontCalculateLessThan && value <= dontCalculateValue) {
			return match;
		}
		return ((value / selectedWidth) * 100).toFixed(3) + "vw";
	};

	const hanldeConvertClick = () => {
		let convertedText = textToConvert.replace(regexRule, replaceFunction);
		setTextConverted(convertedText);
	};

	const handleCopyResultClick = () => {
		navigator.clipboard.writeText(textConverted);
		setIsNotificationOpen(true);
	};

	const hanldeClearAllClick = () => {
		setTextToConvert("");
		setTextConverted("");
	};

	return (
		<>
			<NavigationBar title="PX to VW Convert Text" />
			<div>
				<Grid container direction="row" justifyContent="center">
					<Grid item xs={7}>
						<Paper>
							<Box p={2}>
								<InputSlider
									selectedWidth={selectedWidth}
									setSelectedWidth={setSelectedWidth}
								/>
							</Box>
							<Box p={2}>
								<Typography gutterBottom>Options</Typography>
								<Box>
									<FormControlLabel
										value="end"
										control={
											<Checkbox size="small" checked={dontCalculateLessThan} />
										}
										label="Don't convert values less (or equal) than"
										labelPlacement="end"
										onChange={() =>
											setDontCalculateLessThan(!dontCalculateLessThan)
										}
									/>
									<Input
										style={{ width: "35px", marginRight: "5px" }}
										value={dontCalculateValue}
										size="small"
										onChange={(e) => setDontCalculateValue(+e.target.value)}
										inputProps={{
											step: 1,
											min: 1,
											max: 2160,
											type: "number",
											"aria-labelledby": "input-slider",
										}}
									/>
									px
								</Box>
							</Box>
						</Paper>
					</Grid>
					<Grid item xs={5}>
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
									canDelete={true}
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
					<Grid item xs={5}>
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
						xs={2}
						direction="column"
						justifyContent="center"
					>
						<Paper
							style={{
								height: "100%",
								display: "flex",
								flexDirection: "column",
								justifyContent: "center",
								alignItems: "center",
							}}
						>
							<Button
								onClick={hanldeConvertClick}
								startIcon={<AutorenewIcon />}
								disabled={!textToConvert}
							>
								Convert
							</Button>

							<Button
								onClick={hanldeClearAllClick}
								startIcon={<ClearIcon />}
								color="warning"
								disabled={!textToConvert}
							>
								Clear All
							</Button>
						</Paper>
					</Grid>
					<Grid item xs={5}>
						<Paper>
							<Box p={1} className="TextConverterPage__result-container">
								<TextField
									InputProps={{
										style: { fontSize: "12px" },
										readOnly: true,
									}}
									multiline
									rows={30}
									fullWidth
									value={textConverted}
								/>
								{textConverted && (
									<>
										<Tooltip
											style={{ cursor: "pointer" }}
											title="Click To Copy"
											onClick={handleCopyResultClick}
										>
											<Button className="TextConverterPage__copy-result-button">
												<ContentCopyIcon />
											</Button>
										</Tooltip>
										<Snackbar
											autoHideDuration={2000}
											anchorOrigin={{ vertical: "top", horizontal: "center" }}
											open={isNotificationOpen}
											onClose={() => setIsNotificationOpen(false)}
											message={`Result has been copied!`}
											key="textCopiedNotification"
										/>
									</>
								)}
							</Box>
						</Paper>
					</Grid>
				</Grid>
			</div>
		</>
	);
}
