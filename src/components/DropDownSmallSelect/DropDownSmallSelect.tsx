import * as React from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';

interface propsTypes {
	value: { key: string; value: string };
	setValue: Function;
	valuesList: [] | { key: string; value: string }[];
	title?: string;
	placeholder?: string;
}

const DropDownSmallSelect = ({
	value,
	setValue,
	valuesList,
	title,
	placeholder,
}: propsTypes) => {
	const handleChange = (event: SelectChangeEvent) => {
		const newValue = {
			key: event.target.value,
			value: valuesList.filter((item) => item.key === event.target.value)[0].value,
		};
		setValue(newValue);
	};

	return (
		<FormControl sx={{ m: 1, minWidth: 120 }} size="small">
			{title && <InputLabel id="select-small">{title}</InputLabel>}
			<Select
				labelId="select-small"
				id="select-small"
				value={value.key}
				label={title}
				onChange={handleChange}
			>
				{placeholder && (
					<MenuItem value="">
						<em>Pick One</em>
					</MenuItem>
				)}

				{valuesList &&
					valuesList.map((item) => (
						<MenuItem key={item.key} value={item.key}>
							{item.value}
						</MenuItem>
					))}
			</Select>
		</FormControl>
	);
};

export default DropDownSmallSelect;
