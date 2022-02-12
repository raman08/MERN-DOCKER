import './App.css';
import Home from './Pages/Home';
import DetailsView from './Pages/DetailsView';
import Header from './components/Header';
import { Route, Routes } from 'react-router-dom';
import CreateView from './Pages/CreateView';
import Auth from './Pages/Auth';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { userProfile } from './service/api';
import PrivateRoute from './components/ProtectedRoutes';

function App() {
	const navigate = useNavigate();

	const [user, setUser] = useState();
	const [isAuth, setIsAuth] = useState(false);

	const logoutHandler = () => {
		console.log('Logging Out');
		localStorage.clear();
		setUser(null);
		setIsAuth(false);
		navigate('/auth');
	};

	useEffect(() => {
		const token = localStorage.getItem('content-authToken');

		console.log(token);

		if (!token) {
			console.log('redirecting to auth');
			navigate('/auth');
			return;
		}

		const validateToken = async token => {
			try {
				const response = await userProfile(token);
				console.log(response);
				setUser(response.data);
				setIsAuth(true);
				navigate('/home');
			} catch (err) {
				console.log(err);
				navigate('/auth');
			}
		};

		validateToken(token);
	}, []);

	return (
		<>
			<Header user={user} isAuth={isAuth} logoutHandler={logoutHandler} />
			<Routes>
				<Route
					path="/home"
					exact
					element={<PrivateRoute component={Home} isAuth={isAuth} />}
				/>
				{/* <Route */}
				{/* 	path="/home" */}
				{/* 	exact */}
				{/* 	element={<Home user={user} isAuth={isAuth} />} */}
				{/* /> */}
				<Route
					path="/content/:contentId"
					element={
						<PrivateRoute
							component={DetailsView}
							user={user}
							isAuth={isAuth}
						/>
					}
				/>
				<Route
					path="/create"
					element={
						<PrivateRoute
							component={CreateView}
							user={user}
							isAuth={isAuth}
						/>
					}
				/>
				<Route
					path="/edit/:contentId"
					element={
						<CreateView isAuth={isAuth} user={user} edit />
						// <PrivateRoute
						// component={CreateView}
						// />
					}
				/>

				<Route
					path="/auth"
					element={
						<Auth
							setUser={setUser}
							isAuth={isAuth}
							// setIsAuth={val => setIsAuth(val)}
							setIsAuth={setIsAuth}
							user={user}
						/>
					}
				/>
			</Routes>
		</>
	);
}

export default App;
