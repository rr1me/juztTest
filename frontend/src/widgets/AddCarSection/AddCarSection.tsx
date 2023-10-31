import s from './AddCarSection.module.scss';
import LabeledInput from '../../features/LabeledInput/LabeledInput';
import { useAppDispatch, useAppSelector } from '../../redux/store';
import { ChangeEvent } from 'react';
import { actions, AddCarData } from '../../redux/slices/addCarSlice';
import { PayloadAction } from '@reduxjs/toolkit';
import Selector from '../../features/Selector/Selector';
import { carColorOptions, carEngineOptions, carTransmissionOptions } from '../../shared/carOptions';

const {
	setBrand,
	setModel,
	setColor,
	setYear,
	setPrice,
	setEngine,
	setTransmission,
	setCruisingRange
} = actions;

const AddCarSection = () => {
	return (
		<section className={s.addCarSection}>
			<form className={s.form}>
				<InputWrapped label={'Brand'} sliceField={'brand'} reducer={setBrand}/>
				<InputWrapped label={'Model'} sliceField={'model'} reducer={setModel}/>
				<InputWrapped label={'Year'} sliceField={'year'} reducer={setYear}/>
				<InputWrapped label={'Price'} sliceField={'price'} reducer={setPrice}/>
				<SelectorWrapped label={'Color'} sliceField={'color'} options={carColorOptions} reducer={setColor}/>
				<SelectorWrapped label={'Engine'} sliceField={'engine'} options={carEngineOptions} reducer={setEngine}/>
				<SelectorWrapped label={'Transmission'} sliceField={'transmission'} options={carTransmissionOptions} reducer={setTransmission}/>
				<input type='file'/>
			</form>
		</section>
	);
};

export default AddCarSection;

type WrappedComponent<T, E> = {
	label: string,
	sliceField: keyof E,
	reducer: (data: T) => PayloadAction<T>
};

const InputWrapped = ({ label, sliceField, reducer }: WrappedComponent<string, Omit<AddCarData, 'image'>>) => {
	const dispatch = useAppDispatch();
	const value = useAppSelector(s=>s.addCarSlice[sliceField]);

	const onInputChange = (e: ChangeEvent<HTMLInputElement>) => dispatch(reducer(e.target.value));

	return <LabeledInput label={label} className={s.input} onChange={onInputChange} value={value}/>;
};

const SelectorWrapped = ({ label, options, sliceField, reducer }:
	WrappedComponent<number, Pick<AddCarData, 'color' | 'engine' | 'transmission'>> & {options: string[]}) => {
	const dispatch = useAppDispatch();
	const value = useAppSelector(s=>s.addCarSlice[sliceField]);

	const onSelectorChange = (v: number) => dispatch(reducer(v));

	return <Selector label={label} options={options} value={value} onChange={onSelectorChange}/>;
};
