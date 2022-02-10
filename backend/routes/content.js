const express = require('express');
const router = express.Router();

const User = require('../models/user');

const { isAuth } = require('../middleware/auth');
const contentController = require('../controllers/content');

router.get('/all', contentController.getContents);
router.get('/:id', contentController.getContent);
router.post('/create', contentController.createContent);
router.patch('/edit/:id', contentController.editContent);

router.delete('/delete/:id', contentController.deleteContent);

module.exports = router;
