const express = require('express');

const { get, save, update, remove } = require('./../controllers/todo');

const todoRouter = express.Router();
todoRouter.route('/').get(get);
todoRouter.route('/').post(save);
todoRouter.route('/:id').put(update);
todoRouter.route('/:id').delete(remove);

module.exports = todoRouter;
