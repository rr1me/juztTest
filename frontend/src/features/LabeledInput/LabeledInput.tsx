import s from './Labelednput.module.scss';
import React, { CSSProperties, HTMLProps, memo, useEffect, useRef, useState } from 'react';
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

	const inputRef = useRef<HTMLInputElement>(null);
	const labelRef = useRef<HTMLLabelElement>(null);
	const fieldsetRef = useRef<HTMLLegendElement>(null);

	useEffect(() => {
		if (isFirstRender || !inputRef.current || !labelRef.current || !fieldsetRef.current) return;

		const labelStyle = labelRef.current.style;
		const legendStyle = fieldsetRef.current.style;

		if (!focus) {
			if (inputRef.current.value !== '') return;

			labelStyle.top = 8 + 'px'; // like their top-left props in scss
			labelStyle.left = 10 + 'px';
			labelStyle.fontSize = '14px';

			legendStyle.maxWidth = '0.01px';
			legendStyle.padding = '0';
			return;
		}

		if (focus) {
			labelStyle.top = -9 + 'px';
			labelStyle.left = 6 + 'px';
			labelStyle.fontSize = '12px';

			legendStyle.maxWidth = '100%';
			legendStyle.padding = '0 5px';
		}

	}, [focus]);

	const focusEvent = (x: boolean) => () => setFocus(x);

	const inputClassName = s.inputWrapper
		// + combinedStyle(!!readOnly, s.readOnly)
    + combinedStyle(!!className, className)
    + combinedStyle(invisible, s.inputInvisible)
    + combinedStyle(error, s.error);

	return (
		<div className={inputClassName} style={borderStyle}>
			<input {...props} className={s.input} ref={inputRef} onFocus={focusEvent(true)} onBlur={focusEvent(false)} disabled={readOnly}/>

			<label className={s.label} ref={labelRef}>{label}</label>

			<FieldsetBorder label={label} className={s.fieldsetBorder} ref={fieldsetRef}
				borderStyle={borderStyle} labelPlaceStyle={{ fontSize: '0.75em' }}/>
		</div>
	);
};

export default memo(LabeledInput);
