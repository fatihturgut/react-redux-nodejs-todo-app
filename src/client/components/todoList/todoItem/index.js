import React, { Component } from 'react';
import { Tag, Button, Icon, Tooltip } from 'antd';
import PropTypes from 'prop-types';
import { statuses, priorities } from '../../../constants';
import './style.css';

class TodoItem extends Component {
  statusColor = () => {
    const {
      todo: { status: type },
    } = this.props;
    return (statuses.find(status => status.type === type) || {}).color;
  };

  handleItemClick = () => {};

  render() {
    const {
      todo: { _id, title, status, priority: priorityType },
      removeTodo,
    } = this.props;
    const priorityColor = (priorities.find(({ type }) => type === priorityType) || {}).color;
    const titleClass = status === 'COMPLETED' ? 'title-completed' : 'title-normal';

    return (
      <div className="vertical-center">
        <div style={{ color: priorityColor }} className="priority-icon">
          <Tooltip placement="right" title={priorityType} trigger="hover | click">
            <Icon type="arrow-up" />
          </Tooltip>
        </div>
        <div className="todo-tag">
          <Tag color={this.statusColor()}>{status}</Tag>
        </div>
        <div className={`flex ellipsis ${titleClass}`}>{title}</div>
        <Button onClick={() => removeTodo(_id)} type="danger" shape="circle" icon="delete" />
      </div>
    );
  }
}

TodoItem.propTypes = {
  todo: PropTypes.object.isRequired,
  removeTodo: PropTypes.func.isRequired,
};

export default TodoItem;
