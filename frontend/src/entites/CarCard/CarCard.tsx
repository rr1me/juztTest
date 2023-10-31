import s from './CarCard.module.scss';
import Button from '../Button/Button';
import { useNavigate } from 'react-router-dom';
import { Car } from '../../shared/carOptions';

const CarCard = ({ children: car }: {children: Car}) => {
	const navigate = useNavigate();

	const onDetailsClick = () => navigate('car/' + car.id);

	return (
		<div className={s.card}>
			<img className={s.carImg} src='http://localhost:5132/image' alt=''/>

			<div className={s.tab}/>
			<article className={s.info}>
				<article>
					<p>id: {car.id}</p>
					<p>Brand: {car.brand}</p>
					<p>Model: {car.model}</p>
				</article>
				<article className={s.priceYear}>
					<p>Year: {car.year}</p>
					<p>Price: {car.price}</p>
				</article>
			</article>
			<div className={s.tab}/>

			<Button className={s.button} onClick={onDetailsClick}>Details</Button>
		</div>
	);
};

export default CarCard;
