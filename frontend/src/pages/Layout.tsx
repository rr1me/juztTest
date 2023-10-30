import s from './Layout.module.scss';
import { Outlet } from 'react-router-dom';
import Header from '../widgets/Header/Header';

const Layout = () => {
	return (
		<div className={s.layout}>
			<Header/>
			<div className={s.content}>
				<Outlet/>
			</div>
		</div>
	);
};

export default Layout;
