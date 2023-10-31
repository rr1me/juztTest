import { AxiosPromise } from 'axios';

export const combinedStyle = (condition: boolean, style: string) => condition ? ' ' + style : '';

// export const delay = (t: number) => new Promise(x => setTimeout(x, t));

export const isNullOrEmpty = (s: string) => !s || !!s.match(/^ *$/);

export const processRequest = async (request: AxiosPromise, rejectWithValue: (v: string) => void) => {
	try{
		await request;
		return;
	}catch (_) {
		return rejectWithValue('Unauthorized');
	}
};
