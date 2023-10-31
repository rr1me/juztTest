import CheckedLabeledInput from '../../features/CheckedLabeledInput/CheckedLabeledInput';
import { ChangeEvent } from 'react';
import { actions } from '../../redux/slices/listSlice';
import { useAppDispatch, useAppSelector } from '../../redux/store';
import { useDebounce } from '../../shared/hooks';

const { setBrandFilterArgument, setBrandFilterState } = actions;

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
												 onCheckboxStateChange={onCheckboxStateChange} defaultValue={argument} onChange={onFilterArgumentChange}/>
	);
};

export default BrandFilter;
