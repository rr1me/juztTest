import s from './Selector.module.scss';
import React, { useRef, useState } from 'react';
import Modal from '../../entites/Modal/Modal';
import { IoIosArrowDown } from 'react-icons/io';
import { combinedStyle } from '../../shared/utils';
import FieldsetBorder from '../../entites/FieldsetBorder/FieldsetBorder';
import SimpleBar from 'simplebar-react';

const Selector = ({ label = '', options, value, onChange, className = '', }:
	{label?: string, options: string[], value: number,
		onChange: (e:number) => void, className?: string}) => {
	const controlRef = useRef(null);
	const [open, setOpen] = useState(false);

	const onControlClick = (e: React.MouseEvent<HTMLDivElement>) => {
		e.stopPropagation();
		setOpen(true);
	};
	const onClickHandle = (v:number) => () => {
		onChange(v);
		onModalClose();
	};

	const onModalClose = () => setOpen(false);

	return (
		<>
			<div className={s.control + combinedStyle(!!className, className)}
					 onClick={onControlClick} ref={controlRef}>

				{label &&
          <div className={s.label}>
          	{label}
          </div>
				}

				<div className={s.inner}>
					{options[value]}
					<div className={s.innerEnd}>
						<div className={s.tab}/>
						<div className={s.arrow} style={{ transform: open ? 'rotate(180deg)' : 'none' }}><IoIosArrowDown/></div>
					</div>
				</div>

				<FieldsetBorder label={label}
					labelPlaceStyle={{ maxWidth: !label ? '0.01px' : '100%', padding: !label ? '0' : '0 5px', fontSize: '0.85em' }}
					className={s.fieldsetBorder}/>
			</div>

			<Modal anchor={controlRef.current} state={open} onClose={onModalClose} sx={{ marginTop: 5 }}>
				<SimpleBar style={{ maxHeight: 200 }} forceVisible='x' autoHide={false}>
					<div className={s.modalInner}>
						{options.map((v, i) => {
							return (
								<span key={v} className={s.item} onClick={onClickHandle(i)}>{v}</span>
							);
						})}
					</div>
				</SimpleBar>
			</Modal>
		</>
	);
};

export default Selector;
