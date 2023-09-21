import * as React from 'react';
import {styled} from '@mui/material/styles';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Slider from '@mui/material/Slider';
import MuiInput from '@mui/material/Input';

interface propsTypes {
  selectedWidth?: number;
  setSelectedWidth?: React.Dispatch<React.SetStateAction<number>>;
}

const Input = styled(MuiInput)`
  width: 42px;
`;

const InputSlider = ({selectedWidth = 1920, setSelectedWidth}: propsTypes) => {
  const handleSliderChange = (event: Event, newValue: number | number[]) => {
    if (!setSelectedWidth) return;

    setSelectedWidth(+newValue);
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!setSelectedWidth) return;

    setSelectedWidth(event.target.value === '' ? 1920 : Number(event.target.value));
  };

  const handleBlur = () => {
    if (!setSelectedWidth) return;

    if (selectedWidth < 1) {
      setSelectedWidth(1);
    } else if (selectedWidth > 2160) {
      setSelectedWidth(2160);
    }
  };

  return (
    <Box sx={{width: '100%'}}>
      <Typography id="input-slider" gutterBottom>
        Selected Viewport Width: {selectedWidth}
      </Typography>
      <Grid container spacing={2} alignItems="center">
        <Grid item xs>
          <Slider
            min={1}
            step={1}
            max={2160}
            value={typeof selectedWidth === 'number' ? selectedWidth : 0}
            onChange={handleSliderChange}
            aria-labelledby="input-slider"
          />
        </Grid>
        <Grid item>
          <Input
            style={{width: '70px'}}
            value={selectedWidth}
            size="small"
            onChange={handleInputChange}
            onBlur={handleBlur}
            inputProps={{
              step: 1,
              min: 1,
              max: 2160,
              type: 'number',
              'aria-labelledby': 'input-slider',
            }}
          />
        </Grid>
      </Grid>
    </Box>
  );
};

export default InputSlider;
