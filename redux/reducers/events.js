import { createReducer } from "@reduxjs/toolkit";

// Initial State
const initialState = {
  data: undefined,
  page: 0,
  limit: 30,
  length: 0,
  editing: undefined,
  loaded: undefined,
};

// Reducer
const reducer = createReducer(initialState, {
  SUCCESS: (state, action) => {
    Object.assign(state, action.payload);
  },
  ERROR: (state, action) => {
    Object.assign(state, action.payload);
  },
});

export default reducer;
