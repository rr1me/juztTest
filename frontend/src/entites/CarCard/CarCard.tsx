import s from './CarCard.module.scss';
import Button from '../Button/Button';
import { useNavigate } from 'react-router-dom';
import { Car, carColorOptions } from '../../shared/carOptions';
import Characteristic from '../Characteristic/Characteristic';

const CarCard = ({ children: car }: {children: Car}) => {
	const navigate = useNavigate();

	const onDetailsClick = () => navigate('car/' + car.id);

	return (
		<div className={s.card}>
			<img className={s.carImg} src={`${process.env.REACT_APP_API}/image/` + car.id} alt=''/>

			<div className={s.tab}/>
			<article className={s.info}>
				<Characteristic label={'Id'} field={car.id}/>
				<Characteristic label='Brand' field={car.brand}/>
				<Characteristic label='Model' field={car.model}/>
				<Characteristic label='Color' field={carColorOptions[car.color]}/>
				<Characteristic label='Price' field={car.price}/>
				<Characteristic label='Year' field={car.year}/>
			</article>
			<div className={s.tab}/>

			<Button className={s.button} onClick={onDetailsClick}>Details</Button>
		</div>
	);
};

export default CarCard;
