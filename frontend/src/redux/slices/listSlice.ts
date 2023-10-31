import { createSlice, Middleware } from '@reduxjs/toolkit';
import { RootState } from '../store';
import { isNullOrEmpty } from '../../shared/utils';
import { CarColor } from '../../shared/carOptions';

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
		color: CarColor.Unset
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

	const argument = (api.getState() as RootState).listSlice.filters.brand.argument;
	if (type === 'listSlice/setBrandFilterState' && !isNullOrEmpty(argument)){
		const state = action.payload;

		if (state){
			api.dispatch(actions.setBrandFilterQueryArgument(argument));
			return;
		}
		api.dispatch(actions.setBrandFilterQueryArgument(''));
	}
};
