import { createReducer } from "@reduxjs/toolkit";

// Initial State
const initialState = { error: undefined };

// Reducer
const reducer = createReducer(initialState, {
  ERROR: (state, action) => {
    Object.assign(state, action.payload);
  },
});

export default reducer;
