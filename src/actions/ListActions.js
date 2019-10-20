import {
  NEW_TODO,
  DELETE_TODO,
  UPDATE_TODO,
} from './types.js';

export const NewTodo = (text, date) => {
  return {
    type: NEW_TODO,
    payload: { text, date }
  }
}

export const DeleteTodo = (date, toDoId) => {
  return {
    type: DELETE_TODO,
    payload: {date, toDoId}
  }
}

export const UpdateTodo = (date, toDoId, text) => {
  return {
    type: UPDATE_TODO,
    payload: { date, toDoId, text }
  }
}