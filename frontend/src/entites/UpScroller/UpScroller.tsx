import s from './UpScroller.module.scss';
import { useEffect, useState } from 'react';
import { FaLongArrowAltUp } from 'react-icons/fa';
import { animateScroll as scroll } from 'react-scroll';

const UpScroller = () => {
	const [show, setShow] = useState(false);

	useEffect(() => {
		const onScroll = () => {
			if (window.scrollY >= 1500) {
				setShow(true);
				return;
			}

			if (window.scrollY <= 1500) setShow(false);
		};

		document.addEventListener('scroll', onScroll);
		return () => document.removeEventListener('scroll', onScroll);
	}, []);

	const onUpScrollerClick = () => scroll.scrollToTop();

	return (
		<div className={s.upScroller} style={{ transform: show ? 'translateY(0%)' : 'translateY(-100%)' }} onClick={onUpScrollerClick}>
			<div className={s.content}>
				<FaLongArrowAltUp/>
			</div>
		</div>
	);
};

export default UpScroller;
