import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { Car } from '../../entites/CarCard/CarCard';

export const carListApi = createApi({
	reducerPath: 'carListApi',
	baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:5132/' }),
	tagTypes: ['Cars'],
	endpoints: build => ({
		getCarList: build.query<Car[], {offset?: number, limit?: number}>({
			query: ({ offset, limit }) => `?offset=${offset}&limit=${limit}`,
			providesTags: ['Cars'],
			serializeQueryArgs: ({ endpointName }) => endpointName,
			merge: (currentCache, newItems) => {
				currentCache.push(...newItems);
			},
			forceRefetch: ({ currentArg, previousArg, state, endpointState }) => {
				console.log(currentArg, previousArg, state, endpointState);
				return JSON.stringify(currentArg) !== JSON.stringify(previousArg);
			},
		})
	})
});

export const { useGetCarListQuery } = carListApi;
