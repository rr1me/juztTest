import s from './CheckedLabeledInput.module.scss';
import LabeledInput, { LabeledInputProps } from '../LabeledInput/LabeledInput';
import { RefObject } from 'react';
import { combinedStyle } from '../../shared/utils';

const CheckedLabeledInput = ({ onCheckboxStateChange, isChecked, ref, ...props }:
	{ref?: RefObject<HTMLDivElement>} & LabeledInputProps & {onCheckboxStateChange: (s: boolean) => void, isChecked: boolean}) => {

	const onCheckboxClick = () => onCheckboxStateChange(!isChecked);

	return (
		<div className={s.checkedInput} ref={ref}>
			<div className={s.checkboxWrapper}>
				<label className={s.checkbox + combinedStyle(isChecked, s.checkedCheckbox)} onClick={onCheckboxClick}/>
			</div>
			<LabeledInput readOnly={!isChecked} borderStyle={{ borderRadius: '0 5px 5px 0' }}
				className={s.input + combinedStyle(!isChecked, s.readOnlyInput)} {...props}/>
		</div>
	);
};

export default CheckedLabeledInput;
