import { createBrowserRouter, isRouteErrorResponse, useRouteError } from 'react-router-dom';
import Layout from './Layout';
import CarList from './CarList/CarList';
import CarDetails from './CarDetails/CarDetails';
import AddCar from './AddCar/AddCar';

const RootBoundary = () => {
	const error = useRouteError();
	console.log(error);

	if (isRouteErrorResponse(error)) {
		if (error.status === 404) {
			return <div>This page doesn&apos;t exist!</div>;
		}

		if (error.status === 401) {
			return <div>You aren&apos;t authorized to see this</div>;
		}

		if (error.status === 503) {
			return <div>Looks like our API is down</div>;
		}

		if (error.status === 418) {
			return <div>🫖</div>;
		}
	}

	return <div>Something went wrong</div>;
};

const router = createBrowserRouter([
	{
		path: '/',
		element: <Layout/>,
		children: [
			{
				path: '',
				element: <CarList/>
			},
			{
				path: 'car/:id',
				element: <CarDetails/>
			},
			{
				path: 'add',
				element: <AddCar/>
			}
		],
		errorElement: <RootBoundary/>
	}
]);

export default router;
