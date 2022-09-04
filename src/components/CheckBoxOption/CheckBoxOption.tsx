import React from 'react';
import { Box, Checkbox, FormControlLabel } from '@mui/material';

export interface ICheckBoxOption {
	label: string;
	state: boolean;
	setStateFn: () => void;
	children?: React.ReactNode;
}

const CheckBoxOption = ({
	label,
	state,
	setStateFn,
	children,
}: ICheckBoxOption) => (
	<Box>
		<FormControlLabel
			value="end"
			control={<Checkbox size="small" checked={state} />}
			label={label}
			labelPlacement="end"
			onChange={setStateFn}
		/>
		{children}
	</Box>
);

export default CheckBoxOption;
