//Vendor
import React from 'react';
import {Button, Tooltip, Typography} from '@mui/material';
import {toast} from 'react-toastify';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';

interface propsTypes {
  value: number | null | undefined;
}

const ResultCopyButton = ({value}: propsTypes) => {
  const handleCopyResultClick = async () => {
    try {
      await navigator.clipboard.writeText(`${value}vw`);
      toast.success(`Result has been copied! - ${value}vw`);
    } catch (error) {
      toast.error(`Error writing to clipboard`);
      console.error('Error writing to clipboard:', error);
    }
  };

  return (
    <>
      <Tooltip
        style={{cursor: 'pointer'}}
        title="Click To Copy"
        onClick={handleCopyResultClick}
      >
        <Button
          style={{textTransform: 'none'}}
          size="small"
          endIcon={<ContentCopyIcon />}
        >
          <Typography>{value}vw</Typography>
        </Button>
      </Tooltip>
    </>
  );
};

export default ResultCopyButton;
