import { AxiosPromise } from 'axios';

export const API_URL = process.env.REACT_APP_API!;

export const combinedStyle = (condition: boolean, style: string) => condition ? ' ' + style : '';

export const isNullOrEmpty = (s: string) => !s || !!s.match(/^ *$/);

export const processRequest = async (request: AxiosPromise, rejectWithValue: (v: string) => void) => {
	try{
		await request;
		return;
	}catch (_) {
		return rejectWithValue('Unauthorized');
	}
};
