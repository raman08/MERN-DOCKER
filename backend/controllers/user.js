const bcrypt = require('bcrypt');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const { validationResult } = require('express-validator');

const User = require('../models/user');

exports.getUserProfile = async (req, res, next) => {
	/*
		#swagger.tags = ['Auth']
		#swagger.summary = 'This endpoint will give give information about the active user'
		#swagger.security = [{
				"bearerAuth": []
		}]
	*/
	if (!req.isAuth) {
		/*
			#swagger.responses[403] = {
				description: 'User Not Authorized',
				schema: {
					message: 'User Not Authorized',
				}
			}
		*/
		return res.status(403).json({ message: 'User Not authorized' });
	}

	const userId = req.userId || null;

	const user = await User.findById(userId);

	if (!user) {
		/*
			#swagger.responses[404] = {
				description: 'User Not found',
				schema: {
					message: 'User Not found',
				}
			}
		*/
		return res.status(404).json({ user: 'No user found' });
	}
	return res.status(200).json({
		/*
			#swagger.responses[200] = {
				description: 'user found',
				schema: {
					email: 'fdas@ffas.com',
					id: '3234349ddsf3232'
				}
			}
		*/
		data: {
			email: user.email,
			id: userId,
		},
	});
};

exports.postsignup = async (req, res, next) => {
	try {
		/*
			#swagger.tags = ['Auth']
			#swagger.summary = 'Create A new User'
		*/
		const { email, password } = req.body;

		const errors = validationResult(req);
		const validateErrors = errors.array().map(error => {
			console.log(error);
			return {
				value: error.value,
				msg: error.msg,
				failedAt: error.failedAt,
			};
		});

		if (!errors.isEmpty()) {
			/*
				#swagger.responses[400] = {
					description: 'Invalid Data Response',
					schema: {
						message: 'Invalid Data',
						value: 'User entered Value',
						param: 'The parameter where error is found'
					}
				}
			*/
			return res.status(400).json({ errors: validateErrors });
		}

		const hashedPassword = await bcrypt.hash(password, 12);

		const user = new User({
			email: email,
			password: hashedPassword,
		});

		await user.save();
		console.log('User Created Sucessfully');

		const token = jwt.sign(
			{
				email: user.email,
				id: user._id,
			},
			'This is a seceret',
			{ expiresIn: '1h' }
		);
		/*
			#swagger.responses[201] = {
				description: 'User Created',
				schema: {
					message: "User Created Sucessfully",
					user: "3234fdsjflk323",
					token: "AUTH+TOKEN+FOR+USER"
				}
			}
		*/
		return res.status(201).json({
			user: user._id,
			token: token,
			message: 'User Create Sucessfully',
		});
	} catch (err) {
		console.log(err);
		/*
			#swagger.responses[500] = {
				description: 'User Created',
				schema: {
					message: "Something Went Wrong",
				}
			}
		*/
		return res.status(500).json({ message: 'Something Went Wrong' });
	}
};

exports.postLogin = async (req, res, next) => {
	/*
	#swagger.tags = ['Auth']
	#swagger.summary = 'Login the existing User'
	*/
	const { email, password } = req.body;
	const errors = validationResult(req);

	const validateErrors = errors.array().map(error => {
		return { value: error.value, msg: error.msg };
	});

	if (!errors.isEmpty()) {
		/*
			#swagger.responses[400] = {
				description: 'Invalid Data Response',
				schema: {
					message: 'Invalid Data',
					value: 'User entered Value',
					param: 'The parameter where error is found'
				}
			}
		*/
		return res.status(400).json({ errors: validateErrors });
	}

	try {
		const user = await User.findOne({ email: email });
		if (!user) {
			/*
				#swagger.responses[401] = {
					description: 'User Created',
					schema: {
						message: "Invalid Email or Password",
					}
				}
			*/
			return res
				.status(401)
				.json({ message: 'Invalid Email or Password' });
		}

		const isEqual = await bcrypt.compare(password, user.password);

		if (!isEqual) {
			return res
				.status(401)
				.json({ message: 'Invalid Email or Password' });
		}

		const token = jwt.sign(
			{
				email: user.email,
				id: user._id,
			},
			'This is a seceret',
			{ expiresIn: '1h' }
		);

		/*
			#swagger.responses[200] = {
				description: 'User Login',
				schema: {
					message: "User Authenticated",
					user: "3234fdsjflk323",
					token: "AUTH+TOKEN+FOR+USER"
				}
			}
		*/
		res.status(200).json({
			message: 'User Authenticated',
			userId: user._id,
			token: token,
		});
	} catch (err) {
		/*
			#swagger.responses[500] = {
				description: 'User Created',
				schema: {
					message: "Something Went Wrong",
				}
			}
		*/
		console.log(err);
		return res.status(500).json({ message: 'Something Went Wrong' });
	}
};
