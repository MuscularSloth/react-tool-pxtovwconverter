import React from 'react';
import { Link, Typography, Grid } from '@mui/material';
import ResultStringCopyButton from '../ResultStringCopyButton/ResultStringCopyButton';
import TextAreaWithCopyButton from '../TextAreaWithCopyButton/TextAreaWithCopyButton';

interface IAspectRatioResultsBlock {
	aspectRatioInputWidth: string;
	aspectRatioInputHeight: string;
}

const AspectRatioResultsBlock = ({
	aspectRatioInputWidth,
	aspectRatioInputHeight,
}: IAspectRatioResultsBlock) => {
	const rateRatio = +aspectRatioInputHeight / +aspectRatioInputWidth;

	const paddingCalculated = Number.isNaN(rateRatio)
		? 0
		: (+rateRatio * 100).toFixed(2);

	const greatestRateRatio =
		+aspectRatioInputHeight > +aspectRatioInputWidth
			? rateRatio
			: +aspectRatioInputWidth / +aspectRatioInputHeight;

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
}`;

	const pseudoElementsCSSText = `.element {
    background: white;
}
.element::before {
    content: "";
    width: 1px;
    margin-left: -1px;
    float: left;
    height: 0;
    padding-top: ${paddingCalculated}%;
}
.element::after { 
    content: "";
    display: table;
    clear: both;
}`;

	return (
		<Grid container direction="row" justifyContent="center" mt={2}>
			{+aspectRatioInputWidth > 0 && +aspectRatioInputHeight > 0 && (
				<>
					<Grid item xs={12} md={4}>
						<Typography>
							Aspect Ratio Variant (
							<Link target="_blank" href="https://caniuse.com/?search=aspect-ratio">
								check support
							</Link>
							)
						</Typography>
						<ResultStringCopyButton
							value={`aspect-ratio: ${aspectRatioInputWidth}/${aspectRatioInputHeight};`}
						/>
						<Typography variant="body1">or</Typography>
						<ResultStringCopyButton
							value={`aspect-ratio: ${
								aspectRatioInputWidth < aspectRatioInputHeight
									? greatestRateRatio.toFixed(2)
									: 1
							}/${
								aspectRatioInputWidth > aspectRatioInputHeight
									? greatestRateRatio.toFixed(2)
									: 1
							};`}
						/>
					</Grid>
					<Grid item xs={12} md={4}>
						<Typography>Padding Variant (fixed height)</Typography>
						<TextAreaWithCopyButton content={paddingCSSText} rows={15} />
					</Grid>
					<Grid item xs={12} md={4}>
						<Typography>Pseudo Elements Variant (flexible height)</Typography>
						<TextAreaWithCopyButton content={pseudoElementsCSSText} rows={17} />
					</Grid>
				</>
			)}
		</Grid>
	);
};

export default AspectRatioResultsBlock;
