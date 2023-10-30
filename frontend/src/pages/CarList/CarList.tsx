import s from './CarList.module.scss';
import CarListControls from '../../widgets/CarListControls/CarListControls';
import CarCardList from '../../widgets/CarCardList/CarCardList';
import UpScroller from '../../entites/UpScroller/UpScroller';

const CarList = () => {

	return (
		<main className={s.carList}>
			<UpScroller/>
			<CarListControls/>
			<CarCardList/>
		</main>
	);
};

export default CarList;
