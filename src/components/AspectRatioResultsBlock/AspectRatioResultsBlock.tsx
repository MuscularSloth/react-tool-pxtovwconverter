import React from 'react';
import { Box, Link, TextField, Typography } from '@mui/material';
import ResultStringCopyButton from '../ResultStringCopyButton/ResultStringCopyButton';

interface IAspectRatioResultsBlock {
	aspectRatioInputWidth: string;
	aspectRatioInputHeight: string;
}

const AspectRatioResultsBlock = ({
	aspectRatioInputWidth,
	aspectRatioInputHeight,
}: IAspectRatioResultsBlock) => {
	const paddingCalculated = Number.isNaN(
		+aspectRatioInputHeight / +aspectRatioInputWidth,
	)
		? 0
		: ((+aspectRatioInputHeight / +aspectRatioInputWidth) * 100).toFixed(2);
	const paddingCSSText = `.parent{
    height: 0;
    overflow: hidden;
    position: relative;
    padding-top: ${paddingCalculated}%;
}

.child{
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
}
`;
	return (
		<>
			<Box>
				<Typography>
					Aspect Ratio Variant (
					<Link target="_blank" href="https://caniuse.com/?search=aspect-ratio">
						check support
					</Link>
					)
				</Typography>
				<ResultStringCopyButton
					value={`aspect-ratio: ${aspectRatioInputWidth}/${aspectRatioInputHeight}`}
				/>
			</Box>
			<Box>
				<Typography>Padding Variant</Typography>
				<TextField
					InputProps={{
						style: { fontSize: '12px' },
						readOnly: true,
					}}
					multiline
					rows={15}
					fullWidth
					value={paddingCSSText}
				/>
			</Box>
		</>
	);
};

export default AspectRatioResultsBlock;
