//Vendor
import React, {useState} from 'react';
import {Button, Box, Grid, Input, Paper, Typography} from '@mui/material';
import AutorenewIcon from '@mui/icons-material/Autorenew';
import ClearIcon from '@mui/icons-material/Clear';
//Components
import WidthPresetsBlock from '../../components/WidthPresets/WidthPresetsBlock';
import InputSlider from '../../components/InputSlider/InputSlider';
import DragDropTextArea from '../../components/DragDropTextArea/DragDropTextArea';
import NavigationBar from '../../components/NavigationBar/NavigationBar';
import TextAreaWithCopyButton from '../../components/TextAreaWithCopyButton/TextAreaWithCopyButton';
import TextConverterOptionsBlock from './components/TextConverterOptionsBlock/TextConverterOptionsBlock';
//Helpers
import {clearCSSRulesWithoutVW} from '../../helpers/cssHelpersFunctions';
//Utils
import {replacePXToVW} from './TextConverterPage.utils';
//Constants
import {
  REGEX_IS_CSS_RULE,
  REGEX_IS_EMPTY_SELECTOR,
  REGEX_IS_PX_VALUE,
  REGEX_IS_EXACTLY_RULE_FN,
} from '../../constants/regex';
import presetViewportWidth from '../../constants/presetedViewportWidth';
import {initialConvertationOptions} from './TextConverterPage.constants';
//Types
import {ConvertationOptions} from './TextConverterPage.types';
//Styles
import './TextConverterPage.scss';

const TextConverterPage = () => {
  const [selectedWidth, setSelectedWidth] = useState<number>(1920);
  const [customPresetWidth, setCustomPresetWidth] = useState<number[]>([720]);
  const [textToConvert, setTextToConvert] = useState<string>('');
  const [textConverted, setTextConverted] = useState<string>('');

  const [convertationOptions, setConvertationOptions] = useState<ConvertationOptions>(
    initialConvertationOptions,
  );

  const handlePresetClick = (e: React.MouseEvent) => {
    const targetEl = e.target as HTMLElement;
    const newSelectedWidth = +targetEl.innerText;
    if (newSelectedWidth > 1 && newSelectedWidth <= 2160) {
      setSelectedWidth(newSelectedWidth);
    }
  };

  const handlePresetDelete = (customWidthToDelete: number) => {
    setCustomPresetWidth((prevCustomPresetWidth) =>
      prevCustomPresetWidth.filter((width) => width !== customWidthToDelete),
    );
  };

  const handleConvertClick = () => {
    let convertedText = textToConvert;
    const needRunExcludeRulesLogic =
      convertationOptions.excludeRulesEnabled &&
      convertationOptions.excludeRulesArray.length > 0;

    if (needRunExcludeRulesLogic) {
      convertationOptions.excludeRulesArray.forEach((excludedRule) => {
        convertedText = convertedText.replace(REGEX_IS_EXACTLY_RULE_FN(excludedRule), '');
      });
    }

    convertedText = convertedText.replace(REGEX_IS_PX_VALUE, (match, value) =>
      replacePXToVW(match, parseFloat(value), convertationOptions, selectedWidth),
    );

    if (convertationOptions.removeRowsWithoutVw) {
      convertedText = convertedText.replace(REGEX_IS_CSS_RULE, clearCSSRulesWithoutVW);
    }

    if (convertationOptions.removeEmptySelectors) {
      do {
        convertedText = convertedText.replace(
          REGEX_IS_EMPTY_SELECTOR,
          clearCSSRulesWithoutVW,
        );
      } while (REGEX_IS_EMPTY_SELECTOR.test(convertedText));
    }

    const rowsSplit = convertedText.split(/\r?\n/);
    const emptyRowsCleared = rowsSplit.filter((row) => row !== '');
    convertedText = emptyRowsCleared.join('\n');
    setTextConverted(convertedText);
  };

  const handleClearAllClick = () => {
    setTextToConvert('');
    setTextConverted('');
  };

  return (
    <>
      <NavigationBar title="PX to VW Convert Text" />
      <div>
        <Grid container direction="row" justifyContent="center">
          <Grid item xs={12} md={7}>
            <TextConverterOptionsBlock
              selectedWidth={selectedWidth}
              setSelectedWidth={setSelectedWidth}
              convertationOptions={convertationOptions}
              setConvertationOptions={setConvertationOptions}
            />
          </Grid>
          <Grid item xs={12} md={5}>
            <Paper style={{height: '100%'}}>
              <Box p={2}>
                <WidthPresetsBlock
                  title="Viewport Width Presets:"
                  hintText="Clicking on a preset sets the width value."
                  widthList={presetViewportWidth}
                  canDelete={false}
                  handlePresetClick={handlePresetClick}
                  handlePresetDelete={handlePresetDelete}
                />

                <WidthPresetsBlock
                  title="Custom Viewport Width Presets:"
                  hintText="The new value of viewport width will be added automatically on a new calculation if it has not been used previously."
                  widthList={customPresetWidth}
                  canDelete
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
          mt={2}
        >
          <Grid item xs={12} md={5}>
            <Paper>
              <DragDropTextArea
                text={textToConvert}
                setText={setTextToConvert}
                placeholder="Enter text to convert or drop single file here..."
              />
            </Paper>
          </Grid>
          <Grid container item xs={12} md={2} direction="column" justifyContent="center">
            <Paper
              style={{
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <Button
                onClick={handleConvertClick}
                startIcon={<AutorenewIcon />}
                disabled={!textToConvert}
              >
                Convert
              </Button>

              <Button
                onClick={handleClearAllClick}
                startIcon={<ClearIcon />}
                color="warning"
                disabled={!textToConvert}
              >
                Clear All
              </Button>
            </Paper>
          </Grid>
          <Grid item xs={12} md={5}>
            <Paper>
              <TextAreaWithCopyButton content={textConverted} rows={30} />
            </Paper>
          </Grid>
        </Grid>
      </div>
    </>
  );
};

export default TextConverterPage;
