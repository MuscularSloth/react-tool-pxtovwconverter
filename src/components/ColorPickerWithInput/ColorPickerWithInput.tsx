import { FormControl, Input, InputLabel } from "@mui/material";
import { useCallback, useEffect, useRef, useState } from "react";
import { HexColorPicker } from "react-colorful";
import useClickOutside from "../../helpers/useClickOutside";
import "./ColorPickerWithInput.scss";

interface propsTypes {
	title?: string;
	color?: string;
	setColor: Function;
}

function ColorPickerWithInput({ title, color, setColor }: propsTypes) {
	const [newColor, setNewColor] = useState<string>(color ? color : "#aabbcc");

	const popover = useRef<HTMLHeadingElement>(null);
	const [isOpen, setIsOpen] = useState(false);

	const close = useCallback((): void => setIsOpen(false), []);
	useClickOutside(popover, close);

	const handleChangeColor = (value: string) => {
		setNewColor(value);
	};

	useEffect(() => {
		if (setColor && newColor) {
			setColor(newColor);
		}
	}, [newColor]);

	return (
		<>
			<div className="ColorPickerWithInput__wrapper">
				<FormControl variant="standard">
					<InputLabel htmlFor="input-with-icon-adornment">
						{color} {title}
					</InputLabel>
					<Input
						value={color}
						size="small"
						onChange={(e) => handleChangeColor(e.target.value)}
						// onBlur={handleBlur}
						id="input-with-icon-adornment"
					/>
				</FormControl>

				<div className="ColorPickerWithInput__picker">
					<div
						className="ColorPickerWithInput__swatch"
						style={{ backgroundColor: color }}
						onClick={() => setIsOpen(true)}
					/>

					{isOpen && (
						<div className="ColorPickerWithInput__popover" ref={popover}>
							<HexColorPicker color={color} onChange={handleChangeColor} />
						</div>
					)}
				</div>
			</div>
		</>
	);
}

export default ColorPickerWithInput;
