import React, { useState } from 'react'
import { Box, TextField } from '@mui/material'
import UploadFileIcon from '@mui/icons-material/UploadFile';

import './DragDropTextArea.css'

export default function DragDropTextArea({text, setText, placeholder}) {
    const [isDropAreaActive, setIsDropAreaActive] = useState(false)
    const [isDropError, setIsDropError] = useState(false)

    function filesValidation(files){
        let allowedExtensions = /(\.txt|\.css|\.scss|\.sass)$/i;
        
        for(const file of files){
          if(!allowedExtensions.exec(file.name)){
              alert('Please upload file having extensions .txt/.css/.scss/.sass only.');
              return false;
          }
        }

        return true;
    }

    const handlerOnDrop = (event) =>{
        event.stopPropagation();
        event.preventDefault();
        setIsDropError(false)
        setIsDropAreaActive(false)
        if (event.dataTransfer.items.length > 1) {
            alert('Please upload SINGLE file having extensions .txt/.css/.scss/.sass only.');
            return;
        }
        if (!filesValidation(event.dataTransfer.files)) return;

        let file = event.dataTransfer.files[0];
        let reader = new FileReader();

        reader.onload = function(event) {
            setText(event.target.result);
        };

        reader.readAsText(file);

        return false;
    }

    const handleDragOver = (event) => {
        event.stopPropagation();
        event.preventDefault();
        if(event.dataTransfer.items.length > 1){
            setIsDropError(true)
        }
    }

    const handleDragEnter = (event) => {
        event.stopPropagation();
        event.preventDefault();
        setIsDropAreaActive(true)
    }

    const handleDragLeave = (event) => {
        event.stopPropagation();
        event.preventDefault();
        setIsDropError(false)
        setIsDropAreaActive(false)
    }
    
    return (
        <Box className="DragDropTextArea__upload-file-wrapper" p={1}>
            {!text && <UploadFileIcon fontSize='large' className="DragDropTextArea__upload-file-icon"/>}
            <TextField
                InputProps={{
                    style:{fontSize: '12px'}
                }}
                className={`${isDropAreaActive ? 'DragDropTextArea__drop-area-active' : ''} ${isDropError ? 'DragDropTextArea__drop-area-active-error' : ''}`}
                placeholder={placeholder}
                multiline
                rows={30}
                fullWidth
                value={text}
                onChange={(e)=>setText(e.target.value)}
                onDrop={(e)=>handlerOnDrop(e)}
                onDragOver={(e)=>handleDragOver(e)}
                onDragEnter={(e)=>handleDragEnter(e)}
                onDragLeave={(e)=>handleDragLeave(e)}
            />
        </Box>
    )
}
