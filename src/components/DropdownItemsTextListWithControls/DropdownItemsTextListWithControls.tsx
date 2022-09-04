import React, { useState } from 'react';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';
import {
	Autocomplete,
	Button,
	IconButton,
	List,
	ListItem,
	ListItemText,
	TextField,
} from '@mui/material';
import './DropdownItemsTextListWithControls.scss';
import fullCssRulesList from '../../constants/all-css-properties.en';

interface IDropdownItemsTextListWithControlsTypes {
	itemsArray: string[];
	saveDataFn: (newExcludedRulesArray: string[]) => void;
}

interface CSSListType {
	title: string;
}

const DropdownItemsTextListWithControls = ({
	itemsArray,
	saveDataFn,
}: IDropdownItemsTextListWithControlsTypes) => {
	const [autocompleteValue, setAutocompleteValue] = useState<CSSListType | null>(
		null,
	);
	const [excludedRulesListOpened, setExcludedRulesListOpened] =
		useState<boolean>(false);

	const autocompleteCssProps = {
		options: fullCssRulesList,
		getOptionLabel: (option: CSSListType) => option.title,
	};

	const onDeleteItemFn = (item: string) => {
		saveDataFn([...itemsArray.filter((value) => value !== item)]);
	};

	const handleAddNewValue = (_event: any, newValue: CSSListType | null) => {
		if (!newValue || !newValue?.title) return;
		setAutocompleteValue({ title: '' });

		if (itemsArray.indexOf(newValue.title) !== -1) return;
		saveDataFn([...itemsArray, newValue.title]);
	};

	return (
		<span className="DropdownItemsTextListWithControls__wrapper">
			<Button
				size="small"
				onClick={() => setExcludedRulesListOpened(!excludedRulesListOpened)}
			>
				({`${itemsArray.length} rules excluded`})
			</Button>
			{excludedRulesListOpened && (
				<div className="DropdownItemsTextListWithControls__popover">
					<div className="DropdownItemsTextListWithControls__inner">
						<List className="DropdownItemsTextListWithControls__list">
							{itemsArray.map((item) => (
								<ListItem
									key={item}
									disableGutters
									secondaryAction={
										<IconButton aria-label="comment" onClick={() => onDeleteItemFn(item)}>
											<RemoveCircleIcon />
										</IconButton>
									}
								>
									<ListItemText primary={item} />
								</ListItem>
							))}
						</List>
						<div>
							<Autocomplete
								{...autocompleteCssProps}
								id="auto-complete"
								autoComplete
								includeInputInList
								value={autocompleteValue}
								onChange={(event: any, newValue: CSSListType | null) =>
									handleAddNewValue(event, newValue)
								}
								renderInput={(params) => (
									<TextField {...params} label="Add new property" variant="standard" />
								)}
							/>
						</div>
						<div>
							<Button onClick={() => setExcludedRulesListOpened(false)}>Close</Button>
						</div>
					</div>
				</div>
			)}
		</span>
	);
};

export default DropdownItemsTextListWithControls;
