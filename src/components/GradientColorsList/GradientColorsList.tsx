import {
	IconButton,
	Paper,
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
	TextField,
	Tooltip,
} from "@mui/material";
import React from "react";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import { Ref } from "semantic-ui-react";
import ColorPickerWithInput from "../../components/ColorPickerWithInput/ColorPickerWithInput";
import { gradientColorsListTypes } from "../../pages/GradientGeneratorPage/GradientGeneratorPage";
import ClearIcon from "@mui/icons-material/Clear";
import DragIndicatorIcon from "@mui/icons-material/DragIndicator";

interface propsTypes {
	gradientColorsSet: gradientColorsListTypes[];
	setGradientColorsSet: Function;
}

function GradientColorsList({
	gradientColorsSet,
	setGradientColorsSet,
}: propsTypes) {
	const handleChangeColor = (newColor: string, idx: number) => {
		const newArrayValue = { ...gradientColorsSet[idx], color: newColor };
		const newArray = [...gradientColorsSet];
		newArray[idx] = newArrayValue;
		setGradientColorsSet(newArray);
	};

	const handleChangeStopPoint = (idx: number, newStopPoint: number) => {
		const newArrayValue = { ...gradientColorsSet[idx], stop: newStopPoint };
		const newArray = [...gradientColorsSet];
		newArray[idx] = newArrayValue;
		setGradientColorsSet(newArray);
	};

	const onDragEnd = (result: any) => {
		const { destination, source, draggableId } = result;

		if (!destination) {
			return;
		}

		if (
			destination.droppableId === source.droppableId &&
			destination.index === source.index
		) {
			return;
		}

		// const prevItem = previousCalcValues[source.index];
		// const newArray = [...previousCalcValues];
		// newArray.splice(source.index, 1);
		// newArray.splice(destination.index, 0, prevItem)

		//setPreviousCalcValues(newArray);
	};

	const handleRemoveColorClick = (colorToRemove: number) => {
		// setPreviousCalcValues((previousCalcValues) =>
		// 	previousCalcValues.filter(
		// 		(value) =>
		// 			!(
		// 				value.selectedWidth === resultToRemove.selectedWidth &&
		// 				value.calculatedValue === resultToRemove.calculatedValue
		// 			)
		// 	)
		// );
	};

	return (
		<div>
			{gradientColorsSet && (
				<TableContainer component={Paper}>
					<Table aria-label="simple table">
						<TableHead>
							<TableRow>
								<TableCell style={{ width: "30px" }} align="left"></TableCell>
								<TableCell align="center">Color</TableCell>
								<TableCell style={{ width: "30px" }} align="right"></TableCell>
							</TableRow>
						</TableHead>

						<DragDropContext onDragEnd={onDragEnd}>
							<Droppable droppableId="gradientColorsTableID">
								{(provided) => (
									<Ref innerRef={provided.innerRef}>
										<TableBody {...provided.droppableProps}>
											{gradientColorsSet.map((item, idx) => (
												<Draggable
													draggableId={"idDraggable-" + idx}
													index={idx}
													key={idx}
												>
													{(provided) => (
														<Ref innerRef={provided.innerRef}>
															<TableRow
																sx={{
																	"&:last-child td, &:last-child th": {
																		border: 0,
																	},
																}}
																{...provided.draggableProps}
																{...provided.dragHandleProps}
															>
																<TableCell
																	style={{
																		width: "40px",
																		backgroundColor: "white",
																		padding: "10px 0",
																	}}
																	align="center"
																>
																	<IconButton aria-label="delete" color="info">
																		<DragIndicatorIcon fontSize="small" />
																	</IconButton>
																</TableCell>
																<TableCell
																	style={{
																		width: "auto",
																		backgroundColor: "white",
																		padding: "10px 0",
																	}}
																	align="center"
																>
																	<div
																		key={idx}
																		className="GradientGeneratorPage__color-block"
																	>
																		<ColorPickerWithInput
																			color={item.color}
																			setColor={(val: string) =>
																				handleChangeColor(val, idx)
																			}
																			title={idx + " color"}
																		/>
																		<TextField
																			className="GradientGeneratorPage__stop-input"
																			variant="outlined"
																			size="small"
																			value={item.stop}
																			inputProps={{
																				step: 1,
																				min: 0,
																				max: 100,
																				type: "number",
																			}}
																			onChange={(e) =>
																				handleChangeStopPoint(
																					idx,
																					+e.target.value
																				)
																			}
																			onBlur={(e) =>
																				handleChangeStopPoint(
																					idx,
																					+e.target.value
																				)
																			}
																		/>
																	</div>
																</TableCell>

																<TableCell
																	style={{
																		width: "40px",
																		backgroundColor: "white",
																		padding: "10px 0",
																	}}
																	align="center"
																>
																	<Tooltip
																		style={{ cursor: "pointer" }}
																		title="Click To Remove"
																		onClick={() => handleRemoveColorClick(idx)}
																	>
																		<IconButton
																			aria-label="delete"
																			color="error"
																		>
																			<ClearIcon fontSize="small" />
																		</IconButton>
																	</Tooltip>
																</TableCell>
															</TableRow>
														</Ref>
													)}
												</Draggable>
											))}
										</TableBody>
									</Ref>
								)}
							</Droppable>
						</DragDropContext>
					</Table>
				</TableContainer>
			)}
		</div>
	);
}

export default GradientColorsList;
