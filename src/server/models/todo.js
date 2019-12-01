const mongoose = require('mongoose');

const { Schema } = mongoose;

const TodoSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  priority: {
    type: String,
    enum: ['LOW', 'MEDIUM', 'HIGH'],
    default: 'MEDIUM',
    required: true,
  },
  status: {
    type: String,
    enum: ['INCOMPLETED', 'INPROGRESS', 'BLOCKED', 'COMPLETED'],
    default: 'INCOMPLETED',
    required: true,
  },
});

module.exports = mongoose.model('Todo', TodoSchema);
