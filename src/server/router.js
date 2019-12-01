const express = require('express');
const todoRouter = require('./routes/todo');

const router = express.Router();

router.use('/test', (req, res) => res.status(200).json({ welcomeMessage: 'Welcome !!!' }));
router.use('/todo', todoRouter);

module.exports = router;
