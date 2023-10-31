import s from './CarListControls.module.scss';
import Filters from '../../features/Filters/Filters';
import SortingSelectors from '../../entites/SortingSelectors/SortingSelectors';

const CarListControls = () => {
	return (
		<section className={s.controls}>
			<SortingSelectors/>
			<Filters/>
		</section>
	);
};

export default CarListControls;
