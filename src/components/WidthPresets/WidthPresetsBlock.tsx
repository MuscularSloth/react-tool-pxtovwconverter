import { Box, Chip, Tooltip, Typography } from '@mui/material';
import React from 'react';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';

interface propsTypes {
	title: string;
	hintText: string;
	widthList: number[];
	canDelete: boolean;
	handlePresetClick: (e: React.MouseEvent) => void;
	handlePresetDelete: (customWidthToDelete: number) => void;
}

const WidthPresetsBlock = ({
	title,
	hintText,
	widthList,
	canDelete,
	handlePresetClick,
	handlePresetDelete,
}: propsTypes) => (
	<>
		<Typography gutterBottom>
			{title}
			<Tooltip style={{ cursor: 'pointer', marginLeft: '5px' }} title={hintText}>
				<HelpOutlineIcon fontSize="small" color="disabled" />
			</Tooltip>
		</Typography>
		<Box>
			{widthList.length > 0 &&
				widthList.map((width) => (
					<Chip
						component="span"
						style={{ marginRight: 10, marginBottom: 10 }}
						key={width}
						label={width}
						onClick={handlePresetClick}
						onDelete={canDelete ? () => handlePresetDelete(width) : undefined}
					/>
				))}
		</Box>
	</>
);

export default WidthPresetsBlock;
