import s from './ImageUpload.module.scss';
import FieldsetBorder from '../FieldsetBorder/FieldsetBorder';
import React, { ChangeEvent, useEffect, useRef } from 'react';

export const image: {x: File | null} = { x: null };

const ImageUpload = () => {
	const inputRef = useRef<HTMLInputElement>(null);

	const onFileChange = (e: ChangeEvent<HTMLInputElement>) => {
		if (e.target.files)
			image.x = e.target.files[0];
	};

	useEffect(() => {
		if (!inputRef.current || image.x === null) return;
		const dt = new DataTransfer();
		dt.items.add(image.x);
		inputRef.current.files = dt.files;
	}, []);

	return (
		<div className={s.upload}>
			<label className={s.label}>
				Image
			</label>

			<input type="file" className={s.input} accept="image/png, image/jpeg" onChange={onFileChange} ref={inputRef}/>

			<FieldsetBorder label={'Image'}
				labelPlaceStyle={{ maxWidth: '100%', padding: '0 7px', fontSize: '0.85em', marginLeft: '6px' }}
			/>
		</div>
	);
};

export default ImageUpload;
