import { useAppDispatch, useAppSelector } from '../../redux/store';
import Selector from '../../features/Selector/Selector';
import { carColorOptions } from '../../shared/carOptions';
import { useDebounce } from '../../shared/hooks';
import { ChangeEvent } from 'react';
import CheckedLabeledInput from '../../features/CheckedLabeledInput/CheckedLabeledInput';
import { actions } from '../../redux/slices/listSlice';

const FilterElements = () => {
	return (
		<>
			<BrandFilter/>
			<ColorFilter/>
		</>
	);
};

export default FilterElements;

const { setBrandFilterState, setBrandFilterArgument, setColorFilter } = actions;

const BrandFilter = () => {
	const dispatch = useAppDispatch();
	const { active: checked, argument } = useAppSelector(s=>s.listSlice.filters.brand);

	const debounce = useDebounce(dispatch, 500);
	const onFilterArgumentChange = (e: ChangeEvent<HTMLInputElement>) =>
		debounce(setBrandFilterArgument(e.target.value));

	const onCheckboxStateChange = (s: boolean) =>
		dispatch(setBrandFilterState(s));

	return (
		<CheckedLabeledInput label={'Brand'} isChecked={checked}
												 onCheckboxStateChange={onCheckboxStateChange}
												 defaultValue={argument} onChange={onFilterArgumentChange}/>
	);
};

const ColorFilter = () => {
	const dispatch = useAppDispatch();
	const color = useAppSelector(s=>s.listSlice.filters.color);

	const onColorFilterChange = (n: number) => dispatch(setColorFilter(n));

	return <Selector label='Color' options={carColorOptions} value={color} onChange={onColorFilterChange}/>;
};
