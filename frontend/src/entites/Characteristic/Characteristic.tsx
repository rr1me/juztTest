import s from './Characteristic.module.scss';
import { Car } from '../../shared/carOptions';

const Characteristic = ({ label, field }: {label: string | number, field?: Car[keyof Car]}) => {
	return (
		<article className={s.characteristic}>
			<p>{label}</p>
			<div className={s.tab}/>
			<p>{field}</p>
		</article>
	);
};

export default Characteristic;
