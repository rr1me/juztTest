import s from './Filters.module.scss';
import Button from '../../entites/Button/Button';
import Modal from '../../entites/Modal/Modal';
import { useRef, useState } from 'react';
import FilterElements from '../../entites/FilterElements/FilterElements';

const Filters = () => {
	const buttonRef = useRef<HTMLButtonElement>(null);

	const [modalState, setModalState] = useState(false);

	const onFilterClick = () => setModalState(v => !v);
	const onModalClose = () => setModalState(false);

	return (
		<>
			<Button onClick={onFilterClick} ref={buttonRef}>Filters</Button>

			<Modal anchor={buttonRef.current} state={modalState} onClose={onModalClose} sx={{ marginTop: 5, width: 'max-content' }}>
				<div className={s.filtersWrapper}>
					<FilterElements/>
				</div>
			</Modal>
		</>
	);
};

export default Filters;
