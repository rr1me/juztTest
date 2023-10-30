import React from 'react';
import './App.scss';
import './reset.css';
import { Provider } from 'react-redux';
import { store } from '../redux/store';
import { RouterProvider } from 'react-router-dom';
import router from '../pages/router';
import 'simplebar-react/dist/simplebar.min.css';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient();

const App = () => (
	<QueryClientProvider client={queryClient}>
		<Provider store={store}>
			<RouterProvider router={router}/>
		</Provider>
	</QueryClientProvider>
);

export default App;
