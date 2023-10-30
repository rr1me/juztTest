import s from './CarCardList.module.scss';
import CarCard, { Car } from '../../entites/CarCard/CarCard';
import { useEffect } from 'react';
import useGetCarList from '../../shared/useGetCarList';

const CarCardList = () => {
	const { data, isError, fetchNextPage, isFetching } = useGetCarList();

	useEffect(() => {
		const onScroll = () => {
			const scrolledToBottom = window.innerHeight + window.scrollY >= document.body.offsetHeight;
			if (scrolledToBottom && !isFetching && !isError) fetchNextPage();
		};

		document.addEventListener('scroll', onScroll);
		return () => document.removeEventListener('scroll', onScroll);
	}, [isFetching]);

	return (
		<section className={s.carCardList}>
			{data?.pages.flatMap((x: Car[]) =>
				x.map(c => (
					<CarCard key={c.id}>
						{c}
					</CarCard>
				))
			)}
		</section>
	);
};

export default CarCardList;
