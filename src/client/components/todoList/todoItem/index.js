import React, { Component } from 'react';
import { Tag, Button, Icon, Tooltip, Select } from 'antd';
import PropTypes from 'prop-types';
import { statuses, priorities } from '../../../constants';
import './style.css';

const { Option } = Select;

class TodoItem extends Component {
  state = {
    itemToUpdate: null,
  };

  statusColor = () => {
    const {
      todo: { status: type },
    } = this.props;
    return (statuses.find(status => status.type === type) || {}).color;
  };

  handleSelectChange = status => {
    const { todo, updateTodo } = this.props;
    const data = {
      ...todo,
      status,
    };
    this.setState({ itemToUpdate: null }, () => {
      updateTodo(data);
    });
  };

  handleTagClick = data => {
    this.setState({ itemToUpdate: data });
  };

  render() {
    const { todo } = this.props;
    const {
      todo: { _id, title, status, priority: priorityType },
      removeTodo,
    } = this.props;
    const { itemToUpdate } = this.state;
    const priorityColor = (priorities.find(({ type }) => type === priorityType) || {}).color;
    const titleClass = status === 'COMPLETED' ? 'title-completed' : 'title-normal';
    return (
      <div className="vertical-center">
        <div style={{ color: priorityColor }} className="priority-icon">
          <Tooltip placement="right" title={priorityType} trigger="hover | click">
            <Icon type="arrow-up" />
          </Tooltip>
        </div>
        <div className="todo-status">
          {itemToUpdate && itemToUpdate._id === _id ? (
            <Select
              className="todo-select"
              size="small"
              defaultValue={status}
              onChange={value => this.handleSelectChange(value)}
            >
              {statuses.map(({ type }, index) => {
                return (
                  <Option key={index} value={type}>
                    {type}
                  </Option>
                );
              })}
            </Select>
          ) : (
            <Tag
              className="todo-tag"
              onClick={() => this.handleTagClick(todo)}
              color={this.statusColor()}
            >
              {status}
            </Tag>
          )}
        </div>
        <div className={`flex ellipsis ${titleClass}`}>{title}</div>

        <Button onClick={() => removeTodo(_id)} type="danger" shape="circle" icon="delete" />
      </div>
    );
  }
}

TodoItem.propTypes = {
  todo: PropTypes.object.isRequired,
  updateTodo: PropTypes.func.isRequired,
  removeTodo: PropTypes.func.isRequired,
};

export default TodoItem;
