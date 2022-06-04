import { FormControl, Input, InputLabel } from "@mui/material";
import { Dispatch, SetStateAction, useCallback, useRef, useState } from "react";
import { HexColorPicker } from "react-colorful";
import useClickOutside from "../../helpers/useClickOutside";
import "./ColorPickerWithInput.scss";

interface propsTypes {
	title?: string;
	color: string;
	setColor: Dispatch<SetStateAction<string>>;
}

function ColorPickerWithInput({ title, color, setColor }: propsTypes) {
	// const [color, setColor] = useState("#aabbcc");
	const popover = useRef<HTMLHeadingElement>(null);
	const [isOpen, setIsOpen] = useState(false);

	const close = useCallback((): void => setIsOpen(false), []);
	useClickOutside(popover, close);

	return (
		<>
			<div className="ColorPickerWithInput__wrapper">
				<FormControl variant="standard">
					<InputLabel htmlFor="input-with-icon-adornment">{title}</InputLabel>
					<Input
						value={color}
						size="small"
						onChange={(e) => setColor(e.target.value)}
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
							<HexColorPicker color={color} onChange={setColor} />
						</div>
					)}
				</div>
			</div>
		</>
	);
}

export default ColorPickerWithInput;
