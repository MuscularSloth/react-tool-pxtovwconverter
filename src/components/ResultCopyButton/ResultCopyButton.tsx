import { Button, Snackbar, Tooltip, Typography } from '@mui/material';
import React, { useState } from 'react';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';

interface propsTypes {
	value: number | null | undefined;
}

const ResultCopyButton = ({ value }: propsTypes) => {
	const [isNotificationOpen, setIsNotificationOpen] = useState(false);

	const handleCopyResultClick = () => {
		navigator.clipboard.writeText(`${value}vw`);
		setIsNotificationOpen(true);
	};

	return (
		<>
			<Snackbar
				autoHideDuration={2000}
				anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
				open={isNotificationOpen}
				onClose={() => setIsNotificationOpen(false)}
				message={`Result has been copied! - ${value}vw`}
				key={value}
			/>
			<Tooltip
				style={{ cursor: 'pointer' }}
				title="Click To Copy"
				onClick={handleCopyResultClick}
			>
				<Button
					style={{ textTransform: 'none' }}
					size="small"
					endIcon={<ContentCopyIcon />}
				>
					<Typography id="current-calculated-value">{value}vw</Typography>
				</Button>
			</Tooltip>
		</>
	);
};

export default ResultCopyButton;
