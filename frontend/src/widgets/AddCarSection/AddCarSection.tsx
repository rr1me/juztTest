import s from './AddCarSection.module.scss';
import { actions } from '../../redux/slices/addCarSlice';
import { carColorOptions, carEngineOptions, carTransmissionOptions } from '../../shared/carOptions';
import { InputWrapped, SelectorWrapped } from '../../shared/componentWrappers';
import TransmissionCruisingRangeSelectorFlow
	from '../../features/TransmissionCruisingRangeSelectorFlow/TransmissionCruisingRangeSelectorFlow';
import ImageUpload from '../../entites/ImageUpload/ImageUpload';
import Button from '../../entites/Button/Button';
import { FormEvent } from 'react';
import { useAppDispatch } from '../../redux/store';
import addCar from '../../redux/thunks/addCar';
import { useQueryClient } from '@tanstack/react-query';

const {
	setBrand,
	setModel,
	setColor,
	setYear,
	setPrice,
	setEngine,
} = actions;

const AddCarSection = () => {
	const q = useQueryClient();
	const dispatch = useAppDispatch();

	const onSubmitClick = async (e: FormEvent) => {
		e.preventDefault();
		const i = await dispatch(addCar());
		if (i.meta.requestStatus !== 'rejected')
			q.getQueryCache().getAll().forEach(x => {
				if (x.options.queryKey && x.options.queryKey[0] === 'filters')
					x.reset();
			});
	};

	return (
		<section className={s.addCarSection}>
			<form className={s.form} onSubmit={onSubmitClick}>
				<InputWrapped label={'Brand'} sliceField={'brand'} reducer={setBrand}/>
				<InputWrapped label={'Model'} sliceField={'model'} reducer={setModel}/>
				<InputWrapped label={'Year'} sliceField={'year'} reducer={setYear} returnProcessor={onlyDigits}/>
				<InputWrapped label={'Price'} sliceField={'price'} reducer={setPrice} returnProcessor={onlyDoubles}/>
				<SelectorWrapped label={'Color'} sliceField={'color'} options={carColorOptions} reducer={setColor}/>
				<SelectorWrapped label={'Engine'} sliceField={'engine'} options={carEngineOptions} reducer={setEngine}/>
				<TransmissionCruisingRangeSelectorFlow/>
				<ImageUpload/>
				<Button className={s.button}>Submit</Button>
			</form>
		</section>
	);
};

export default AddCarSection;

const onlyDoubles = (s: string) => {
	const match = s.match(/\d+\.\d*|\.?\d+/);

	return match ? match[0] : '';
};

const onlyDigits = (s: string) => {
	const match = s.match(/^\d{1,4}/);

	return match ? match[0] : '';
};
