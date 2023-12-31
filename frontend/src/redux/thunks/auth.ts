import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { RootState } from '../store';
import { API_URL, processRequest } from '../../shared/utils';

export const verify = createAsyncThunk(
	'auth/auth',
	async (_, { rejectWithValue }) => {
		const request = axios.get(`${API_URL}/auth`,
			{ withCredentials: true });
		return await processRequest(request, rejectWithValue);
	}
);

export const login = createAsyncThunk(
	'auth/login',
	async (_, { getState, rejectWithValue }) => {
		const { username, password } = (getState() as RootState).authSlice;

		const request = axios.post(`${API_URL}/auth/login`,
			{ username, password }, { withCredentials: true });
		return await processRequest(request, rejectWithValue);
	}
);
