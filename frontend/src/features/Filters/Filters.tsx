import s from './Filters.module.scss';
import Button from '../../entites/Button/Button';
import Modal from '../../entites/Modal/Modal';
import { useRef, useState } from 'react';
import BrandFilter from '../../entites/BrandFilter/BrandFilter';
import Selector from '../Selector/Selector';
import { useAppDispatch, useAppSelector } from '../../redux/store';
import { actions } from '../../redux/slices/listSlice';
import { carColorOptions } from '../../shared/carOptions';

const { setColorFilter } = actions;

const Filters = () => {
	const dispatch = useAppDispatch();
	const color = useAppSelector(s=>s.listSlice.filters.color);

	const buttonRef = useRef<HTMLButtonElement>(null);

	const [modalState, setModalState] = useState(false);

	const onFilterClick = () => setModalState(v => !v);
	const onModalClose = () => setModalState(false);
	const onColorFilterChange = (n: number) => dispatch(setColorFilter(n));

	return (
		<>
			<Button onClick={onFilterClick} ref={buttonRef}>Filters</Button>

			<Modal anchor={buttonRef.current} state={modalState} onClose={onModalClose} sx={{ marginTop: 5, width: 'max-content' }}>
				<div className={s.filtersWrapper}>
					<BrandFilter/>
					<Selector label='Color' options={carColorOptions} value={color} onChange={onColorFilterChange}/>
				</div>
			</Modal>
		</>
	);
};

export default Filters;
