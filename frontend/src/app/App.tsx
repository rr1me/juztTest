import React from 'react';
import './App.scss';
import './reset.css';
import { Provider } from 'react-redux';
import { store } from '../redux/store';
import { RouterProvider } from 'react-router-dom';
import router from '../pages/router';
import 'simplebar-react/dist/simplebar.min.css';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { SnackbarProvider } from 'notistack';

const queryClient = new QueryClient();

const App = () => (
	<SnackbarProvider maxSnack={4} autoHideDuration={5000}>
		<QueryClientProvider client={queryClient}>
			<Provider store={store}>
				<RouterProvider router={router}/>
			</Provider>
		</QueryClientProvider>
	</SnackbarProvider>
);

export default App;
