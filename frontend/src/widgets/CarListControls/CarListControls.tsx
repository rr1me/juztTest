import s from './CarListControls.module.scss';
import Selector from '../../features/Selector/Selector';
import Filters from '../../features/Filters/Filters';
import { useAppDispatch, useAppSelector } from '../../redux/store';
import { actions } from '../../redux/slices/listSlice';

const CarListControls = () => {
	return (
		<section className={s.controls}>
			<YearSortingSelector/>
			<PriceSortingSelector/>
			<Filters/>
		</section>
	);
};

export default CarListControls;

const selectorOptions = [
	'Unset',
	'Upwards',
	'Downwards'
];

const { setYearSort, setPriceSort } = actions;

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
