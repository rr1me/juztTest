import s from './Header.module.scss';
import { Link, useLocation } from 'react-router-dom';
import { useEffect, useRef } from 'react';

const Header = () => {
	const navRef = useRef<HTMLDivElement>(null);
	const tabRef = useRef<HTMLDivElement>(null);

	const { pathname } = useLocation();

	useEffect(() => {
		const nav = navRef.current;
		const tab = tabRef.current;
		if (!nav || !tab) return;

		if (tab.getAttribute('data--current') === pathname) return;

		const element = nav.children.namedItem(pathname)!;

		if (!element){
			tab.style.width = 0 + 'px';
			return;
		}

		const elementRect = element.getBoundingClientRect();

		const difference = elementRect.left - nav.getBoundingClientRect().left - 25;

		tab.style.width = elementRect.width + 'px';
		tab.style.transform = `translateX(${difference}px)`;
		tab.setAttribute('data--current', pathname);
	}, [pathname]);

	return (
		<header className={s.header}>
			<nav className={s.nav} ref={navRef}>
				<Link className={s.link} id={'/'} to={'/'}>Cars</Link>
				<Link className={s.link} id={'/add'} to={'/add'}>Add car</Link>
				<div className={s.tab} ref={tabRef}/>
			</nav>
		</header>
	);
};

export default Header;
