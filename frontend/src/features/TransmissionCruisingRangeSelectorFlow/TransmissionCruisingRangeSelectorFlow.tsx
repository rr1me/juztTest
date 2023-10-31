import s from './TransmissionCruisingRangeSelectorFlow.module.scss';
import { useAppSelector } from '../../redux/store';
import { useEffect, useRef } from 'react';
import { InputWrapped, SelectorWrapped } from '../../shared/componentWrappers';
import { carTransmissionOptions, Engine } from '../../shared/carOptions';
import { actions } from '../../redux/slices/addCarSlice';
import { useIsFirstRender } from '../../shared/hooks';

const {
	setTransmission,
	setCruisingRange
} = actions;

const TransmissionCruisingRangeSelectorFlow = () => {
	const engine = useAppSelector(s=>s.addCarSlice.engine);
	const innerRef = useRef<HTMLDivElement>(null);

	const isFirstRender = useIsFirstRender();
	useEffect(() => {
		const inner = innerRef.current;
		if (isFirstRender || !inner) return;

		const style = innerRef.current.style;

		if (engine !== Engine.Electrical){
			if (!style.transform) return;
			style.transform = '';
			return;
		}

		style.transform = 'translateX(calc((-100% - 5px)))';
	}, [engine]);

	return (
		<div className={s.flow}>
			<div className={s.inner} ref={innerRef}>
				<SelectorWrapped label={'Transmission'} sliceField={'transmission'}
												 options={carTransmissionOptions} reducer={setTransmission}/>
				<InputWrapped className={s.secondElement} label={'Cruising range'} sliceField={'cruisingRange'} reducer={setCruisingRange}/>
			</div>
		</div>
	);
};

export default TransmissionCruisingRangeSelectorFlow;
