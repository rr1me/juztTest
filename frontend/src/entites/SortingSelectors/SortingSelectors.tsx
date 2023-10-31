import { useAppDispatch, useAppSelector } from '../../redux/store';
import Selector from '../../features/Selector/Selector';
import s from '../../widgets/CarListControls/CarListControls.module.scss';
import { actions } from '../../redux/slices/listSlice';

const { setYearSort, setPriceSort } = actions;

const SortingSelectors = () => {
	return (
		<>
			<YearSortingSelector/>
			<PriceSortingSelector/>
		</>
	);
};

export default SortingSelectors;

const selectorOptions = [
	'Unset',
	'Upwards',
	'Downwards'
];

const YearSortingSelector = () => {
	const dispatch = useAppDispatch();
	const yearSorting = useAppSelector(s=>s.listSlice.yearSorting);

	const onChange = (n: number) => dispatch(setYearSort(n));

	return <Selector label='Sorting by year' className={s.controlSelector} value={yearSorting} options={selectorOptions} onChange={onChange}/>;
};

const PriceSortingSelector = () => {
	const dispatch = useAppDispatch();
	const priceSorting = useAppSelector(s=>s.listSlice.priceSorting);

	const onChange = (n: number) => dispatch(setPriceSort(n));

	return <Selector label='Sorting by price' className={s.controlSelector} value={priceSorting} options={selectorOptions} onChange={onChange}/>;
};
