import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { API_URL } from '../utils';
import { Car } from '../carOptions';

const useGetCar = () => {
	const id = Number(useParams().id);

	const { data, isError } = useQuery<Car>({
		queryKey: ['id', id],
		queryFn: async () =>
			(await axios.get(`${API_URL}/car/` + id)).data,
		refetchOnMount: false,
		refetchOnWindowFocus: false,
		retry: 0,
		staleTime: Infinity
	});

	return {
		car: data,
		isError
	};
};

export default useGetCar;
