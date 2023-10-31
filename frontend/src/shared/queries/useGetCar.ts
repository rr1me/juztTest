import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

const useGetCar = () => {
	const id = Number(useParams().id);

	const { data, isError } = useQuery({
		queryKey: ['id', id],
		queryFn: async () =>
			(await axios.get(`${process.env.REACT_APP_API}/car/` + id)).data,
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
