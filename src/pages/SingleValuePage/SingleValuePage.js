import React from 'react'
import { useState } from 'react';
import Grid from '@mui/material/Grid';
import { Button, Checkbox, FormControlLabel, Paper, Snackbar, TextField} from '@mui/material';
import { Box } from '@mui/system';
import InputSlider from '../../components/InputSlider/InputSlider';
import ResultCopyButton from '../../components/ResultCopyButton/ResultCopyButton';
import WidthPresetsBlock from '../../components/WidthPresets/WidthPresetsBlock';
import PreviousCalcTable from '../../components/PreviousCalcTable/PreviousCalcTable';

export default function SingleValuePage() {

    const [selectedWidth, setSelectedWidth] = useState(1920)
    const [presetedWidth, setPresetedWidth] = useState([ 1920, 2160, 1440, 1280 ])
    const [customPresetedWidth, setCustomPresetedWidth] = useState([ 720 ])
    const [calculatedValue, setCalculatedValue] = useState('')
    const [currentResult, setCurrentResult] = useState()
    const [previousCalcValues, setPreviousCalcValues] = useState([])
    const [isCalculatedValueError, setIsCalculatedValueError] = useState(false)
    const [isAutoCopyOn, setIsAutoCopyOn] = useState(false)
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
  
    const handleChangeCalculatedValue = (e) =>{
      const valueForCheck = e.target.value;
  
      if (+valueForCheck && valueForCheck >= 0 && valueForCheck <= 2160){
        setCalculatedValue(e.target.value)
      } else if(valueForCheck < 0){
        setCalculatedValue(0)
      } else if( valueForCheck > 2160){
        setCalculatedValue(2160)
      }
  
      /**
       * Turn off Error State in any case
       */
      if(isCalculatedValueError){
        setIsCalculatedValueError(false)
      }
    }
  
    const handleCalculatedValueKeyPress = (e) =>{
  
      /**
       * If Enter has been pressed launch Calculation function
       */
      if(e.key === 'Enter'){
        handleCalculateClick();
      }
  
      /**
       * Listen for Backspace and clear input if it has only one char
       */
      if(e.keyCode === 8){
        if(calculatedValue.length === 1){
          setCalculatedValue('')
        }
      }
  
    }
  
    const handleCalculateClick = () => {
      if(calculatedValue <= 0 || !calculatedValue){
        setCurrentResult();
        setIsCalculatedValueError(true) // Turn on Error state
        return;
      }
  
      /**
       * Adding selected width to custom viewport array if it's new one
       */
      if( !presetedWidth.includes(selectedWidth) && !customPresetedWidth.includes(selectedWidth)){
        setCustomPresetedWidth([...customPresetedWidth, selectedWidth])
      }
  
      /**
       * Calculating VW and set up result
       */
      let result = ((calculatedValue / selectedWidth) * 100).toFixed(3)
      setCurrentResult(result);
  
      if(isAutoCopyOn){
        navigator.clipboard.writeText(result+'vw')
        setIsNotificationOpen(true)
      }
  
      if(previousCalcValues.some( (valueObject) => valueObject.selectedWidth === selectedWidth && valueObject.calculatedValue === calculatedValue)){
        console.log('Already calc >>> ', calculatedValue);
      }else{
        console.log('New calc >>> ', calculatedValue);
        setPreviousCalcValues([...previousCalcValues, {selectedWidth, calculatedValue, result}])
      }
    }


    return (
        <div>
            <Grid 
            container 
            direction="row"
            justifyContent="center"
            maxWidth={900}
            margin="auto"
            spacing={2}>
            <Grid item xs={7}>
                <Paper>
                <Box p={2}>
                    <InputSlider selectedWidth={selectedWidth} setSelectedWidth={setSelectedWidth}  />
                </Box>
                <Box p={2} sx={{ display: 'flex', alignItems: 'center' }}>
                    <TextField
                    style={{marginRight: 15, width: 150 }}
                    id="outlined-number"
                    label="Calculated Value"
                    type="number"
                    size='small'
                    InputLabelProps={{
                        shrink: true,
                    }}
                    onKeyDown={handleCalculatedValueKeyPress}
                    value={calculatedValue}
                    onChange={handleChangeCalculatedValue}
                    error={isCalculatedValueError === true}
                    />
                    <Button variant="outlined" style={{marginRight: 15 }} onClick={handleCalculateClick}>Calculate</Button>
                    { currentResult && <Box ml={'auto'}><ResultCopyButton value={currentResult} /></Box> }
                </Box>
                <Box p={2}>
                    <FormControlLabel
                    value="end"
                    control={<Checkbox size="small" checked={isAutoCopyOn}/>}
                    label="Copy result to the clipboard automatically"
                    labelPlacement="end"
                    onChange={()=>setIsAutoCopyOn(!isAutoCopyOn)}
                    />
                    <Snackbar
                        autoHideDuration={2000}
                        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
                        open={isNotificationOpen}
                        onClose={() => setIsNotificationOpen(false)}
                        message={`Result has been copied! - ${currentResult}vw`}
                        key='autocopynotification'
                    />
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
            <Grid item xs={4}>
                <Paper>
                <Box p={2} textAlign="center">
                    <p>Placeholder xs=4</p>
                </Box>
                </Paper>
            </Grid>
            <Grid item xs={8}>
                <Paper>
                <PreviousCalcTable 
                    previousCalcValues={previousCalcValues}
                    setPreviousCalcValues={setPreviousCalcValues}
                />
                </Paper>
            </Grid>
            </Grid>
        </div>
    )
}
