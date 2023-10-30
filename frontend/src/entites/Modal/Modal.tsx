import React, { CSSProperties, ReactNode, useLayoutEffect, useRef } from 'react';
import s from './Modal.module.scss';
import { createPortal } from 'react-dom';

const Modal = ({ anchor, state, onClose, children, sx }:
	{ anchor: HTMLElement | undefined | null, state: boolean, onClose?: () => void, children: ReactNode, sx?: CSSProperties }) => {
	const modalRef = useRef<HTMLDivElement>(null);

	useLayoutEffect(() => {
		const modal = modalRef.current;
		if (!anchor || !modal) return;
		const anchorRect = anchor.getBoundingClientRect();
		const width = anchorRect.width;

		const style = modal.style;
		if (!sx?.width) {
			style.width = width + 'px';
		}

		style.left = anchorRect.left + 'px';
		style.top = anchorRect.top + anchorRect.height + 'px';

		if (!state) return;

		const resizeEvent = () =>
			style.left = anchor.getBoundingClientRect().left + 'px';
		window.addEventListener('resize', resizeEvent);

		const scrollEvent = () => {
			const anchorRect = anchor.getBoundingClientRect();
			style.top = anchorRect.top + anchorRect.height + 'px';
		};

		window.addEventListener('scroll', scrollEvent);

		return () => {
			window.removeEventListener('resize', resizeEvent);
			window.removeEventListener('scroll', scrollEvent);
		};
	}, [state]);

	const onCloseWrapperClick = () => onClose && onClose();
	const onStopPropagationClick = (e: React.MouseEvent) => e.stopPropagation();

	if (!state) return null;
	return createPortal(
	  <div className={s.closeWrapper} onClick={onCloseWrapperClick}>
			<div className={s.modal} onClick={onStopPropagationClick} ref={modalRef} style={sx}>
				{children}
			</div>
	  </div>,
	  document.body
	);
};
export default Modal;
