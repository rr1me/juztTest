import s from './Auth.module.scss';
import LabeledInput from '../../features/LabeledInput/LabeledInput';
import Button from '../../entites/Button/Button';
import { useAppDispatch, useAppSelector } from '../../redux/store';
import { actions } from '../../redux/slices/authSlice';
import { ChangeEvent, FormEvent } from 'react';
import { login } from '../../redux/thunks/auth';

const { setUsername, setPassword } = actions;

const Auth = () => {
	const dispatch = useAppDispatch();

	const onSubmit = (e: FormEvent) => {
		e.preventDefault();

		dispatch(login());
	};

	return (
		<section className={s.auth}>
			<form className={s.form} onSubmit={onSubmit}>
				<UsernameInput/>
				<PasswordInput/>
				<Button className={s.button} type='submit'>Submit</Button>
				<article className={s.info}>
					Just because its a test task and there was no requirements for full auth system, which include registration, email checking, help mechanisms, etc.
					<br/> you can use these credentials: user | 123456
				</article>
			</form>
		</section>
	);
};

export default Auth;

const UsernameInput = () => {
	const dispatch = useAppDispatch();
	const username = useAppSelector(s=>s.authSlice.username);

	const onUsernameChange = (e: ChangeEvent<HTMLInputElement>) => dispatch(setUsername(e.target.value));

	return (
		<LabeledInput label={'Username'} className={s.input} onChange={onUsernameChange} value={username}/>
	);
};

const PasswordInput = () => {
	const dispatch = useAppDispatch();
	const password = useAppSelector(s=>s.authSlice.password);

	const onUsernameChange = (e: ChangeEvent<HTMLInputElement>) => dispatch(setPassword(e.target.value));

	return (
		<LabeledInput label={'Password'} className={s.input} onChange={onUsernameChange} value={password}/>
	);
};
