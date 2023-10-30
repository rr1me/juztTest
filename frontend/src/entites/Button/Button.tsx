import s from './Button.module.scss';
import { ButtonHTMLAttributes, forwardRef, ReactNode } from 'react';
import { combinedStyle } from '../../shared/utils';

const Button = forwardRef<HTMLButtonElement, {children: ReactNode, className?: string } & ButtonHTMLAttributes<HTMLButtonElement>>
(({ children, className = '', ...props }, ref) => {
	return (
		<button className={s.button + combinedStyle(!!className, className)} {...props} ref={ref}>
			{children}
		</button>
	);
});
Button.displayName = 'Button';

export default Button;
