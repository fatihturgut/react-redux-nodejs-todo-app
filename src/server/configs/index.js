const user = process.env.DB_USER || 'fturgut';
const password = process.env.DB_PASSWORD || 'ft123456';

module.exports.DATABASE = {
  uri: `mongodb://${user}:${password}@ds027521.mlab.com:27521/react-node-todo-app`,
  options: {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
};
