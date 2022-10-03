export interface aspectRatioPresetListType {
	id: number;
	name: string;
	widthRatio: number | null;
	heightRatio: number | null;
	group: string;
}

export const aspectRatioPresetList: aspectRatioPresetListType[] = [
	{
		id: 1,
		name: 'Custom Ratio',
		widthRatio: null,
		heightRatio: null,
		group: 'Default',
	},
	{
		id: 2,
		name: 'Golden Ratio',
		widthRatio: 1.618,
		heightRatio: 1,
		group: 'Preset',
	},
	{
		id: 3,
		name: 'Square',
		widthRatio: 1,
		heightRatio: 1,
		group: 'Preset',
	},
	{
		id: 4,
		name: 'HD Video',
		widthRatio: 16,
		heightRatio: 9,
		group: 'Preset',
	},
	{
		id: 5,
		name: 'Square Monitor',
		widthRatio: 4,
		heightRatio: 3,
		group: 'Preset',
	},
	{
		id: 6,
		name: 'Classic',
		widthRatio: 3,
		heightRatio: 2,
		group: 'Preset',
	},
	{
		id: 7,
		name: 'Cinemascope',
		widthRatio: 21,
		heightRatio: 9,
		group: 'Preset',
	},
];
