import { configureStore } from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import listSlice, { saveReportMiddleware } from './slices/listSlice';

export const store = configureStore({
	reducer: {
		listSlice
	},
	middleware: getDefaultMiddleware => getDefaultMiddleware().concat(saveReportMiddleware)
});

export type RootState = ReturnType<typeof store.getState>
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
export const useAppDispatch: () => typeof store.dispatch = useDispatch;
