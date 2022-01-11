import './App.css';
import Grid from '@mui/material/Grid';
import { Button, Checkbox, Chip, FormControlLabel, Paper, Snackbar, TextField, Tooltip, Typography } from '@mui/material';
import { Box } from '@mui/system';
import InputSlider from './components/InputSlider/InputSlider';
import { useState } from 'react';
import ResultCopyButton from './components/ResultCopyButton/ResultCopyButton';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';


function App() {

  const [selectedWidth, setSelectedWidth] = useState(1920)
  const [presetedWidth, setPresetedWidth] = useState([ 1920, 2160, 1440, 1280 ])
  const [customPresetedWidth, setCustomPresetedWidth] = useState([ 720 ])
  const [calculatedValue, setCalculatedValue] = useState('')
  const [currentResult, setCurrentResult] = useState()
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
  }



  return (
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
                message="Result has been copied!"
                key='autocopynotification'
            />
          </Box>
        </Paper>
      </Grid>
      <Grid item xs={5}>
        <Paper>
          <Box p={2}>
            <Typography gutterBottom>
                Viewport Width Presets:
                <Tooltip style={{cursor: 'pointer', marginLeft: '5px' }} title="Clicking on a preset sets the width value.">
                  <HelpOutlineIcon fontSize='12px' color="disabled" />
                </Tooltip>
            </Typography>
            <Box>
              {presetedWidth.length > 0 && presetedWidth.map(width => (
                <Chip style={{marginRight: 10, marginBottom: 10 }} key={width} label={width} onClick={handlePresetClick}/>
              ))}
            </Box>
            <Typography gutterBottom>
                Custom Viewport Width Presets:
                <Tooltip style={{cursor: 'pointer', marginLeft: '5px' }} title="The new value of viewport width will be added automatically on a new calculation if it has not been used previously.">
                  <HelpOutlineIcon fontSize='12px' color="disabled" />
                </Tooltip>
            </Typography>
            {customPresetedWidth.length > 0
              ?
              <>
                
                <Box>
                  {customPresetedWidth.map(width => (
                    <Chip style={{marginRight: 10, marginBottom: 10 }} key={width} label={width} onClick={handlePresetClick} onDelete={() => handlePresetDelete(width)}/>
                  ))}
                </Box>
              </>
            : ''}
          </Box>
        </Paper>
      </Grid>
      <Grid item xs={4}>
        <Paper>
          <p>xs=4</p>
        </Paper>
      </Grid>
      <Grid item xs={8}>
        <Paper>
          <p>xs=8</p>
        </Paper>
      </Grid>
    </Grid>
  );
}

export default App;
