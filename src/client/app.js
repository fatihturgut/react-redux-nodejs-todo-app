import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { store } from './redux/store';
import TodoList from './components/todoList';

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <TodoList />
      </Provider>
    );
  }
}

export default App;
