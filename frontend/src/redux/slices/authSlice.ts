import { createSlice } from '@reduxjs/toolkit';
import { login, verify } from '../thunks/auth';
import notify from '../../shared/notify';

export enum Authorized {
	unknown,
	verified,
	restricted
}

type AuthData = {
	authorized: Authorized,
	username: string,
	password: string
}

const initialState: AuthData = {
	authorized: Authorized.unknown,
	username: '',
	password: ''
};

const authSlice = createSlice({
	name: 'authSlice',
	initialState,
	reducers: {
		setUsername: (state, { payload }: {payload: string}) => {
			state.username = payload;
		},
		setPassword: (state, { payload }: {payload: string}) => {
			state.password = payload;
		}
	},
	extraReducers: b => {
		b
			.addCase(verify.fulfilled, state => {
				state.authorized = Authorized.verified;
			})
			.addCase(verify.rejected, state => {
				state.authorized = Authorized.restricted;
			})

			.addCase(login.fulfilled, state => {
				state.authorized = Authorized.verified;
			})
			.addCase(login.rejected, () => {
				notify('Something went wrong', 'error');
			})
		;
	}
});

export default authSlice.reducer;
export const actions = authSlice.actions;
