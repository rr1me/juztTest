import s from './CarDetails.module.scss';
import { QueryClient, useQueryClient } from '@tanstack/react-query';
import { Car } from '../../entites/CarCard/CarCard';
import { useLayoutEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const CarDetails = () => {
	const q = useQueryClient();

	const [car, setCar] = useState<Car | undefined>();

	const id = Number(useParams().id);

	useLayoutEffect(() => {
		const cached = getAllCarObjectFromQueryCache(q);
		const cachedCar = cached.filter(x=>x.id === id)[0];

		if (cachedCar){
			setCar(cachedCar);
			return;
		}

		//todo axios request to car with id
	}, []);

	return (
		<main className={s.details}>
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
		</main>
	);
};

export default CarDetails;

const getAllCarObjectFromQueryCache = (q: QueryClient) => {
	const queries = q.getQueryCache().getAll();

	const allQueryData = queries.flatMap(x=>x.state.data) as {pages: []}[];

	const flatten = allQueryData.map(x=>x.pages);
	if (flatten.length === 0) return [];

	const concatenated = flatten.reduce((previousValue, currentValue) => currentValue.concat(previousValue) as []) as [][];

	return concatenated.reduce((previousValue, currentValue) => currentValue.concat(previousValue) as []) as Car[];
};

const Characteristic = ({ label, field }: {label: string, field?: Car[keyof Car]}) => {
	return (
		<p className={s.characteristic}>
			<p>{label}</p>
			<div className={s.tab}/>
			<p>{field}</p>
		</p>
	);
};
