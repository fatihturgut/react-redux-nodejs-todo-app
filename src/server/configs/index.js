const user = process.env.USER || 'fturgut';
const password = process.env.PASSWORD || 'ft123456';

module.exports.DATABASE = {
  uri: `mongodb://${user}:${password}@ds027521.mlab.com:27521/react-node-todo-app`,
  options: {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
};
