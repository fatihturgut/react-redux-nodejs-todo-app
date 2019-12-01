const Todo = require('./../models/todo');
const { handleError } = require('./../utils');

module.exports = {
  get: (req, res) => {
    Todo.find()
      .sort('_id')
      .then(result => res.status(200).json(result))
      .catch(handleError(res));
  },
  save: ({ body }, res) => {
    const todo = new Todo(body);
    todo
      .save()
      .then(result => res.status(200).json(result))
      .catch(handleError(res));
  },
  update: ({ body, params }, res) => {
    const { id } = params;

    if (!id) {
      res.status(400).json({ errors: ['Todo id is required'] });
    }

    Todo.updateOne({ _id: id }, { ...body })
      .then(result => res.status(200).json(result))
      .catch(handleError(res));
  },
  remove: ({ params }, res) => {
    const { id } = params;
    if (!id) {
      res.status(400).json({ errors: ['Todo id is required'] });
    }
    const query = { _id: id };
    Todo.deleteOne(query)
      .then(() => res.status(200).json(query))
      .catch(handleError(res));
  },
};
