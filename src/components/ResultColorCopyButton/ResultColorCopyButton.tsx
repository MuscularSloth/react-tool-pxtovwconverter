import React, { useState } from "react";
import { Button, Snackbar, Tooltip, Typography } from "@mui/material";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";

interface propTypes {
	value: string | null;
}

function ResultColorCopyButton({ value }: propTypes) {
	const [isNotificationOpen, setIsNotificationOpen] = useState(false);

	const handleCopyResultClick = () => {
		navigator.clipboard.writeText("" + value);
		setIsNotificationOpen(true);
	};

	return (
		<>
			<Snackbar
				autoHideDuration={2000}
				anchorOrigin={{ vertical: "top", horizontal: "center" }}
				open={isNotificationOpen}
				onClose={() => setIsNotificationOpen(false)}
				message={`Result has been copied!`}
				key={value}
			/>
			<Tooltip
				style={{ cursor: "pointer" }}
				title="Click To Copy"
				onClick={handleCopyResultClick}
			>
				<Button
					style={{ textTransform: "none" }}
					size="small"
					endIcon={<ContentCopyIcon />}
				>
					<Typography id="current-calculated-value">{value}</Typography>
				</Button>
			</Tooltip>
		</>
	);
}

export default ResultColorCopyButton;
