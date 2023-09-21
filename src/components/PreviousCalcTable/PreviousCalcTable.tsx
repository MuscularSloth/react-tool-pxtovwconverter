import React, { Dispatch, SetStateAction } from 'react';
import {
	IconButton,
	Paper,
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
	Tooltip,
	Box,
} from '@mui/material';
import ClearIcon from '@mui/icons-material/Clear';
import DragIndicatorIcon from '@mui/icons-material/DragIndicator';
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';
import { Ref } from 'semantic-ui-react';
import ResultCopyButton from '../ResultCopyButton/ResultCopyButton';
import { PreviousCalcValuesType } from '../../pages/SingleValuePage/SingleValuePage';

interface propsTypes {
	previousCalcValues: PreviousCalcValuesType[];
	setPreviousCalcValues: Dispatch<SetStateAction<PreviousCalcValuesType[] | []>>;
}

const PreviousCalcTable = ({
	previousCalcValues,
	setPreviousCalcValues,
}: propsTypes) => {
	const handleRemoveResultClick = (resultToRemove: any) => {
		setPreviousCalcValues((oldPreviousCalcValues) =>
			oldPreviousCalcValues.filter(
				(value) =>
					!(
						value.selectedWidth === resultToRemove.selectedWidth &&
						value.calculatedValue === resultToRemove.calculatedValue
					),
			),
		);
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

		const prevItem = previousCalcValues[source.index];
		const newArray = [...previousCalcValues];
		newArray.splice(source.index, 1);
		newArray.splice(destination.index, 0, prevItem);

		setPreviousCalcValues(newArray);
	};

	return previousCalcValues.length > 0 ? (
		<TableContainer component={Paper}>
			<Table aria-label="simple table">
				<TableHead>
					<TableRow>
						<TableCell
							sx={{ width: '30px', display: { xs: 'none', lg: 'block' } }}
							align="left"
						/>
						<TableCell align="center">Viewport Width</TableCell>
						<TableCell align="center">Calculated Value</TableCell>
						<TableCell align="center">Result</TableCell>
						<TableCell
							sx={{ width: '30px', display: { xs: 'none', sm: 'block' } }}
							align="right"
						/>
					</TableRow>
				</TableHead>
				<DragDropContext onDragEnd={onDragEnd}>
					<Droppable droppableId="prevResultsTableID">
						{(provided) => (
							<Ref innerRef={provided.innerRef}>
								<TableBody {...provided.droppableProps}>
									{previousCalcValues.map((row, idx) => (
										// eslint-disable-next-line react/no-array-index-key
										<Draggable draggableId={`idDraggable-${idx}`} index={idx} key={idx}>
											{(childProvided) => (
												<Ref innerRef={childProvided.innerRef}>
													<TableRow
														sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
														{...childProvided.draggableProps}
														{...childProvided.dragHandleProps}
													>
														<TableCell
															sx={{
																width: '30px',
																display: { xs: 'none', md: 'block' },
																backgroundColor: 'white',
															}}
															align="center"
														>
															<IconButton aria-label="delete" color="info">
																<DragIndicatorIcon fontSize="small" />
															</IconButton>
														</TableCell>
														<TableCell
															style={{ width: '25%', backgroundColor: 'white' }}
															align="center"
														>
															{row.selectedWidth}
														</TableCell>
														<TableCell
															style={{ width: '25%', backgroundColor: 'white' }}
															align="center"
														>
															{row.calculatedValue}
														</TableCell>
														<TableCell
															style={{ width: 'auto', backgroundColor: 'white' }}
															align="center"
														>
															<ResultCopyButton value={row.result} />
														</TableCell>
														<TableCell
															sx={{
																width: '30px',
																display: { xs: 'none', sm: 'block' },
																backgroundColor: 'white',
															}}
															align="center"
														>
															<Tooltip
																style={{ cursor: 'pointer' }}
																title="Click To Remove"
																onClick={() => handleRemoveResultClick(row)}
															>
																<IconButton aria-label="delete" color="error">
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
	);
};

export default PreviousCalcTable;
