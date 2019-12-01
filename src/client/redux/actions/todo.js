import { request } from '../../services/axios';
import {
  TODO_PENDING,
  FETCH_TODOS_SUCCESS,
  TODO_REJECTED,
  ADD_TODO_SUCCESS,
  UPDATE_TODO_SUCCESS,
  REMOVE_TODO_SUCCESS,
} from '../constants/todo';
import $E from '../../configs/endpoints';

const pending = () => ({
  type: TODO_PENDING,
});

const rejected = error => ({
  type: TODO_REJECTED,
  error,
});

const fetchTodosSuccess = data => ({
  type: FETCH_TODOS_SUCCESS,
  data,
});

const addTodoSuccess = data => ({
  type: ADD_TODO_SUCCESS,
  data,
});

const updateTodoSuccess = data => ({
  type: UPDATE_TODO_SUCCESS,
  data,
});

const removeTodoSuccess = data => ({
  type: REMOVE_TODO_SUCCESS,
  data,
});

export const fetchTodos = () => dispatch => {
  const url = `${$E.TODO}`;
  dispatch(pending());
  request({ method: 'get', url })
    .then(response => {
      dispatch(fetchTodosSuccess(response.data));
    })
    .catch(error => {
      dispatch(rejected(error));
    });
};

export const addTodo = data => dispatch => {
  const url = $E.TODO;
  dispatch(pending());
  request({ method: 'post', url, data })
    .then(response => dispatch(addTodoSuccess(response.data)))
    .catch(error => {
      dispatch(rejected(error));
    });
};

export const updateTodo = data => dispatch => {
  const url = `${$E.TODO}/${data._id}`;
  dispatch(pending());
  request({ method: 'put', url, data })
    .then(response => dispatch(updateTodoSuccess(response.data)))
    .catch(error => {
      dispatch(rejected(error));
    });
};

export const removeTodo = id => dispatch => {
  const url = `${$E.TODO}/${id}`;
  dispatch(pending());
  request({ method: 'delete', url })
    .then(response => dispatch(removeTodoSuccess(response.data)))
    .catch(error => {
      dispatch(rejected(error));
    });
};
