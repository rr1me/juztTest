import { createSlice } from '@reduxjs/toolkit';
import { Car, CarColor, Engine, Transmission } from '../../shared/carOptions';
import addCar from '../thunks/addCar';
import notify from '../../shared/notify';

export type AddCarData = Omit<Car, 'image' | 'price' | 'id' | 'year' | 'cruisingRange'> & {price: string, year: string, cruisingRange: string}

const initialState: AddCarData = {
	brand: '',
	model: '',
	color: CarColor.Unset,
	price: '',
	year: '',
	engine: Engine.Gasoline,
	transmission: Transmission.Auto,
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
		setCruisingRange: getSetter<'cruisingRange'>('cruisingRange')
	},
	extraReducers: b => {
		b
			.addCase(addCar.fulfilled, () => {
				notify('Your car successfully added');
			})
			.addCase(addCar.rejected, (state, { payload }) => {
				notify(payload as string, 'error');
			})
	}
});

export default addCarSlice.reducer;
export const actions = addCarSlice.actions;
