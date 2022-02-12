const { validationResult } = require('express-validator');
const grid = require('gridfs-stream');
const mongoose = require('mongoose');
const csvtojson = require('csvtojson');

const Content = require('../models/content');

const url = 'http://localhost:8000';

const conn = mongoose.connection;

let gfs;
conn.once('open', () => {
	gfs = grid(conn.db, mongoose.mongo);

	gfs.collection('photos');
});

exports.createContent = (req, res, next) => {
	try {
		/*
			#swagger.tags = ['Content']
			#swagger.summary = 'This endpoint will give give information about the active user'
			#swagger.security = [{
					"bearerAuth": []
			}]
		*/

		const { title, body, image } = req.body;

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

		const content = new Content({
			title: title,
			body: body,
			user: req.userId,
			image: image,
		});

		content.save();

		/*
			#swagger.responses[201] = {
				description: 'Content Created',
				schema: {
					message: "Content Created Sucessfully",
					id: "93238jfsdaf323"
				}
			}
		*/
		return res
			.status(201)
			.json({ message: 'Content Created Sucessfully', id: content._id });
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

exports.getContents = async (req, res, next) => {
	try {
		/*
			#swagger.tags = ['Content']
			#swagger.summary = 'Get all the contents'
			#swagger.security = [{
					"bearerAuth": []
			}]
		*/
		const contents = await Content.find();

		const data = contents.map(content => {
			return {
				_id: content._id,
				title: content.title,
				body: content.body,
				image: content.image,
				createdAt: content.createdAt,
				updateAt: content.updateAt,
				user: content.user,
			};
		});
		/*
			#swagger.responses[200] = {
				description: 'A sucess response',
				schema: {
					message: 'Contents fetched Sucessfully',
					user: [
						{
						'_id': '223333',
						'title': 'Title 1',
						'body': 'Body 1',
						'image': 'http://some/link',
						'createdAt': 'Date',
						'updatedAt': 'Date',
						'user': 'userId',
						},
						{
						'_id': '223333',
						'title': 'Title 1',
						'body': 'Body 1',
						'image': 'http://some/link',
						'createdAt': 'Date',
						'updatedAt': 'Date',
						'user': 'userId',
						},

					]
				}
			}
		*/
		return res.json({
			message: 'Contents Fetched Sucessfully',
			data: data,
		});
	} catch (error) {
		console.log(error);
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

exports.getContent = async (req, res, next) => {
	try {
		/*
			#swagger.tags = ['Content']
			#swagger.summary = 'Get a Particular content'
			#swagger.security = [{
					"bearerAuth": []
			}]
		*/
		const contentId = req.params.id;
		const content = await Content.findById(contentId);

		/*
			#swagger.responses[404] = {
				description: 'Not Found',
				schema: {
					message: "No contant found",
				}
			}
		*/
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
			user: content.user,
		};

		/*
			#swagger.responses[200] = {
				description: 'A sucess response',
				schema: {
					message: 'Contents fetched Sucessfully',
					user:
						{
						'_id': '223333',
						'title': 'Title 1',
						'body': 'Body 1',
						'image': 'http://some/link',
						'createdAt': 'Date',
						'updatedAt': 'Date',
						'user': 'userId',
						},
				}
			}
		*/
		return res.json({
			data: data,
			message: 'Contents Fetched Sucessfully',
		});
	} catch (error) {
		/*
			#swagger.responses[500] = {
				description: 'User Created',
				schema: {
					message: "Something Went Wrong",
				}
			}
		*/
		console.log(error);
		return res.status(500).json({ message: 'Something Went Wrong' });
	}
};

exports.editContent = async (req, res, next) => {
	try {
		/*
			#swagger.tags = ['Content']
			#swagger.summary = 'Edit a particular content'
			#swagger.security = [{
					"bearerAuth": []
			}]
		*/
		const contentId = req.params.id;
		const content = await Content.findById(contentId);

		if (!content) {
			/*
				#swagger.responses[404] = {
					description: 'not found',
					schema: {
						message: "no contant found",
					}
				}
			*/
			return res.status(404).json({ message: 'No contant Found' });
		}

		const { title, body, image } = req.body;

		content.title = title;
		content.body = body;
		content.image = image;

		await content.save();

		return res.json({
			/*
				#swagger.responses[201] = {
					description: 'Content Updated',
					schema: {
						message: "Content Updated Sucessfully",
					}
				}
			*/
			message: 'Contents Update Sucessfully',
		});
	} catch (error) {
		/*
			#swagger.responses[500] = {
				description: 'User Created',
				schema: {
					message: "Something Went Wrong",
				}
			}
		*/
		console.log(error);
		return res.status(500).json({ message: 'Something Went Wrong' });
	}
};

exports.deleteContent = async (req, res, next) => {
	try {
		/*
			#swagger.tags = ['Content']
			#swagger.summary = 'Delete A prrticular content'
			#swagger.security = [{
					"bearerAuth": []
			}]
		*/
		const contentId = req.params.id;
		const content = await Content.findById(contentId);

		if (!content) {
			/*
				#swagger.responses[404] = {
					description: 'not found',
					schema: {
						message: "no contant found",
					}
				}
			*/
			return res.status(404).json({ message: 'No contant Found' });
		}

		console.log(content.user, req.userId);
		if (content.user != req.userId) {
			/*
				#swagger.responses[401] = {
					description: 'User Not Authorized to delete',
					schema: {
						message: "User Dosen't match",
					}
				}
			*/
			return res.status(401).json({ message: "User Dosen't match" });
		}
		await Content.findByIdAndDelete(contentId);
		/*
			#swagger.responses[201] = {
				description: 'Content Updated',
				schema: {
					message: "Contant Deleted",
				}
			}
		*/
		return res.status(201).json({ message: 'Contant Deleted' });
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

exports.uploadFile = async (req, res, next) => {
	try {
		/*
			#swagger.tags = ['Content']
			#swagger.summary = 'Insert the banner image and give the link of uploaded image'
			#swagger.security = [{
					"bearerAuth": []
			}]
			#swagger.consumes = ['multipart/form-data']
			#swagger.parameters['file'] = {
				in: 'formData',
				type: 'file',
				description: 'Banner Image',
			}
		*/
		const file = req.file;

		if (!file) {
			/*
				#swagger.responses[404] = {
					description: 'not found',
					schema: {
						message: "File Not Found",
					}
				}
			*/
			return res.status(404).json({ message: 'File Not Found' });
		}

		const imageUrl = `${url}/api/content/files/${req.file.filename}`;

		/*
			#swagger.responses[201] = {
				description: 'File Store',
				schema: {
					message: "File Store Sucessfully",
					image: "http://some/link"
				}
			}
		*/
		res.status(201).json({
			message: 'File Store SucessFully',
			image: imageUrl,
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

exports.getImage = async (req, res, next) => {
	try {
		/*
			#swagger.tags = ['Content']
			#swagger.summary = 'Return the given image'
			#swagger.security = [{
					"bearerAuth": []
			}]
		*/
		const file = await gfs.files.findOne({ filename: req.params.fileName });

		const readStream = gfs.createReadStream(file.filename);
		readStream.pipe(res);
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
		return res.status(500).json({ message: 'Something went wrong' });
	}
};

exports.bulkloader = async (req, res, next) => {
	try {
		/*
			#swagger.tags = ['Content']
			#swagger.summary = 'Given the csv file, upload the data to database'
			#swagger.security = [{
					"bearerAuth": []
			}]
			#swagger.consumes = ['multipart/form-data']
			#swagger.parameters['file'] = {
				in: 'formData',
				type: 'file',
				description: 'Banner Image',
			}
		*/
		csvBuffer = req.file.buffer;

		const csvBlob = Buffer.from(csvBuffer).toString('utf-8');

		console.log(csvBlob);

		if (req.fileValidationError)
			/*
				#swagger.responses[400] = {
					description: 'User Created',
					schema: {
						message: "File Formate Not Supported",
					}
				}
			*/
			return res.status(400).json({ message: req.fileValidationError });

		let jsonArray = await csvtojson()
			.fromString(csvBlob)
			.then(jsonobj => {
				return jsonobj;
			});

		jsonArray.forEach(ele => (ele['user'] = req.userId));

		await Content.insertMany(jsonArray);

		/*
			#swagger.responses[400] = {
				description: 'User Created',
				schema: {
					message: "Data Inserted",
				}
			}
		*/
		return res.status(201).json({ message: 'Data Inserted ' });
	} catch (err) {
		if (req.fileValidationError)
			return res.status(400).json({ message: req.fileValidationError });

		/*
			#swagger.responses[500] = {
				description: 'User Created',
				schema: {
					message: "Something Went Wrong",
				}
			}
		*/
		console.log(err);
		return res.status(500).json({ message: 'Something went wrong' });
	}
};
