import { createReducer } from "@reduxjs/toolkit";

// Initial State
const initialState = { value: false };

// Reducer

const reducer = createReducer(initialState, {
  SIDEBAR_ACTION: (state, action) => {
    Object.assign(state, action.payload);
  },
});

export default reducer;
