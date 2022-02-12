import { Route, Navigate } from 'react-router-dom';

const PrivateRoute = ({ component: Component, isAuth, ...rest }) => {
	return (
		// <Route
		// 	{...rest}
		// 	render={props =>
		isAuth ? <Component {...rest} /> : <Navigate to={'/auth'} />
		// 	}
		// />
	);
};

export default PrivateRoute;
