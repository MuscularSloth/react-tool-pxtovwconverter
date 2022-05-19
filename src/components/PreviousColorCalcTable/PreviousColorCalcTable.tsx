import {
	Box,
	IconButton,
	Paper,
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
	Tooltip,
} from "@mui/material";
import React, { Dispatch, SetStateAction } from "react";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import {
	colorObjectType,
	prevCalculatedColorsType,
} from "../../pages/ColorConvertorPage/ColorConvertorPage";
import { Ref } from "semantic-ui-react";
import ClearIcon from "@mui/icons-material/Clear";
import ResultColorCopyButton from "../ResultColorCopyButton/ResultColorCopyButton";
import CircleIcon from "@mui/icons-material/Circle";
import { HEXToRGBA } from "../../helpers/colorConverter";

interface propsTypes {
	prevCalculatedColors: prevCalculatedColorsType[];
	setPrevCalculatedColors: Dispatch<
		SetStateAction<prevCalculatedColorsType[] | []>
	>;
	setCalculatedColor: Dispatch<SetStateAction<colorObjectType>>;
}

function PreviousColorCalcTable({
	prevCalculatedColors,
	setPrevCalculatedColors,
	setCalculatedColor,
}: propsTypes) {
	const handleRemoveResultClick = (resultToRemove: any) => {
		setPrevCalculatedColors((prevCalculatedColors) =>
			prevCalculatedColors.filter(
				(value) => !(value.calculatedHEX === resultToRemove.calculatedHEX)
			)
		);
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

		const prevItem = prevCalculatedColors[source.index];
		const newArray = [...prevCalculatedColors];
		newArray.splice(source.index, 1);
		newArray.splice(destination.index, 0, prevItem);

		setPrevCalculatedColors(newArray);
	};

	const handleSetColorClick = (hexValue: string) => {
		setCalculatedColor(HEXToRGBA(hexValue));
	};

	return (
		<>
			{prevCalculatedColors.length > 0 ? (
				<TableContainer component={Paper}>
					<Table aria-label="simple table">
						<TableHead>
							<TableRow>
								<TableCell style={{ width: "30px" }} align="left"></TableCell>
								<TableCell align="center">HEX / HEXA</TableCell>
								<TableCell align="center">RGB / RGBA</TableCell>
								<TableCell align="center">HSL / HSV</TableCell>
								<TableCell style={{ width: "30px" }} align="right"></TableCell>
							</TableRow>
						</TableHead>
						<DragDropContext onDragEnd={onDragEnd}>
							<Droppable droppableId="prevResultsTableID">
								{(provided) => (
									<Ref innerRef={provided.innerRef}>
										<TableBody {...provided.droppableProps}>
											{prevCalculatedColors.map((row, idx) => (
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
																		width: "30px",
																		backgroundColor: "white",
																	}}
																	align="center"
																>
																	<IconButton
																		onClick={() =>
																			handleSetColorClick(row.calculatedHEX)
																		}
																		aria-label="set-color"
																		color="info"
																	>
																		<CircleIcon
																			fontSize="small"
																			sx={{ color: row.calculatedHEX }}
																		/>
																	</IconButton>
																</TableCell>
																<TableCell
																	style={{
																		width: "20%",
																		backgroundColor: "white",
																	}}
																	align="center"
																>
																	<ResultColorCopyButton
																		value={row.calculatedHEX}
																	/>
																	<br />
																	<ResultColorCopyButton
																		value={row.calculatedHEXA}
																	/>
																</TableCell>
																<TableCell
																	style={{
																		width: "25%",
																		backgroundColor: "white",
																	}}
																	align="center"
																>
																	<ResultColorCopyButton
																		value={row.calculatedRGB}
																	/>
																	<br />
																	<ResultColorCopyButton
																		value={row.calculatedRGBA}
																	/>
																</TableCell>
																<TableCell
																	style={{
																		width: "30%",
																		backgroundColor: "white",
																	}}
																	align="center"
																>
																	<ResultColorCopyButton
																		value={row.calculatedHSL}
																	/>
																	<br />
																	<ResultColorCopyButton
																		value={row.calculatedHSV}
																	/>
																</TableCell>
																<TableCell
																	style={{
																		width: "30px",
																		backgroundColor: "white",
																	}}
																	align="center"
																>
																	<Tooltip
																		style={{ cursor: "pointer" }}
																		title="Click To Remove"
																		onClick={() => handleRemoveResultClick(row)}
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
											{provided.placeholder}
										</TableBody>
									</Ref>
								)}
							</Droppable>
						</DragDropContext>
					</Table>
				</TableContainer>
			) : (
				<Box p={2} textAlign="center">
					<p>No calculated results yet</p>
				</Box>
			)}
		</>
	);
}

export default PreviousColorCalcTable;
