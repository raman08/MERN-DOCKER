const router = require('express').Router();

const userRouter = require('./user');
const contentRouter = require('./content');

router.use('/user', userRouter);
router.use('/content', contentRouter);

module.exports = router;
