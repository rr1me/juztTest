import s from './CarDetails.module.scss';
import useGetCar from '../../shared/queries/useGetCar';
import { Car } from '../../shared/carOptions';

const CarDetails = () => {
	const { car, isError } = useGetCar();

	return (
		<main className={s.details}>
			{isError ?
				<section>
					There is no such car with that ID
				</section>
				:
				<>
					<section>
						<img className={s.carImg} src='http://localhost:5132/image' alt=''/>
					</section>

					<section className={s.carInfo}>
						<Characteristic label='Brand' field={car?.brand}/>
						<Characteristic label='Model' field={car?.model}/>
						<Characteristic label='Color' field={car?.color}/>
						<Characteristic label='Price' field={car?.price}/>
						<Characteristic label='Year' field={car?.year}/>
						<Characteristic label='Engine type' field={car?.engine}/>
						<Characteristic label='Transmission' field={car?.transmission}/>
						<Characteristic label='Cruising range' field={car?.cruisingRange}/>
					</section>
				</>
			}
		</main>
	);
};

export default CarDetails;

const Characteristic = ({ label, field }: {label: string, field?: Car[keyof Car]}) => {
	return (
		<article className={s.characteristic}>
			<p>{label}</p>
			<div className={s.tab}/>
			<p>{field}</p>
		</article>
	);
};
