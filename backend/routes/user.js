const express = require('express');
const { body } = require('express-validator');
const passwordValidator = require('password-validator');
const User = require('../models/user');

const router = express.Router();

const userController = require('../controllers/user');
const { isAuth } = require('../middleware/auth');

const passSchema = new passwordValidator();

passSchema
	.is()
	.min(8)
	.has()
	.uppercase()
	.has()
	.lowercase()
	.has()
	.digits(1)
	.has()
	.symbols();

router.get('/profile', isAuth, userController.getUserProfile);

router.post(
	'/login',
	body('email').isEmail().withMessage('Not a vaild Email!'),
	userController.postLogin
);

router.post(
	'/signup',

	body('email')
		.isEmail()
		.withMessage('Not a vaild Email!')
		.custom(async (value, { req }) => {
			const user = await User.findOne({ email: value });
			if (user) {
				throw new Error('A user with same email already exist');
			}
			return true;
		})
		.normalizeEmail(),
	body('password').custom((value, { req }) => {
		const failedAt = passSchema.validate(value, { list: true });

		if (failedAt.length > 0) {
			const error = new Error(
				`Password is missing ${failedAt.join(', ')}`
			);
			throw error;
		}

		return true;
	}),

	userController.postsignup
);

module.exports = router;
