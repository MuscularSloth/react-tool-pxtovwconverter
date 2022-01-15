import { IconButton, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Tooltip } from '@mui/material'
import React from 'react'
import ResultCopyButton from '../ResultCopyButton/ResultCopyButton'
import ClearIcon from '@mui/icons-material/Clear';
import DragIndicatorIcon from '@mui/icons-material/DragIndicator';
import { Box } from '@mui/system';

export default function PreviousCalcTable({ previousCalcValues, setPreviousCalcValues }) {

    const handleRemoveResultClick = (resultToRemove) =>{
        setPreviousCalcValues((previousCalcValues) => previousCalcValues.filter(value => !(value.selectedWidth === resultToRemove.selectedWidth && value.calculatedValue === resultToRemove.calculatedValue)))
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
                    <TableBody>
                    {previousCalcValues.map((row) => (
                        <TableRow
                        key={row.name}
                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                            <TableCell align="center">
                                <IconButton aria-label="delete" color="info">
                                    <DragIndicatorIcon fontSize='small'/>
                                </IconButton>
                            </TableCell>
                            <TableCell align="center">{row.selectedWidth}</TableCell>
                            <TableCell align="center">{row.calculatedValue}</TableCell>
                            <TableCell align="center">
                                <ResultCopyButton value={row.result} />
                            </TableCell>
                            <TableCell align="center">
                                <Tooltip style={{cursor: 'pointer' }} title="Click To Remove" onClick={()=>handleRemoveResultClick(row)}>
                                    <IconButton aria-label="delete" color="error">
                                        <ClearIcon fontSize='small'/>
                                    </IconButton>
                                </Tooltip>
                            </TableCell>
                        </TableRow>
                    ))}
                    </TableBody>
                </Table>
                </TableContainer>

                :

                <Box p={2} textAlign="center"><p>No calculated results yet</p></Box>
                }
        </>
    )
}
