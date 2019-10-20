import React from 'react';
import {
  NEW_TODO,
  DELETE_TODO,
  UPDATE_TODO,
} from '../actions/types';

const INITIAL_STATE = {
  //'date': ['todo1', 'todo2']
}

export default (state = INITIAL_STATE, action) => {
  switch(action.type) {
    case NEW_TODO:
      if(!state[action.payload.date]) {
        return { ...state, [action.payload.date]: [action.payload.text] };
      }
      return { ...state, [action.payload.date]: [...state[action.payload.date], action.payload.text] };

    case DELETE_TODO:
      state[action.payload.date].splice(action.payload.toDoId, 1);
      return { ...state, [action.payload.date]: [...state[action.payload.date]] };

    case UPDATE_TODO:
      state[action.payload.date][action.payload.toDoId] = action.payload.text;
      return { ...state, [action.payload.date]: [ ...state[action.payload.date]] }
    default:
      return state;
  }
}