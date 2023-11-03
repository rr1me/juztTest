import s from './Labelednput.module.scss';
import React, { CSSProperties, HTMLProps, memo, useLayoutEffect, useRef, useState } from 'react';
import { combinedStyle } from '../../shared/utils';
import FieldsetBorder from '../../entites/FieldsetBorder/FieldsetBorder';
import { useIsFirstRender } from '../../shared/hooks';

export type LabeledInputProps = {
	label: string;
	className?: string;
	invisible?: boolean;
	error?: boolean;
	borderStyle?: CSSProperties
} & HTMLProps<HTMLInputElement>

const LabeledInput = ({
	label,
	className = '',
	invisible = false,
	error = false,
	readOnly,
	borderStyle,
	...props
}: LabeledInputProps) => {
	const isFirstRender = useIsFirstRender();
	const [focus, setFocus] = useState(false);

	const elemRef = useRef<HTMLDivElement>(null);
	const inputRef = useRef<HTMLInputElement>(null);
	const labelRef = useRef<HTMLLabelElement>(null);
	const fieldsetRef = useRef<HTMLLegendElement>(null);

	useLayoutEffect(() => {
		const element = elemRef.current;
		const input = inputRef.current;
		const label = labelRef.current;
		if (!input || !label || !fieldsetRef.current || !element) return;

		const labelStyle = label.style;
		const legendStyle = fieldsetRef.current.style;

		const inputValue = input.value;

		if ((!focus && !isFirstRender) || (inputValue === '' && isFirstRender)) {
			if (inputValue !== '') return;
			const elemRect = element.getBoundingClientRect();
			const inputRect = input.getBoundingClientRect();

			labelStyle.top = inputRect.top - elemRect.top + 'px';
			labelStyle.left = inputRect.left - elemRect.left + 'px';

			labelStyle.fontSize = '14px';

			legendStyle.maxWidth = '0.01px';
			legendStyle.padding = '0';
		}
		else if ((focus && inputValue === '') || (inputValue !== '' && isFirstRender)) {
			const elemRect = element.getBoundingClientRect();
			const inputRect = input.getBoundingClientRect();
			const labelRect = label.getBoundingClientRect();

			labelStyle.top = -(labelRect.height / 2) + 'px';
			labelStyle.left = (inputRect.left - elemRect.left) + 'px';
			labelStyle.fontSize = '0.8em';

			legendStyle.maxWidth = '100%';

			legendStyle.padding = `0 ${(inputRect.left - elemRect.left) / 1.5}px`;
			legendStyle.marginLeft = (inputRect.left - elemRect.left) / 3 + 'px';
		}

		if (isFirstRender){
			requestAnimationFrame(() => {
				labelStyle.transition = '250ms';
			});
		}

	}, [focus]);

	const focusEvent = (x: boolean) => () => setFocus(x);

	const inputClassName = s.inputWrapper
    + combinedStyle(!!className, className)
    + combinedStyle(invisible, s.inputInvisible)
    + combinedStyle(error, s.error);

	return (
		<div className={inputClassName} style={borderStyle} ref={elemRef}>
			<input {...props} className={s.input} ref={inputRef} onFocus={focusEvent(true)} onBlur={focusEvent(false)} disabled={readOnly}/>

			<label className={s.label} ref={labelRef}>{label}</label>

			<FieldsetBorder label={label} className={s.fieldsetBorder} ref={fieldsetRef}
				borderStyle={borderStyle} labelPlaceStyle={{ fontSize: '0.8em' }}/>
		</div>
	);
};

export default LabeledInput;
