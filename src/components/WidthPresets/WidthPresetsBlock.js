import { Box, Chip, Tooltip, Typography } from '@mui/material'
import React from 'react'
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';

export default function WidthPresetsBlock({title, hintText, widthList, canDelete, handlePresetClick, handlePresetDelete}) {
    return (
        <>
            <Typography gutterBottom>
                {title}
                <Tooltip style={{cursor: 'pointer', marginLeft: '5px' }} title={hintText}>
                  <HelpOutlineIcon fontSize='12px' color="disabled" />
                </Tooltip>
            </Typography>
            <Box>
              {widthList.length > 0 && widthList.map(width => (
                <Chip 
                    style={{marginRight: 10, marginBottom: 10 }} 
                    key={width} label={width} 
                    onClick={handlePresetClick}
                    onDelete={canDelete ? () => handlePresetDelete(width) : undefined}
                    />
              ))}
            </Box>
        </>
    )
}
