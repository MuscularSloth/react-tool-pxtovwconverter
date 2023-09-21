//Vendor
import React, {useEffect, useState} from 'react';
import {Box, Button, Grid, Paper} from '@mui/material';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
//Components
import NavigationBar from '../../components/NavigationBar/NavigationBar';
import ResultStringCopyButton from '../../components/ResultStringCopyButton/ResultStringCopyButton';
import SliderWithInput from '../../components/SliderWithInput/SliderWithInput';
import GradientColorsList from '../../components/GradientColorsList/GradientColorsList';
import DropDownSmallSelect from '../../components/DropDownSmallSelect/DropDownSmallSelect';
//Constants
import {
  gradientTypesList,
  initialCalculatedGradient,
  initialCirclePosition,
  initialGradientColorSet,
  initialGradientStyle,
  initialGradientType,
} from './GradientGeneratorPage.constants';
//Types
import {
  CirclePosition,
  GradientColorsListTypes,
  GradientTypeMap,
} from './GradientGeneratorPage.types';
//Styles
import './GradientGeneratorPage.scss';
import {getCalculatedGradientString} from './GradientGeneratorPage.utils';

const GradientGeneratorPage: React.FC = () => {
  // background-image: linear-gradient(angle, color-stop1, color-stop2);
  // background-image: repeating-linear-gradient(red, yellow 10%, green 20%);

  const gradientTypesArray: {key: string; value: any}[] = [];

  Object.entries(gradientTypesList).forEach(([key, value]) =>
    gradientTypesArray.push({key, value}),
  );

  const [calculatedGradient, setCalculatedGradient] = useState<string>(
    initialCalculatedGradient,
  );
  const [gradientStyle, setGradientStyle] = useState(initialGradientStyle);
  const [gradientAngle, setGradientAngle] = useState<number>(90);
  const [circlePosition, setCirclePosition] =
    useState<CirclePosition>(initialCirclePosition);
  const [gradientType, setGradientType] = useState<GradientTypeMap>(initialGradientType);
  const [gradientColorsSet, setGradientColorsSet] = useState<GradientColorsListTypes[]>(
    initialGradientColorSet,
  );

  const handleAddNewColorRow = () => {
    const newGradientColorSet = [...gradientColorsSet];
    newGradientColorSet.push({
      color: '#FFFFFF',
      stop: 50,
      isColorPickerOpened: false,
    });

    setGradientColorsSet(newGradientColorSet);
  };

  const handleSetCirclePosition = (value: number, axios: string) => {
    if (axios === 'x') {
      setCirclePosition({...circlePosition, x: value});
    } else if (axios === 'y') {
      setCirclePosition({...circlePosition, y: value});
    }
  };

  const calculateGradient = () => {
    const gradientString = getCalculatedGradientString(
      gradientType,
      gradientAngle,
      circlePosition,
      gradientColorsSet,
    );
    setCalculatedGradient(gradientString);
  };

  useEffect(() => {
    calculateGradient();
  }, [gradientAngle, gradientColorsSet, gradientType]);

  useEffect(() => {
    setGradientStyle({...gradientStyle, background: calculatedGradient});
  }, [calculatedGradient]);

  useEffect(() => {
    calculateGradient();
  }, []);

  return (
    <>
      <NavigationBar title="Gradient Generator" />
      <div>
        <Grid container direction="row" justifyContent="center">
          <Grid item xs={12}>
            <Paper>
              <Box p={2} style={gradientStyle} />
            </Paper>
            <Paper>
              <ResultStringCopyButton value={`background: ${calculatedGradient};`} />
            </Paper>
          </Grid>
        </Grid>
        <Grid container direction="row" justifyContent="center">
          <Grid item xs={12} md={6} lg={4}>
            <Paper>
              <Box p={2}>
                <DropDownSmallSelect
                  title="Gradient Type"
                  value={gradientType}
                  setValue={setGradientType}
                  valuesList={gradientTypesArray}
                />
              </Box>
              <Box p={2}>
                <GradientColorsList
                  gradientColorsSet={gradientColorsSet}
                  setGradientColorsSet={setGradientColorsSet}
                />
                <Button
                  variant="outlined"
                  size="small"
                  startIcon={<AddCircleOutlineIcon />}
                  onClick={handleAddNewColorRow}
                >
                  Add New Color
                </Button>
              </Box>
            </Paper>
          </Grid>
          <Grid item xs={12} md={6} lg={8}>
            <Paper>
              <Box p={2}>
                {gradientType &&
                  (gradientType.key === 'linearGradient' ||
                    gradientType.key === 'conicGradient') && (
                    <SliderWithInput
                      value={gradientAngle}
                      setValue={setGradientAngle}
                      title="Gradient Angle"
                      minValue={0}
                      maxValue={360}
                      step={1}
                      resetValue={90}
                    />
                  )}
                {gradientType &&
                  (gradientType.key === 'radialGradient' ||
                    gradientType.key === 'conicGradient') && (
                    <>
                      <SliderWithInput
                        value={circlePosition.x}
                        setValue={(val: number) => handleSetCirclePosition(val, 'x')}
                        title="Position X"
                        minValue={-20}
                        maxValue={120}
                        step={10}
                        resetValue={50}
                      />
                      <SliderWithInput
                        value={circlePosition.y}
                        setValue={(val: number) => handleSetCirclePosition(val, 'y')}
                        title="Position Y"
                        minValue={-20}
                        maxValue={120}
                        step={10}
                        resetValue={50}
                      />
                    </>
                  )}
              </Box>
            </Paper>
          </Grid>
        </Grid>
      </div>
    </>
  );
};

export default GradientGeneratorPage;
