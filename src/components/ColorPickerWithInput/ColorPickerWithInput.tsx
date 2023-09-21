//Vendor
import React from 'react';
import {FormControl, Input, InputLabel, debounce} from '@mui/material';
import {useCallback, useEffect, useRef, useState} from 'react';
import {HexAlphaColorPicker} from 'react-colorful';
//Hooks
import useClickOutside from '../../helpers/useClickOutside';
//Styles
import './ColorPickerWithInput.scss';

interface propsTypes {
  title?: string;
  color?: string;
  setColor: Function;
  isColorPickerOpened?: boolean;
}

const ColorPickerWithInput = ({
  title,
  color,
  setColor,
  isColorPickerOpened = false,
}: propsTypes) => {
  const [newColor, setNewColor] = useState<string>(color || '#aabbcc');

  const popover = useRef<HTMLHeadingElement>(null);
  const [isOpen, setIsOpen] = useState(isColorPickerOpened);

  const close = useCallback((): void => setIsOpen(false), []);
  useClickOutside(popover, close);

  const handleChangeColor = useCallback(
    debounce((value: string) => {
      setNewColor(value);
    }, 300),
    [],
  );

  useEffect(() => {
    if (setColor && newColor) {
      setColor(newColor, isOpen);
    }
  }, [newColor, isOpen]);

  return (
    <div className="ColorPickerWithInput__wrapper">
      <FormControl variant="standard">
        <InputLabel htmlFor="input-with-icon-adornment">{title}</InputLabel>
        <Input
          value={color}
          size="small"
          onChange={(e) => handleChangeColor(e.target.value)}
          // onBlur={handleBlur}
          id="input-with-icon-adornment"
        />
      </FormControl>

      <div className="ColorPickerWithInput__picker">
        <button
          type="button"
          aria-label="Open Color Picker"
          className="ColorPickerWithInput__swatch"
          style={{backgroundColor: color}}
          onClick={() => setIsOpen(true)}
        />

        {isOpen && (
          <div className="ColorPickerWithInput__popover" ref={popover}>
            <HexAlphaColorPicker color={color} onChange={handleChangeColor} />
          </div>
        )}
      </div>
    </div>
  );
};

export default ColorPickerWithInput;
