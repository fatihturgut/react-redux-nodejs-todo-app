import {
  TODO_PENDING,
  TODO_REJECTED,
  FETCH_TODOS_SUCCESS,
  ADD_TODO_SUCCESS,
  REMOVE_TODO_SUCCESS,
} from '../constants/todo';

const initialState = {
  pending: true,
  todos: [],
  error: {},
};

export const todo = (state = initialState, action) => {
  switch (action.type) {
    case TODO_PENDING:
      return {
        ...state,
        pending: true,
        error: [],
      };

    case TODO_REJECTED:
      return {
        ...state,
        pending: false,
        error: action.error,
      };

    case FETCH_TODOS_SUCCESS:
      return {
        ...state,
        pending: false,
        todos: action.data,
        error: [],
      };

    case ADD_TODO_SUCCESS:
      return {
        ...state,
        pending: false,
        todos: [...state.todos, action.data],
        error: [],
      };

    case REMOVE_TODO_SUCCESS:
      return {
        ...state,
        pending: false,
        todos: state.todos.filter(item => item._id !== action.data._id),
        error: [],
      };

    default:
      return state;
  }
};
