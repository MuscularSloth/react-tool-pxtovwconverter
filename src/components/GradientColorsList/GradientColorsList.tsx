import { IconButton, Box, TextField, Tooltip, Grid } from "@mui/material";
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

		const prevItem = gradientColorsSet[source.index];
		const destinationItem = gradientColorsSet[destination.index];
		const prevItemStopValue = prevItem.stop;
		const destinationItemStopValue = destinationItem.stop;

		console.log("prevItem >>> ", prevItem);
		// console.log("destinationItem >>> ", destinationItem);

		prevItem.stop = destinationItemStopValue;
		destinationItem.stop = prevItemStopValue;

		const newArray = [...gradientColorsSet];

		newArray[destination.index].stop = prevItemStopValue;

		newArray.splice(source.index, 1);
		newArray.splice(destination.index, 0, prevItem);

		setGradientColorsSet(newArray);
	};

	const handleRemoveColorClick = (colorToRemove: number) => {
		const newArray = [...gradientColorsSet];
		newArray.splice(colorToRemove, 1);
		setGradientColorsSet(newArray);
	};

	return (
		<div>
			{gradientColorsSet && (
				<DragDropContext onDragEnd={onDragEnd}>
					<Droppable droppableId="gradientColorsTableID">
						{(provided) => (
							<Ref innerRef={provided.innerRef}>
								<Grid {...provided.droppableProps}>
									{gradientColorsSet.map((item, idx) => (
										<Draggable
											draggableId={"idDraggable-" + idx}
											index={idx}
											key={idx}
										>
											{(provided) => (
												<Ref innerRef={provided.innerRef}>
													<Grid
														sx={{
															display: "flex",
															"&:last-child td, &:last-child th": {
																border: 0,
															},
														}}
														{...provided.draggableProps}
														{...provided.dragHandleProps}
													>
														<Box
															style={{
																width: "40px",
																backgroundColor: "white",
																padding: "10px 0",
															}}
														>
															<IconButton aria-label="delete" color="info">
																<DragIndicatorIcon fontSize="small" />
															</IconButton>
														</Box>
														<Box
															style={{
																width: "auto",
																backgroundColor: "white",
																padding: "10px 0",
															}}
														>
															<div className="GradientGeneratorPage__color-block">
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
																		handleChangeStopPoint(idx, +e.target.value)
																	}
																	onBlur={(e) =>
																		handleChangeStopPoint(idx, +e.target.value)
																	}
																/>
															</div>
														</Box>

														<Box
															style={{
																width: "40px",
																backgroundColor: "white",
																padding: "10px 0",
															}}
														>
															<Tooltip
																style={{ cursor: "pointer" }}
																title="Click To Remove"
																onClick={() => handleRemoveColorClick(idx)}
															>
																<IconButton aria-label="delete" color="error">
																	<ClearIcon fontSize="small" />
																</IconButton>
															</Tooltip>
														</Box>
													</Grid>
												</Ref>
											)}
										</Draggable>
									))}
									{provided.placeholder}
								</Grid>
							</Ref>
						)}
					</Droppable>
				</DragDropContext>
			)}
		</div>
	);
}

export default GradientColorsList;
