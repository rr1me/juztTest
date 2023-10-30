import { createSlice, Middleware } from '@reduxjs/toolkit';
import { CarColor } from '../../entites/CarCard/CarCard';
import { RootState } from '../store';
import { isNullOrEmpty } from '../../shared/utils';

enum Sort {
	unset,
	upwards,
	downwards
}

type ListData = {
	yearSorting: Sort,
	priceSorting: Sort,
	filters: {
		brand: {
			active: boolean,
			argument: string,
			queryArgument: string
		},
		color: CarColor
	}
}

const initialState: ListData = {
	yearSorting: Sort.unset,
	priceSorting: Sort.unset,
	filters: {
		brand: {
			active: false,
			argument: '',
			queryArgument: '',
		},
		color: CarColor.unset
	}
};

const listSlice = createSlice({
	name: 'listSlice',
	initialState,
	reducers: {
		setYearSort: (state, { payload }: {payload: Sort}) => {
			state.yearSorting = payload;
		},
		setPriceSort: (state, { payload }: {payload: Sort}) => {
			state.priceSorting = payload;
		},
		setBrandFilterState: ({ filters: { brand } }, { payload }: {payload: boolean}) => {
			console.log(payload);
			brand.active = payload;
		},
		setBrandFilterArgument: ({ filters: { brand } }, { payload }: {payload: string}) => {
			brand.argument = payload;
			brand.queryArgument = payload;
		},
		setBrandFilterQueryArgument: ({ filters: { brand } }, { payload }: {payload: string}) => {
			brand.queryArgument = payload;
		},
		setColorFilter: ({ filters }, { payload }: {payload: CarColor}) => {
			filters.color = payload;
		}
	}
});

export default listSlice.reducer;
export const actions = listSlice.actions;

export const saveReportMiddleware: Middleware = api => next => action => {
	next(action);
	const type = action.type as string;

	console.log(type);

	console.log(action);

	const argument = (api.getState() as RootState).listSlice.filters.brand.argument;
	if (type === 'listSlice/setBrandFilterState' && !isNullOrEmpty(argument)){
		const state = action.payload;

		if (state){
			api.dispatch(actions.setBrandFilterQueryArgument(argument));
			return;
		}
		api.dispatch(actions.setBrandFilterQueryArgument(''));
	}

	// if (type === 'saveReport/fulfilled' && action.meta.arg === 0) {
	// 	// api.dispatch(actions.dropState());
	// }
};
