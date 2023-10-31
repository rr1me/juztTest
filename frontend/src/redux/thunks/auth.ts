import { createAsyncThunk } from '@reduxjs/toolkit';
import axios, { AxiosPromise } from 'axios';
import { RootState } from '../store';

export const verify = createAsyncThunk(
	'auth/auth',
	async (_, { rejectWithValue }) => {
		const request = axios.get('http://localhost:5132/auth',
			{ withCredentials: true });
		return await processAuthRequest(request, rejectWithValue);
	}
);

export const login = createAsyncThunk(
	'auth/login',
	async (_, { getState, rejectWithValue }) => {
		const { username, password } = (getState() as RootState).authSlice;

		const request = axios.post('http://localhost:5132/auth/login',
			{ username, password }, { withCredentials: true });
		return await processAuthRequest(request, rejectWithValue);
	}
);

const processAuthRequest = async (request: AxiosPromise, rejectWithValue: (v: string) => void) => {
	try{
		await request;
		return;
	}catch (_) {
		return rejectWithValue('Unauthorized');
	}
};
