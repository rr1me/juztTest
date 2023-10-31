import s from './CarDetails.module.scss';
import useGetCar from '../../shared/queries/useGetCar';
import { carColorOptions, carEngineOptions, carTransmissionOptions, Engine } from '../../shared/carOptions';
import Characteristic from '../../entites/Characteristic/Characteristic';

const CarDetails = () => {
	const { car, isError } = useGetCar();

	if (!car) return (<></>);

	return (
		<main className={s.details}>
			{isError ?
				<section>
					There is no such car with that ID
				</section>
				:
				<>
					<section>
						<img className={s.carImg} src={`${process.env.REACT_APP_API}/image/` + car.id} alt=''/>
					</section>

					<section className={s.carInfo}>
						<Characteristic label='Brand' field={car.brand}/>
						<Characteristic label='Model' field={car.model}/>
						<Characteristic label='Color' field={carColorOptions[car.color]}/>
						<Characteristic label='Price' field={car.price}/>
						<Characteristic label='Year' field={car.year}/>
						<Characteristic label='Engine type' field={carEngineOptions[car.engine]}/>
						<Characteristic label='Transmission' field={carTransmissionOptions[car.transmission]}/>
						{car.engine === Engine.Electrical && <Characteristic label='Cruising range' field={car.cruisingRange}/>}
					</section>
				</>
			}
		</main>
	);
};

export default CarDetails;
