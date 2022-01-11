import { Button, Tooltip, Typography } from '@mui/material'
import React from 'react'
import ContentCopyIcon from '@mui/icons-material/ContentCopy';


export default function ResultCopyButton({value}) {

    
  const handleCopyResultClick = () => {
    navigator.clipboard.writeText(value+'vw')
  }


    return (
            <Tooltip style={{cursor: 'pointer' }} title="Click To Copy" onClick={handleCopyResultClick}>
                <Button style={{textTransform: 'none'}} size='small' endIcon={<ContentCopyIcon />}>
                    <Typography id="current-calculated-value">
                        {value}vw
                    </Typography>
                </Button>
            </Tooltip>
    )
}
