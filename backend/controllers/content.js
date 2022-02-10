const Content = require('../models/content');
const { validationResult } = require('express-validator');

exports.createContent = (req, res, next) => {
	try {
		const { title, body, image } = req.body;

		const errors = validationResult(req);

		const validateErrors = errors.array().map(error => {
			return { value: error.value, msg: error.msg };
		});

		if (!errors.isEmpty()) {
			return res.status(400).json({ errors: validateErrors });
		}

		const content = new Content({
			title: title,
			body: body,
			user: req.user,
			image: image,
		});

		content.save();

		return res
			.status(201)
			.json({ message: 'Content Created Sucessfully', id: content._id });
	} catch (err) {
		console.log(err);
		return res.status(500).json({ message: 'Something Went Wrong' });
	}
};

exports.getContents = async (req, res, next) => {
	try {
		const contents = await Content.find();

		const data = contents.map(content => {
			return {
				_id: content._id,
				title: content.title,
				body: content.body,
				image: content.image,
				createdAt: content.createdAt,
				updateAt: content.updateAt,
			};
		});
		return res.json({
			data: data,
			message: 'Contents Fetched Sucessfully',
		});
	} catch (error) {
		console.log(error);
		return res.status(500).json({ message: 'Something Went Wrong' });
	}
};

exports.getContent = async (req, res, next) => {
	try {
		const contentId = req.params.id;
		const content = await Content.findById(contentId);

		if (!content) {
			return res.status(404).json({ message: 'No contant Found' });
		}
		const data = {
			_id: content._id,
			title: content.title,
			body: content.body,
			image: content.image,
			createdAt: content.createdAt,
			updateAt: content.updateAt,
		};

		return res.json({
			data: data,
			message: 'Contents Fetched Sucessfully',
		});
	} catch (error) {
		console.log(error);
		return res.status(500).json({ message: 'Something Went Wrong' });
	}
};

exports.editContent = async (req, res, next) => {
	try {
		const contentId = req.params.id;
		const content = await Content.findById(contentId);

		if (!content) {
			return res.status(404).json({ message: 'No contant Found' });
		}

		const { title, body, image } = req.body;

		content.title = title;
		content.body = body;
		content.image = image;

		await content.save();

		return res.json({
			message: 'Contents Update Sucessfully',
		});
	} catch (error) {
		console.log(error);
		return res.status(500).json({ message: 'Something Went Wrong' });
	}
};

exports.deleteContent = async (req, res, next) => {
	try {
		const contentId = req.params.id;
		const content = await Content.findById(contentId);

		if (!content) {
			return res.status(404).json({ message: 'No contant Found' });
		}

		const response = await Content.findByIdAndDelete(contentId);

		return res.status(201).json({ message: 'Contant Deleted!' });
	} catch (err) {
		console.log(err);
		return res.status(500).json({ message: 'Something Went Wrong' });
	}
};
