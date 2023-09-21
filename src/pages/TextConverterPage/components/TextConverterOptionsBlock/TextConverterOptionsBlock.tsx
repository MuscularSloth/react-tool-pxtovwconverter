import React, {Dispatch, SetStateAction} from 'react';
import {Box, Input, Paper, Typography} from '@mui/material';
import InputSlider from '../../../../components/InputSlider/InputSlider';
import CheckBoxOption from '../../../../components/CheckBoxOption/CheckBoxOption';
import DropdownItemsTextListWithControls from '../../../../components/DropdownItemsTextListWithControls/DropdownItemsTextListWithControls';
import {ConvertationOptions} from '../../TextConverterPage.types';
import {initialConvertationOptions} from '../../TextConverterPage.constants';

type TextConverterOptionsBlockProps = {
  selectedWidth?: number;
  setSelectedWidth?: Dispatch<SetStateAction<number>>;
  convertationOptions?: ConvertationOptions;
  setConvertationOptions?: Dispatch<SetStateAction<ConvertationOptions>>;
};

const TextConverterOptionsBlock: React.FC<TextConverterOptionsBlockProps> = ({
  selectedWidth,
  setSelectedWidth,
  convertationOptions = initialConvertationOptions,
  setConvertationOptions,
}) => {
  return (
    <>
      <Paper style={{height: '100%'}}>
        <Box p={2}>
          <InputSlider
            selectedWidth={selectedWidth}
            setSelectedWidth={setSelectedWidth}
          />
        </Box>
        <Box p={2}>
          <Typography gutterBottom>Options</Typography>
          <CheckBoxOption
            label="Don't convert values less (or equal) than"
            state={convertationOptions.dontCalculateLessThanState}
            setStateFn={() =>
              setConvertationOptions &&
              setConvertationOptions({
                ...convertationOptions,
                dontCalculateLessThanState:
                  !convertationOptions.dontCalculateLessThanState,
              })
            }
          >
            <Input
              style={{width: '35px', marginRight: '5px'}}
              value={convertationOptions.dontCalculateLessThanValue}
              size="small"
              onChange={(e) =>
                setConvertationOptions &&
                setConvertationOptions({
                  ...convertationOptions,
                  dontCalculateLessThanValue: +e.target.value,
                })
              }
              inputProps={{
                step: 1,
                min: 1,
                max: 2160,
                type: 'number',
                'aria-labelledby': 'input-slider',
              }}
            />
            px
          </CheckBoxOption>
          <CheckBoxOption
            label="Remove rows without px"
            state={convertationOptions.removeRowsWithoutVw}
            setStateFn={() =>
              setConvertationOptions &&
              setConvertationOptions({
                ...convertationOptions,
                removeRowsWithoutVw: !convertationOptions.removeRowsWithoutVw,
              })
            }
          />
          <CheckBoxOption
            label="Remove Empty Selectors"
            state={convertationOptions.removeEmptySelectors}
            setStateFn={() =>
              setConvertationOptions &&
              setConvertationOptions({
                ...convertationOptions,
                removeEmptySelectors: !convertationOptions.removeEmptySelectors,
              })
            }
          />
          <CheckBoxOption
            label="Remove Rules From The List:"
            state={convertationOptions.excludeRulesEnabled}
            setStateFn={() =>
              setConvertationOptions &&
              setConvertationOptions({
                ...convertationOptions,
                excludeRulesEnabled: !convertationOptions.excludeRulesEnabled,
              })
            }
          >
            <DropdownItemsTextListWithControls
              itemsArray={convertationOptions.excludeRulesArray}
              saveDataFn={(newExcludedRulesArray) => {
                setConvertationOptions &&
                  setConvertationOptions({
                    ...convertationOptions,
                    excludeRulesArray: [...newExcludedRulesArray],
                  });
              }}
            />
          </CheckBoxOption>
        </Box>
      </Paper>
    </>
  );
};
export default TextConverterOptionsBlock;
