import s from './CarCard.module.scss';
import Button from '../Button/Button';
import { useNavigate } from 'react-router-dom';

export enum CarColor {
	unset,
	white,
	gray,
	black,
	blue,
	silver,
	brown,
	red,
	green,
	beige,
	orange,
	cyan,
	yellow,
	other,
}

export type Car = {
	id: number;
	image: string;
	brand: string;
	model: string;
	color: CarColor;
	price: number;
	year: number;
	engine: 'gasoline' | 'diesel' | 'electrical';
	transmission: 'auto' | 'manual' | 'robotic';
	cruisingRange: number
}

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
