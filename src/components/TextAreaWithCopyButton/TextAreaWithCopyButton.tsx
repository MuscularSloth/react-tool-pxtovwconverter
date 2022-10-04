import React, { useState } from 'react';
import { Box, Button, Snackbar, TextField, Tooltip } from '@mui/material';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';

interface ITextAreaWithCopyButtonTypes {
	rows: number;
	content: string;
}

const TextAreaWithCopyButton = ({
	rows,
	content,
}: ITextAreaWithCopyButtonTypes) => {
	const [isNotificationOpen, setIsNotificationOpen] = useState<boolean>(false);

	const handleCopyResultClick = () => {
		navigator.clipboard.writeText(content);
		setIsNotificationOpen(true);
	};

	return (
		<Box p={1} className="TextConverterPage__result-container">
			<TextField
				InputProps={{
					style: { fontSize: '12px' },
					readOnly: true,
				}}
				multiline
				rows={rows}
				fullWidth
				value={content}
			/>
			{content && (
				<>
					<Tooltip
						style={{ cursor: 'pointer' }}
						title="Click To Copy"
						onClick={handleCopyResultClick}
					>
						<Button className="TextConverterPage__copy-result-button">
							<ContentCopyIcon />
						</Button>
					</Tooltip>
					<Snackbar
						autoHideDuration={2000}
						anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
						open={isNotificationOpen}
						onClose={() => setIsNotificationOpen(false)}
						message="Result has been copied!"
						key="textCopiedNotification"
					/>
				</>
			)}
		</Box>
	);
};

export default TextAreaWithCopyButton;
