import { Chip, Snackbar, Tooltip } from "@mui/material";
import React, { useState } from "react";

interface propsType {
	shade: string;
	textColor: string;
}

function ColorShadeString({ shade, textColor }: propsType) {
	const [isNotificationOpen, setIsNotificationOpen] = useState(false);

	const handleCopyResultClick = () => {
		navigator.clipboard.writeText("" + shade);
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
				key={shade}
			/>
			<Tooltip
				style={{ cursor: "pointer" }}
				title="Click To Copy"
				onClick={handleCopyResultClick}
			>
				<Chip
					label={shade}
					sx={{ m: 1, backgroundColor: shade, color: textColor }}
				/>
			</Tooltip>
		</>
	);
}

export default ColorShadeString;
