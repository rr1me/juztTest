import s from './FieldsetBorder.module.scss';
import React, { CSSProperties, forwardRef } from 'react';
import { combinedStyle } from '../../shared/utils';

const FieldsetBorder = forwardRef<HTMLLegendElement, {label: string, borderStyle?: CSSProperties, labelPlaceStyle?: CSSProperties, className?: string}>
(({ label, borderStyle, labelPlaceStyle, className = '' }, ref) => {
	return (
		<fieldset className={s.fieldsetBorder} style={borderStyle}>
			<legend className={s.legend + combinedStyle(!!className, className)} style={labelPlaceStyle} ref={ref}>
				<span>{label}</span>
			</legend>
		</fieldset>
	);
});
FieldsetBorder.displayName = 'FieldsetBorder';

export default FieldsetBorder;
