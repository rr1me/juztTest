import { createSlice } from '@reduxjs/toolkit';
import { Car, CarColor, Engine, Transmission } from '../../shared/carOptions';

export type AddCarData = Omit<Car, 'image' | 'price' | 'id' | 'year' | 'cruisingRange'> & {image: File | null, price: string, year: string, cruisingRange: string}

const initialState: AddCarData = {
	image: null,
	brand: '',
	model: '',
	color: CarColor.Unset,
	price: '',
	year: '',
	engine: Engine.Gasoline,
	transmission: Transmission.Manual,
	cruisingRange: ''
};

const getSetter = <T extends keyof AddCarData>(field: T) =>
	(state: AddCarData, { payload }: {payload: AddCarData[T]}) => {
		state[field] = payload;
	};

const addCarSlice = createSlice({
	name: 'addCarSlice',
	initialState,
	reducers: {
		setBrand: getSetter<'brand'>('brand'),
		setModel: getSetter<'model'>('model'),
		setColor: getSetter<'color'>('color'),
		setPrice: getSetter<'price'>('price'),
		setYear: getSetter<'year'>('year'),
		setEngine: getSetter<'engine'>('engine'),
		setTransmission: getSetter<'transmission'>('transmission'),
		setCruisingRange: getSetter<'cruisingRange'>('cruisingRange'),
	}
});

export default addCarSlice.reducer;
export const actions = addCarSlice.actions;
