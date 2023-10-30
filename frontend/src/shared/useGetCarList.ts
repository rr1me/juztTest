import { useAppSelector } from '../redux/store';
import { keepPreviousData, useInfiniteQuery } from '@tanstack/react-query';
import axios from 'axios';

const useGetCarList = () => {
	const { yearSorting, priceSorting, filters: { color, brand: { queryArgument: brand } } } = useAppSelector(s=>s.listSlice);

	const {
		data,
		isError,
		fetchNextPage,
		isFetching,
	} = useInfiniteQuery({
		queryKey: ['filters', brand, color, yearSorting, priceSorting],
		queryFn: async (context) =>
			(await axios.get('http://localhost:5132/', { params: {
				offset: context.pageParam * 15,
				limit: 15,
				brandFilter: brand,
				colorFilter: color,
				yearSorting,
				priceSorting
			} })).data,
		initialPageParam: 0,
		getNextPageParam: (lastPage, pages, lastPageParam) => lastPageParam + 1,
		placeholderData: previousData => keepPreviousData(previousData),
		refetchOnMount: false,
		refetchOnWindowFocus: false,
		retry: 0,
		staleTime: Infinity
	});

	return {
		data,
		isError,
		fetchNextPage,
		isFetching,
	};
};

export default useGetCarList;