const express = require('express');
const router = express.Router();

const User = require('../models/user');

const { isAuth } = require('../middleware/auth');
const contentController = require('../controllers/content');

const { upload, csvUpload } = require('../utils/multer');

router.get('/all', isAuth, contentController.getContents);
router.get('/:id', isAuth, contentController.getContent);
router.post('/create', isAuth, contentController.createContent);
router.patch('/edit/:id', isAuth, contentController.editContent);

router.delete('/delete/:id', isAuth, contentController.deleteContent);

router.post(
	'/file/upload',
	isAuth,
	upload.single('file'),
	contentController.uploadFile
);
router.get('/files/:fileName', contentController.getImage);

router.post(
	'/bulkUpload',
	isAuth,
	csvUpload.single('file'),
	contentController.bulkloader
);

module.exports = router;
