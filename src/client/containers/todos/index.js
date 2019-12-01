import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button, Card, Modal, Input, Select } from 'antd';
import PropTypes from 'prop-types';
import { statuses, priorities } from '../../constants';
import { fetchTodos, addTodo, updateTodo, removeTodo } from '../../redux/actions/todo';
import TodoList from '../../components/todoList';
import './style.css';

const { Option } = Select;

class Todos extends Component {
  constructor(props) {
    super(props);
    this.initialItemToAdd = {
      title: null,
      description: null,
      status: statuses[0].type,
      priority: priorities[0].type,
    };
    this.state = {
      modalVisible: false,
      itemToAdd: {
        ...this.initialItemToAdd,
      },
    };
  }

  componentDidMount() {
    const { fetchTodos } = this.props;
    fetchTodos();
  }

  showModal = () => this.setState({ modalVisible: true });

  isAddButtonClickable = () => {
    const {
      itemToAdd: { title, description, status, priority },
    } = this.state;

    return title && description && status && priority;
  };

  handleAddTodo = () => {
    const { addTodo } = this.props;
    const { itemToAdd } = this.state;
    addTodo(itemToAdd);
    this.setState({
      modalVisible: false,
      itemToAdd: {
        ...this.initialItemToAdd,
      },
    });
  };

  handleCancel = () =>
    this.setState({
      modalVisible: false,
      itemToAdd: {
        ...this.initialItemToAdd,
      },
    });

  handleInputChange = ({ target }) => {
    const { itemToAdd } = this.state;
    const { name, value } = target;
    this.setState({
      itemToAdd: {
        ...itemToAdd,
        [name]: value,
      },
    });
  };

  handleSelectChange = (id, value) => {
    const { itemToAdd } = this.state;
    this.setState({
      itemToAdd: {
        ...itemToAdd,
        [id]: value,
      },
    });
  };

  AddTodoModal = () => {
    const {
      modalVisible,
      itemToAdd: { title, description },
    } = this.state;
    return (
      <Modal
        title="Add New Todo"
        visible={modalVisible}
        okText="Add"
        onOk={this.handleAddTodo}
        okButtonProps={{
          disabled: !this.isAddButtonClickable(),
        }}
        onCancel={this.handleCancel}
      >
        <Input
          name="title"
          value={title}
          className="mb20"
          placeholder="Title"
          allowClear
          onChange={this.handleInputChange}
        />
        <Input
          name="description"
          value={description}
          placeholder="Description"
          className="mb20"
          allowClear
          onChange={this.handleInputChange}
        />
        <Select
          className="full-width mb20"
          defaultValue={statuses[0].type}
          onChange={value => this.handleSelectChange('status', value)}
        >
          {statuses.map(({ type }, index) => {
            return (
              <Option key={index} value={type}>
                {type}
              </Option>
            );
          })}
        </Select>
        <Select
          className="full-width mb20"
          defaultValue={priorities[0].type}
          onChange={value => this.handleSelectChange('priority', value)}
        >
          {priorities.map(({ type }, index) => {
            return (
              <Option key={index} value={type}>
                {type}
              </Option>
            );
          })}
        </Select>
      </Modal>
    );
  };

  render() {
    const { AddTodoModal } = this;
    const { todos, updateTodo, removeTodo } = this.props;
    const cardExtras = (
      <Button onClick={this.showModal} type="primary" shape="circle" icon="plus" />
    );
    return (
      <div className="container">
        <div className="ant-col-xs-24">
          <Card title="Todos" extra={cardExtras}>
            <TodoList todos={todos} updateTodo={updateTodo} removeTodo={removeTodo} />
          </Card>
        </div>
        <AddTodoModal />
      </div>
    );
  }
}

Todos.propTypes = {
  todos: PropTypes.array.isRequired,
  fetchTodos: PropTypes.func.isRequired,
  addTodo: PropTypes.func.isRequired,
  updateTodo: PropTypes.func.isRequired,
  removeTodo: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  todos: state.todo.todos,
  pending: state.todo.pending,
});

const mapDispatchToProps = dispatch => ({
  fetchTodos: () => dispatch(fetchTodos()),
  addTodo: data => dispatch(addTodo(data)),
  updateTodo: data => dispatch(updateTodo(data)),
  removeTodo: id => dispatch(removeTodo(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Todos);
