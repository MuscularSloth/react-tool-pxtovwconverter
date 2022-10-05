import React, { useEffect, useState } from 'react';
import { Box, Paper } from '@mui/material';
import { getColorName } from '../../helpers/colorLists';
import ResultStringCopyButton from '../ResultStringCopyButton/ResultStringCopyButton';

interface propsType {
	calculatedHEX: string;
	isWhiteText: boolean;
}

const ColorNameBlock = ({ calculatedHEX, isWhiteText }: propsType) => {
	const [calculatedColorName, setCalculatedColorName] = useState<string>('');

	useEffect(() => {
		if (calculatedHEX) {
			const colorInfo = getColorName(calculatedHEX);

			// @ts-ignore
			setCalculatedColorName(colorInfo.name);
		}
	}, [calculatedHEX]);
	return (
		<Paper>
			<Box
				p={2}
				sx={{
					backgroundColor: calculatedHEX,
					color: isWhiteText ? 'white' : 'black',
				}}
			>
				<Box p={1}>Color Name: [{calculatedColorName}]</Box>
				<Box p={1} sx={{ backgroundColor: isWhiteText ? 'white' : 'black' }}>
					<ResultStringCopyButton
						value={`$color${calculatedColorName.replace(/ /g, '')}`}
					/>
				</Box>
			</Box>
		</Paper>
	);
};

export default ColorNameBlock;
