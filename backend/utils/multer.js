const multer = require('multer');

const { GridFsStorage } = require('multer-gridfs-storage');

const storage = new GridFsStorage({
	// url: 'mongodb+srv://admin:Uk2uZUDTku9z43in@mern-auth-ititech.gusxu.mongodb.net/Pratilipi?retryWrites=true&w=majority',
	url: `mongodb://${process.env.MONGODB_USERNAME}:${process.env.MONGODB_PASSWORD}@pratilipi-mongo/pratilipi?authSource=admin`,
	options: {
		useNewUrlParser: true,
		useUnifiedTopology: true,
	},

	file: (req, file) => {
		const matches = ['image/png', 'image/jpg', 'image/jpeg'];

		if (matches.indexOf(file.mimetype) == -1) {
			return `${Date.now()}-blog-${file.originalname}`;
		}

		return {
			bucketName: 'photos',
			filename: `${Date.now()}-blog-${file.originalname}`,
		};
	},
});

const csvStorage = multer.memoryStorage();

exports.upload = multer({ storage });

exports.csvUpload = multer({
	storage: csvStorage,
	fileFilter: (req, file, cb) => {
		console.log(file);
		if (file.mimetype === 'text/csv') {
			cb(null, true);
		} else {
			// const error = new Error('File formate not supported');
			req.fileValidationError = 'Unsupported File Type';
			// error.status = 401;
			return cb(null, false);
		}
	},
});
