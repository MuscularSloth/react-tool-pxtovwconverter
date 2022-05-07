import { IconButton, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Tooltip } from '@mui/material'
import React from 'react'
import ResultCopyButton from '../ResultCopyButton/ResultCopyButton'
import ClearIcon from '@mui/icons-material/Clear';
import DragIndicatorIcon from '@mui/icons-material/DragIndicator';
import { Box } from '@mui/system';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { Ref } from 'semantic-ui-react';

export default function PreviousCalcTable({ previousCalcValues, setPreviousCalcValues }) {

    const handleRemoveResultClick = (resultToRemove) =>{
        setPreviousCalcValues((previousCalcValues) => previousCalcValues.filter(value => !(value.selectedWidth === resultToRemove.selectedWidth && value.calculatedValue === resultToRemove.calculatedValue)))
    }

    const onDragEnd = result =>{
        const {destination, source, draggableId} = result;


        if(!destination){
            return;
        }

        if(destination.droppableId === source.droppableId && destination.index === source.index){
            return
        }

        const prevItem = previousCalcValues[source.index];
        const newArray = [...previousCalcValues];
        newArray.splice(source.index, 1);
        newArray.splice(destination.index, 0, prevItem)

        setPreviousCalcValues(newArray);
        

    }

    return (
        <>
            {previousCalcValues.length > 0 
                ? 
            
                <TableContainer component={Paper}>
                    <Table aria-label="simple table">
                        <TableHead>
                        <TableRow>
                            <TableCell style={{width: '30px'}} align="left"></TableCell>
                            <TableCell align="center">Viewport Width</TableCell>
                            <TableCell align="center">Calculated Value</TableCell>
                            <TableCell align="center">Result</TableCell>
                            <TableCell style={{width: '30px'}} align="right"></TableCell>
                        </TableRow>
                        </TableHead>
                        <DragDropContext onDragEnd={onDragEnd}>
                            <Droppable droppableId='prevResultsTableID'>
                                {(provided)=>(
                                    <Ref innerRef={provided.innerRef}>
                                        <TableBody
                                            {...provided.droppableProps}
                                        >
                                            {previousCalcValues.map((row, idx) => (
                                                <Draggable
                                                    draggableId={'idDraggable-'+idx}
                                                    index={idx}
                                                    key={idx}
                                                >
                                                    {(provided)=>(
                                                        <Ref innerRef={provided.innerRef}>
                                                            <TableRow
                                                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                                                {...provided.draggableProps}
                                                                {...provided.dragHandleProps}
                                                            >
                                                                <TableCell style={{width: '30px', backgroundColor: 'white'}} align="center">
                                                                    <IconButton aria-label="delete" color="info">
                                                                        <DragIndicatorIcon fontSize='small'/>
                                                                    </IconButton>
                                                                </TableCell>
                                                                <TableCell style={{width: '50%', backgroundColor: 'white'}} align="center">{row.selectedWidth}</TableCell>
                                                                <TableCell style={{width: '30%', backgroundColor: 'white'}} align="center">{row.calculatedValue}</TableCell>
                                                                <TableCell style={{width: 'auto', backgroundColor: 'white'}} align="center">
                                                                    <ResultCopyButton value={row.result} />
                                                                </TableCell>
                                                                <TableCell style={{width: '30px', backgroundColor: 'white'}} align="center">
                                                                    <Tooltip style={{cursor: 'pointer' }} title="Click To Remove" onClick={()=>handleRemoveResultClick(row)}>
                                                                        <IconButton aria-label="delete" color="error">
                                                                            <ClearIcon fontSize='small'/>
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
                 

                :

                <Box p={2} textAlign="center"><p>No calculated results yet</p></Box>
                }
        </>
    )
}
