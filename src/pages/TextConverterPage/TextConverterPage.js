import { Button, Grid, Paper, Snackbar, TextField, Tooltip } from '@mui/material'
import { Box } from '@mui/system'
import React, { useState } from 'react'
import InputSlider from '../../components/InputSlider/InputSlider'
import WidthPresetsBlock from '../../components/WidthPresets/WidthPresetsBlock'
import AutorenewIcon from '@mui/icons-material/Autorenew';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import './TextConverterPage.css'

export default function TextConverterPage() {

    const regexRule = /([0-9]+)px/g;

    const [selectedWidth, setSelectedWidth] = useState(1920)
    const [presetedWidth, setPresetedWidth] = useState([ 1920, 2160, 1440, 1280 ])
    const [customPresetedWidth, setCustomPresetedWidth] = useState([ 720 ])
    const [textToConvert, setTextToConvert] = useState();
    const [textConverted, setTextConverted] = useState();
    const [isNotificationOpen, setIsNotificationOpen] = useState(false)
    
    const handlePresetClick = (e) =>{
        const selectedWidth = +e.target.innerText;
        if (selectedWidth > 1 && selectedWidth <= 2160){
            setSelectedWidth(selectedWidth)
        }
    }

    const handlePresetDelete = (customWidthToDelete) => {
        setCustomPresetedWidth((customPresetedWidth) => customPresetedWidth.filter((width) => width !== customWidthToDelete))
    }

    const replaceFunction = (match, value) => {
        // console.log('match', match);
        // console.log('value',value);
        return ((value / selectedWidth) * 100).toFixed(3) + 'vw';
    }

    const hanldeConvertClick = () =>{
        let convertedText = textToConvert.replace(regexRule, replaceFunction)
        setTextConverted(convertedText);
    }

    const handleCopyResultClick = () =>{
        navigator.clipboard.writeText(textConverted)
        setIsNotificationOpen(true)
    }

    
    return (
        <div>
            <Grid 
                container 
                direction="row"
                justifyContent="center"
            >
                <Grid item xs={7}>
                    <Paper>
                    <Box p={2}>
                        <InputSlider selectedWidth={selectedWidth} setSelectedWidth={setSelectedWidth}  />
                    </Box>
                    </Paper>
                </Grid>
                <Grid item xs={5}>
                    <Paper>
                        <Box p={2}>
                            <WidthPresetsBlock
                            title="Viewport Width Presets:"
                            hintText="Clicking on a preset sets the width value."
                            widthList={presetedWidth}
                            canDelete={false}
                            handlePresetClick={handlePresetClick}
                            handlePresetDelete={handlePresetDelete}
                            />

                            <WidthPresetsBlock
                            title="Custom Viewport Width Presets:"
                            hintText="The new value of viewport width will be added automatically on a new calculation if it has not been used previously."
                            widthList={customPresetedWidth}
                            canDelete={true}
                            handlePresetClick={handlePresetClick}
                            handlePresetDelete={handlePresetDelete}
                            />
                            
                        </Box>
                    </Paper>
                </Grid>
            </Grid>

            <Grid 
            container 
            direction="row"
            justifyContent="center"
            alignItems="stretch"
            mt={2}>
                <Grid item xs={5}>
                    <Paper>
                        <Box p={1}>
                            <TextField
                                InputProps={{
                                    style:{fontSize: '12px'}
                                }}
                                
                                label="Text to convert"
                                multiline
                                rows={30}
                                fullWidth
                                value={textToConvert}
                                onChange={(e)=>setTextToConvert(e.target.value)}
                            />
                        </Box>
                    </Paper>
                </Grid>
                <Grid 
                    container
                    item xs={2}
                    direction="column"
                    justifyContent="center"
                >
                    <Paper
                        style={{height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center'}}
                    >
                        <Button onClick={hanldeConvertClick}>
                            <AutorenewIcon className='TextConverterPage__convert-icon' fontSize='large'/>
                        </Button>
                    </Paper>
                </Grid>
                <Grid item xs={5}>
                    <Paper>
                        <Box p={1} className='TextConverterPage__result-container'>
                            <TextField
                                        InputProps={{
                                            style:{fontSize: '12px'},
                                            readOnly: true
                                        }}
                                        multiline
                                        rows={30}
                                        fullWidth
                                        value={textConverted}
                                    />
                            {textConverted && 
                            <>
                                <Tooltip style={{cursor: 'pointer' }} title="Click To Copy" onClick={handleCopyResultClick}>
                                    <Button className='TextConverterPage__copy-result-button'>
                                        <ContentCopyIcon />
                                    </Button>
                                </Tooltip>
                                <Snackbar
                                    autoHideDuration={2000}
                                    anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
                                    open={isNotificationOpen}
                                    onClose={() => setIsNotificationOpen(false)}
                                    message={`Result has been copied!`}
                                    key='textCopiedNotification'
                                />
                            </>
                            }
                            
                        </Box>
                    </Paper>
                </Grid>
            </Grid>
        </div>
    )
}
