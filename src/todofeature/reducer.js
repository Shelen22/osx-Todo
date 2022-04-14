import {
  ADD_TODO_SUCCESS,
  ADD_TODO,
  REMOVE_TODO,
  GET_TODO_ERROR,
  GET_TODO_LOADING,
  GET_TODO_SUCCESS,
  EDIT_TASK,
} from "./actiontype";

const init = { loading: false, todo: [], error: false };

export const reducer = (state = init, action) => {
  switch (action.type) {
    case ADD_TODO:
      return {
        ...state,
        todo: [...state.todo, action.payload],
      };
    case REMOVE_TODO:
      return {
        ...state,
        todo: state.todo.filter((e) => e.ids !== action.payload),
      };

    case ADD_TODO_SUCCESS:
      return {
        ...state,
        todo: [...state.todo, action.payload],
      };
    case GET_TODO_LOADING:
      return {
        ...state,
        loading: true,
      };
    case GET_TODO_SUCCESS:
      return {
        ...state,
        todo: action.payload,
        loading: false,
      };
    case GET_TODO_ERROR:
      return {
        ...state,
        loading: false,
        error: true,
      };
    case EDIT_TASK: {
      let todos = state.todo.map((e) => {
        if (e.ids === action.id) {
          return {
            ...e,
            text: action.payload,
          };
        }
        else {
            return e
        }
      });

      return {
        ...state,
        todo: todos,
      };
    }

    default:
      return state;
  }
};
