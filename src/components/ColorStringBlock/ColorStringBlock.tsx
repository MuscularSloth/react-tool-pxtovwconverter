import React from "react";
import { Box, Chip, IconButton, Typography } from "@mui/material";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";

interface propTypes {
	label: string;
	calculatedColor: string;
	chipsStyle: {};
	handleCopyFunction: () => void;
}

function ColorStringBlock({
	label,
	calculatedColor,
	chipsStyle,
	handleCopyFunction,
}: propTypes) {
	return (
		<>
			<Box>
				<Chip
					label={label}
					sx={{ m: 1, backgroundColor: calculatedColor, ...chipsStyle }}
				/>
				<Typography component="span">{calculatedColor}</Typography>
				<IconButton
					onClick={handleCopyFunction}
					aria-label="copy"
					sx={{ m: 1 }}
				>
					<ContentCopyIcon />
				</IconButton>
			</Box>
		</>
	);
}

export default ColorStringBlock;
