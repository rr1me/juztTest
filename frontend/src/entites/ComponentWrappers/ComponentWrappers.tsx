import { AddCarData } from '../../redux/slices/addCarSlice';
import { useAppDispatch, useAppSelector } from '../../redux/store';
import Selector from '../../features/Selector/Selector';
import { PayloadAction } from '@reduxjs/toolkit';
import { ChangeEvent } from 'react';
import LabeledInput from '../../features/LabeledInput/LabeledInput';

type WrappedComponent<T, E> = {
	label: string,
	sliceField: keyof E,
	reducer: (data: T) => PayloadAction<T>,
	className?: string,
	returnProcessor?: (s: string) => string
};

export const SelectorWrapped = ({ label, options, sliceField, reducer, className = '' }:
	WrappedComponent<number, Pick<AddCarData, 'color' | 'engine' | 'transmission'>> & {options: string[]}) => {
	const dispatch = useAppDispatch();
	const value = useAppSelector(s=>s.addCarSlice[sliceField]);

	const onSelectorChange = (v: number) => dispatch(reducer(v));

	return <Selector label={label} options={options} value={value} onChange={onSelectorChange} className={className}/>;
};

export const InputWrapped = ({ label, sliceField, reducer, className = '', returnProcessor }:
	WrappedComponent<string, Omit<AddCarData, 'image'>>) => {
	const dispatch = useAppDispatch();
	const value = useAppSelector(s=>s.addCarSlice[sliceField]);

	const onInputChange = (e: ChangeEvent<HTMLInputElement>) => {
		const v = e.target.value;
		dispatch(reducer(returnProcessor ? returnProcessor(v) : v));
	};

	return <LabeledInput label={label} onChange={onInputChange} value={value} className={className}/>;
};
