import { useAppDispatch, useAppSelector } from '../../redux/store';
import { useLayoutEffect } from 'react';
import Auth from '../../widgets/Auth/Auth';
import { Authorized } from '../../redux/slices/authSlice';
import { verify } from '../../redux/thunks/auth';
import AddCarSection from '../../widgets/AddCarSection/AddCarSection';

const AddCar = () => {
	const dispatch = useAppDispatch();
	const authorized = useAppSelector(s => s.authSlice.authorized);

	useLayoutEffect(() => {
		if (authorized === Authorized.unknown) dispatch(verify());
	}, []);

	switch (authorized) {
	case Authorized.unknown:
		return (
			<></>
		);
	case Authorized.restricted:
		return (
			<Auth/>
		);
	case Authorized.verified:
		return (
			<AddCarSection/>
		);
	}
};

export default AddCar;
