import {
	IconButton,
	Box,
	TextField,
	Tooltip,
	Grid,
	Typography,
} from '@mui/material';
import { DragDropContext, Draggable, Droppable } from '@hello-pangea/dnd';
import { Ref } from 'semantic-ui-react';
import ClearIcon from '@mui/icons-material/Clear';
import ColorPickerWithInput from '../../components/ColorPickerWithInput/ColorPickerWithInput';
import { gradientColorsListTypes } from '../../pages/GradientGeneratorPage/GradientGeneratorPage';

interface propsTypes {
	gradientColorsSet: gradientColorsListTypes[];
	setGradientColorsSet: Function;
}

const GradientColorsList = ({
	gradientColorsSet,
	setGradientColorsSet,
}: propsTypes) => {
	const handleChangeColor = (
		newColor: string,
		idx: number,
		colorPickerState: boolean,
	) => {
		const newArrayValue = {
			...gradientColorsSet[idx],
			color: newColor,
			isColorPickerOpened: colorPickerState,
		};
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
		const { destination, source } = result;

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
		const prevItemStopValue = prevItem.stop;

		// prevItem.stop = destinationItemStopValue;
		// destinationItem.stop = prevItemStopValue;

		const newArray = [...gradientColorsSet];

		// newArray[destination.index].stop = prevItemStopValue;

		newArray.splice(source.index, 1);
		newArray.splice(destination.index, 0, prevItem);

		const newIdx = destination.index;
		const lastIdx = source.index;

		if (lastIdx > newIdx) {
			for (let i = newIdx; i < lastIdx; i += 1) {
				newArray[i].stop = newArray[i + 1].stop;
			}
			newArray[lastIdx].stop = prevItemStopValue;
		} else {
			for (let i = newIdx; i > lastIdx; i -= 1) {
				newArray[i].stop = newArray[i - 1].stop;
			}
			newArray[lastIdx].stop = prevItemStopValue;
		}

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
				<>
					<Typography variant="caption" display="block" gutterBottom>
						You can drag&drop color position
					</Typography>
					<DragDropContext onDragEnd={onDragEnd}>
						<Droppable droppableId="gradientColorsTableID">
							{(provided) => (
								<Ref innerRef={provided.innerRef}>
									<Grid {...provided.droppableProps}>
										{gradientColorsSet.map((item, idx) => (
											<Draggable
												draggableId={`idDraggable-${idx}`}
												index={idx}
												// eslint-disable-next-line react/no-array-index-key
												key={idx}
												isDragDisabled={item.isColorPickerOpened}
											>
												{(childProvided) => (
													<Ref innerRef={childProvided.innerRef}>
														<Grid
															sx={{
																display: 'flex',
																'&:last-child td, &:last-child th': {
																	border: 0,
																},
															}}
															{...childProvided.draggableProps}
															{...childProvided.dragHandleProps}
														>
															<Box
																style={{
																	width: 'auto',
																	backgroundColor: 'white',
																	padding: '10px 0',
																}}
															>
																<div className="GradientGeneratorPage__color-block">
																	<ColorPickerWithInput
																		color={item.color}
																		isColorPickerOpened={item.isColorPickerOpened}
																		setColor={(val: string, colorPickerState: boolean) =>
																			handleChangeColor(val, idx, colorPickerState)
																		}
																		title={`${idx} color`}
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
																			type: 'number',
																		}}
																		onChange={(e) => handleChangeStopPoint(idx, +e.target.value)}
																		onBlur={(e) => handleChangeStopPoint(idx, +e.target.value)}
																	/>
																</div>
															</Box>

															<Box
																style={{
																	width: '40px',
																	backgroundColor: 'white',
																	padding: '10px 0',
																}}
															>
																<Tooltip
																	style={{ cursor: 'pointer' }}
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
				</>
			)}
		</div>
	);
};

export default GradientColorsList;
