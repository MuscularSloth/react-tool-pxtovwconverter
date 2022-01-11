import './App.css';
import Grid from '@mui/material/Grid';
import { Button, Chip, Paper, TextField, Tooltip, Typography } from '@mui/material';
import { Box } from '@mui/system';
import InputSlider from './components/InputSlider/InputSlider';
import { useState } from 'react';
import ResultCopyButton from './components/ResultCopyButton/ResultCopyButton';


function App() {

  const [selectedWidth, setSelectedWidth] = useState(1920)
  const [presetedWidth, setPresetedWidth] = useState([
    {key: 1920, label: 1920},
    {key: 2160, label: 2160},
    {key: 1440, label: 1440},
    {key: 1280, label: 1280}
  ])
  const [customPresetedWidth, setCustomPresetedWidth] = useState([
    {key: 1920, label: 1920},
  ])
  const [calculatedValue, setCalculatedValue] = useState()
  const [currentResult, setCurrentResult] = useState()

  const handlePresetClick = (e) =>{
    console.log('handlePresetClick >>> ', e.target.innerText);
    const selectedWidth = +e.target.innerText;
    if (selectedWidth > 1 && selectedWidth <= 2160){
      setSelectedWidth(selectedWidth)
    }
  }

  const handlePresetDelete = (e) => {
    console.log('handlePresetDelete >>> ', e);
  }

  const handleChangeCalculatedValue = (e) =>{
    const valueForCheck = e.target.value;
    if (+valueForCheck && valueForCheck > 0 && valueForCheck <= 2160){
      setCalculatedValue(e.target.value)
    } else if(valueForCheck < 0){
      setCalculatedValue(1)
    } else if( valueForCheck > 2160){
      setCalculatedValue(2160)
    }
  }

  const handleCalculateClick = () => {
    if(calculatedValue <= 0 || !calculatedValue){
      console.log('fail');
      return;
    }

    let result = (calculatedValue / selectedWidth) * 100

    setCurrentResult(result.toFixed(3));
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
              value={calculatedValue}
              onChange={handleChangeCalculatedValue}
            />
            <Button variant="outlined" style={{marginRight: 15 }} onClick={handleCalculateClick}>Calculate</Button>
            {currentResult &&
            <>
              <ResultCopyButton value={currentResult} />
            </>}
          </Box>
        </Paper>
      </Grid>
      <Grid item xs={5}>
        <Paper>
          <Box p={2}>
            <Typography gutterBottom>
                Viewport Width Presets:
            </Typography>
            <Box>
              {presetedWidth.length > 0 && presetedWidth.map(width => (
                <Chip style={{marginRight: 10, marginBottom: 10 }} key={width.key} label={width.label} onClick={handlePresetClick}/>
              ))}
            </Box>

            {customPresetedWidth.length > 0
              ?
              <>
                <Typography gutterBottom>
                    Custom Presets:
                </Typography>
                <Box>
                  {customPresetedWidth.map(width => (
                    <Chip style={{marginRight: 10, marginBottom: 10 }} key={width.key} label={width.label} onClick={handlePresetClick} onDelete={handlePresetDelete}/>
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
