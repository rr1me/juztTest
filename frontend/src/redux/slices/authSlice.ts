import { createSlice } from '@reduxjs/toolkit';
import { login, verify } from '../thunks/auth';

export enum Authorized {
	unknown,
	verified,
	restricted
}

type AuthData = {
	authorized: Authorized,
	authorizationError: boolean,
	username: string,
	password: string
}

const initialState: AuthData = {
	authorized: Authorized.unknown,
	authorizationError: false,
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

			.addCase(login.pending, state => {
				if(state.authorizationError)
					state.authorizationError = false;
			})
			.addCase(login.fulfilled, state => {
				state.authorized = Authorized.verified;
			})
			.addCase(login.rejected, state => {
				state.authorizationError = true;
			})
		;
	}
});

export default authSlice.reducer;
export const actions = authSlice.actions;
