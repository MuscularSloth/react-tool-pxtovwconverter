import React, {Dispatch, SetStateAction} from 'react';
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
import {DragDropContext, Droppable, Draggable} from '@hello-pangea/dnd';
import {Ref} from 'semantic-ui-react';
import ResultCopyButton from '../ResultCopyButton/ResultCopyButton';
import {PreviousCalcValuesType} from '../../pages/SingleValuePage/SingleValuePage';

interface propsTypes {
  previousCalcValues: PreviousCalcValuesType[];
  setPreviousCalcValues: Dispatch<SetStateAction<PreviousCalcValuesType[] | []>>;
}

const PreviousCalcTable = ({previousCalcValues, setPreviousCalcValues}: propsTypes) => {
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
    const {destination, source} = result;

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

  const getItemStyle = (isDragging: boolean, draggableStyle: any) => ({
    // styles we need to apply on draggables
    ...draggableStyle,

    ...(isDragging && {
      background: 'rgb(235,235,235)',
    }),
  });

  // eslint-disable-next-line react/display-name
  const DraggableComponent = (id: string, index: number) => (props: any) => {
    return (
      <Draggable draggableId={id} index={index}>
        {(provided, snapshot) => (
          <TableRow
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            style={{
              ...getItemStyle(snapshot.isDragging, provided.draggableProps.style),
              // width: '100%',
              ...(snapshot.isDragging ? {display: 'table'} : {}),
            }}
            {...props}
          >
            {props.children}
          </TableRow>
        )}
      </Draggable>
    );
  };

  const DroppableComponent =
    // eslint-disable-next-line react/display-name
    (onDragEnd: (result: any, provided: any) => void) => (props: any) => {
      return (
        <DragDropContext onDragEnd={onDragEnd}>
          <Droppable droppableId={'1'} direction="vertical">
            {(provided) => {
              return (
                <TableBody
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                  {...props}
                >
                  {props.children}
                  {provided.placeholder}
                </TableBody>
              );
            }}
          </Droppable>
        </DragDropContext>
      );
    };

  return previousCalcValues.length > 0 ? (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell
              sx={{width: '30px', display: {xs: 'none', md: 'table-cell'}}}
              align="left"
            />
            <TableCell align="center">Viewport Width</TableCell>
            <TableCell align="center">Calculated Value</TableCell>
            <TableCell align="center">Result</TableCell>
            <TableCell
              sx={{
                width: '30px',
                height: '100%',
                display: {xs: 'none', sm: 'table-cell'},
              }}
              align="right"
            />
          </TableRow>
        </TableHead>

        <TableBody component={DroppableComponent(onDragEnd)}>
          {previousCalcValues.map((row, idx) => (
            <TableRow
              key={idx}
              sx={{
                width: '100%',
                '&:last-child td, &:last-child th': {border: 0},
              }}
              component={DraggableComponent(`idDraggable-${idx}`, idx)}
            >
              <TableCell
                sx={{
                  width: '30px',
                  display: {xs: 'none', md: 'table-cell'},
                  backgroundColor: 'white',
                }}
                align="center"
              >
                <IconButton aria-label="delete" color="info">
                  <DragIndicatorIcon fontSize="small" />
                </IconButton>
              </TableCell>
              <TableCell style={{width: '25%', backgroundColor: 'white'}} align="center">
                {row.selectedWidth}
              </TableCell>
              <TableCell style={{width: '25%', backgroundColor: 'white'}} align="center">
                {row.calculatedValue}
              </TableCell>
              <TableCell style={{width: 'auto', backgroundColor: 'white'}} align="center">
                <ResultCopyButton value={row.result} />
              </TableCell>
              <TableCell
                sx={{
                  width: '30px',
                  display: {xs: 'none', sm: 'table-cell'},
                  backgroundColor: 'white',
                }}
                align="center"
              >
                <Tooltip
                  style={{cursor: 'pointer'}}
                  title="Click To Remove"
                  onClick={() => handleRemoveResultClick(row)}
                >
                  <IconButton aria-label="delete" color="error">
                    <ClearIcon fontSize="small" />
                  </IconButton>
                </Tooltip>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  ) : (
    <Box p={2} textAlign="center">
      <p>No calculated results yet</p>
    </Box>
  );
};

export default PreviousCalcTable;
