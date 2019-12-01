import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import TodoItem from './todoItem';
import './style.css';

class TodoList extends Component {
  render() {
    const { todos, removeTodo } = this.props;
    return (
      <div>
        {todos.map(todo => (
          <Fragment key={todo._id}>
            <TodoItem todo={todo} removeTodo={removeTodo} />
            <div className="divider" />
          </Fragment>
        ))}
      </div>
    );
  }
}

TodoList.propTypes = {
  todos: PropTypes.array.isRequired,
  removeTodo: PropTypes.func.isRequired,
};

export default TodoList;
