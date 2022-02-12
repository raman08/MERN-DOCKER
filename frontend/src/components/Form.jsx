import { Button, Grid, TextField, Typography } from '@mui/material';
import { useFormik } from 'formik';
import { useEffect } from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup';

import { registerUser, loginUser } from '../service/api';

const Form = ({ register, setIsAuth }) => {
	const navigate = useNavigate();

	const submitHandler = async value => {
		console.log('Submitting User Auth Form');
		if (register) {
			const response = await registerUser(value);
			console.log(response);
			localStorage.setItem('content-authToken', response.token);
			setIsAuth(true);
			navigate('/home');
		} else {
			const response = await loginUser(value);
			console.log(response);
			localStorage.setItem('content-authToken', response.token);
			setIsAuth(true);
			navigate('/home');
		}
	};

	const validationSchemaSignUp = Yup.object().shape({
		email: Yup.string()
			.email('E-mail is not valid!')
			.required('E-mail is required!'),
		password: Yup.string()
			.min(10, 'Password has to be longer than 10 characters!')
			.required('Password is required!'),
	});

	const validationSchemaLogin = Yup.object().shape({
		email: Yup.string()
			.email('E-mail is not valid!')
			.required('E-mail is required!'),
		password: Yup.string().required('Password is required!'),
	});

	const formik = useFormik({
		initialValues: {
			email: '',
			password: '',
		},
		validationSchema: register
			? validationSchemaSignUp
			: validationSchemaLogin,
		onSubmit: submitHandler,
	});

	return (
		<form onSubmit={formik.handleSubmit}>
			<Grid
				sx={{
					padding: 10,
					height: '60vh',
					margin: '0 auto',
					display: 'flex',
					alignItems: 'center',
					justifyContent: 'space-evenly',
					flexDirection: 'column',
					'&>*': {
						width: '100%',
					},
				}}
			>
				<Typography
					sx={{
						fontSize: '20px',
						fontWeight: 'bold',
						textAlign: 'center',
					}}
				>
					{register ? 'Register to continue' : 'Login to continue'}
				</Typography>

				<TextField
					id="email"
					variant="outlined"
					label="Email"
					value={formik.values.email}
					onChange={formik.handleChange}
					error={formik.touched.email && Boolean(formik.errors.email)}
					helperText={formik.touched.email && formik.errors.email}
				/>

				<TextField
					id="password"
					variant="outlined"
					label="Password"
					value={formik.values.password}
					onChange={formik.handleChange}
					error={
						formik.touched.password &&
						Boolean(formik.errors.password)
					}
					helperText={
						formik.touched.password && formik.errors.password
					}
				/>
				<Button
					variant="contained"
					sx={{ margin: '2px 0' }}
					// onClick={formik.handleSubmit}
					type="submit"
				>
					{register ? 'SignUp' : 'Login'}
				</Button>
			</Grid>
		</form>
	);
};

export default Form;
