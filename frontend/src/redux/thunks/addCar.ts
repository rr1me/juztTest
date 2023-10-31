import { createAsyncThunk } from '@reduxjs/toolkit';
import { isNullOrEmpty, processRequest } from '../../shared/utils';
import { CarColor, Engine } from '../../shared/carOptions';
import { image } from '../../entites/ImageUpload/ImageUpload';
import { RootState } from '../store';
import axios from 'axios';

const addCar = createAsyncThunk(
	'addCar',
	async (_, { getState, rejectWithValue }) => {
		const addCarSlice = (getState() as RootState).addCarSlice;
		const {
			brand,
			color,
			cruisingRange,
			engine,
			model,
			price,
			year } = addCarSlice;

		const formData = new FormData();
		formData.append('image', image.x!);

		Object.entries(addCarSlice).forEach(v => {
			const key = v[0];
			const value = v[1];

			formData.append(key, value + '');
		});

		if (isNullOrEmpty(brand) || isNullOrEmpty(model) || isNullOrEmpty(price) || isNullOrEmpty(year) ||
			color === CarColor.Unset || (engine === Engine.Electrical && isNullOrEmpty(cruisingRange)) || image.x === null){
			//
			return rejectWithValue('Please, fill every available input. Also, your color should be any other than unset');
		}

		const url = process.env.REACT_APP_API!;
		const request = axios.put(url, formData, { withCredentials: true });
		return processRequest(request, rejectWithValue);
	}
);

export default addCar;
