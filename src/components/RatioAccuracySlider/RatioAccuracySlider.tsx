import React, { useState } from 'react';
import { Slider, Box } from '@mui/material';
import { IAspectRatioSettings } from '../../pages/RatioCalculationPage/IAspectRatioSettings';
import {
	getNearestDivByFive,
	getNearestDivByTen,
	getNearestEven,
	getNearestOdd,
} from '../../helpers/mathFunctions';

const marksAccuracy = [
	{
		value: 0,
		label: 'Div by 10',
	},
	{
		value: 25,
		label: 'Div by 5',
	},
	{
		value: 50,
		label: 'To odd',
	},
	{
		value: 75,
		label: 'To even',
	},
	{
		value: 100,
		label: 'As Is',
	},
];

// function valuetext(value: number) {
// return `${value}`;
// }

function valueLabelFormat(value: number) {
	// return marksAccuracy.findIndex((mark) => mark.value === value) + 1;
	return marksAccuracy.filter((mark) => mark.value === value)[0].label;
}

interface RatioAccuracySliderTypes {
	aspectRatioSettings: IAspectRatioSettings;
	setAspectRatioSettings: React.Dispatch<
		React.SetStateAction<IAspectRatioSettings>
	>;
	sizeWidth: number;
	sizeHeight: number;
}

const RatioAccuracySlider = ({
	aspectRatioSettings,
	setAspectRatioSettings,
	sizeWidth,
	sizeHeight,
}: RatioAccuracySliderTypes) => {
	const [calculatedWidth, setCalculatedWidth] = useState<number>();
	const [calculatedHeight, setCalculatedHeight] = useState<number>();
	const handleChangeAccuracy = (event: Event, newValue: number | number[]) => {
		if (typeof newValue === 'number') {
			setAspectRatioSettings({ ...aspectRatioSettings, accuracy: newValue });

			let sizeWidthToCount = sizeWidth;
			let sizeHeightToCount = sizeHeight;

			if (newValue !== 100) {
				if (aspectRatioSettings.accuracy === 75) {
					sizeWidthToCount = getNearestEven(sizeWidth);
					sizeHeightToCount = getNearestEven(sizeHeight);
				} else if (newValue === 50) {
					sizeWidthToCount = getNearestOdd(sizeWidth);
					sizeHeightToCount = getNearestOdd(sizeHeight);
				} else if (newValue === 25) {
					sizeWidthToCount = getNearestDivByFive(sizeWidth);
					sizeHeightToCount = getNearestDivByFive(sizeHeight);
				} else if (newValue === 0) {
					sizeWidthToCount = getNearestDivByTen(sizeWidth);
					sizeHeightToCount = getNearestDivByTen(sizeHeight);
				}
			}
			setCalculatedWidth(sizeWidthToCount);
			setCalculatedHeight(sizeHeightToCount);
		}
	};

	return (
		<>
			<div>
				Accuracy: (Width:{calculatedWidth} Height:{calculatedHeight})
			</div>
			<Box px={5}>
				<Slider
					aria-label="Restricted values"
					defaultValue={100}
					valueLabelFormat={valueLabelFormat}
					// getAriaValueText={valuetext}
					step={null}
					valueLabelDisplay="auto"
					marks={marksAccuracy}
					value={aspectRatioSettings.accuracy}
					onChange={handleChangeAccuracy}
				/>
			</Box>
		</>
	);
};

export default RatioAccuracySlider;
